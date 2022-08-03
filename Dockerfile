FROM node:12

# Create app directory
RUN mkdir -p /vetop-users

# Change workdir
WORKDIR /vetop-users

# Copy package.json to app directory
COPY package.json /vetop-users/package.json

# Install packages
RUN npm install

# Copy source to app directory
COPY . /vetop-users

# Expose
EXPOSE 8010 9010

# Command to start the app
CMD ["npm","run","start"]
