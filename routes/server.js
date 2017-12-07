const express = require('express');
const router = express.Router();

router.get('/', function(req, res, send){
      res.render('index');
});

module.exports = router;