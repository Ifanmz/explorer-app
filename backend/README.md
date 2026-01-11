# Explorer App Backend

REST API backend for file explorer application using Bun and Elysia.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **Database**: PostgreSQL (Supabase)
- **Language**: TypeScript

## Setup

1. Install dependencies:
```bash
bun install
```

2. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` file:
```
DATABASE_URL=your_supabase_connection_string
```

3. Run development server:
```bash
bun run dev
```

Server will run at `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `GET /health` - Status check
- `GET /folders` - Get all folders
- `GET /folders/:id/children` - Get folder children

## Database Schema

```sql
CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  parent_id INTEGER REFERENCES folders(id),
  type VARCHAR DEFAULT 'folder'
);
```

## Project Structure

```
src/
├── modules/
│   └── folder/
│       ├── folder.controller.ts
│       ├── folder.service.ts
│       ├── folder.repository.ts
│       └── folder.types.ts
├── app.ts
├── db.ts
└── index.ts
```