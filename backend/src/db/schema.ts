import { sql } from 'drizzle-orm';
import {
  pgTable,
  integer,
  timestamp,
  uuid,
  text,
  decimal,
  check,
  unique,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
});

export const measurements = pgTable(
  'measurements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    patientId: integer('patient_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    weight: decimal('weight', { precision: 5, scale: 1 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => [
    check(
      'weight_range',
      sql`${table.weight} >= 25.0 AND ${table.weight} <= 250.0`
    ),
    unique('unique_patient_id').on(table.patientId),
  ]
);
