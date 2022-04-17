import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { pinCodeData, storeDataAtom } from "./Recoil/atom";

import CatResult from "./components/CatResult/CatResult";
import Login from "./View/Pages/LoginPage/LoginPage";
import OtpPage from "./View/Pages/OtpPage/OtpPage";
import PinCodePage from "./View/Pages/PinCodePage/PinCodePage";
import StarterPage from "./View/Pages/StarterPage/StarterPage";
import StorePage from "./View/MainPage/StorePage/StorePage";
import SubmitPrescription from "./components/SubmitPrescription/SubmitPrescription";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import {
  AboutScreen,
  ApplyCouponScreen,
  CartScreen,
  CategoryScreen,
  ContactScreen,
  EditAddressScreen,
  EditProfileScreen,
  ExploreNewScreen,
  HomeScreen,
  ManageAddressScreen,
  MyOrderDetailsScreen,
  MyOrdersScreen,
  NotificationScreen,
  PrivacyPolicyScreen,
  ProductDescriptionScreen,
  ProfileScreen,
  SingleItemCartScreen,
  TandCScreen,
} from "./View/Screens";

function App() {
  const pinCodeRecoil = useRecoilValue(pinCodeData);
  const storeRecoil = useRecoilValue(storeDataAtom);
  const [popUpModal, setPopUpModal] = useState(false);

  // const toast = useRecoilValue(toastAtom);

  const popUpToggle = () => {
    setPopUpModal(!popUpModal);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/starter-page" element={<StarterPage />} />
          <Route exact path="/pin-code" element={<PinCodePage />} />
          <Route
            exact
            path="/home"
            element={
              pinCodeRecoil && storeRecoil ? (
                <HomeScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/categories-page"
            element={
              pinCodeRecoil && storeRecoil ? (
                <CategoryScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/cat-result-page/:id"
            element={
              pinCodeRecoil ? (
                <CatResult popUpToggle={popUpToggle} />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/notification-page"
            element={
              pinCodeRecoil ? (
                <NotificationScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/otp-page"
            element={
              pinCodeRecoil ? <OtpPage /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/cart-page"
            element={
              pinCodeRecoil ? <CartScreen /> : <Navigate to="/starter-page" />
            }
          />
          <Route
            path="/cart-page"
            element={
              pinCodeRecoil ? <CartScreen /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/cart-screen/:id"
            element={
              pinCodeRecoil ? (
                <SingleItemCartScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/profile-page"
            element={
              pinCodeRecoil ? (
                <ProfileScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/my-order"
            element={
              pinCodeRecoil ? (
                <MyOrdersScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/order-details/:id"
            element={
              pinCodeRecoil ? (
                <MyOrderDetailsScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/manage-addresses"
            element={
              pinCodeRecoil ? (
                <ManageAddressScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/about-page"
            element={
              pinCodeRecoil ? <AboutScreen /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/apply-coupon"
            element={
              pinCodeRecoil ? (
                <ApplyCouponScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/submit-prescription"
            element={
              pinCodeRecoil ? (
                <SubmitPrescription />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/contact-page"
            element={
              pinCodeRecoil ? (
                <ContactScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/privacy-policy"
            element={
              pinCodeRecoil ? (
                <PrivacyPolicyScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              pinCodeRecoil ? <TandCScreen /> : <Navigate to="/starter-page" />
            }
          />
          <Route
            path="/edit-profile"
            element={
              pinCodeRecoil ? (
                <EditProfileScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/login-page"
            element={
              pinCodeRecoil ? <Login /> : <Navigate to="/starter-page" />
            }
          />
          <Route
            path="/store-page"
            element={
              pinCodeRecoil ? <StorePage /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/edit-address"
            element={
              pinCodeRecoil ? (
                <EditAddressScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/product-description"
            element={
              pinCodeRecoil ? (
                <ProductDescriptionScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/explore-new-page"
            element={
              pinCodeRecoil ? (
                <ExploreNewScreen />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route exact path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
