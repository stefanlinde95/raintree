import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import * as schema from './schema.ts';
import { sql } from 'drizzle-orm';

dotenv.config({ path: '.env' });

async function seedDb() {
  try {
    const db = drizzle({
      connection: {
        connectionString: process.env.DB_CONNECTION_STRING!,
      },
    });

    await seed(db, { users: schema.users }).refine((f) => ({
      users: {
        count: 30,
      },
    }));

    const insertedUsers = (await db.select().from(schema.users)).map(
      (user) => user.id
    );

    await seed(db, { measurements: schema.measurements }).refine((f) => ({
      measurements: {
        count: 30,
        columns: {
          patientId: f.valuesFromArray({
            values: insertedUsers,
            isUnique: true,
          }),
          weight: f.int({ minValue: 25, maxValue: 250 }),
          createdAt: f.date({ minDate: new Date(), maxDate: new Date() }),
          updatedAt: f.date({ minDate: new Date(), maxDate: new Date() }),
        },
      },
    }));

    // This will reset the id sequence to the highest id in the users table
    await db.execute(
      sql`SELECT setval('users_id_seq', COALESCE(MAX(id), 1)) FROM users`
    );

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error when seeding database', error);
  }
}

await seedDb();
process.exit(0);
