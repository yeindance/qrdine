import { text, timestamp } from 'drizzle-orm/pg-core'

import { ulid } from 'ulid'

export const baseTableColumns = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => ulid()),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}
