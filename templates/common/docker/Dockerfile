# Use official Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source files
COPY . .

# Build the project
RUN pnpm build

# Expose port
EXPOSE 5000

# Start the app using PM2
CMD ["npx", "pm2-runtime", "dist/index.js"]
