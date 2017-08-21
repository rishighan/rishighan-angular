# rishighan.com

[![Run Status](https://api.shippable.com/projects/5952dfb44bce2607003af5f0/badge?branch=master)](https://app.shippable.com/github/rishighan/rishighan-angular)

_Personal website built with AngularJS and MongoDB_

To spin up a local instance, 

+ Make sure you have MongoDB installed and running on port 27017
+ Ensure that you have `Docker v17.03.1-ce-rc1` installed
+ You need to pass in MongoDB hostname as an environment variable to the container. In this particular project, `DOCKER_MONGO_HOST` is set to `rishighanangular_mongodb_1`. 
+ In the terminal, run `DOCKER_MONGO_HOST=rishighanangular_mongodb_1 docker-compose up`. This will spin up the frontend and the node.js server.
+ Access `http://localhost` in the browser.

### Local Development
+ `npm i`
+ `bower i`
+ Make sure your node version is at least 7
+ `MONGO_HOST=localhost npm start` starts the backend on port `8080`
+ `npm run frontend` starts the frontend

### Unit Tests
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

_Caveat_

Because Amazon EB does not support multiple `Dockerrun.aws.json` files to suit different use-cases,
there is a side-effect: 

1. The EB configuration currently deploys the app as a composition of the `node.js` image and the `mongo` image.
2. The `mongo-seed` Dockerfile seeds data into the Mongo instance everytime this app is deployed, _overwriting_ data.
3. As a result, it is necessary to first do a `mongodump` from the EB instance, then a `mongorestore` locally to sync, and then build the `mongo-seed` image and push it.

This is not ideal and currently is a TODO item. 

### Analytics

This project is basically a blog with a homegrown CMS that integrates with Google Analytics API to fetch pageviews.


gg