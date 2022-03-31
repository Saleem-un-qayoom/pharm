import './CategoryScreen.scss';

import React, { useEffect, useState } from 'react';
import { pinCodeData, storeDataAtom, userDataAtom } from '../../../Recoil/atom';

import Catlist from '../../../components/Catlist/Catlist';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import { getCategoryApi } from '../../../Services/apis';
import { useRecoilValue } from 'recoil';

function CategoryScreen({ onLinkPress, popUpToggle }) {
	const [categoryList, setCategoryList] = useState([]);

	const userRecoil = useRecoilValue(userDataAtom);
	const storeRecoil = useRecoilValue(storeDataAtom);
	const pinCodeRecoil = useRecoilValue(pinCodeData);

	const getCategoryApiFunc = getCategoryApi();

	useEffect(() => {
		const data = {
			uID: userRecoil.id || '0',
			storeId: storeRecoil.id,
			pinCode: pinCodeRecoil.id,
		};
		getCategoryApiFunc(data, handleResponse);
	}, []);

	const handleResponse = res => {
		if (res && res.ResponseCode === '200') {
			setCategoryList(res.CategoryData);
		}
	};

	return (
		<>
			<Header />
			<HeaderFooterWrapper>
				<Catlist catList={categoryList} />
			</HeaderFooterWrapper>
			<Footer onLinkPress={onLinkPress} popUpToggle={popUpToggle} />
		</>
	);
}

export default CategoryScreen;
