// let zookeeper = require('node-zookeeper-client');
//
// let client = zookeeper.createClient('localhost:2181');
// let path = '/mongo';
//
// client.once('connected', function () {
//     console.log('Connected to the Zookeeper server.');
//
//     client.create(path, function (error) {
//         if (error) {
//             console.log('Failed to create node: %s due to: %s.', path, error);
//         } else {
//             console.log('Node: %s is successfully created.', path);
//         }
//
//         client.close();
//     });
// });
//
// client.connect();