const express = require('express');
const router = express.Router();
//const {  RECAPTCHA_SITE_KEY} = require('../public/js/script.js');
//var User = require('../models/user')


router.get('/', function(req, res, next) {
  console.log("This is the home page");
  res.render('index');
    next();
});

router.get('/test1', function(req, res, next) {
  res.render('test1');
  next();
});

router.post('/paypal', function(req, res, next) {
  console.log("***************************************" +  "TEST POST PAGE"  + "******************************************8")
  res.render('paypal', {amount: req.body.amount});
  console.log(req.body.amount)
 // next();
});

router.get('/paypal', function(req, res, next) {
  console.log("***************************************" +  "TEST PAGE"  + "******************************************8");
  res.render('paypal');
  console.log(req.body.amount)
  //  next();
});





router.get('/number', function(req, res, next) {
  res.render('test');
  next();
});

router.get('/shop', function(req, res, next) {
  res.render('shop');
  next();
});

router.get('/about', function(req, res, next) {
  res.render('about');
  next();
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
  next();
});


router.get('/register', function(req, res, next) {
  res.render('register');
  next();
});

router.get('/cart', function(req, res, next) {
  res.render('cart');
  next();
});



router.get('/*', function(req, res) {
   res.render('error');
});



module.exports = router;
