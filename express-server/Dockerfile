FROM node:20

WORKDIR /app

COPY package*.json /app
RUN yarn install
COPY . /app

EXPOSE 8001

CMD [ "yarn", "start" ]