import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as fs from 'fs';

dotenv.config({ path: '.env' });

const filePath = './secrets/eu-north-1-bundle.pem';

export const db = drizzle({
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING!,
    // ssl: {
    //   checkServerIdentity: () => undefined,
    //   ca: fs.readFileSync(filePath).toString(),
    // },
  },
});
