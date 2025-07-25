import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import * as fs from 'fs';

dotenv.config({ path: '.env' });

const filePath = './secrets/eu-north-1-bundle.pem';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
    // host: process.env.DB_HOST!,
    // port: Number(process.env.DB_PORT!),
    // user: process.env.DB_USER!,
    // password: process.env.DB_PASS!,
    // database: process.env.DB_NAME!,
    // ssl: {
    //   checkServerIdentity: () => undefined,
    //   ca: fs.readFileSync(filePath).toString(),
    // },
  },
});
