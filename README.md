# rishighan.com

[![wercker status](https://app.wercker.com/status/ef289d3c52954f8b01b52d8a2ee4f4af/s/master "wercker status")](https://app.wercker.com/project/byKey/ef289d3c52954f8b01b52d8a2ee4f4af)

_Personal website built with AngularJS and MongoDB_

### Local Development

+ Make sure your node version is at least 7 `nvm i 7` and `nvm use 7`
+ Install dependencies with `npm i` and `bower i`
+ Make sure you have MongoDB installed and running on port 27017
+ This project looks up configuration information from Redis.
+ In the terminal, run `REDIS_HOST=<redis host> node server` to start the backend.
+ Run `npm run frontend` to start the frontend; Webpack will watch the files for changes.
+ Access `http://localhost:8080` in the browser.

You can also run `REDIS_HOST=<redis host> npm start` to start both the frontend and the backend simultaneously.

### Unit Tests
+ `npm test` or `testem ci`

### Docker Image

To build the image, 
+ Node.js and Angular app
  + In project root, run `docker build -t frishi/rishighanangular_web:latest .`
  + Then push it to Docker Hub with `docker push frishi/rishighanangular_web:latest`

### Deployment

_To deploy, simply push to master_

The app is deployed via Wercker to a Digital Ocean droplet running a Docker host.
Wercker configuration is found in `wercker.yml`. Note that Wercker does not build from a Dockerfile, so the steps in `wercker.yml` are exactly the same as the Dockerfile, with relevant changes per Wercker's specific requirements.


### Analytics

This project is basically a blog with a homegrown CMS that integrates with Google Analytics API to fetch pageviews.

gg