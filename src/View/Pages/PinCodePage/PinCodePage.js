import { useEffect, useState } from "react";

import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { GoogleApiWrapper } from "google-maps-react";
import config from "../../../Services/config";
import { getPinCodeApi } from "../../../Services/apis";
import { pinCodeData } from "../../../Recoil/atom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
// import GoogleApiWrapper from "./PinCodePage";

function PinCodePage({ google }) {
  let navigate = useNavigate();

  const getPinCodeApiFunc = getPinCodeApi();

  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPinCodeError, setShowPinCodeError] = useState(false);
  const setPinCodeRecoil = useSetRecoilState(pinCodeData);

  useEffect(() => {
    setLoading(true);
    const pinCode = localStorage.getItem("pharm-box-pin-code");
    if (pinCode) {
      navigate("/");
    } else {
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        var latlng = new google.maps.LatLng(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );

        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ latLng: latlng }, (results, status) => {
          if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
          }
          // This is checking to see if the Geoeode Status is OK before proceeding
          if (status == google.maps.GeocoderStatus.OK) {
            // EXTRACTING PIN CODE
            for (let result of results[0].address_components) {
              if (result.types[0] === "postal_code") {
                checkLocation(result.short_name);
                break;
              }
            }
            setLoading(false);
          }
        });
      });
      // eslint-disable-next-line
    }
  }, []);

  const checkLocation = (pinCodeData) => {
    if (pinCodeData) {
      getPinCodeApiFunc(handleResponse);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!pinCode) {
      setShowPinCodeError(true);
    } else {
      getPinCodeApiFunc(handleResponse);
    }
  };

  const handleResponse = (res) => {
    setLoading(false);
    if (res && res.ResponseCode === "200") {
      for (let i = 0; i < res.PincodeData.length; i++) {
        if (res.PincodeData[i].pincode === pinCode) {
          setPinCodeRecoil(res.PincodeData[i]);
          navigate("/store-page");
          return;
        }
      }
    }
    toast("We dont deliver at your address yet?");
  };

  return (
    <CommonScreenPage
      hideBackButton={true}
      headingTitle="Address"
      showLoading={loading}
    >
      <div className="ion-padding-x mt-1.5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="font12 font-w-600" htmlFor="">
              Select pincode to see product availability
            </label>
            <div className="flex">
              <input
                type="text"
                className="rounded-lg py-0.5 px-2.5 grow border border-slate-400"
                value={pinCode}
                onChange={({ target }) => {
                  setPinCode(target.value);
                  setShowPinCodeError(false);
                }}
                placeholder="Enter Pincode"
              />
              <button className="px-7 py-2 ml-2.5 font-semibold rounded-lg background-primary text-black">
                Check
              </button>
            </div>
            {showPinCodeError && (
              <span className="error-message font10 tracking-wider	">
                PinCode is Required
              </span>
            )}
          </div>
        </form>
      </div>
    </CommonScreenPage>
  );
}

export default GoogleApiWrapper({
  apiKey: config.MAP_API_KEY,
})(PinCodePage);
