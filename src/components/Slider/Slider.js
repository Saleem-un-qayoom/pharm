import 'swiper/css/pagination';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';
import { bannersAtom } from '../../Recoil/atom';
import config from '../../Services/config';
import { useRecoilValue } from 'recoil';

function Slider() {
	const banner = useRecoilValue(bannersAtom);

	return (
		<Swiper
			// modules={[Pagination]}
			// spaceBetween={50}
			// navigation
			// pagination={{ clickable: true }}
			slidesPerView={1}
			scrollbar={{ draggable: true }}
			autoplay
		>
			{banner.map((item, key) => (
				<SwiperSlide key={key}>
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
