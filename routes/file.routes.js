const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const winston = require('winston');
require('winston-loggly-bulk');


aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
let s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
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
        status: 'File uploaded successfully',
        file: req.file
    });
});

// Delete File
router.post('/api/files/delete', (req, res, next) => {
    s3.deleteObject({
        Bucket: 'rishighan',
        Key: req.body.file
    }, (err, data) => {
        winston.log('info', 'File deleted successfully', {details: data});
    });
});

module.exports = router;
