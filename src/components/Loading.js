import React from 'react';
import { showLoadingModalAtom } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';

function Loading({ showModal }) {
	const loading = useRecoilValue(showLoadingModalAtom);

	return loading ? (
		<div
			className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center"
			style={{
				zIndex: 100000000000000,
				background: 'rgba(0,0,0,0.4)',
			}}
		>
			<div className="w-60 bg-white h-14 flex justify-center items-center">
				Loading...
			</div>
		</div>
	) : null;
}

export default Loading;
