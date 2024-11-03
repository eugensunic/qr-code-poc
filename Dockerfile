FROM node:14

# Set the working directory
WORKDIR /app

# Copy only the package.json and package-lock.json from the backend folder to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the backend folder
COPY backend/. .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
