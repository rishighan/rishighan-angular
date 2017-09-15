# rishighan.com

[![wercker status](https://app.wercker.com/status/ef289d3c52954f8b01b52d8a2ee4f4af/s/master "wercker status")](https://app.wercker.com/project/byKey/ef289d3c52954f8b01b52d8a2ee4f4af)

_Personal website built with AngularJS and MongoDB_

### Local Development

+ Make sure your node version is at least 7 `nvm i 7` and `nvm use 7`
+ Install dependencies with `npm i` and `bower i`
+ Make sure you have MongoDB installed and running on port 27017
+ This project looks up configuration information from Redis, you can spin one locally using this [image](https://github.com/rishighan/docker-redis)
+ Define the following keys in your Redis store:
  + `mongohost` Mongo host IP
  + `logglyconfig` Loggly JSON configuration 
  + `googleapi` Google API JSON configuration
+ Provide AWS credentials in `~/.aws/credentials`
+ Start the backend using `pm2 start rgapp-pm2.json --env development`
+ Access `http://localhost:8080` in the browser.

### Unit Tests
+ `npm test` or `testem ci`

### Docker Image

To build the image, 
+ Node.js and Angular app
  + In project root, run `docker build -t frishi/rishighanangular_web:latest .`
  + Then push it to Docker Hub with `docker push frishi/rishighanangular_web:latest`

### Deployment

_To deploy, simply push to master_

The app is deployed via `Wercker` to a `Digital Ocean` droplet running a Docker host.
Wercker configuration is found in `wercker.yml`. Note that Wercker does not build from a Dockerfile, so the steps in `wercker.yml` are exactly the same as the Dockerfile, with relevant changes per Wercker's nuances.

**Note:** _Since you are dealing with unmanaged droplets when it comes to Digital Ocean, you have to be careful of how much disk space the docker containers use up upon each deployment. Create a task in `/etc/cron.daily` to prune dangling, exited containers to keep the disk usage in check._ [See here](http://blog.yohanliyanage.com/2015/05/docker-clean-up-after-yourself/).

### Analytics

This project is basically a blog with a homegrown CMS that integrates with Google Analytics API to fetch pageviews.

### Addendum

MongoDB and Redis are deployed independently as Docker containers via Wercker as well.
The related repos are found here:

+ [docker-node](https://github.com/rishighan/docker-node-4.2.3)
+ [mongo-docker](https://github.com/rishighan/mongo-docker)
+ [docker-redis](https://github.com/rishighan/docker-redis)

gg