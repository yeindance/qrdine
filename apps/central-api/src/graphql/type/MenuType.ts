import { Field, ObjectType } from '@nestjs/graphql'
import { BaseType } from './BaseType'

@ObjectType()
export class MenuType extends BaseType {
  @Field()
  name: string

  @Field()
  price: number
}
