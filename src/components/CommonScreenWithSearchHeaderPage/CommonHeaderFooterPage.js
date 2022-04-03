import './CommonHeaderFooterPage.scss';

import {
	CartAtom,
	prescriptionImageAtom,
	storeDataAtom,
	userDataAtom,
} from '../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const prescriptionIcon = '/assets/icons/prescription.png';
const notificationIcon = '/assets/icons/notification.png';
const categoryIcon = '/assets/icons/category.png';
const homeIcon = '/assets/icons/home.png';
const userIcon = '/assets/icons/user.png';

function CommonHeaderFooterPage({ children, showLoading = false }) {
	let navigate = useNavigate();

	const storeData = useRecoilValue(storeDataAtom);
	const cart = useRecoilValue(CartAtom);
	const userData = useRecoilValue(userDataAtom);
	const cartItems = [...cart];
	const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);
	const [prescriptionImage, setPrescriptionImage] = useRecoilState(
		prescriptionImageAtom
	);

	const onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			setPrescriptionImage(URL.createObjectURL(event.target.files[0]));
			// setPrescriptionImage(event.target.files[0]);
			navigate('/submit-prescription');
		}
	};

	const prescriptionPopUpToggle = () => {
		prescriptionClick();
	};

	const homeClick = () => {
		navigate('/home');
	};

	const categoryClick = () => {
		navigate('/categories-page');
	};

	const prescriptionClick = () => {
		userData
			? setShowPrescriptionPopup(!showPrescriptionPopup)
			: navigate('/login-page');
	};

	const userClick = () => {
		userData ? navigate('/profile-page') : navigate('/login-page');
	};

	const notificationClick = () => {
		userData ? navigate('/notification-page') : navigate('/login-page');
	};

	const footerItems = [
		{ label: 'Home', icon: homeIcon, onClick: homeClick },
		{
			label: 'Prescription',
			icon: prescriptionIcon,
			onClick: prescriptionClick,
		},
		{ label: 'Category', icon: categoryIcon, onClick: categoryClick },
		{
			label: 'Notification',
			icon: notificationIcon,
			onClick: notificationClick,
		},
		{ label: 'User', icon: userIcon, onClick: userClick },
	];

	return (
		<div className="h-screen">
			<div className="common-search-box-header height-15 ion-padding-x pt-2 background-primary">
				<div className="flex justify-between items-center">
					<div className="">
						<div
							className="flex items-center"
							onClick={() => {
								navigate('/store-page');
							}}
						>
							<img
								className="h-3.5 mr-1"
								src="/assets/icons/pin.png"
								alt=""
							/>
							<span className="text-base font-medium">
								Change Store
							</span>
						</div>
						<div
							className="text-sm font-medium"
							onClick={() => {
								navigate('/store-page');
							}}
						>
							Welcome to{' '}
							<span className="text-color-secondary">
								{storeData.title}
							</span>
						</div>
					</div>
					<div
						className="relative"
						onClick={() => navigate('/cart-page')}
					>
						<img
							className="h-8"
							src="/assets/icons/cart.png"
							alt=""
						/>
						<span className="absolute top-0 right-0  w-5 h-5 bg-gray-800 rounded-full text-white text-sm flex justify-center items-center">
							{cartItems.length}
						</span>
					</div>
				</div>
				<div className="bg-white mt-2 rounded-full flex overflow-hidden">
					<img
						className="h-full pt-1 pb-1 pl-2"
						src="/assets/icons/search.png"
						alt=""
					/>
					<input
						className="grow py-1 border-0 pl-2"
						placeholder="Search Item..."
						type="text"
					/>
				</div>
			</div>
			<div className="height-77 scrollable-element">{children}</div>
			<div className="common-footer bg-white height-8 flex justify-between items-center ion-padding-x">
				{footerItems.map((item, key) => (
					<div
						key={key}
						className="flex flex-col items-center"
						onClick={item.onClick}
					>
						<img src={item.icon} className="w-7" alt="" />
						<span className="text-sm">{item.label}</span>
					</div>
				))}
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
			{showPrescriptionPopup && (
				<div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
					<div className="relative  py-12 w-19 bg-white">
						<div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
							<p className="text-xs font-w-500">
								Choose Prescription Image
							</p>
						</div>
						<div className="flex flex-col mx-20 ">
							<label
								for="cameraFileInput"
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
							>
								<span class="btn">Open camera</span>

								<input
									id="cameraFileInput"
									type="file"
									accept="image/*"
									capture="environment"
									onChange={onImageChange}
								/>
							</label>
							<label
								for="cameraFileInput"
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
							>
								<span class="btn">
									Choose From Gallary
								</span>

								<input
									id="cameraFileInput"
									type="file"
									accept="image/*"
									onChange={onImageChange}
								/>
							</label>
							<span
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
								onClick={() =>
									setShowPrescriptionPopup(false)
								}
							>
								Cancel
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CommonHeaderFooterPage;
