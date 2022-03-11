import { atom } from 'recoil';

export const pinCodeData = atom({
	key: 'pinCodeData',
	default: JSON.parse(localStorage.getItem('pharm-box-pin-code')) || '',
});

export const userData = atom({
	key: 'userData',
	default: JSON.parse(localStorage.getItem('pharm-box-user')) || '',
});
