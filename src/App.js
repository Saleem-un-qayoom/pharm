import './App.scss';

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import { pinCodeData, storeData, toastAtom } from './Recoil/atom';

import AboutPage from './View/MainPage/ProfilePage/AboutPage/AboutPage';
import CatResult from './components/CatResult/CatResult';
import CategoryPage from './View/MainPage/CategoryPage/CategoryPage';
import ContactPage from './View/MainPage/ProfilePage/ContactPage/ContactPage';
import EditProfile from './View/MainPage/ProfilePage/EditProfile/EditProfile';
import ExploreNewPage from './View/MainPage/ExploreNewPage/ExploreNewPage';
import Home from './View/MainPage/Home/Home';
import Login from './View/Pages/LoginPage/LoginPage';
import ManageAddresses from './View/MainPage/ProfilePage/ManageAddresses/ManageAddresses';
import MyOrder from './View/MainPage/ProfilePage/MyOrder/MyOrder';
import Notification from './View/MainPage/Notification/Notification';
import OrderCart from './View/MainPage/Cart/OrderCart';
import OtpPage from './View/Pages/OtpPage/OtpPage';
import PinCodePage from './View/Pages/PinCodePage/PinCodePage';
import PrescriptionPopUp from './components/PrecriptionPopUp/PrescriptionPopUp';
import PrivacyPolicy from './View/MainPage/ProfilePage/PrivacyPolicy/PrivacyPolicy';
import ProductDescription from './View/MainPage/ProductDescription/ProductDescription';
import ProfilePage from './View/MainPage/ProfilePage/ProfilePage';
import StarterPage from './View/Pages/StarterPage/StarterPage';
import StorePage from './View/MainPage/StorePage/StorePage';
import SubmitPrescription from './components/SubmitPrescription/SubmitPrescription';
import TermsandConditions from './View/MainPage/ProfilePage/TermsandConditions/TermsandConditions';
import Toast from './components/Toast';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

// import { useNavigate } from 'react-router';

function App() {
	const pinCodeRecoil = useRecoilValue(pinCodeData);
	const storeRecoil = useRecoilValue(storeData);
	const [popUpModal, setPopUpModal] = useState(false);
	// const navigate = useNavigate();

	const toast = useRecoilValue(toastAtom);

	const popUpToggle = () => {
		setPopUpModal(!popUpModal);
	};
	return (
		<>
			<Router>
				<Routes>
					<Route element={<Toast />} />
					<Route
						exact
						path="/starter-page"
						element={<StarterPage />}
					/>
					<Route
						exact
						path="/pin-code"
						element={<PinCodePage />}
					/>
					<Route
						exact
						path="/home"
						element={
							pinCodeRecoil && storeRecoil ? (
								<Home />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/categories-page"
						element={
							pinCodeRecoil && storeRecoil ? (
								<CategoryPage />
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
								<Notification />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>

					<Route
						path="/otp-page"
						element={
							pinCodeRecoil ? (
								<OtpPage />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>

					<Route
						path="/cart-page"
						element={
							pinCodeRecoil ? (
								<OrderCart />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/profile-page"
						element={
							pinCodeRecoil ? (
								<ProfilePage />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/my-order"
						element={
							pinCodeRecoil ? (
								<MyOrder />
							) : (
								<Navigate to="/starter-page" />
							)
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
							pinCodeRecoil ? (
								<AboutPage />
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
								<ContactPage />
							) : (
								<Navigate to="/starter-page" />
							)
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
							pinCodeRecoil ? (
								<EditProfile />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/login-page"
						element={
							pinCodeRecoil ? (
								<Login />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/store-page"
						element={
							pinCodeRecoil ? (
								<StorePage />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/product-description"
						element={
							pinCodeRecoil ? (
								<ProductDescription />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/explore-new-page"
						element={
							pinCodeRecoil ? (
								<ExploreNewPage />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						exact
						path="*"
						element={<Navigate to="/home" />}
					/>
					{/* {popUpModal && (
						<PrescriptionPopUp
							setPopUpModal={setPopUpModal}
							navigate={navigate}
						/>
					)} */}
				</Routes>
				{toast && <Toast />}
			</Router>
		</>
	);
}

export default App;
