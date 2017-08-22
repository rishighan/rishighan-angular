let zookeeper = require('node-zookeeper-client');

let client = zookeeper.createClient('http://rishighan-zookeeper-dev.us-east-1.elasticbeanstalk.com');
console.log(client);
let path = '/mongo/hostname';


