import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { BaseListArgs, BaseListQuery } from './BaseListQuery'
import { Seat, SeatType } from '@db/entities'

@Resolver(() => SeatType)
export class SeatListQueryResolver extends BaseListQuery {
  constructor(private dbService: DbService) {
    super()
  }

  @Query(() => [SeatType], { name: 'SeatList' })
  async resolve(@Args() args: BaseListArgs, @Context() context: MyGraphQlContext) {
    const { where } = args
    const db = await this.dbService.createEm(context.merchantId)
    return db.find(Seat, { where })
  }
}
