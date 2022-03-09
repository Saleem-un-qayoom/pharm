function ProductList({ product }) {
	return (
		<div className="explore-something-new ion-padding bg-slate-50">
			<div className="explore-something-new__head flex justify-between items-center  ">
				<p className="text-xs font-medium text-color-primary ">
					Explore Something New
				</p>
				<button className="text-xs font-w-700">View all </button>
			</div>

			<div className=" flex mt-4 scrollable-element">
				{product.products.map(item => {
					return (
						<div
							className="flex flex-col bg-white items-center mr-3 relative "
							style={{
								flex: '0 0 145px',
							}}
						>
							<img
								src={item.image}
								className="w-12"
								alt=""
							/>
							<div className="pt-20 w-full px-2	">
								<div
									className="background-primary flex flex-col item-center justify-center rounded-br-full absolute top-0 left-0 pl-2"
									style={{ width: '35%' }}
								>
									<p className="text-xs">10%</p>
									<span className="text-xs">
										OFF
									</span>
								</div>
								<span className=" font-w-700 text-xs">
									Rs205.07
								</span>
								<span className="pl-1 font10 text-slate-400">
									Rs227.86
								</span>
								<p className="text-xs font-w-700 dot-text">
									Zoray SUNSCREEN
								</p>
							</div>
							<div className="flex justify-center items-center mt-2 background-primary w-full	 ">
								<button className="text-xs font-w-600 py-1 px3 w-full	">
									Add To Cart
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ProductList;
