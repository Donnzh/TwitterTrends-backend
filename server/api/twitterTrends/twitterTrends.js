'use strict';

const Twit = require('twit');
const config = require('config');
const winston = require('winston');

const T = new Twit({
	consumer_key: config.thirdParty.twitter.consumer_key,
	consumer_secret: config.thirdParty.twitter.consumer_secret,
	access_token: config.thirdParty.twitter.access_token,
	access_token_secret: config.thirdParty.twitter.access_token_secret,
	timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
});

// setup city/country's trends, only woeid that supported by twitter api
// current cities is Sydney, Melbourne, Adelaide, Brisbane, Perth, New Zealand
const citiesWoeids = [1105779, 1103816, 1100661, 1098081, 1099805, 23424916];

let trendsData = [];

setInterval(() => {
	trendsData.length = 0;
	getTrendsData((err, result) => {
		return result;
	});
}, config.thirdParty.twitterTrendsRefreshTime);

function getTrendsData (errback) {
	if (trendsData.length === citiesWoeids.length) {
		errback(undefined, trendsData);
		return;
	}

	let numberflag = 0;
	citiesWoeids.forEach((woeid) => {
		T.get('trends/place', {id: woeid}, (err, data, response) => {
			if (err) {
				winston.error('err when request twitter api', err, 'woeid', woeid);
				errback(err);
				return;
			}
			else {
				trendsData.push(data);
				numberflag++;
				if (numberflag === citiesWoeids.length) {
					errback(undefined, trendsData);
					return;
				}
			}
		});
	});
}

function getTrendsDataRoute (req, res) {
	getTrendsData((err, result) => {
		if (err) {
			res.status(400).json(err);
			return;
		}
		else {
			res.set('content-type', 'application/json');
			res.status(200).json(result);
		}
	});

}

module.exports = {
	getTrendsDataRoute
};

