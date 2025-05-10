import { ArgsType, Field } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}
