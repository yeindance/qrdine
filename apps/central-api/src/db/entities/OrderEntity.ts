import { ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { Staff } from './StaffEntity'
import { OrderMenuItem } from './OrderMenutItemEntity'

@EntityObjectType({ name: 'order' }, { name: 'OrderType' })
export class Order extends BaseEntity {
  @ColumnField({ length: 100 }, {})
  name: string

  @ColumnField({ type: 'float' }, {})
  total: number

  @ColumnField({ type: 'boolean', default: false }, {})
  paid: boolean

  @ColumnField({ nullable: true }, {})
  staffId: string

  @ManyToOne(() => Staff)
  staff: Staff

  @OneToMany(() => OrderMenuItem, (orderMenuItem) => orderMenuItem.order)
  orderMenuItems: OrderMenuItem[]
}
