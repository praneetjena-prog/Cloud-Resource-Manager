FROM node:22-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @supercloud/api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Generate Prisma Client
COPY --from=builder /app/out/full/ .
RUN npx prisma generate --schema=libs/db/prisma/schema.prisma
RUN npx turbo run build --filter=@supercloud/api

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

# We need the node_modules for NestJS, since it's not bundled natively like Next.js standalone
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/dist ./apps/api/dist
COPY --from=installer /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer /app/libs/db ./libs/db

CMD ["sh", "-c", "npx prisma db push --schema=libs/db/prisma/schema.prisma && node apps/api/dist/main.js"]
