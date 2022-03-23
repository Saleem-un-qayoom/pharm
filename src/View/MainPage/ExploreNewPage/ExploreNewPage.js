import React, { useEffect, useState } from 'react';
import {
	exploreNewData,
	pinCodeData,
	storeData,
	userDataAtom,
} from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CustomDropDown from '../../../components/CustomDropDown/CustomDropDown';
import ExploreNew from '../../../components/ExploreNew/ExploreNew';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import config from '../../../Services/config';
import { getExploreNewApi } from '../../../Services/apis';

// import Select from "react-select";


function ExploreNewPage() {
	const [exploreNew, setExploreNew] = useState([]);
	const userRecoil = useRecoilValue(userDataAtom);
	const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
	const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);

	const [exploreNewRecoil, setExploreNewRecoil] = useState(exploreNewData);

	const getExploreNewApiFunc = getExploreNewApi();

	useEffect(() => {
		const data = {
			uID: userRecoil.id || '0',
			storeId: storeRecoil.id,
			pinCode: pinCodeRecoil.id,
		};
		getExploreNewApiFunc(data, handleResponse);
	}, []);

	const handleResponse = res => {
		if (res && res.ResponseCode === '200') {
			setExploreNew(res.BrandProductList);
		}
	};

	return (
		<>
			<Header />
			<HeaderFooterWrapper className="bg-slate-200 ion-padding-x py-6">
				{exploreNew.map(item => (
					<div className="flex bg-white mb-3 h-24 relative">
						<div
							className="p-2 flex justify-center items-center h-full"
							style={{
								width: '120px',
							}}
						>
							<div>
								<span className="inline-block leading-3	text-xs px-3 py-2 background-primary absolute top-0 left-0 rounded-r-full rounded-b-full">
									{
										item.product_info[0]
											.product_discount
									}
									%
									<br />
									OFF
								</span>
							</div>
							<img
								className="inline-block h-full"
								src={
									item.product_image[0]
										? `${config.baseUrl}/${item.product_image[0]}`
										: 'https://img.icons8.com/ios/70/000000/no-camera--v1.png'
								}
							/>
						</div>
						<div className="grow py-2">
							<p>{item.product_name}</p>
							<div>
								<span className="font12 font-semibold pl-2">
									Rs
									{parseFloat(
										item.product_info[0]
											.product_price -
											(item.product_info[0]
												.product_price /
												100) *
												item.product_info[0]
													.product_discount
									).toFixed(2)}
								</span>
								&nbsp;
								<span className="font10 font-semibold line-through text-light-grey">
									Rs
									{parseFloat(
										item.product_info[0]
											.product_price
									).toFixed(2)}
								</span>
							</div>
							{/* <CustomDropDown /> */}
							<div className="absolute background-primary bottom-0 right-0 py-1 px-5">
								<button className="font15 font-w-500">
									Add To Cart
								</button>
							</div>
						</div>
					</div>
				))}
			</HeaderFooterWrapper>
			<Footer popUpToggle={() => {}} />
		</>
	);
}

export default ExploreNewPage;
