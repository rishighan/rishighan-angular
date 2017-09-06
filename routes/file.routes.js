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
    // todo: winston
    res.send({
        status: 'File uploaded successfully',
        file: req.file
    });
});

// Delete File
router.post('/api/files/delete', (req, res, next) => {
    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
            Objects: req.body,
            Quiet: false
        }
    };
    s3.deleteObjects(params, (err, data) => {
        if (err) {
            winston.log('error', 'There was an error deleting the file', { errorDetails: err });
            res.send({ status: err });
        } else {
            winston.log('info', 'File deleted successfully', { details: data });
            res.send({ data: data });
        }
    });
});

module.exports = router;
