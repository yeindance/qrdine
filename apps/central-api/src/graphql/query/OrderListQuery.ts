import { DbService } from '@db/db.service'
import { Order, OrderType } from '@db/entities'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { BaseListArgs, BaseListQuery } from './BaseListQuery'

@Resolver(() => OrderType)
export class OrderListQueryResolver extends BaseListQuery {
  constructor(private dbService: DbService) {
    super()
  }

  @Query(() => [OrderType], { name: 'OrderList' })
  async resolve(@Args() args: BaseListArgs, @Context() context: MyGraphQlContext) {
    const { where } = args

    const db = await this.dbService.createEm(context.merchantId)

    return db.find(Order, { where, relations: { orderItems: true } })
  }
}
