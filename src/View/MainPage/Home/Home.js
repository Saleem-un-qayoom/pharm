import './Home.scss';

import {
	AboutData,
	Banners,
	FeedbackData,
	PrivacyPolicyData,
	ProductListData,
	TermsAndConditionData,
	aboutAtom,
	bannersAtom,
	brandAtom,
	catListAtom,
	contactAtom,
	exploreSomethingData,
	homeDataAtom,
	mainDataAtom,
	medicineAtom,
	pinCodeData,
	storeData,
	tncAtom,
	userData,
} from '../../../Recoil/atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Catlist from '../../../components/Catlist/Catlist';
import ExploreNew from '../../../components/ExploreNew/ExploreNew';
import FeedBack from '../../../components/FeedBack/FeedBack';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import ProductList from '../../../components/ProductList/ProductList';
import { getHomeApi } from '../../../Services/apis';
import { useParams } from 'react-router';

const Home = ({ popUpToggle }) => {
	// const [homeData, setHomeData] = useState([]);
	const userRecoil = useRecoilValue(userData);
	const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
	const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
	const [prodcutListRecoil, setProdcutListRecoil] =
		useRecoilState(ProductListData);

	const [banners, setBanners] = useRecoilState(bannersAtom);
	const [catList, setCatList] = useRecoilState(catListAtom);
	const [brand, setBrand] = useRecoilState(brandAtom);
	const [medicine, setMedicine] = useRecoilState(medicineAtom);
	const [mainData, setMainData] = useRecoilState(mainDataAtom);
	const [about, setAbout] = useRecoilState(aboutAtom);
	const [contact, setContact] = useRecoilState(contactAtom);
	const [tnc, setTnc] = useRecoilState(tncAtom);
	const [homeData, setHomeData] = useRecoilState(homeDataAtom);

	// const [feedbackRecoil, setFeedbackRecoil] = useRecoilState(FeedbackData);
	// const [privacyPolicyRecoil, setPrivacyPolicyRecoil] =
	// 	useRecoilState(PrivacyPolicyData);
	// const [termsandConditionRecoil, setTermsandConditionRecoil] =
	// 	useRecoilState(TermsAndConditionData);
	// const [aboutDataRecoil, setAboutDataRecoil] = useRecoilState(AboutData);
	// const [exporeSomethingRecoil, setExporeSomethingRecoil] =
	//   useRecoilState(exploreSomethingData);

	const getHomeApiFunc = getHomeApi();

	useEffect(() => {
		const data = {
			uID: userRecoil.id || '0',
			storeId: storeRecoil.id,
			pinCode: pinCodeRecoil.id,
		};
		getHomeApiFunc(data, handleResponse);
	}, []);

	const handleResponse = res => {
		if (res && res.ResponseCode === '200') {
			setBanners(res.ResultData.Banner);
			setCatList(res.ResultData.Catlist);
			setBrand(res.ResultData.Brand);
			setMedicine(res.ResultData.Medicine);
			setMainData(res.ResultData.Main_Data);
			setAbout(res.ResultData.about);
			setContact(res.ResultData.contact);
			setTnc(res.ResultData.terms);
			setHomeData(res.ResultData.HomeData);

			// setStores(res.StoreData);
			// setProdcutListRecoil(res.ResultData.HomeData);
			// setFeedbackRecoil(res.ResultData.testimonial);
			// setPrivacyPolicyRecoil(res.ResultData.Main_Data.policy);
			// setTermsandConditionRecoil(res.ResultData.Main_Data.terms);
			// setAboutDataRecoil(res.ResultData.Main_Data.about);
			// setExporeSomethingRecoil(res.ResultData.Medicine);
		}
	};

	return (
		<>
			<Header />
			<HeaderFooterWrapper>
				<Catlist showHeader catList={catList} />

				<ExploreNew medicine={medicine} />
				{/* <ProductList product={exporeSomethingRecoil} key={1} /> */}
				{homeData.map((item, key) => (
					<ProductList product={item} key={key} />
				))}
				<FeedBack />
			</HeaderFooterWrapper>
			<Footer popUpToggle={popUpToggle} />
		</>
	);
};

export default Home;
