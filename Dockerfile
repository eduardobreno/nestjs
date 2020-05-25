FROM node:lts-alpine
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
COPY *.lock ./
RUN yarn install    

# Copy app source code

# Env setup
# COPY .env.example .env

#Expose port and begin application
# EXPOSE 3000

# Start the app
# CMD [ "yarn", "start:dev"]