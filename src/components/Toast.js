import React from 'react';
import { toastAtom } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';

function Toast() {
	const toast = useRecoilValue(toastAtom);
	return (
		<div
			className=" min-w-fit absolute bottom-24 left-2/4 bg-white border shadow-lg px-10 py-0.5 font12 rounded"
			style={{
				transform: 'translateX(-50%)',
			}}
		>
			{toast}
		</div>
	);
}

export default Toast;
