FROM node:18-alpine AS base
 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=api
 
# Build project-types
WORKDIR /app/build/packages/project-types

RUN yarn build

FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
 
COPY --from=installer /app/apps/api/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nestjs:nodejs /app/apps/api/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/api/dist dist/
COPY --from=installer --chown=nextjs:nodejs /app/node_modules node_modules/
COPY --from=installer --chown=nextjs:nodejs /app/packages packages/

 
# CMD node apps/api/main.js