import React from 'react';
import config from '../../Services/config';

function ExploreNew({ medicine }) {
	return (
		<div className="explore-something-new ion-padding bg-slate-50">
			<div className="explore-something-new__head flex justify-between items-center  ">
				<p className="text-xs font-medium text-color-primary ">
					Explore Something New
				</p>
				<button className="text-xs font-w-700">View all </button>
			</div>

			<div className=" flex mt-4 scrollable-element">
				{medicine.map((item, key) => (
					<div
						key={key}
						className="flex flex-col bg-white mr-3"
						style={{
							flex: '0 0 145px',
							// height: '170px',
						}}
					>
						<div>
							<span className="inline-block leading-3	text-xs px-3 py-2 background-primary rounded-r-full rounded-b-full">
								{item.product_info[0].product_discount}%
								<br />
								OFF
							</span>
						</div>
						<div className="h-28 flex items-center justify-center">
							<img
								className="h-4/5"
								src={`${config.baseUrl}/${item.product_image}`}
								alt=""
							/>
						</div>
						<div>
							<span className="font12 font-semibold pl-2">
								Rs
								{parseFloat(
									item.product_info[0]
										.product_price -
										(item.product_info[0]
											.product_price /
											100) *
											10
								).toFixed(2)}
							</span>
							&nbsp;
							<span className="font10 font-semibold line-through text-light-grey">
								Rs
								{parseFloat(
									item.product_info[0].product_price
								).toFixed(2)}
							</span>
						</div>
						<div>
							<span className="font12 font-semibold truncate px-2">
								{item.product_name}
							</span>
						</div>
						<div className="flex justify-center items-center background-primary w-full	 ">
							<button className="text-xs font-w-600 py-1 px3 w-full	">
								Add To Cart
							</button>
						</div>
					</div>
				))}
				{/* {medicine.map((item, key) => {
					return (
						<div
							key={key}
							className="flex flex-col bg-white items-center mr-3 relative justify-between"
							style={{
								flex: '0 0 145px',
								height: '170px',
							}}
						>
							<div className="w-full flex flex-col justify-center ">
								<img
									src={item.product_image}
									className="w-12"
									alt=""
								/>
								<div className="pt-20 w-full px-2	">
									<div
										className="background-primary flex flex-col item-center justify-center rounded-br-full absolute top-0 left-0 pl-2"
										style={{ width: '35%' }}
									>
										<p className="text-xs">
											{
												item.product_info
													.product_discount
											}
											%
										</p>
										<span className="text-xs">
											OFF
										</span>
									</div>
									<span className="inline-block font-w-700 text-xs">
										{
											item.product_info
												.product_discount
											// parseInt(
											// 	item.product_info
											// 		.product_price
											// )
											//  /
											// 	100) *
											// 	10 -
											// 	parseInt(
											// 		item.product_info
											// 			.product_price
											// 	)}
										}
									</span>
									<span className="pl-1 font10 text-slate-400">
										{
											item.product_info
												.product_price
										}
									</span>
									<p className="text-xs font-w-700  text-ellipsis	">
										{item.product_name}
									</p>
								</div>
							</div>
							<div className="flex justify-center items-center mt-2 background-primary w-full	 ">
								<button className="text-xs font-w-600 py-1 px3 w-full	">
									Add To Cart
								</button>
							</div>
						</div>
					);
				})} */}
			</div>
		</div>
	);
}

export default ExploreNew;
