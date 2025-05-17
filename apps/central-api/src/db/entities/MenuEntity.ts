import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'

@EntityObjectType({ name: 'menu' }, { name: 'MenuType' })
export class Menu extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  @ColumnField({ type: 'double precision' }, {})
  price: number

  @ColumnField({}, {})
  available: boolean
}

export const MenuType = Menu
