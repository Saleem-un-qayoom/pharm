import './Home.scss';

import { pinCodeData, storeData, userData } from '../../../Recoil/atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CategoryList from '../../../components/CategoryList/CategoryList';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import HeaderFooterWrapper from '../../../components/HeaderFooterWrapper/HeaderFooterWrapper';
import ProductList from '../../../components/ProductList/ProductList';
import { getHomeApi } from '../../../Services/apis';
import { useParams } from 'react-router';

const productList = [
	{
		ProductTitle: 'Product A',
		products: [
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
		],
	},

	{
		ProductTitle: 'Product B',
		products: [
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
		],
	},
	{
		ProductTitle: 'Product B',
		products: [
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
		],
	},
	{
		ProductTitle: 'Product C',
		products: [
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
			{
				name: 'Medicine (879)',
				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
			},
		],
	},
];

const Home = ({ popUpToggle }) => {
	const [homeData, setHomeData] = useState([]);
	const userRecoil = useRecoilValue(userData);
	const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
	const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);

	const getHomeApiFunc = getHomeApi();

	useEffect(() => {
		const data = {
			uid: userRecoil.id,
			storeId: storeRecoil.id,
			pinCode: pinCodeRecoil.id,
		};
		getHomeApiFunc(data, handleResponse);
	}, []);

	const handleResponse = res => {
		if (res && res.ResponseCode === '200') {
			// setStores(res.StoreData);
		}
	};

	return (
		<>
			<Header />
			<HeaderFooterWrapper>
				<CategoryList />
				{productList.map((item, key) => (
					<ProductList product={item} key={key} />
				))}
			</HeaderFooterWrapper>
			<Footer popUpToggle={popUpToggle} />
		</>
	);
};

export default Home;
