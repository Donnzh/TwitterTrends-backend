'use strict';

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const winston = require('winston');

winston.info('Config', { config: JSON.stringify(config, undefined, 2) });
winston.info('NODE_ENV', { NODE_ENV: process.env.NODE_ENV });
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, config.get('logger.console'));

const server = express();
const allMiddlewares = [bodyParser.json()];
const serverConfig = config.server;

Object.keys(serverConfig.services)
	.filter((service) => {
		return config.server.services[service] === true;
	}).forEach((service) => {
		server.use(
			'/api',
			allMiddlewares,
			require(`./api/${service}/routes.js`));
	});


module.exports = server;
