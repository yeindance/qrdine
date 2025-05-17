import { ArgsType, Field, ID } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ArgsType()
export class BaseMutArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => GraphQLJSON)
  values: any
}

export class BaseMutation {
  // constructor(public dbService: DbService) {}
}
