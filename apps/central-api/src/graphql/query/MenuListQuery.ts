import { Args, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as _ from 'lodash'

import { BaseListArgs } from './BaseListQuery'
import { Menu, MenuType } from '@db/entities'
import { DbService } from '@db/db.service'

@Resolver(() => MenuType)
export class MenuListQueryResolver {
  constructor(private dbService: DbService) {}

  @Query(() => [MenuType], { name: 'MenuList' })
  async resolve(@Args() args: BaseListArgs) {
    const { where } = args

    return this.dbService.em.find(Menu, { where })
  }
}
