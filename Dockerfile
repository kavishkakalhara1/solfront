# Stage 1: Build (React/Vite App)
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx Serve (Serve static files and proxy API requests)
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your Nginx configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (HTTP)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
