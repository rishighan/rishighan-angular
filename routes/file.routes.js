const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const aws = require('aws-sdk');
const redis = require('../config/redis.config');
const multerS3 = require('multer-s3');
const winston = require('winston');
require('winston-loggly-bulk');


// multer config
// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, __dirname + '/../assets/images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.body.newFileName);
//     }
// });
//
// const upload = multer({
//     storage: storage
// }).any();

aws.config.update({
    accessKeyId: "AKIAJ4ZHT6EZM4YX3PKA",
    secretAccessKey: "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",
    region: "us-east-1"
});


let s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'rishighan',
        metadata: (req, file, cb) => {
            cb(null, Object.assign({}, req.body));
        },
        key: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

router.post('/api/files/upload', upload.single('attachedFile'), (req, res) => {
    res.send({
        status: 'file uploaded successfully',
        file: req.file
    });
});

// Delete File
router.post('/api/files/delete', (req, res, next) => {
    fs.unlink(`${__dirname }/../assets/images/${ req.body.file}`, (error) => {
        res.json({
            error_details: error
        });
    });
    winston.log('info', 'File deleted successfully', {details: req.body.file});
});

module.exports = router;
