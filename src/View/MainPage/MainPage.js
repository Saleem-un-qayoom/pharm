import { Navigate, Route, Routes, useNavigate } from 'react-router';
import React, { useState } from 'react';

import CategoryPage from './CategoryPage/CategoryPage';
import Home from './Home/Home';

function MainPage() {
	let navigate = useNavigate();

	// const [popUpModal, setPopUpModal] = useState(false);

	// const popUpToggle = () => {
	// 	setPopUpModal(!popUpModal);
	// };
	// const onLinkPress = linkType => {
	// 	switch (linkType) {
	// 		case 'Home':
	// 			navigate('/home');
	// 			break;
	// 		case 'Prescription':
	// 			popUpToggle();
	// 			break;
	// 		case 'Notification':
	// 			navigate('/notification-page');
	// 			break;
	// 		case 'User':
	// 			navigate('/profile-page');
	// 			break;
	// 		case 'Category':
	// 			navigate('/categories-page');
	// 			break;
	// 		default:
	// 	}
	// };

	return (
		<Routes>
			<Route exact path="/home" element={<Home />} />
			<Route
				exact
				path="/categories-page"
				element={<CategoryPage />}
			/>
			<Route path="/" element={<Navigate to="/home" />} />
			{/* <Route path="*" element={<Navigate to="/home" />} /> */}{' '}
		</Routes>
	);
}

export default MainPage;
