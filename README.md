# App Rinha de Backend 2024 Q1

From the challenge: <https://github.com/zanfranceschi/rinha-de-backend-2024-q1/>

## Built with

- [Next.js](https://nextjs.org/)
- [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- [TypeScript](https://www.typescriptlang.org/)
- [Better SQLite](https://github.com/WiseLibs/better-sqlite3)
- [Nginx](https://nginx.org/)

### Why Next.js?

Using Next because why not?

Wanted to check how good would be the server side of Next under stress, so gave it a try.

## How to use

The best way to run is with Docker Compose.
If you can run makefiles, then just run them in one terminal:

```bash
make up
```

Then you can also run a tuned test to be very stressful in another terminal with:

```bash
make gatling
```

## Running without Docker

Use, initially, Node 21.6.2

```bash
nvm use 21.6.2
```

But you can upgrade it if you want.

Today, Node 21 is the newest version, probably with the best performance, even if it might be unstable.

Install what's needed:

```bash
corepack enable pnpm
pnpm i --frozen-lockfile
```

And then run:

```bash
pnpm run migrate
pnpm run dev
```

### After changing something

After changes, the best way to test is still using the docker commands above.

With makefile:

```bash
# use upb that forces a rebuild and recreate
make upb
make gatling
```
