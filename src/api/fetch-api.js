import { MESSAGES } from '../helpers/messages';

export const GET = (url = '') => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(url, options)
			.then(async (response) => {
				if (!response.ok) {
					reject(
						new Error(
							`${
								response.statusText || MESSAGES.FETCH_DATA_ERROR
							}\n${url}`,
						),
					);
				}

				const json = await response.json();
				const pagination = JSON.parse(
					response.headers.get('x-pagination'),
				);

				resolve({ body: json, pagination });
			})
			.catch((e) => {
				reject(new Error(`${e.message}\n${url}`));
			});
	});
};

export const POST = (url = '', data = {}) => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					reject(
						new Error(
							`${
								response.statusText || MESSAGES.POST_DATA_ERROR
							}\n${url}\n${JSON.stringify(data)}`,
						),
					);
				}

				resolve(response.json());
			})
			.catch((e) => reject(new Error(`${e.message}\n${url}`)));
	});
};
