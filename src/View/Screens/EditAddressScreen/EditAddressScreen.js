import React, { useEffect } from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import { addressesAtom } from '../../../Recoil/atom';
import commonService from '../../../Services/commonService';
import config from '../../../Services/config';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

function EditAddressScreen({ google }) {
	const selectedDeliveryAddress = useRecoilValue(addressesAtom);

	const navigate = useNavigate();

	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();

	const [address, setAddress] = useState('');
	const [plusCode, setPlusCode] = useState('');
	const [landMark, setLandMark] = useState('');
	const [houseNo, setHouseNo] = useState('');
	const [addressType, setAddressType] = useState('');

	useEffect(() => {
		if (!selectedDeliveryAddress) navigate(-1);
		else {
			setLatitude(parseFloat(selectedDeliveryAddress.lat_map));
			setLongitude(parseFloat(selectedDeliveryAddress.long_map));
			setAddress(selectedDeliveryAddress.address);
			setLandMark(selectedDeliveryAddress.landmark);
			setHouseNo(selectedDeliveryAddress.hno);
			setAddressType(selectedDeliveryAddress.type);
		}
	}, []);

	const handleMapChange = e => {
		var latlng = new google.maps.LatLng(e.lat, e.lng);

		// This is making the Geocode request
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ latLng: latlng }, (results, status) => {
			if (status !== google.maps.GeocoderStatus.OK) {
				alert(status);
			}
			// This is checking to see if the Geoeode Status is OK before proceeding
			if (status === google.maps.GeocoderStatus.OK) {
				// EXTRACTING PIN CODE
				console.log(
					'🚀 ~ file: EditAddressScreen.js ~ line 44 ~ geocoder.geocode ~ results[0]',
					results
				);

				const { properAddress, plusCode } =
					commonService.getProperAddress(
						results[0].address_components
					);
				setPlusCode(plusCode);
				setAddress(properAddress);
				setLatitude(e.lat);
				setLongitude(e.lng);
			}
		});
	};

	const AnyReactComponent = ({ text }) => (
		<div className="w-72 text-center -translate-x-1/2 absolute bottom-0 flex flex-col items-center">
			<p className="px-3 py-3 bg-white text-xs">{text}</p>
			<img className="w-6 mt-1" src="/assets/icons/pin.svg" alt="" />
		</div>
	);

	return (
		<div className="-100 h-screen">
			<div className="h-1/2 relative">
				<GoogleMapReact
					bootstrapURLKeys={{ key: config.MAP_API_KEY }}
					center={{
						lat: latitude ? latitude : 0.0,
						lng: longitude ? longitude : 0.0,
					}}
					onClick={handleMapChange}
					defaultZoom={16}
				>
					<AnyReactComponent
						lat={latitude ? latitude : 0.0}
						lng={longitude ? longitude : 0.0}
						text={address && address}
					/>
				</GoogleMapReact>
			</div>
			<div className="ion-padding-x mt-2 flex flex-col	">
				<span className="text-lg font-semibold		">{address}</span>
				<span className="text-xs font-medium text-slate-400	mt-1 mb-1">
					{plusCode}
				</span>
				<div className="form-group w-full mr-3 border overflow-hidden rounded-xl px-2 py-2 flex flex-col">
					<label className="text-xs font-medium text-gray-600">
						House No/Flat/Block Number
					</label>
					<input
						type="text"
						className="border-0"
						value={houseNo}
						onChange={({ target }) =>
							setHouseNo(target.value)
						}
					/>
				</div>
				<div className="form-group w-full mr-3 border overflow-hidden rounded-xl px-2 py-2 flex flex-col mt-2">
					<label className="font-medium text-xs text-gray-600">
						Landmark
					</label>
					<input
						type="text"
						className="border-0"
						value={landMark}
						onChange={({ target }) =>
							setLandMark(target.value)
						}
					/>
				</div>
			</div>
			<div className="ion-padding-x mt-2">
				<span className="text-sm font-semibold">Save As</span>
				<div className="ion-padding flex justify-between ">
					<button className="border py-1 px-6 border-grey rounded-md hover:bg-blue-400 hover:border-none">
						Home
					</button>
					<button className="border py-1 px-6 border-grey rounded-md hover:bg-blue-400 hover:border-none">
						Office
					</button>
					<button className="border py-1 px-6 border-grey rounded-md hover:bg-blue-400 hover:border-none">
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

export default GoogleApiWrapper({
	apiKey: config.MAP_API_KEY,
})(EditAddressScreen);
