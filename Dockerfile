# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage - serve static files with lightweight server
FROM node:22-alpine

WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve

COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

CMD ["serve", "dist", "-l", "3000"]
