import { useRecoilState, useRecoilValue } from 'recoil';

import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import React from 'react';
import { aboutAtom } from '../../../Recoil/atom';

function AboutScreen() {
	const aboutRecoil = useRecoilValue(aboutAtom);

	return (
		<>
			<CommonScreenPage headingTitle={'About'}>
				<div
					className="ion-padding font11 font-w-700"
					dangerouslySetInnerHTML={{ __html: aboutRecoil }}
				/>
			</CommonScreenPage>
		</>
	);
}

export default AboutScreen;
