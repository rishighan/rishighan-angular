FROM node:7.10
MAINTAINER Rishi Ghan <rishi.ghan@gmail.com>
RUN mkdir -p /usr/src/rishighan

WORKDIR /usr/src/rishighan

COPY package.json /usr/src/rishighan
COPY bower.json /usr/src/rishighan

#Install dependencies

RUN npm i -g bower  && \
    npm i  && \
    bower cache clean --allow-root && \
    bower i --config.interactive=false --allow-root

COPY . /usr/src/rishighan

# This starts the app
CMD ["npm", "start"]
EXPOSE 8080
