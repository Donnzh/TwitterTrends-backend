'use strict';

const packageJson = require('../package.json');

const config = {
	// Configure of this server. e.g adding another services
	server: {
		version: packageJson.version,
		port: 3939,
		services: {
			'twitterTrends': true
		}
	},
	//winston logger config
	logger: {
		console: {
			level: 'info',
			colorize: true,
			timestamp: true
		}
	},
	thirdParty: {
		twitter: {
			consumer_key : 'zrsSxG9TqrjX4Ve32p80UU378',
			consumer_secret : 'd3oVSSGVTGXMsOyfiNXnsigQzOaNe91C5M4H4APCbHfOKsSuEx',
			access_token : '274953474-9h2JCXMpDk2EerjoJljJbUtbLehkOrAJYlQOmPmU',
			access_token_secret : 'AkQAZodqf1wdl4yAkBlzT5JPJgaJYngDFwk0givCyGVl8'
		},
		twitterTrendsRefreshTime:  15 * 60 * 1000 // refresh the trends in 15 mins
	}
};
module.exports = config;
