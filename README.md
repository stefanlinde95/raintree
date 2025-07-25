# User weight management full-stack app

A full-stack application for managing user measurements with a React frontend and Node.js backend using postgres for database.

## Technologies

**Backend:**

- Node.js/Express server
- PostgreSQL with Drizzle ORM and query client

**Frontend:**

- React
- Tailwind CSS
- React query
- React toastify

## Database setup

### Local development

For local development, you only need the database connection string. Update the following files:

**drizzle.config.ts:**

```typescript
dbCredentials: {
  url: process.env.DB_CONNECTION_STRING!,
}
```

**src/db/index.ts:**

```typescript
export const db = drizzle({
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING!,
  },
});
```

NB! for local development no ssl or other configuration options are needed.

**Connection string format:**

```
postgres://<username>:<password>@<database_endpoint>/<database_name>
```

### AWS RDS deployment

For deployment on AWS RDS (only "regular" postgres, not Aurora Postgres):

1. Download the region certificate from AWS: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html
2. Place the `.pem` file into `/backend/secrets/` directory
3. Uncomment the SSL configuration in `src/db/index.ts` and `src/drizzle.config.ts`:

```typescript
ssl: {
  checkServerIdentity: () => undefined,
  ca: fs.readFileSync(filePath).toString(),
},
```

4. You need DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME env variables which you can get from your RDS instance and use them in `src/drizzle.config.ts`.

NB! Make sure your RDS DB is publicbly available and security group has your IP address in allowed inbound connections with port 5432

## Getting Started

### Backend Setup

Make sure you have docker running on your machine

```bash
cd backend
pnpm install
docker compose up
pnpm db:setup # Creates tables and seeds data
pnpm dev
```

### Frontend setup

```bash
cd frontend
pnpm install
pnpm dev
```

## Database scripts

- `pnpm db:generate` - Generate migrations from schema changes
- `pnpm db:migrate` - Apply migrations to database
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:setup` - Run migrations and seed data
- `pnpm db:studio` = Run [Drizzle studio](https://orm.drizzle.team/drizzle-studio/overview)
