import { OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { OrderItem } from './OrderItemEntity'

@EntityObjectType({ name: 'seat' }, { name: 'SeatType' })
export class Seat extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.seat)
  // orderItems: OrderItem[]
}

export const SeatType = Seat
