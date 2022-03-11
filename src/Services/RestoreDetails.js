import { pinCodeData, userData } from '../Recoil/atom';

import { useRecoilState } from 'recoil';

const RestoreDetails = () => {
	const [pinCodeState, setPinCodeState] = useRecoilState(pinCodeData);
	const [userState, setUserState] = useRecoilState(userData);

	const pinCodeLocal = JSON.parse(
		localStorage.getItem('pharm-box-pin-code')
	);

	if (pinCodeLocal) {
		setPinCodeState(pinCodeLocal);
	}
	const userLocal = JSON.parse(localStorage.getItem('@pharm-box-user'));
	if (userLocal) {
		setUserState(userLocal);
	}
};

export default RestoreDetails;
