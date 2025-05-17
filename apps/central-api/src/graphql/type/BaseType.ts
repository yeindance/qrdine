import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CreateDateColumn } from 'typeorm'

@ObjectType()
export class BaseType {
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  deletedAt: Date
}
