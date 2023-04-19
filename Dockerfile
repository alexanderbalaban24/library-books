FROM node:latest

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY / ./

EXPOSE 3002

CMD ["npm", "run", "start"]
