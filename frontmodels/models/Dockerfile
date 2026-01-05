# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY frontmodels/models/package.json ./package.json
COPY frontmodels/models/package-lock.json* ./package-lock.json*

# Install dependencies
RUN npm ci

# Copy source
COPY frontmodels/models/ .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the static app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Start the app
CMD ["serve", "-s", "dist", "-l", "5173"]
