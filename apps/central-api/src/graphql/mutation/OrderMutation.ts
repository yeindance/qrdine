import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { EntityManager, In } from 'typeorm'

import { Menu, Order, OrderItem, OrderItemStatusEnum, OrderType } from '@db/entities'
import { z } from 'zod/v4'
import { BaseMutArgs, BaseMutation } from './BaseMutation'

const valuesSchema = z.object({
  deletedAt: z.boolean().optional(),
  orderItems: z.array(
    z.object({
      id: z.string().optional(),
      deletedAt: z.boolean().optional(),
      menuId: z.string(),
      quantity: z.number(),
      orderId: z.string().optional(),
    }),
  ),
})

type TValues = z.infer<typeof valuesSchema>

@Resolver(() => OrderType)
export class OrderMutationResolver extends BaseMutation {
  private db: EntityManager
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => OrderType, { name: 'OrderMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    this.validate(args.values, valuesSchema)

    const { deletedAt, ...values } = args.values as TValues
    const { id } = args

    return this.dbService.withTransaction(context.merchantId, async (db) => {
      this.db = db
      const order = await this.findOneOrCreate<Order>(db, Order, { where: { id } })

      if (id && deletedAt) return await order.softRemove()

      order.fill(_.omit(values, 'orderItems'))
      order.staffId = context.staffId

      await order.save()
      const updatedOrder = await this.db.findOneOrFail(Order, { where: { id: order.id }, relations: { orderItems: true } })

      if (values.orderItems.length) {
        await this.saveOrderItems(updatedOrder, values.orderItems)
      }

      return updatedOrder
    })
  }

  async saveOrderItems(order: Order, items: TValues['orderItems'] = []) {
    const menus = await this.db.findBy(Menu, { id: In(_.map(items, 'menuId')) })
    const dbOrderItems = order.orderItems

    for (const item of items) {
      const dbOrderItem = _.find(dbOrderItems, { menuId: item.menuId })
      const orderItem = dbOrderItem || (await this.findOneOrCreate<OrderItem>(this.db, OrderItem, { where: { id: item.id } }))
      const menu = _.find(menus, { id: item.menuId })

      if (!menu) throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST)

      if (item.id && item.deletedAt) {
        await orderItem.softRemove()
        continue
      }

      // if a menu is already in order, merge the quantity
      if (dbOrderItem) {
        orderItem.fill({ quantity: dbOrderItem.quantity + item.quantity })
      } else {
        orderItem.status = OrderItemStatusEnum.draft
        orderItem.fill({ quantity: item.quantity, orderId: item.orderId || order.id, menuId: menu.id, menuPrice: menu.price })
      }
      await orderItem.save()
    }
  }
}
