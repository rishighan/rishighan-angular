FROM node :6

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm i -g bower  && \
    npm i  && \
    bower i --config.interactive=false --allow-root


EXPOSE 3000

# This starts the app
CMD["node", "server.js"]