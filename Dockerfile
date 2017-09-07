FROM node:7.10
MAINTAINER Rishi Ghan <rishi.ghan@gmail.com>

RUN mkdir -p /usr/src/rishighan
WORKDIR /usr/src/rishighan

COPY package.json /usr/src/rishighan
COPY bower.json /usr/src/rishighan
COPY rgapp-pm2.json /usr/src/rishighan

#Install dependencies
RUN npm i -g bower  && \
    npm i -g pm2 && \
    npm i  && \
    bower i --config.interactive=false --allow-root

COPY . /usr/src/rishighan
EXPOSE 8080

# This starts the app
CMD pm2 start --no-daemon --env production rgapp-pm2.json
