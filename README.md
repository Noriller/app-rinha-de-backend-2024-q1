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

## About the Submissions

Right now I have 2 monitors, 2 VSCode projects open and running with multiple extensions, YouTube playing, and a few others. And then I'm running one of the submissions plus the Gatling test made to be able to stress and break things, I'm doing it expecting requests to fail.

In this context, I found that the minimum architecture, 2 replicas, isn't running at 100% even under the stress. So, I've tried With more replicas and found that more is better... but maybe up to a certain point.

### Learnings

- Probably I/O for the sqlite is the bottleneck.
  - I say this because no matter how many replicas I use, they never go to 100% CPU used.
  - So, while some replicas are getting requests and sending responses, another replica can use the db, or, at least that is what I'm guessing right now.
- While I can't pinpoint why, I feel that with 4 replicas I was getting the best performance.
  - Best performance as in: it got the fewest failing requests.
  - However, playing with the number of replicas showed that depending on the load, maybe there could be a better number. So I'll just try all from 2 to 5, after that, it seems to be too many processes using one database.
- nginx was requiring a lot of memory to run. It might be because of the optimizations done, but it quickly hogs way more memory than the API.

## How to use

The best way to run is with Docker Compose.
If you can run makefiles, then just run them in one terminal:

```bash
## for the base version with 2 replicas
make up

## for other versions with more replicas
make up3
make up4
make up5
```

Then you can also run a tuned test to be very stressful in another terminal with:

```bash
make gatling
```

## Running without Docker

Use, initially, Node 21.6.2

```bash
## in this folder (to use from .nvmrc)
nvm use
```

But you can upgrade it if you want.

Today, Node 21 is the newest version, probably with the best performance, even if it might be unstable.

Install what's needed:

```bash
# corepack makes sure that the right version of pnpm is used
# even if you don't have it installed
corepack pnpm i --frozen-lockfile
```

And then run:

```bash
corepack pnpm run migrate
corepack pnpm run dev
```

If you want to have `pnpm` installed and use it without the `corepack`:

```bash
corepack enable
# this will use the version from `package.json`
corepack prepare --activate
```

### After changing something

After changes, the best way to test is still using the docker commands above.

With makefile:

```bash
# use upb that forces a rebuild and recreate
make upb
make gatling
```

## Changing the test

First, open the `scala` file: `loadTest/load-test/user-files/simulations/rinhabackend/RinhaBackendCrebitosSimulation.scala`.
That file is the one from the challenge that I copied and then played with.

There are two variables to play with:

- multi
  - a multiplier of active users and ramp of users during the test
- duration
  - how long it will hold the test, and also how much time it will ramp up
