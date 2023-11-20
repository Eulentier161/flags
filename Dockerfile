FROM --platform=linux/amd64 node:16-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
FROM --platform=linux/amd64 node:16-alpine3.17 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build
FROM --platform=linux/amd64 node:16-alpine3.17 AS runner
LABEL org.opencontainers.image.source=https://github.com/Eulentier161/flags
LABEL org.opencontainers.image.description="dockerized flag game pwa"
LABEL org.opencontainers.image.licenses=MIT
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app ./
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]
