const express = require('express');
const router = express.Router();
const Post = require('../db/post.crud.js');

router.post('/createpost', (req, res, next) => {
    let promise = Post.createPost(req.body);
    promise.then((data) => {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

// todo: enable find by slug
router.get('/getallposts', (req, res, next) => {
    let promise = Post.getAllPosts(req.query.pageOffset, req.query.pageSize);
    promise.then((data) => {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

router.get('/getpostsbytagname', (req, res, next) => {
    let promise = Post.getPostsByTagName(req.query.tag, req.query.pageOffset, req.query.pageLimit);
    promise.then((data) => {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

router.get('/filterontags', (req, res, next) => {
    let promise = Post.filterOnTags(req.query.tagNames);
    promise.then((data) => {
        res.send(data);
    })
        .catch(console.log)
        .done();
});

router.get('/getpost', (req, res, next) => {
    let promise = Post.getPost(req.query.id, req.query.slug);
    promise.then((post) => {
        res.send(post);
    })
        .catch(console.log)
        .done();
});

router.post('/searchpost', (req, res, next) => {
    let promise = Post.searchPost(req.body.params.searchText, req.body.params.pageOffset, req.body.params.pageLimit);
    promise.then((result) => {
        res.send(result);
    })
        .catch(console.log)
        .done();
});

router.post('/updatepost/:id', (req, res, next) => {
    let promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then((result) => {
        res.send(result);
    })
        .catch(console.log)
        .done();
});

router.post('/deletepost', (req, res, next) => {
    let promise = Post.deletePost(req.body.params.post_id);
    promise.then((result) => {
        res.send(result);
    })
        .catch(console.log)
        .done();
});
module.exports = router;

