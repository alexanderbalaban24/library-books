FROM node:latest

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY src ./src

EXPOSE 3003

CMD ["npm", "run", "start"]
