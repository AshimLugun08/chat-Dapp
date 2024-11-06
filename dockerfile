# Use an official Node.js runtime (v22.1.0) as a base image
FROM node:22.1.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app in development mode
CMD ["npm", "run", "dev"]
