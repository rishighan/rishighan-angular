const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// multer config
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, __dirname + '/assets/images');
    },
    filename: function(req, file, cb) {
        console.log(req.body);
        cb(null, req.body.newFileName);
    }
});

const upload = multer({
    storage: storage
}).any();

router.post('/api/files/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
        }
        res.json({
            error_code: 0,
            err_desc: null,
            files: req.files
        })
    })
});

// Delete File
router.post('/api/files/delete', function (req, res, next) {
    fs.unlink(__dirname + '/assets/images/' + req.body.file, function (error) {
        res.json({
            error_details: error
        });
    });
});

module.exports = router;
