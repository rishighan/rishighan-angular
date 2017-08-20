const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const winston = require('winston');
require('winston-loggly-bulk');

// multer config
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, __dirname + '/../assets/images');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.newFileName);
    }
});

const upload = multer({
    storage: storage
}).any();

router.post('/api/files/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            winston.log('error', 'Error uploading file', {errorObj: err});
            res.json({
                error_code: 1,
                err_desc: err
            });
        }
        res.json({
            error_code: 0,
            err_desc: null,
            files: req.files
        });
        winston.log('info', 'File uploaded successfully');

    });
});

// Delete File
router.post('/api/files/delete', function (req, res, next) {
    fs.unlink(__dirname + '/../assets/images/' + req.body.file, (error) => {
        winston.log('error', 'Error deleting file', {errorObj:error});
        res.json({
            error_details: error
        });
    });
});

module.exports = router;
