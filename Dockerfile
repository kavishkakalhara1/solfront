# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # This will create the static files in /dist directory

# Stage 2: Run
FROM node:18-slim

WORKDIR /app
COPY --from=builder /app/dist ./dist   
# Copy the static files to the new image
COPY --from=builder /app/package*.json ./  
COPY --from=builder /app/vite.config.js ./ 
 # Copy package files if necessary


#RUN npm install --omit=dev   # Install production dependencies

EXPOSE 5000  
# Expose port 5000

# Use npx to run Vite in preview mode (Vite's static file server)
CMD ["npx", "vite", "preview", "--host", "--port", "5000"]