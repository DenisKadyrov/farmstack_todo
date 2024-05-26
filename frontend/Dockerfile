FROM node:latest

WORKDIR build

COPY public/ /build/public
COPY src/ /build/src
COPY package.json /build/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

