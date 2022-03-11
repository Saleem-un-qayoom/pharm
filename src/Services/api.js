import * as Sentry from '@sentry/react';

import axios from 'axios';
import config from './config';

// import { config } from '.';

const MAINAPI = (method, url, payload, hasFile) => {
	return API(method, url, payload, config.baseUrl, hasFile);
};

export default MAINAPI;

const API = (method, url, payload, server, hasFile) => {
	// const token = localStorage.getItem('@kupostoken');

	// console.log(token);
	var options = {};

	if (hasFile) {
		options = {
			method,
			headers: {},
			url: `${server}/${url}`,
		};
	} else {
		options = {
			method,
			headers: {},
			url: `${server}/${url}`,
		};
	}

	// if (token) {
	// 	options.headers.Authorization = `Bearer ${token}`;
	// }

	if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
		options.data = payload;
	}

	return new Promise((resolve, reject) => {
		axios(options)
			.then(res => {
				return res.data;
			})
			.then(respJson => {
				resolve(respJson);
			})
			.catch(err => {
				Sentry.captureException(err, url);
				reject(err);
			});
	});
};
