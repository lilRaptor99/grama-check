FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod 777 /tmp

USER 10014

RUN touch /tmp/addresses.txt

EXPOSE 8080

CMD [ "node", "index.js" ]
