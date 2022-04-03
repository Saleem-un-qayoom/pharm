import React, { useState } from 'react';
import { prescriptionImageAtom, userDataAtom } from '../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import config from '../../Services/config';
import { useNavigate } from 'react-router';

function UploadPrescription(props) {
	let navigate = useNavigate();

	const userData = useRecoilValue(userDataAtom);

	const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);

	const [prescriptionImage, setPrescriptionImage] = useRecoilState(
		prescriptionImageAtom
	);
	const onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			setPrescriptionImage(URL.createObjectURL(event.target.files[0]));
			// setPrescriptionImage(event.target.files[0]);
			navigate('/submit-prescription');
		}
	};

	const prescriptionClick = () => {
		userData
			? setShowPrescriptionPopup(!showPrescriptionPopup)
			: navigate('/login-page');
	};

	return (
		<>
			<div className="py-2 px-2 flex justify-between">
				<div
					className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
					onClick={prescriptionClick}
				>
					<span className="text-sm font-semibold	text-white">
						Upload Prescription
					</span>
					<img
						src="/assets/icons/rx.png"
						className="w-4 ml-1"
						alt=""
					/>
				</div>
				<a
					href={`https://api.whatsapp.com/send?phone=${config.whatsappNumber}`}
					target="_blank"
					className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
				>
					<span className="text-sm font-semibold	text-white">
						Order On Whatsapp
					</span>
					<img
						src="/assets/icons/whatsapp.png"
						className="w-4 ml-1"
						alt=""
					/>
				</a>
			</div>
			{showPrescriptionPopup && (
				<div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
					<div className="relative  py-12 w-19 bg-white">
						<div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
							<p className="text-xs font-w-500">
								Choose Prescription Image
							</p>
						</div>
						<div className="flex flex-col mx-20 ">
							<label
								for="cameraFileInput"
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
							>
								<span class="btn">Open camera</span>

								<input
									id="cameraFileInput"
									type="file"
									accept="image/*"
									capture="environment"
									onChange={onImageChange}
								/>
							</label>
							<label
								for="cameraFileInput"
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
							>
								<span class="btn">
									Choose From Gallary
								</span>

								<input
									id="cameraFileInput"
									type="file"
									accept="image/*"
									onChange={onImageChange}
								/>
							</label>
							<span
								className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
								onClick={() =>
									setShowPrescriptionPopup(false)
								}
							>
								Cancel
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default UploadPrescription;
