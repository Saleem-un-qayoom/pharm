import React, { useEffect, useState } from 'react';
import { addressesAtom, userDataAtom } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import config from '../../../Services/config';
import { getMyDeliveryAddressApi } from '../../../Services/apis';
import { useNavigate } from 'react-router';

function ManageAddressScreen() {
	let navigate = useNavigate();

	const getMyDeliveryAddressApiFunc = getMyDeliveryAddressApi();

	const userData = useRecoilValue(userDataAtom);

	const [loading, setLoading] = useState(true);
	const [deliveryAddress, setDeliveryAddress] = useState([]);
	const [selectedDeliveryAddress, setSelectedDeliveryAddress] =
		useRecoilState(addressesAtom);

	useEffect(() => {
		const data = {
			uid: userData.id,
		};
		getMyDeliveryAddressApiFunc(data, handleResponse);
	}, []);

	const handleResponse = response => {
		setLoading(false);
		if (response.ResponseCode === '200') {
			setDeliveryAddress(response.AddressList);
		}
	};

	return (
		<CommonScreenPage
			headingTitle={'Address'}
			// contentBg={'bg-gray-100'}
			showLoading={loading}
			contentBg={'#fff'}
		>
			<div className="ion-padding-x mt-1.5">
				<form>
					<div className="form-group">
						<label className="font12 font-w-600" htmlFor="">
							Select pincode to see product availability
						</label>
						<div className="flex">
							<input
								type="text"
								className="rounded-lg py-0.5 px-2.5 grow border border-slate-400"
								placeholder="Enter Pincode"
							/>
							<button className="px-7 py-2 ml-2.5 font-semibold rounded-lg background-primary text-black">
								Check
							</button>
						</div>
					</div>
				</form>
			</div>
			<div
				className="mt-5 mb-3 ion-padding-x flex items-center"
				onClick={() => {
					navigate('/edit-address');
				}}
			>
				<img
					src="/assets/icons/pin.png"
					className="w-6 mr-2"
					alt=""
				/>
				<div className="flex flex-col">
					<span className="text-sm leading-5 font-medium">
						Current Location
					</span>
					<span className="text-sm leading-none font-medium text-gray-600">
						Using GPS
					</span>
				</div>
			</div>
			<hr />
			<div className="ion-padding-x mt-1.5 mb-2 font-extrabold">
				<span>Delivery Address</span>
			</div>
			{deliveryAddress.map(item => (
				<div className=" mx-2 my-1 px-1  border-2 border-primary py-3 rounded-md	 ">
					<div className="flex">
						<div className="w-1/5">
							<img
								className="w-full"
								src={`${config.baseUrl}/${item.address_image}`}
								alt=""
							/>
						</div>
						<div className="w-4/5">
							<div className="flex flex-col text-xs font-bold">
								{item.type}
								<span>{item.landmark}</span>
								<span>{item.address}</span>
							</div>
						</div>
					</div>
					<div className="flex justify-around mt-3">
						<button
							className="border-2 py-1.5 px-4 text-xs font-semibold border-slate-300 rounded-md	"
							onClick={() => {
								setSelectedDeliveryAddress(item);
								navigate('/profile-page');
							}}
						>
							SELECT
						</button>
						<button
							className="border-2 py-1.5 px-4 text-xs font-semibold  border-slate-300 rounded-md	"
							onClick={() => {
								setSelectedDeliveryAddress(item);
								navigate('/edit-address');
							}}
						>
							EDIT
						</button>
					</div>
				</div>
			))}
		</CommonScreenPage>
	);
}

export default ManageAddressScreen;
