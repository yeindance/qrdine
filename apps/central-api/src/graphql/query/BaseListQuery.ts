import { ArgsType, Field } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import * as _ from 'lodash'
import { and, eq } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'

@ArgsType()
export class BaseListArgs {
  @Field(() => GraphQLJSON)
  where: any
}

export class BaseListQuery {
  table: PgTable

  constructor(table: any) {
    this.table = table
  }

  /**
   * This convert js object to drizzle-orm filter by concatenating them with AND
   */
  buildWhereFilter(where: any) {
    return and(..._.map(where, (value, key) => eq(this.table[key], value)))
  }
}
