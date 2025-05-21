import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { JoinColumn, ManyToOne } from 'typeorm'
import { Order } from './OrderEntity'
import { Menu } from './MenuEntity'
import { Seat } from './SeatEntity'

@EntityObjectType({ name: 'order_item' }, { name: 'OrderItemType' })
export class OrderItem extends BaseEntity {
  @ColumnField({ length: 20 }, {})
  status: string // e.g., 'draft', 'confirmed', 'canceled', 'fulfilled'

  @ColumnField({ type: 'int', default: 1 }, { description: 'Quantity of this menu item ordered' })
  quantity: number

  @ColumnField({ nullable: false }, {})
  orderId: string

  @ColumnField({ nullable: false }, {})
  menuId: string

  @ColumnField({ nullable: false }, {})
  seatId: string

  @ManyToOne(() => Order, (order) => order.orderMenuItems)
  @JoinColumn({ name: 'orderId' })
  order: Order

  @ManyToOne(() => Menu, (menu) => menu.orderMenuItems)
  @JoinColumn({ name: 'menuId' })
  menu: Menu

  @ManyToOne(() => Seat, (seat) => seat.orderMenuItems)
  @JoinColumn({ name: 'seatId' })
  seat: Seat
}
