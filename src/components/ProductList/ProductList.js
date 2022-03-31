import ProductListItem from '../ProductListItem';

function ProductList({ product }) {
	return (
		<div className="explore-something-new ion-padding bg-slate-50">
			<div className="explore-something-new__head flex justify-between items-center  ">
				<p className="text-xs font-medium text-color-primary ">
					{product.title}
				</p>
			</div>

			<div className=" flex mt-4 scrollable-element">
				{product.product_data.map((item, key) => (
					<ProductListItem item={item} key={key} />
				))}
			</div>
		</div>
	);
}

export default ProductList;
