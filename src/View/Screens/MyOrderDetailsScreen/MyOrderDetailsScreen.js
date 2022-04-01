import React, { useEffect, useState } from 'react';
import { navigate, useParams } from 'react-router';
import { storeDataAtom, userDataAtom } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import { getMyOrderDetailsApi } from '../../../Services/apis';
import trackOrderPopup from './trackOrderPopup';
import { useNavigate } from 'react-router';

function MyOrderDetailsScreen() {
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	const getMyOrderDetailsApiFunc = getMyOrderDetailsApi();
	const userData = useRecoilValue(userDataAtom);
	// const [storerecoil, setStoreRecoil] = useState(storeDataAtom);
	const [myOrderDetails, setMyOrderDetails] = useState([]);

	useEffect(() => {
		const data = {
			uid: userData.id,
			order_id: id,
		};
		getMyOrderDetailsApiFunc(data, handleResponse);
	}, []);

	const handleResponse = response => {
		console.log('first', response);
		// if (response.ResponseCode === "200") {
		setMyOrderDetails(response.OrderHistory);
		// }
	};

	// useEffect(() => {
	//   const data = {
	//     uid: userData.id,
	//     order_id: id,
	//   };
	//   getMyOrderDetailsApiFunc(data, handleResponse);
	// }, []);

	// const handleResponse = (response) => {
	//   if (response === "200") {
	//     setMyOrderDetails(response.OrderHistory.store);
	//   }
	// };

	let navigate = useNavigate();
	return (
		<>
			<CommonScreenPage
				headingTitle={'Order Details'}
				contentBg={'bg-gray-100'}
				showLoading={false}
			>
				{/* {myOrderDetails.map((item, key) => ( */}
				<div className="flex flex-col ">
					<div>
						<div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
							<div className="flex justify-between text-xs font-bold">
								Order ID :
								<span>
									{myOrderDetails.order.order_id}
								</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Order ID :<span>ABC00011010</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Order ID :<span>ABC00011010</span>
							</div>
						</div>

						<div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
							<div className="flex justify-between text-xs font-bold">
								Payment Method :<span>ABC00011010</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Qty :<span>ABC00011010</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Price :<span>ABC00011010</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Delivery Charge :
								<span>ABC00011010</span>
							</div>
							<div className="flex justify-between text-xs font-bold mt-2">
								Paid Amount :<span>ABC00011010</span>
							</div>
						</div>

						<div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
							<div className="flex flex-col text-xs font-bold">
								Delivery Address :
								<span className="mt-2">
									Zahudcfsdcudgcudshckudshcku
								</span>
							</div>
						</div>
					</div>
					<div className=""></div>
					<div className="mt-64	 flex justify-between ion-padding	">
						<button className="text-xs font-bold px-12 py-1 rounded background-primary">
							Track Order
						</button>
						<button className=" text-xs font-bold px-12 py-1 rounded background-primary">
							Item
						</button>
					</div>
				</div>
				{/* ))} */}
			</CommonScreenPage>
		</>
	);
}

export default MyOrderDetailsScreen;
