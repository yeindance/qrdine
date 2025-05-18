import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { Staff } from '@db/entities'

@Resolver(() => Staff)
export class StaffMutationResolver extends BaseMutation {
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => Staff, { name: 'StaffMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')

    return this.dbService.withTransaction(context.merchantId, async (db) => {
      const staff = id ? await db.findOneByOrFail(Staff, { id }) : db.create(Staff)
      staff.fill(values)
      if (deletedAt) {
        await staff.softRemove()
      } else {
        await staff.save()
      }
      return staff
    })
  }
}
