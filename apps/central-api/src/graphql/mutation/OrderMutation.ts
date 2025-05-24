import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { EntityManager, In } from 'typeorm'

import { Menu, Order, OrderItem, OrderItemStatusEnum, OrderType } from '@db/entities'
import { ValidationHelper } from '@shared/helpers'
import { z } from 'zod/v4'
import { BaseMutArgs, BaseMutation } from './BaseMutation'

const zItemSchema = z.object({
  id: z.string().optional(),
  deletedAt: z.boolean().optional(),
  menuId: z.string(),
  quantity: z.number(),
  orderId: z.string().optional(),
})

const zValues = z.object({
  deletedAt: z.boolean().optional(),
  orderItems: z.array(zItemSchema),
})

type TItem = z.infer<typeof zItemSchema>
type TValues = z.infer<typeof zValues>

@Resolver(() => OrderType)
export class OrderMutationResolver extends BaseMutation {
  private db: EntityManager
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => OrderType, { name: 'OrderMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    ValidationHelper.validate(args.values, zValues)

    const { deletedAt, ...values } = args.values as TValues
    const { id } = args

    return this.dbService.withTransaction(context.merchantId, async (db) => {
      this.db = db
      const order = id
        ? await this.db.findOneOrFail(Order, { where: { id }, relations: { orderItems: true } })
        : this.db.create(Order)

      if (id && deletedAt) return await order.softRemove()

      order.fill(_.omit(values, 'orderItems'))
      order.staffId = context.staffId

      await order.save()
      const updatedOrder = await this.db.findOneOrFail(Order, { where: { id }, relations: { orderItems: true } })

      if (values.orderItems.length) {
        await this.saveOrderItems(updatedOrder, values.orderItems)
      }

      return updatedOrder
    })
  }

  // if a menu is already in order, merge the quantity
  async saveOrderItems(order: Order, items: TItem[] = []) {
    const menus = await this.db.findBy(Menu, { id: In(_.map(items, 'menuId')) })
    const dbOrderItems = order.orderItems

    for (const item of items) {
      const dbOrderItem = _.find(dbOrderItems, { menuId: item.menuId })
      const orderItem =
        dbOrderItem || (item.id ? await this.db.findOneByOrFail(OrderItem, { id: item.id }) : this.db.create(OrderItem))
      const menu = _.find(menus, { id: item.menuId })

      if (!menu) throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST)

      if (item.id && item.deletedAt) {
        await orderItem.softRemove()
        continue
      }

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
