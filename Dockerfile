# Use the official Node.js 18 (or latest LTS version) image as a parent image
FROM node:21

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container at /usr/src/app
COPY package*.json ./

# Install any dependencies
RUN npm install

# If you're building your code for production
# RUN npm ci --only=production

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "app.js" ]
