const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {res.render('index', {title: 'Express', subtitle: 'hello'});}); /* GET home page. */

router.post('/', function(req, res) {res.render('index', {title: 'Express'});}); 

module.exports = router;