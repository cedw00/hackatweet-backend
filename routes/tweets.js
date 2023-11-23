var express = require('express');
var router = express.Router();

const User = require('../models/users');
const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

router.post('/', async (req, res) => {
  if (!checkBody(req.body, ['message', 'username', 'firstname'])) {
    res.json({ result: false, error: 'Message cannot be empty' });
  }
  const pattern = /#[a-zA-Z]*/;
  const hashtag = req.body.message.match(pattern);
  const user = await User.find({ username: req.body.username });
  if (user !== null) {
    const { firstname, username, message } = req.body;
    const newTweet = new Tweet({
        firstname: firstname,
        username: username,
        createdAt: new Date(),
        hashtag: hashtag[0],
        message: message,
        user: user[0]._id,
    });

    newTweet.save()
    res.json({ result: true, tweet: newTweet });
  }
});

router.get('/', async (req, res) => {
    const tweets = await Tweet.find();

    if (tweets.length > 0) {
        res.json({ result: true, tweets: tweets });
    } else {
        res.json({ result: false, error: 'No tweets found' });
    }
})

router.get('/:hashtag', async (req, res) => {
  const filteredTweets = await Tweet.find({ hashtag: req.params.hashtag });

  if (filteredTweets.length > 0) {
    res.json({ result: true, tweets: filteredTweets });
  } else {
    res.json({ result: false, error: 'No tweets found with #hashtagname' });
}
});

router.delete('/:id', async (req, res) => {
  const tweet = await Tweet.findById({ _id: req.params.id });

  if (tweet) {
    Tweet.deleteOne({ _id: tweet._id }).then(() => {
      res.json({ result: true });
    });
  } else {
    res.json({ result: false, error: 'This tweet does not exist' });
  }
})

module.exports = router;