import { DbService } from '@db/db.service'
import { ArgsType, Field, ID } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { DataSource, QueryRunner } from 'typeorm'

@ArgsType()
export class BaseMutArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => GraphQLJSON)
  values: any
}

export class BaseMutation {
  constructor(public dbService: DbService) {}

  async withTransaction(mutationFn: (q: QueryRunner) => any) {
    const queryRunner = this.dbService.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result = await mutationFn(queryRunner)
      await queryRunner.commitTransaction()
      return result
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
  }
}
