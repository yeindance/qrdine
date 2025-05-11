import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { Menu, MenuType } from 'src/db/entities/MenuEntity'
import { DataSource } from 'typeorm'
import * as _ from 'lodash'
import { DbService } from '@db/db.service'
// import { HttpContextService } from 'src/services/HttpContextService'
// import { faker } from '@faker-js/faker'

@Resolver(() => MenuType)
export class MenuMutationResolver extends BaseMutation {
  constructor(private ds: DbService) {
    super(ds)
  }

  @Mutation(() => MenuType, { name: 'MenuMutation' })
  async resolve(@Args() args: BaseMutArgs) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')

    return this.withTransaction(async (q) => {
      const menu = id ? await q.manager.findOneByOrFail(Menu, { id }) : q.manager.create(Menu)

      menu.fill(values)

      if (deletedAt) {
        await menu.softRemove()
      } else {
        await menu.save()
      }

      return menu
    })
  }
}
