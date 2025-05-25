import { ArgsType, Field, ID } from '@nestjs/graphql'
import { GqlValidationEx } from '@shared/exceptions'
import GraphQLJSON from 'graphql-type-json'
import { BaseEntity, EntityManager, EntityTarget, FindOneOptions } from 'typeorm'
import { z } from 'zod/v4'

@ArgsType()
export class BaseMutArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => GraphQLJSON)
  values: any
}

export class BaseMutation {
  // constructor(public dbService: DbService) {}
  validate<T>(object: any, schema: z.ZodType): T {
    const result = schema.safeParse(object)
    if (result.error) {
      throw new GqlValidationEx(result.error.issues)
    }
    return result.data as T
  }

  async findOneOrCreate<T>(db: EntityManager, entity: EntityTarget<any>, options: FindOneOptions): Promise<T> {
    const where = options.where as Record<string, any>
    return where.id ? await db.findOneOrFail(entity, options) : db.create(entity)
  }
}
