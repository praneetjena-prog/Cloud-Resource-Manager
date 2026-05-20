FROM node:22-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @supercloud/console --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
COPY --from=builder /app/out/full/ .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npx turbo run build --filter=@supercloud/console

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

COPY --from=installer /app/apps/console/next.config.ts .
COPY --from=installer /app/apps/console/package.json .
COPY --from=installer --chown=nextjs:nodejs /app/apps/console/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/console/.next/static ./apps/console/.next/static

CMD ["node", "apps/console/server.js"]
