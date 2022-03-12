import MAINAPI from './api';

export const getPinCodeApi = () => {
	return callback => {
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
				if (callback) callback(error.response);
			});
	};
};

export const getStoreApi = () => {
	return (data, callback) => {
		const { uId, pinCode } = data;
		MAINAPI('POST', `capi/p_store_list.php`, {
			uid: uId,
			pincode: pinCode,
		})
			.then(response => {
				if (response) {
					console.log(
						'🚀 ~ file: apis.js ~ line 34 ~ getStoreApi ~ response',
						response
					);

					if (callback) callback(response);
				}
			})
			.catch(error => {
				console.log(
					'🚀 ~ file: apis.js ~ line 43 ~ getStoreApi ~ error',
					error
				);

				if (callback) callback(error.response);
			});
	};
};

export const getHomeApi = () => {
	return (data, callback) => {
		const { uId, store_id, pinCode } = data;
		MAINAPI('POST', `capi/p_home_data.php`, {
			uid: uId,
			storeId: store_id,
			pincode: pinCode,
		})
			.then(response => {
				if (response) {
					console.log(
						'🚀 ~ file: apis.js ~ line 34 ~ getHomeApi ~ response',
						response
					);

					if (callback) callback(response);
				}
			})
			.catch(error => {
				console.log(
					'🚀 ~ file: apis.js ~ line 43 ~ getHomeApi ~ error',
					error
				);

				if (callback) callback(error.response);
			});
	};
};
