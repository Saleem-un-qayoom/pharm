import 'swiper/css/pagination';
import 'swiper/css';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Pagination } from 'swiper';
import SimpleImageSlider from 'react-simple-image-slider';
import { bannersAtom } from '../../Recoil/atom';
import config from '../../Services/config';

const images = [
	{
		url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	},
	{
		url: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg',
	},
	{
		url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	},
];

function Slider() {
	const banner = useRecoilValue(bannersAtom);

	return (
		// <div className="w-full ">
		//   <SimpleImageSlider
		//     width={"100%"}
		//     height={"150px"}
		//     style={
		//       {
		//         // backgroundSize: "cover",
		//         // backgroundPosition: "center center",
		//       }
		//     }
		//     images={banner.map((item) => `${config.baseUrl}/${item.img}`)}
		//     showBullets={false}
		//     showNavs={false}
		//     autoPlay
		//   />
		// </div>
		<Swiper
			// modules={[Pagination]}
			// spaceBetween={50}
			// navigation
			// pagination={{ clickable: true }}
			slidesPerView={1}
			scrollbar={{ draggable: true }}
			Autoplay
		>
			{banner.map(item => (
				<SwiperSlide>
					<div
						className="w-screen h-40 bg-cover bg-no-repeat"
						style={{
							backgroundImage: `url(${config.baseUrl}/${item.img})`,
							backgroundPosition: '0 center',
						}}
					></div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export default Slider;
