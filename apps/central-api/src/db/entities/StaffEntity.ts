import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'

@EntityObjectType({ name: 'staff' }, { name: 'StaffType' })
export class Staff extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string
}
