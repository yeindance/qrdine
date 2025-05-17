import { DbService } from '@db/db.service'
import { Menu } from '@db/tables'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { MenuType } from '@graphql/type'
// import { HttpContextService } from 'src/services/HttpContextService'
// import { faker } from '@faker-js/faker'

@Resolver(() => MenuType)
export class MenuMutationResolver extends BaseMutation {
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => MenuType, { name: 'MenuMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')

    const db = this.dbService.db(context.merchantId)
    const [result] = await db.insert(Menu).values(values).returning().execute()

    return result
    // return this.dbService.withTransaction(async (q) => {
    //   const menu = id ? await q.manager.findOneByOrFail(Menu, { id }) : q.manager.create(Menu)

    //   menu.fill(values)

    //   if (deletedAt) {
    //     await menu.softRemove()
    //   } else {
    //     await menu.save()
    //   }

    //   return menu
    // })
  }
}
