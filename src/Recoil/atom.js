import { atom } from 'recoil';

export const pinCodeData = atom({
	key: 'pinCodeData',
	default: localStorage.getItem('pharm-box-pin-code')
		? JSON.parse(localStorage.getItem('pharm-box-pin-code'))
		: '',
});

export const userData = atom({
	key: 'userData',
	default: localStorage.getItem('pharm-box-user')
		? JSON.parse(localStorage.getItem('pharm-box-user'))
		: '',
});

export const storeData = atom({
	key: 'storeData',
	default: localStorage.getItem('pharm-box-store')
		? JSON.parse(localStorage.getItem('pharm-box-store'))
		: '',
});
