import { Args, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as _ from 'lodash'

import { BaseListArgs } from './BaseListQuery'
import { Menu, MenuType } from '@db/entities'

@Resolver(() => MenuType)
export class MenuListQueryResolver {
  constructor(@InjectRepository(Menu) private menuRepo: Repository<Menu>) {}

  @Query(() => [MenuType], { name: 'MenuList' })
  async resolve(@Args() args: BaseListArgs) {
    const { where } = args

    return this.menuRepo.find({ where })
  }
}
