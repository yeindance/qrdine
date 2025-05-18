import { BaseEntity, ColumnField, EntityObjectType } from './BaseEntity'
import { ManyToOne } from 'typeorm'
import { Order } from './OrderEntity'
import { Menu } from './MenuEntity'
import { Seat } from './SeatEntity'

@EntityObjectType({ name: 'order_menu_item' }, { name: 'OrderMenuItemType' })
export class OrderMenuItem extends BaseEntity {
  @ColumnField({ length: 20 }, {})
  status: string // e.g., 'draft', 'confirmed', 'canceled', 'fulfilled'

  @ColumnField({ nullable: true }, {})
  orderId: string

  @ColumnField({ nullable: true }, {})
  menuId: string

  @ColumnField({ nullable: true }, {})
  seatId: string

  @ManyToOne(() => Order, (order) => order.orderMenuItems)
  order: Order

  @ManyToOne(() => Menu, (menu) => menu.orderMenuItems)
  menu: Menu

  @ManyToOne(() => Seat, (seat) => seat.orderMenuItems)
  seat: Seat
}
