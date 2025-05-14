import { Args, Query, Resolver } from '@nestjs/graphql'

import { DbService } from '@db/db.service'
import { Menu, MenuType } from '@db/entities'
import { BaseListArgs } from './BaseListQuery'

@Resolver(() => MenuType)
export class MenuListQueryResolver {
  constructor(private dbService: DbService) {}

  @Query(() => [MenuType], { name: 'MenuList' })
  async resolve(@Args() args: BaseListArgs) {
    const { where } = args

    return this.dbService.em.find(Menu, { where })
  }
}
