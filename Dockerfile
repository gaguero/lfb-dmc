# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY web/package*.json ./web/

# Install dependencies for root
RUN npm install

# Copy the entire project
COPY . .

# Change to web directory and install dependencies
WORKDIR /app/web
RUN npm install

# Build the Next.js application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Define the command to run the application
CMD ["npm", "start"] 