import { OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { OrderItem } from './OrderItemEntity'

@EntityObjectType({ name: 'menu' }, { name: 'MenuType' })
export class Menu extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  @ColumnField({ type: 'double precision' }, {})
  price: number

  @ColumnField({}, {})
  available: boolean

  @OneToMany(() => OrderItem, (orderMenuItem) => orderMenuItem.menu)
  orderMenuItems: OrderItem[]
}

export const MenuType = Menu
