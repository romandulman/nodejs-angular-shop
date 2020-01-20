FROM node:latest

WORKDIR /usr/src/app

COPY  ./backend/package*.json ./

RUN npm install

COPY ./backend .

#COPY ./frontend/build ./public

EXPOSE 8080

CMD [ "npm", "start" ]
