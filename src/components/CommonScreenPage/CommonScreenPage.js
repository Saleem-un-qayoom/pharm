import './CommonScreenPage.scss';

import { CartAtom } from '../../Recoil/atom';
import React from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';

function CommonScreenPage({
	headingTitle,
	contentBg,
	children,
	showLoading = false,
	showDeleteModal = false,
	onDeleteModalClick,
	showCart = false,
}) {
	const navigate = useNavigate();
	const cart = useRecoilValue(CartAtom);
	const cartItems = [...cart];

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
				{showCart && (
					<div
						className="relative ml-auto"
						onClick={() => navigate('/cart-page')}
					>
						<img
							className="h-7"
							src="/assets/icons/shopping-cart.svg"
							alt=""
						/>
						<span
							style={{
								top: -2,
								right: -5,
							}}
							className="absolute  w-5 h-5 bg-gray-800 rounded-full text-white text-sm flex justify-center items-center"
						>
							{cartItems.length}
						</span>
					</div>
				)}
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
			{showDeleteModal && (
				<div
					className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center"
					//   onClick={() => onDeleteModalClick(false)}
				>
					<div className="w-80  bg-white rounded-md px-1 ion-padding">
						<div className="flex items-center">
							<img
								className="w-11 pr-3"
								src="/assets/icons/delete.png"
								alt=""
							/>
							<span className="text-base">Delete</span>
						</div>
						<span className="text-sm pt-2 inline-block">
							Are You Sure You Want to Delete?
						</span>
						<div className="flex justify-end text-sm pt-10">
							<span
								className="pr-4"
								onClick={() =>
									onDeleteModalClick(false)
								}
							>
								Cancel
							</span>
							<span
								onClick={() => onDeleteModalClick(true)}
							>
								Delete
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CommonScreenPage;
