import { OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { OrderMenuItem } from './OrderMenutItemEntity'

@EntityObjectType({ name: 'seat' }, { name: 'SeatType' })
export class Seat extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  @OneToMany(() => OrderMenuItem, (orderMenuItem) => orderMenuItem.seat)
  orderMenuItems: OrderMenuItem[]
}
