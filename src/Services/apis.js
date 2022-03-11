import MAINAPI from './api';

export const getPinCodeApi = () => {
	return callback => {
		// const { username, password } = data;
		MAINAPI('POST', `capi/p_list_pincode.php`)
			.then(response => {
				if (response) {
					console.log(
						'🚀 ~ file: apis.js ~ line 9 ~ getPinCodeApi ~ response',
						response
					);

					if (callback) callback(response);
				}
			})
			.catch(error => {
				console.log(
					'🚀 ~ file: apis.js ~ line 18 ~ getPinCodeApi ~ error',
					error
				);
				// console.log(err.response);
				if (callback) callback(error.response);
			});
	};
};
