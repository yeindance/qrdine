import { DbService } from '@db/db.service'
import { Menu } from '@db/tables'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { MenuType } from '@graphql/type'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { BaseListArgs, BaseListQuery } from './BaseListQuery'

@Resolver(() => MenuType)
export class MenuListQueryResolver extends BaseListQuery {
  constructor(private dbService: DbService) {
    super(Menu)
  }

  @Query(() => [MenuType], { name: 'MenuList' })
  async resolve(@Args() args: BaseListArgs, @Context() context: MyGraphQlContext) {
    const { where } = args

    const db = this.dbService.db(context.merchantId)

    return db.select().from(Menu).where(this.buildWhereFilter(where))
  }
}
