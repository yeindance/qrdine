import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { BaseListArgs, BaseListQuery } from './BaseListQuery'
import { Staff } from '@db/entities'

@Resolver(() => Staff)
export class StaffListQueryResolver extends BaseListQuery {
  constructor(private dbService: DbService) {
    super()
  }

  @Query(() => [Staff], { name: 'StaffList' })
  async resolve(@Args() args: BaseListArgs, @Context() context: MyGraphQlContext) {
    const { where } = args
    const db = await this.dbService.createEm(context.merchantId)
    return db.find(Staff, { where })
  }
}
