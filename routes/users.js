const express = require('express');
const router = express.Router();




router.post('/checkout', function(req, res, next) {
  console.log(req.body.amount)
  console.log("this is the post")
    res.render('paypal', {total: req.body.amount});
});


router.get('/checkout', function(req, res, next) {
  console.log("this is the get")
  console.log(req.body)
  res.render('paypal');
});

router.get('/login', function(req, res, next) {
  res.render('login');
  next();
});

router.post('/login', function(req, res, next) {
  res.render('profile');
  next();
});


module.exports = router;
