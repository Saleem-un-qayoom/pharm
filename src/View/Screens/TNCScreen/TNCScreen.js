import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import React from 'react';
import { tncAtom } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';

function TermsandConditions() {
	const termsAndConditionRecoil = useRecoilValue(tncAtom);

	return (
		<>
			<CommonScreenPage headingTitle={'Terms and Conditions'}>
				<div
					className="ion-padding font11 font-w-700"
					dangerouslySetInnerHTML={{
						__html: termsAndConditionRecoil,
					}}
				/>
			</CommonScreenPage>
		</>
	);
}

export default TermsandConditions;
