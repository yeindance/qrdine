import { OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { OrderMenuItem } from './OrderMenutItemEntity'

@EntityObjectType({ name: 'menu' }, { name: 'MenuType' })
export class Menu extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  @ColumnField({ type: 'double precision' }, {})
  price: number

  @ColumnField({}, {})
  available: boolean

  @OneToMany(() => OrderMenuItem, (orderMenuItem) => orderMenuItem.menu)
  orderMenuItems: OrderMenuItem[]
}

export const MenuType = Menu
