import GoogleMapReact from 'google-map-react';
import React from 'react';
import { addressesAtom } from '../../../Recoil/atom';
import config from '../../../Services/config';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function EditAddressScreen() {
	const [myDeliveryAddress, setMyDeliveryAddress] =
		useRecoilState(addressesAtom);

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	navigator.geolocation.getCurrentPosition(position => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	});

	return (
		<div className="bg-slate-100 h-screen">
			<div className="h-1/2">
				<GoogleMapReact
					bootstrapURLKeys={{ key: config.MAP_API_KEY }}
					defaultCenter={{
						lat: latitude && latitude,
						lng: longitude && longitude,
					}}
					defaultZoom={15}
				></GoogleMapReact>
			</div>
			<div className="ion-padding-x mt-2 flex flex-col	">
				<span className="text-lg font-semibold		">
					{myDeliveryAddress &&
						myDeliveryAddress.AddressList &&
						myDeliveryAddress.AddressList.address}
				</span>
				<span className="text-xs font-medium text-slate-400	mt-1 mb-1">
					Unnamed Road, Gulbahar colony, Hyderpora
				</span>
				<input
					type="text"
					placeholder="House No/Flat/Block Number"
					className="py-4 px-1.5 rounded-lg bg-slate-100"
				/>
				<input
					type="text"
					placeholder="Landmark"
					className="py-4 px-1.5 rounded-lg mt-2 bg-slate-100 "
				/>
			</div>
			<div className="ion-padding-x mt-2">
				<span className="text-sm font-semibold">Save As</span>
				<div className="ion-padding flex justify-between ">
					<button className="border-2 py-1 px-6 border-yellow-300	rounded-md hover:bg-indigo-300 hover:border-none">
						Home
					</button>
					<button className="border-2 py-1 px-6 border-yellow-300	rounded-md hover:bg-indigo-300 hover:border-none">
						Office
					</button>
					<button className="border-2 py-1 px-6 border-yellow-300	rounded-md hover:bg-indigo-300 hover:border-none">
						Other
					</button>
				</div>
				<div className="flex justify-center items-center">
					<button className="px-24 py-2 background-primary font-semibold rounded-lg">
						Continue
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditAddressScreen;
