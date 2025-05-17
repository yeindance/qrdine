import { doublePrecision, pgTable, text } from 'drizzle-orm/pg-core'
import { baseTableColumns } from './utils'

export const Menu = pgTable('menu', {
  ...baseTableColumns,
  name: text('name').notNull(),
  price: doublePrecision('price').notNull(),
})
