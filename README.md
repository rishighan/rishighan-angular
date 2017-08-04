# rishighan.com

[![Run Status](https://api.shippable.com/projects/5952dfb44bce2607003af5f0/badge?branch=master)](https://app.shippable.com/github/rishighan/rishighan-angular)

_Personal website built with AngularJS and MongoDB_

To spin up a local instance, 

+ Make sure you have MongoDB installed and running on port 27017
+ Ensure that you have `Docker v17.03.1-ce-rc1` installed
+ In the terminal, run `docker-compose up`. This will spin up the frontend and the server.
+ Access `http://localhost` in the browser.

### Local Development
+ `npm i`
+ `bower i`
+ Make sure your node version is at least 7
+ `npm start` starts the backend on port `8080`
+ `npm run frontend` starts the frontend

### Unit Tests

From the root, first install all dependencies:

+ `npm test` or `testem ci`

### Docker Images

To build each of the images, 
+ Node.js and Angular app
  + In project root, run `docker build -t frishi/rishighanangular_web:latest .`
  + Then push it to Docker Hub with `docker push frishi/rishighanangular_web:latest`
+ MongoDB Seed
  + From the project root `docker build -f mongo-seed/Dockerfile -t frishi/rishighanangular_mongodb:latest .`
  + Push it to Docker Hub with `docker push frishi/rishighanangular_mongodb:latest`

The `docker-compose` command is tested for `Docker v17.03.1-ce-rc1`.

### Deployment

Continuous Deployment is done through Shippable to Amazon's Elastic Beanstalk.

_To deploy, simply push to master_.

+ Shippable then kicks off a build of `rishighan-angular/master`
+ Runs unit tests [TODO]
+ Builds `rishighanangular_web` Docker image and tags it with the \<version>.\<build number>
+ Pushes this tagged image to Docker Hub
+ Creates an application version with corresponding to the latest commit
+ Selects the environment you specify in the `shippable.yaml` configuration
+ Deploys this app to Elastic Beanstalk

gg