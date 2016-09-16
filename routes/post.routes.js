const express = require('express');
const router = express.Router();
const Post = require('../db/post.crud.js');

// Create a new post
router.post('/createpost', function (req, res, next) {
    var promise = Post.createPost(req.body);
    promise.then(function (data) {
            res.send(data);
        })
        .catch(console.log)
        .done();
});

// get all posts
router.get('/getallposts', function (req, res, next) {
    var promise = Post.getAllPosts();
    promise.then(function (data) {
            res.send(data);
        })
        .catch(console.log)
        .done();
});

router.get('/getpost/:id', function (req, res, next) {
    var promise = Post.getPost(req.params.id);
    promise.then(function (post) {
            res.send(post);
        })
        .catch(console.log)
        .done();
});

router.post('/updatepost/:id', function (req, res, next) {
    var promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then(function (result) {
            res.send(result);
        })
        .catch(console.log)
        .done();
});

module.exports = router;

