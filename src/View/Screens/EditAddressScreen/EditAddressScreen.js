import GoogleMapReact from "google-map-react";
import React from "react";
import { addressesAtom } from "../../../Recoil/atom";
import config from "../../../Services/config";
import { useRecoilValue } from "recoil";
import { useState } from "react";

function EditAddressScreen() {
  const myDeliveryAddress = useRecoilValue(addressesAtom);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  return (
    <div className="-100 h-screen">
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
        <div className="form-group w-full mr-3 border overflow-hidden rounded-xl px-2 py-2 flex flex-col">
          <label className="text-xs font-medium text-gray-600">
            House No/Flat/Block Number
          </label>
          <input
            type="text"
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            className="border-0"
          />
        </div>
        <div className="form-group w-full mr-3 border overflow-hidden rounded-xl px-2 py-2 flex flex-col mt-2">
          <label className="font-medium text-xs text-gray-600">Landmark</label>
          <input
            type="text"
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            className="border-0"
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

export default EditAddressScreen;
