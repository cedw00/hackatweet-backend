var express = require('express');
var router = express.Router();

const Trend = require('../models/trends');

router.post('/', async (req, res) => {
    const trend = await Trend.findOne({ trend: req.body.trend });

    if (trend === null) {
        console.log('Ok');
        const newTrend = new Trend({
            trend: req.body.trend,
            count: 0,
        });

        newTrend.save();
        res.json({ result: true, trend: newTrend });
    } else {
        Trend.updateOne({ trend: req.body.trend }, { count: trend.count + 1 })
        .then(data => {
            if (data.acknowledged) {
                Trend.findOne({ trend: req.body.trend }).then(updatedTrend => {
                    res.json({ result: true, trend: updatedTrend });
                })
            } else {
                res.json({ result: true, error: 'Failed to update trend' });
            }
        })
    }
});

router.get('/', async (req, res) => {
    const trends = await Trend.find();

    if (trends.length > 0) {
        res.json({ result: true, trends: trends })
    } else {
        res.json({ result: false, error: 'No trends found in database' })
    }
})

module.exports = router;