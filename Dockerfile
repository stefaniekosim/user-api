FROM node:8

WORKDIR /usr/src/user-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 14102

CMD [ "npm" , "start" ]