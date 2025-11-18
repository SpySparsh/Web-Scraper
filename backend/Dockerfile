FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to root to install dependencies if needed (optional, but safe)
USER root

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your app
COPY . .

# Expose the port
EXPOSE 4000

# Run the app
CMD ["node", "index.js"]
