# syntax=docker/dockerfile:1
FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY tsconfig.json ./
COPY env.ts ./
COPY src ./src

RUN --mount=type=secret,id=PORT \
  --mount=type=secret,id=DB_STRING \
  --mount=type=secret,id=DB_ATLAS \
  --mount=type=secret,id=PRIVATE_KEY \
  --mount=type=secret,id=PUBLIC_KEY \
  --mount=type=secret,id=DEFAULT_FRIEND_EMAIL \
  --mount=type=secret,id=DEFAULT_FRIEND_USERNAME \
  --mount=type=secret,id=WELCOME_MESSAGE \
  sh -c 'export PORT="$(cat /run/secrets/PORT)"; \
  export DB_STRING="$(cat /run/secrets/DB_STRING)"; \
  export DB_ATLAS="$(cat /run/secrets/DB_ATLAS)"; \
  export PRIVATE_KEY="$(cat /run/secrets/PRIVATE_KEY)"; \
  export PUBLIC_KEY="$(cat /run/secrets/PUBLIC_KEY)"; \
  export DEFAULT_FRIEND_EMAIL="$(cat /run/secrets/DEFAULT_FRIEND_EMAIL)"; \
  export DEFAULT_FRIEND_USERNAME="$(cat /run/secrets/DEFAULT_FRIEND_USERNAME)"; \
  export WELCOME_MESSAGE="$(cat /run/secrets/WELCOME_MESSAGE)"; \
  bun run build'

FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=1337

COPY --from=builder /app/dist/messaging-api /app/messaging-api

USER bun

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD sh -c 'port="${PORT:-1337}"; port="${port%\"}"; port="${port#\"}"; bun -e "fetch(\"http://127.0.0.1:${port}/api/healthcheck\").then(r => { if (!r.ok) throw new Error(\"unhealthy\") }).catch(() => process.exit(1))"'

ENTRYPOINT ["/app/messaging-api"]
