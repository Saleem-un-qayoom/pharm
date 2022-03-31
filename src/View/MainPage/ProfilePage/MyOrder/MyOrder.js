import CommonScreenPage from '../../../../components/CommonScreenPage/CommonScreenPage';
import React from 'react';
import { useState } from 'react';

function MyOrder() {
	const [loading, setLoading] = useState(true);

	return (
		<CommonScreenPage
			headingTitle={'My Orders'}
			contentBg={'bg-gray-100'}
			showLoading={false}
		>
			<div className="bg-white mx-1 my-1 px-1 py-1 rounded-sm flex">
				<div className="w-14">
					<img src="/assets/icons/spinner-animated.svg" alt="" />
				</div>
				<div className="grow">
					<div className="flex justify-between">
						<div className="text-xs font-bold">
							Order Id &nbsp;: &nbsp;
							<span className="text-blue-400">
								PB123456768
							</span>
						</div>
						<div className="text-xs font-bold">Rs 207</div>
					</div>
					<div className="text-xs font-bold text-yellow-500 mt-1.5">
						Cancelled
					</div>
					<div className="text-xs font-bold mt-1.5">
						2202.22,22
					</div>
					<div className=" flex justify-end mt-1.5">
						<button className=" text-xs font-bold px-12 py-1 rounded background-primary">
							info
						</button>
					</div>
				</div>
			</div>
		</CommonScreenPage>
	);
}

export default MyOrder;
