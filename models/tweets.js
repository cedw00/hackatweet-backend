const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    firstname: String,
    username: String,
    createdAt: Date,
    hashtag: String,
    message: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;