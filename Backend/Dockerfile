FROM node:9-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN apk add --no-cache make gcc g++ python && \
  npm install --production --silent && \
  apk del make gcc g++ python
COPY . .

EXPOSE 3001

ENTRYPOINT ["node", "./bin/www"]
