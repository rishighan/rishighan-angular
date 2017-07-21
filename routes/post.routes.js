const express = require('express');
const router = express.Router();
const Post = require('../db/post.crud.js');

router.post('/createpost', function (req, res, next) {
    let promise = Post.createPost(req.body);
    promise.then(function (data) {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

// todo: enable find by slug
router.get('/getallposts', function (req, res, next) {
    let promise = Post.getAllPosts(req.query.pageOffset, req.query.pageSize);
    promise.then(function (data) {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

router.get('/getpostsbytagname', function(req, res, next){
   let promise = Post.getPostsByTagName(req.query.tag, req.query.pageOffset, req.query.pageLimit);
   promise.then(function(data){
     res.send(data);
   })
       .catch(console.log)
       .done();
});

router.get('/getpost', function (req, res, next) {
    let promise = Post.getPost(req.query.id, req.query.slug);
    promise.then(function (post) {
        res.send(post);
    })
        .catch(console.log)
        .done();
});

router.post('/searchpost', function (req, res, next) {
    let promise = Post.searchPost(req.body.params.searchText, req.body.params.pageOffset, req.body.params.pageLimit);
    promise.then(function (result) {
        res.send(result);
    })
        .catch(console.log)
        .done();
});

router.post('/updatepost/:id', function (req, res, next) {
    let promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then(function (result) {
        res.send(result);
    })
        .catch(console.log)
        .done();
});

router.post('/deletepost', function (req, res, next) {
    let promise = Post.deletePost(req.body.params.post_id);
    promise.then(function (result) {
        res.send(result);
    })
        .catch(console.log)
        .done();

});
module.exports = router;

