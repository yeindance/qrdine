import { BaseEntity, ColumnField, EntityObjectType } from '../BaseEntity'

@EntityObjectType({ name: 'merchant' }, { name: 'MerchantType' })
export class Merchant extends BaseEntity {
  @ColumnField({ length: 50 }, {})
  name: string

  @ColumnField({}, {})
  available: boolean
}

// export const MenuType = Menu
