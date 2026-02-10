FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build frontend + backend
RUN pnpm build

# Expose port
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
