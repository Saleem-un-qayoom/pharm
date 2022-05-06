import { useRecoilState, useRecoilValue } from 'recoil';

import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import { PrivacyPolicyData } from '../../../Recoil/atom';
import React from 'react';

function PrivacyPolicy() {
	const privacyPolicyRecoil = useRecoilValue(PrivacyPolicyData);

	return (
		<>
			<CommonScreenPage headingTitle={'Privacy Policy'}>
				<div
					className="ion-padding font11 font-w-700"
					dangerouslySetInnerHTML={{
						__html: privacyPolicyRecoil,
					}}
				/>
			</CommonScreenPage>
		</>
	);
}

export default PrivacyPolicy;
