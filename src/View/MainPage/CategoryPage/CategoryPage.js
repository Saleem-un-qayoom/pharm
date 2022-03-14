import Catlist from '../../../components/Catlist/Catlist';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import React from 'react';
import { useNavigate } from 'react-router';

function CategoryPage({ onLinkPress, popUpToggle }) {
	let navigate = useNavigate();

	return (
		<>
			<Header />
			<HeaderFooterWrapper>{/* <Catlist /> */}</HeaderFooterWrapper>
			<Footer onLinkPress={onLinkPress} popUpToggle={popUpToggle} />
		</>
	);
}

export default CategoryPage;
