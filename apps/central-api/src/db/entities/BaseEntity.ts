import { Field, FieldOptions, ID, ObjectType, ObjectTypeOptions, ReturnTypeFunc } from '@nestjs/graphql'
import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  EntityOptions,
  PrimaryColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
} from 'typeorm'
import { monotonicFactory } from 'ulid'

export function ColumnField(prop: ColumnOptions, field: FieldOptions, graphqlReturnTypeFn: ReturnTypeFunc = () => String) {
  return function (target: object, propertyKey: string) {
    Column(prop)(target, propertyKey)
    Field(graphqlReturnTypeFn, field)(target, propertyKey)
  }
}

export function EntityObjectType(schema: EntityOptions = {}, object: ObjectTypeOptions & { name?: string } = {}) {
  return function (target: any) {
    Entity(schema)(target)
    ObjectType(object.name!, object)(target)
  }
}

const ulid = monotonicFactory()

@EntityObjectType()
export class BaseEntity extends TypeormBaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string = ulid()

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  @Field({ nullable: true })
  deletedAt: Date

  fill(values: any) {
    Object.assign(this, values)
  }
}
