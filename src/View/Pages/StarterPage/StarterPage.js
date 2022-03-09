import 'swiper/css';
import './StarterPage.scss';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Pagination } from 'swiper';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const sliderData = [
	{
		sliderImage:
			'https://cdn5.vectorstock.com/i/1000x1000/78/29/mobile-health-care-and-medicine-concept-vector-4447829.jpg',
		mainText:
			'our vision is to make high-quality healthcare accessible to a billion people',
		subText: 'pharm box! we are there for you whenever you need us.',
		buttonText: 'Next',
	},
	{
		sliderImage:
			'https://cdn5.vectorstock.com/i/1000x1000/78/29/mobile-health-care-and-medicine-concept-vector-4447829.jpg',
		mainText:
			'satisfies your medicines cravings with your necessary medicines delivered to you, whenever you are',
		subText: 'find the nearest medical store & original medicines on a go!',
		buttonText: 'Next',
	},
	{
		sliderImage:
			'https://cdn5.vectorstock.com/i/1000x1000/78/29/mobile-health-care-and-medicine-concept-vector-4447829.jpg',
		mainText:
			'discover the 100000+ original personal care & medicines at discounted prices!',
		subText: 'search for necessary medicines near you',
		buttonText: 'Next',
	},
	{
		sliderImage:
			'https://cdn5.vectorstock.com/i/1000x1000/78/29/mobile-health-care-and-medicine-concept-vector-4447829.jpg',
		mainText: 'Hurry !! keep shopping with us',
		subText: 'we deliver it to your door step keep shopping with us!',
		buttonText: 'Finish',
	},
];

function SlideNextButton({ text }) {
	let navigate = useNavigate();
	const swiper = useSwiper();

	return (
		<button
			onClick={() => {
				if (text === 'Next') {
					swiper.slideNext();
				} else {
					navigate('/pin-code');
				}
			}}
			className="px-11 bg-white py-2 mb-2.5 flex items-center rounded-full font14 font-semibold"
		>
			{text}
		</button>
	);
}

function StarterPage() {
	let navigate = useNavigate();
	useEffect(() => {
		const pinCode = localStorage.getItem('@pharm-box-pin-code');
		if (pinCode) {
			navigate('/');
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Swiper
				className="mySwiper"
				modules={[Pagination]}
				spaceBetween={50}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
			>
				{sliderData.map(item => (
					<SwiperSlide>
						<div className="h-screen background-primary">
							<div className="h-4/5 bg-white flex flex-col justify-center items-center rounded-b-2xl">
								<img
									src={item.sliderImage}
									alt=""
									className="slider-image inline-block"
								/>
								<p className="ion-padding text-gray-700 text-base font-medium mt-10 capitalize font-semibold">
									{item.mainText}
								</p>
							</div>
							<div className="ion-padding-x h-1/5 flex flex-col items-center justify-between  capitalize">
								<p className="text-black mt-6 leading-5	font-semibold">
									{item.subText}
								</p>
								<SlideNextButton
									// history={history}
									text={item.buttonText}
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default StarterPage;
