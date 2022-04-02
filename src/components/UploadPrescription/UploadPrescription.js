import React from 'react';
import config from '../../Services/config';

function UploadPrescription(props) {
	return (
		<div className="py-2 px-2 flex justify-between">
			<div
				className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
				onClick={props.popUpToggle}
			>
				<span className="text-sm font-semibold	text-white">
					Upload Prescription
				</span>
			</div>
			<a
				href={`https://api.whatsapp.com/send?phone=${config.whatsappNumber}`}
				className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
			>
				<span className="text-sm font-semibold	text-white">
					Order On Whatsapp
				</span>
			</a>
		</div>
	);
}

export default UploadPrescription;
