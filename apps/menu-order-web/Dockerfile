# Base node image
FROM node:23

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application
COPY . .

# Start in development mode
CMD ["npm", "run", "dev"]
