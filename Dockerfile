FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if applicable)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source files into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (default NestJS port is 3000)
EXPOSE 4000

# Command to run the application
CMD ["node", "dist/main.js"]  # Adjust according to your entry point