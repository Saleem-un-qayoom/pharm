import './App.css';

import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import MainPage from './View/MainPage/MainPage';
import PinCodePage from './View/Pages/PinCodePage/PinCodePage';
import StarterPage from './View/Pages/StarterPage/StarterPage';
import { useState } from 'react';

function App() {
	// let pinCode = localStorage.getItem('@pharm-box-pin-code');
	const [state, setState] = useState(
		localStorage.getItem('@pharm-box-pin-code')
	);
	return (
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
				{/* <AuthRoute exact path="/" element={<MainPage />} /> */}
				<Route
					exact
					path="/"
					element={
						state ? (
							<MainPage />
						) : (
							<Navigate to="/starter-page" />
						)
					}
				/>

				{/* <Route path="*" element={<Navigate to="/starter-page" />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
