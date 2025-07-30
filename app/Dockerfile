FROM node:18

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y wget \
    && DOCKERIZE_VERSION=v0.6.1 \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && apt-get clean

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "20s", "node", "index.js"]