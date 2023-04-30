# Find A Friend - API

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`JWT_SECRET`


## Run Locally

### Notes:
- To run this project you need to have docker installed on your computer
- Don't forget to set the environment variables in .env file

### Steps

Clone the project

```bash
  git clone https://github.com/PedroBovolinDavila/find-a-friend-api.git
```

Go to the project directory

```bash
  cd find-a-friend-api
```

Install dependencies

```bash
  npm install
```

Start docker compose

```bash
  docker compose up -d
```

Run migrations

```bash
  npx prisma migrate dev
```

Start the server

```bash
  npm run start:dev
```


## Running Tests

### Unit tests

```bash
  npm run test
```

### E2E tests

Create the vitest-environment-prisma

```bash
  cd prisma/vitest-environment-prisma
  npm link
```

Install the vitest-environment-prisma

```bash
  npm link vitest-environment-prisma
```

Run tests

```bash
  npm run test:e2e
```

## Tech Stack

- Fastify
- Typescript
- Docker
- PostgreSQL
- Vitest

## Authors

- [@pedrobovolindavila](https://www.github.com/pedrobovolindavila)

