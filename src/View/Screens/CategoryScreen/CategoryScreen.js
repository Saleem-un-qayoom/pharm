import './CategoryScreen.scss';

import React, { useEffect, useState } from 'react';
import { pinCodeData, storeDataAtom, userDataAtom } from '../../../Recoil/atom';

import Catlist from '../../../components/Catlist/Catlist';
import CommonHeaderFooterPage from '../../../components/CommonScreenWithSearchHeaderPage/CommonHeaderFooterPage';
import { getCategoryApi } from '../../../Services/apis';
import { useRecoilValue } from 'recoil';

function CategoryScreen() {
	const [categoryList, setCategoryList] = useState([]);

	const userRecoil = useRecoilValue(userDataAtom);
	const storeRecoil = useRecoilValue(storeDataAtom);
	const pinCodeRecoil = useRecoilValue(pinCodeData);
	const [showLoading, setShowLoading] = useState(false);

	const getCategoryApiFunc = getCategoryApi();

	useEffect(() => {
		if (categoryList.length === 0) {
			setShowLoading(true);
			const data = {
				uID: userRecoil.id || '0',
				storeId: storeRecoil.id,
				pinCode: pinCodeRecoil.id,
			};
			getCategoryApiFunc(data, handleResponse);
		}
	}, []);

	const handleResponse = res => {
		setShowLoading(false);
		if (res && res.ResponseCode === '200') {
			setCategoryList(res.CategoryData);
		}
	};

	return (
		<CommonHeaderFooterPage showLoading={showLoading}>
			<Catlist catList={categoryList} />
		</CommonHeaderFooterPage>
	);
}

export default CategoryScreen;
