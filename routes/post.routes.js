const express = require('express');
const router = express.Router();
const Post = require('../db/post.crud.js');
const winston = require('winston');
require('winston-loggly-bulk');

router.post('/createpost', (req, res, next) => {
    let promise = Post.createPost(req.body);
    promise.then((data) => {
        res.send(data);
        winston.log('info', 'Post created successfully', {details: req.body});
    })
        .catch((err) => {
            winston.log('error', 'Error creating post', {errorObj: err});
        })
        .done();
});

// todo: enable find by slug
router.get('/getallposts', (req, res, next) => {
    let promise = Post.getAllPosts(req.query.pageOffset, req.query.pageSize);
    promise.then((data) => {
        res.send(data);
    })
        .catch((err) => {
            winston.log('error', 'Error retrieving posts', {errorObj: err});
        })
        .done();
});

router.get('/getpostsbytagname', (req, res, next) => {
    let promise = Post.getPostsByTagName(req.query.tag, req.query.pageOffset, req.query.pageLimit);
    promise.then((data) => {
        res.send(data);
    })
        .catch((err) => {
            winston.log('error', 'Error retrieving posts by tag: %s', req.query.tag, {errorObj: err});
        })
        .done();
});

router.get('/filterontags', (req, res, next) => {
    let promise = Post.filterOnTags(req.query.tagNames);
    promise.then((data) => {
        res.send(data);
    })
        .catch((err) => {
            winston.log('error', 'Error filtering on tags: %s', req.query.tagNames, {errorObj: err});
        })
        .done();
});

router.get('/getpost', (req, res, next) => {
    let promise = Post.getPost(req.query.id, req.query.slug);
    promise.then((post) => {
        res.send(post);
    })
        .catch((err) => {
            winston.log('error', 'Error retrieving post: %s', req.query.id, {errorObj: err});
        })
        .done();
});

router.post('/searchpost', (req, res, next) => {
    let promise = Post.searchPost(req.body.params.searchText, req.body.params.pageOffset, req.body.params.pageLimit);
    promise.then((result) => {
        res.send(result);
    })
        .catch((err) => {
            winston.log('error', 'Error searching for posts matching search text: %s', req.body.params.searchText, {errorObj: err});
        })
        .done();
});

router.post('/updatepost/:id', (req, res, next) => {
    let promise = Post.updatePost(req.params.id, req.body, req.params.upsertToggle);
    promise.then((result) => {
        res.send(result);
    })
        .catch((err) => {
            winston.log('error', 'Error updating post', {errorObj: err});
        })
        .done();
});

router.post('/deletepost', (req, res, next) => {
    let promise = Post.deletePost(req.body.params.post_id);
    promise.then((result) => {
        winston.log('info', 'Post deleted successfully', {details: req.body.params.post_id});
        res.send(result);
    })
        .catch((err) => {
            winston.log('error', 'Error deleting post id: %s', req.body.params.post_id, {errorObj: err});
        })
        .done();
});
module.exports = router;

