# rishighan.com

[![Run Status](https://api.shippable.com/projects/5952dfb44bce2607003af5f0/badge?branch=master)](https://app.shippable.com/github/rishighan/rishighan-angular)

_Personal website built with AngularJS and mongodb_

To run this locally, 

+ Make sure you have MongoDB installed and running on port 27017
+ Ensure that you have Docker v17.03-ce (or higher) installed
+ In the terminal, `docker-compose up` This will pull a nodejs image that also contains the angular app and a mongodb image with seed data.
+ Access `http://localhost:3000` in the browser.


**Unit Tests**

From the root, first install all dependencies:

+ `npm i`
+ `bower i`
+ `npm test` or `testem ci`

Continuous Deployment via Shippable to Amazon's Elastic Beanstalk.


gg