import { ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { Staff } from './StaffEntity'
import { OrderItem } from './OrderItemEntity'

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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderMenuItems: OrderItem[]
}
