# FROM node:21.6.2-alpine AS builder
FROM node:21.6.2-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

COPY . .

RUN mkdir data

RUN pnpm build

# Runner stage
FROM node:21.6.2-alpine

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/public ./public
# COPY --from=builder /app/data ./data
COPY --from=builder /app/drizzle ./drizzle

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
