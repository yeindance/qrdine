import { DbService } from '@db/db.service'
import { MyGraphQlContext } from '@graphql/graphql.module'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import * as _ from 'lodash'
import { BaseMutArgs, BaseMutation } from './BaseMutation'
import { Seat } from '@db/entities'

@Resolver(() => Seat)
export class SeatMutationResolver extends BaseMutation {
  constructor(private dbService: DbService) {
    super()
  }

  @Mutation(() => Seat, { name: 'SeatMutation' })
  async resolve(@Args() args: BaseMutArgs, @Context() context: MyGraphQlContext) {
    const { id, values } = args
    const deletedAt = _.get(values, 'deletedAt')

    return this.dbService.withTransaction(context.merchantId, async (db) => {
      const seat = id ? await db.findOneByOrFail(Seat, { id }) : db.create(Seat)
      seat.fill(values)
      if (deletedAt) {
        await seat.softRemove()
      } else {
        await seat.save()
      }
      return seat
    })
  }
}
