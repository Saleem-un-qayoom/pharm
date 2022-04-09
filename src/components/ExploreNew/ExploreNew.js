import ExploreNewItem from './ExploreNewItem';
import React from 'react';
import { useNavigate } from 'react-router';

function ExploreNew({ medicine }) {
	const navigate = useNavigate();

	return (
		<div className="explore-something-new ion-padding bg-slate-50">
			<div className="explore-something-new__head flex justify-between items-center  ">
				<p className="text-xs font-medium text-color-primary ">
					Explore Something New
				</p>
				<button
					className="text-xs font-w-700"
					onClick={() => navigate('/explore-new-page')}
				>
					View all{' '}
				</button>
			</div>

			<div className=" flex mt-4 scrollable-element">
				{medicine.map((item, key) => (
					<ExploreNewItem item={item} key={key} />
				))}
			</div>
		</div>
	);
}

export default ExploreNew;
