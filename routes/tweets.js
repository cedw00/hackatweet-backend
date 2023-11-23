var express = require('express');
var router = express.Router();

const User = require('../models/users');
const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

router.post('/', async (req, res) => {
  if (!checkBody(req.body, ['message'])) {
    res.json({ result: false, error: 'Message cannot be empty' });
  }
  const pattern = /#[a-zA-Z]*/;
  const hashtag = req.body.message.match(pattern);

  

});

module.exports = router;