import React, { useEffect, useState } from 'react';

import { getStoreApi } from '../../../Services/apis';
import { pinCodeData } from '../../../Recoil/atom';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';

function StorePage() {
	let navigate = useNavigate();

	const pinCodeRecoil = useRecoilValue(pinCodeData);

	const [stores, setStores] = useState([]);

	const getStoreApiFunc = getStoreApi();

	const store = [
		{
			storeName: 'PharmBox Store',
			storeItems: '989 items',
			rating: '',
			storeImage:
				'https://img.icons8.com/fluency/48/000000/whatsapp.png',
		},
	];

	useEffect(() => {
		const data = {
			// uId: 2 || pinCodeRecoil.id,
			uId: 2,
			pinCode: pinCodeRecoil.id,
		};
		getStoreApiFunc(data, handleResponse);
	});

	const handleResponse = res => {};

	return (
		<div className="  font-semibold  background-tertiary h-screen">
			<div className="flex justify-between background-primary h-20 ion-padding">
				<div className="flex flex-row">
					<img
						onClick={() => navigate(-1)}
						src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
						style={{
							height: '25px',
							width: '20px',
							marginRight: '10px',
						}}
					/>
					<span>Store</span>
				</div>
				<div>
					<span onClick={() => navigate('/manage-addresses')}>
						Deliver to
					</span>
				</div>
			</div>
			<div className="ion-padding">
				<div className="w-full  " style={{ marginTop: '-38px' }}>
					<input
						type="text"
						className="w-full py-2.5 px-5 pl-7 rounded-full input-border-none"
						placeholder="Search items.."
					/>
				</div>
				<div className="bg-white flex mt-10 py-5 rounded-xl pr-5 relative">
					<span
						className="absolute background-primary font13 rounded-full font-w-500 py-px px-6 left-0.5"
						style={{ top: '-11px' }}
					>
						Open
					</span>
					{store.map(item => (
						<>
							<img
								src={item.storeImage}
								className="pl-2"
							/>
							<ul className="pl-4">
								<li className="font-w-900 text-xl">
									{item.storeName}
								</li>
								<li className="text-slate-400 font15 font-w-500">
									{item.storeItems}
								</li>
							</ul>
						</>
					))}
				</div>
			</div>
		</div>
	);
}

export default StorePage;
