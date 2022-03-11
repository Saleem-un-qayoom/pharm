import "./App.scss";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AboutPage from "./View/MainPage/ProfilePage/AboutPage/AboutPage";
import CategoryPage from "./View/MainPage/CategoryPage/CategoryPage";
import ContactPage from "./View/MainPage/ProfilePage/ContactPage/ContactPage";
import EditProfile from "./View/MainPage/ProfilePage/EditProfile/EditProfile";
import Home from "./View/MainPage/Home/Home";
import Login from "./View/Pages/LoginPage/LoginPage";
import ManageAddresses from "./View/MainPage/ProfilePage/ManageAddresses/ManageAddresses";
import MyOrder from "./View/MainPage/ProfilePage/MyOrder/MyOrder";
import Notification from "./View/MainPage/Notification/Notification";
import OrderCart from "./View/MainPage/Cart/OrderCart";
import PinCodePage from "./View/Pages/PinCodePage/PinCodePage";
import PrescriptionPopUp from "./components/PrecriptionPopUp/PrescriptionPopUp";
import PrivacyPolicy from "./View/MainPage/ProfilePage/PrivacyPolicy/PrivacyPolicy";
import ProfilePage from "./View/MainPage/ProfilePage/ProfilePage";
import StarterPage from "./View/Pages/StarterPage/StarterPage";
import TermsandConditions from "./View/MainPage/ProfilePage/TermsandConditions/TermsandConditions";
import { pinCodeData } from "./Recoil/atom";
import { useRecoilState } from "recoil";
import { useState } from "react";

function App() {
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [popUpModal, setPopUpModal] = useState(false);

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
              pinCodeRecoil ? (
                <Home popUpToggle={popUpToggle} />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />
          <Route
            path="/categories-page"
            element={
              pinCodeRecoil ? (
                <CategoryPage popUpToggle={popUpToggle} />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/notification-page"
            element={
              pinCodeRecoil ? <Notification /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/cart-page"
            element={
              pinCodeRecoil ? <OrderCart /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/profile-page"
            element={
              pinCodeRecoil ? <ProfilePage /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/my-order"
            element={
              pinCodeRecoil ? <MyOrder /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/manage-addresses"
            element={
              pinCodeRecoil ? (
                <ManageAddresses />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/about-page"
            element={
              pinCodeRecoil ? <AboutPage /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/contact-page"
            element={
              pinCodeRecoil ? <ContactPage /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/privacy-policy"
            element={
              pinCodeRecoil ? (
                <PrivacyPolicy />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/terms-and-conditions"
            element={
              pinCodeRecoil ? (
                <TermsandConditions />
              ) : (
                <Navigate to="/starter-page" />
              )
            }
          />

          <Route
            path="/edit-profile"
            element={
              pinCodeRecoil ? <EditProfile /> : <Navigate to="/starter-page" />
            }
          />

          <Route
            path="/login-page"
            element={
              pinCodeRecoil ? <Login /> : <Navigate to="/starter-page" />
            }
          />

          {/* <AuthRoute exact path="/" element={<MainPage />} /> */}
          <Route exact path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      {popUpModal && <PrescriptionPopUp setPopUpModal={setPopUpModal} />}
    </>
  );
}

export default App;
