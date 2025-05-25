import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { MenuType, Menu } from '@db/entities'

@Resolver(() => MenuType)
export class MenuMutationResolver extends BaseMutation {
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => MenuType, { name: 'MenuMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')

    return this.dbService.withTransaction(context.merchantId, async (db) => {
      const menu = id ? await db.findOneByOrFail(Menu, { id }) : db.create(Menu)

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
