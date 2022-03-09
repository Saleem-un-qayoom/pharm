import './App.scss';

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import CategoryPage from './View/MainPage/CategoryPage/CategoryPage';
import Home from './View/MainPage/Home/Home';
import MainPage from './View/MainPage/MainPage';
import Notification from './View/MainPage/Notification/Notification';
// import Notification from './View/Pages/Notification/Notification';
import PinCodePage from './View/Pages/PinCodePage/PinCodePage';
import StarterPage from './View/Pages/StarterPage/StarterPage';
import { useState } from 'react';

function App() {
	const [popUpModal, setPopUpModal] = useState(false);

	// let pinCode = localStorage.getItem('@pharm-box-pin-code');
	const [state, setState] = useState(
		localStorage.getItem('@pharm-box-pin-code')
	);

	const popUpToggle = () => {
		setPopUpModal(!popUpModal);
	};
	return (
		<>
			<Router>
				<Routes>
					<Route
						exact
						path="/starter-page"
						element={<StarterPage />}
					/>
					<Route
						exact
						path="/pin-code"
						element={<PinCodePage setState={setState} />}
					/>
					<Route
						exact
						path="/home"
						element={
							state ? (
								<Home popUpToggle={popUpToggle} />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>
					<Route
						path="/categories-page"
						element={
							state ? (
								<CategoryPage
									popUpToggle={popUpToggle}
								/>
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>

					<Route
						path="/notification-page"
						element={
							state ? (
								<Notification />
							) : (
								<Navigate to="/starter-page" />
							)
						}
					/>

					{/* <AuthRoute exact path="/" element={<MainPage />} /> */}
					<Route
						exact
						path="/"
						element={<Navigate to="/home" />}
					/>
				</Routes>
			</Router>
			{popUpModal && (
				<PrescriptionPopUp setPopUpModal={setPopUpModal} />
			)}
		</>
	);
}

const PrescriptionPopUp = ({ setPopUpModal }) => {
	return (
		<div
			className=" flex  h-screen w-screen absolute top-0 left-0 justify-center items-center "
			style={{
				backgroundColor: 'rgba(0,0,0,0.5)',
				zIndex: 10000000000,
			}}
		>
			<div className="relative bg-white py-12 w-19 bg-white">
				<div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
					<p className="text-xs font-w-500">
						Choose Prescription Image
					</p>
				</div>
				<div className="flex flex-col mx-20 ">
					<span
						className="font10 font-w-600 rounded-md text-center mt-2.5 "
						style={{
							border: '1px solid lightgray',
							padding: '5px 15px',
						}}
					>
						Take Image
					</span>
					<span
						className="font10 font-w-600 rounded-md text-center mt-2.5"
						style={{
							border: '1px solid lightgray',
							padding: '5px 15px',
						}}
					>
						Choose From Gallery
					</span>
					<span
						className="font10 font-w-600 rounded-md text-center mt-2.5"
						style={{
							border: '1px solid lightgray',
							padding: '5px 15px',
						}}
						onClick={() => setPopUpModal(false)}
					>
						Cancel
					</span>
				</div>
			</div>
		</div>
	);
};

export default App;
