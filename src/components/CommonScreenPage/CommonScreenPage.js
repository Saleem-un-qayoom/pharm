import './CommonScreenPage.scss';

import React from 'react';
import { useNavigate } from 'react-router';

function CommonScreenPage({
	headingTitle,
	contentBg,
	children,
	showLoading = false,
}) {
	const navigate = useNavigate();
	return (
		<div className={`h-screen ${contentBg ? contentBg : 'bg-white'}`}>
			<div className="common-screen-page-header background-primary height-8 flex items-center ion-padding-x">
				<img
					onClick={() => navigate(-1)}
					src="/assets/icons/back.png"
					alt=""
					className="h-5"
				/>
				<p className="font-bold ml-2.5 capitalize">
					{headingTitle}
				</p>
			</div>
			<div className="common-screen-page-content height-92 scrollable-element ">
				{children}
			</div>
			{showLoading && (
				<div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
					<div className="w-56 h-14 bg-white rounded-md flex items-center px-1">
						<img
							className="w-11 inline-block"
							src="/assets/icons/spinner-animated.svg"
							alt=""
						/>
						Loading...
					</div>
				</div>
			)}
		</div>
	);
}

export default CommonScreenPage;
