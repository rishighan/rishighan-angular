const express = require('express');
const router = express.Router();
const Post = require('../db/post.crud.js');

router.post('/createpost', function (req, res, next) {
    var promise = Post.createPost(req.body);
    promise.then(function (data) {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

// todo: enable find by slug
router.get('/getallposts', function (req, res, next) {
    var promise = Post.getAllPosts(req.query.pageOffset, req.query.pageSize);
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

router.post('/searchpost', function (req, res, next) {
    console.log(req.query)
    var promise = Post.searchPost(req.query.searchText);
    promise.then(function (result) {
        res.send(result);
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

router.post('/deletepost', function (req, res, next) {
    var promise = Post.deletePost(req.body.params.post_id);
    promise.then(function (result) {
        res.send(result);
    })
        .catch(console.log)
        .done();

});
module.exports = router;

