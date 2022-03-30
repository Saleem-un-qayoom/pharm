import {
  pinCodeData,
  showLoadingModalAtom,
  toastAtom,
} from "../../../Recoil/atom";
import { useEffect, useState } from "react";

import Loading from "../../../components/Loading";
import ShowToast from "../../../functions/showToast";
import { getPinCodeApi } from "../../../Services/apis";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";

function PinCodePage() {
  let navigate = useNavigate();
  const [showPinCodeError, setShowPinCodeError] = useState(false);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [pinCode, setPinCode] = useState("");

  const [showLoadingModal, setShowLoadingModal] =
    useRecoilState(showLoadingModalAtom);

  const [toast, setToast] = useRecoilState(toastAtom);

  const getPinCodeApiFunc = getPinCodeApi();

  useEffect(() => {
    const pinCode = localStorage.getItem("pharm-box-pin-code");
    if (pinCode) {
      navigate("/");
    } else {
      setShowLoadingModal(true);
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        console.log("currentLocation", currentLocation);
        setShowLoadingModal(false);
      });
      // eslint-disable-next-line
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pinCode) {
      setShowPinCodeError(true);
    } else {
      setShowLoadingModal(true);
      getPinCodeApiFunc(handleResponse);
    }
  };

  const handleResponse = (res) => {
    setShowLoadingModal(false);
    if (res && res.ResponseCode === "200") {
      for (let i = 0; i < res.PincodeData.length; i++) {
        if (res.PincodeData[i].pincode === pinCode) {
          setPinCodeRecoil(res.PincodeData[i]);
          navigate("/store-page");
          return;
        }
      }
    }
    ShowToast("We dont deliver at your address yet?", setToast);
  };

  return (
    <div className="bg-white">
      <Loading />
      <div className="header ion-padding  rounded-b-xl background-primary font-semibold tracking-wider">
        <span>Address</span>
      </div>
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
    </div>
  );
}

export default PinCodePage;
