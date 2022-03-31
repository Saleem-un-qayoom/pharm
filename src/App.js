import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import { pinCodeData, storeDataAtom, toastAtom } from './Recoil/atom';

import AboutPage from './View/MainPage/ProfilePage/AboutPage/AboutPage';
import CatResult from './components/CatResult/CatResult';
import CategoryScreen from './View/Screens/CategoryScreen/CategoryScreen';
import ContactPage from './View/MainPage/ProfilePage/ContactPage/ContactPage';
import EditProfile from './View/MainPage/ProfilePage/EditProfile/EditProfile';
import ExploreNewPage from './View/MainPage/ExploreNewPage/ExploreNewPage';
import HomeScreen from './View/Screens/HomeScreen/HomeScreen';
import Login from './View/Pages/LoginPage/LoginPage';
import ManageAddresses from './View/MainPage/ProfilePage/ManageAddresses/ManageAddresses';
import MyOrder from './View/MainPage/ProfilePage/MyOrder/MyOrder';
import NotificationScreen from './View/Screens/NotificationScreen/NotificationScreen';
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
import { ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

function App() {
	const pinCodeRecoil = useRecoilValue(pinCodeData);
	const storeRecoil = useRecoilValue(storeDataAtom);
	const [popUpModal, setPopUpModal] = useState(false);

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
				</Routes>
				{toast && <Toast />}
			</Router>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
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
