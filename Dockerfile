FROM node:8-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY client/package.json client/package.json
COPY client/package-lock.json client/package-lock.json
RUN cd client && npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]