# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-slim

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 5000

# IMPORTANT: use npx to run Vite in preview mode and bind to all interfaces
CMD ["npx", "vite", "preview", "--host", "--port", "5000"]