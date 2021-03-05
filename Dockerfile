FROM node:15.10.0-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]