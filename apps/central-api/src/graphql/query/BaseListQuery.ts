import { ArgsType, Field } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import * as _ from 'lodash'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}

export class BaseListQuery {
  constructor() {}
}
