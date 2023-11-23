const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    hashtag: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;