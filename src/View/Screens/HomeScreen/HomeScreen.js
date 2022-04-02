import './HomeScreen.scss';

import {
	ProductListData,
	aboutAtom,
	bannersAtom,
	brandAtom,
	catListAtom,
	contactAtom,
	homeDataAtom,
	mainDataAtom,
	medicineAtom,
	pinCodeData,
	privacyPolicyAtom,
	showLoadingModalAtom,
	storeDataAtom,
	testimonialAtom,
	tncAtom,
	userDataAtom,
} from '../../../Recoil/atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Catlist from '../../../components/Catlist/Catlist';
import CommonHeaderFooterPage from '../../../components/CommonScreenWithSearchHeaderPage/CommonHeaderFooterPage';
import ExploreNew from '../../../components/ExploreNew/ExploreNew';
import FeedBack from '../../../components/FeedBack/FeedBack';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import Loading from '../../../components/Loading';
import PrescriptionPopUp from '../../../components/PrecriptionPopUp/PrescriptionPopUp';
import ProductList from '../../../components/ProductList/ProductList';
import Slider from '../../../components/Slider/Slider';
import UploadPrescription from '../../../components/UploadPrescription/UploadPrescription';
import { getHomeApi } from '../../../Services/apis';
import { useNavigate } from 'react-router';

const Home = () => {
	const navigate = useNavigate();
	const userRecoil = useRecoilValue(userDataAtom);
	const storeRecoil = useRecoilValue(storeDataAtom);
	const pinCodeRecoil = useRecoilValue(pinCodeData);
	const [popUpModal, setPopUpModal] = useState(false);
	const [catList, setCatList] = useRecoilState(catListAtom);
	const [brand, setBrand] = useRecoilState(brandAtom);
	const [medicine, setMedicine] = useRecoilState(medicineAtom);
	const [mainData, setMainData] = useRecoilState(mainDataAtom);
	const [about, setAbout] = useRecoilState(aboutAtom);
	const [contact, setContact] = useRecoilState(contactAtom);
	const [tnc, setTnc] = useRecoilState(tncAtom);
	const [homeData, setHomeData] = useRecoilState(homeDataAtom);
	const [testimonial, setTestimonial] = useRecoilState(testimonialAtom);
	const [privacyPolicy, setPrivacyPolicy] =
		useRecoilState(privacyPolicyAtom);
	const [banner, setBanner] = useRecoilState(bannersAtom);

	const [showLoadingModal, setShowLoadingModal] = useState(true);

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
		setShowLoadingModal(false);
		if (res && res.ResponseCode === '200') {
			setCatList(res.ResultData.Catlist);
			setBrand(res.ResultData.Brand);
			setMedicine(res.ResultData.Medicine);
			setMainData(res.ResultData.Main_Data);
			setAbout(res.ResultData.Main_Data.about);
			setContact(res.ResultData.Main_Data.contact);
			setTnc(res.ResultData.Main_Data.terms);
			setHomeData(res.ResultData.HomeData);
			setTestimonial(res.ResultData.testimonial);
			setPrivacyPolicy(res.ResultData.Main_Data.policy);
			setBanner(res.ResultData.Banner);
		}
	};
	const popUpToggle = () => {
		setPopUpModal(!popUpModal);
	};

	return (
		<CommonHeaderFooterPage showLoading={showLoadingModal}>
			<div>
				{banner.length > 0 && <Slider />}
				<UploadPrescription popUpToggle={popUpToggle} />
				<Catlist showHeader catList={catList} />

				<ExploreNew medicine={medicine} />
				{homeData.map((item, key) => (
					<ProductList product={item} key={key} />
				))}
				<FeedBack />
			</div>
		</CommonHeaderFooterPage>
	);
};

export default Home;
