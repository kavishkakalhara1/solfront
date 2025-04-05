# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (Vite for frontend in this case)
RUN npm run build

# Stage 2: Production Environment
FROM node:18-slim

# Set working directory for runtime
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json and package-lock.json (to install only production dependencies)
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose port 5000 for the app
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "preview"]