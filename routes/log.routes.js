const express = require('express');
const router = express.Router();
const JL = require('jsnlog').JL;
const jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;

router.post('*.logger', function(req, res){
    jsnlog_nodejs(JL, req.body);
    res.send('');
});

module.exports = router;
