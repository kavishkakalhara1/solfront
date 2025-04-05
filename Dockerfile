# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Only copy the files needed for install and build first
COPY package*.json ./
RUN npm install

# Now copy the rest of the project and build it
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-slim
WORKDIR /app

# Copy the built files and minimal files needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 5000
CMD ["npm", "run", "preview"]