FROM node:11-alpine

RUN apk update && \
    apk add python

WORKDIR /app

COPY . /app

RUN yarn install --pure-lockfile

EXPOSE 8080
