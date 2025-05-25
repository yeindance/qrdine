import { JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { Staff } from './StaffEntity'
import { OrderItem } from './OrderItemEntity'
import { Seat } from './SeatEntity'
import { Field } from '@nestjs/graphql'

@EntityObjectType({ name: 'order' }, { name: 'OrderType' })
export class Order extends BaseEntity {
  @ColumnField({ length: 100 }, {})
  name: string

  @ColumnField({ type: 'decimal', precision: 2, default: 0 }, { nullable: true })
  total: number

  @ColumnField({ type: 'decimal', precision: 2, default: null }, { nullable: true })
  paid: number

  @ColumnField({ name: 'staff_id' }, {})
  staffId: string

  @ColumnField({ name: 'seat_id' }, {})
  seatId: string

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff

  @ManyToOne(() => Seat)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @Field(() => [OrderItem])
  orderItems: OrderItem[]
}

export const OrderType = Order
