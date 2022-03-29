import './SubmitPrescription.css';

import React, { useState } from 'react';
import {
	prescriptionImageAtom,
	showLoadingModalAtom,
	storeData,
	toastAtom,
	userDataAtom,
} from '../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Loading from '../../components/Loading';
import ShowToast from '../../functions/showToast';
import { uploadPrescriptionApi } from '../../Services/apis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function SubmitPrescription() {
	let navigate = useNavigate();

	const uploadPrescriptionApiFunc = uploadPrescriptionApi();

	const prescriptionImage = useRecoilValue(prescriptionImageAtom);
	const [showLoadingModal, setShowLoadingModal] =
		useRecoilState(showLoadingModalAtom);

	const userData = useRecoilValue(userDataAtom);
	const store = useRecoilValue(storeData);
	const [toast, setToast] = useRecoilState(toastAtom);

	const [details, setDetails] = useState();

	useEffect(() => {
		if (!prescriptionImage) {
			navigate('/home');
		}
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		setShowLoadingModal(true);
		const formData = new FormData();
		formData.append('uid', userData.id);
		formData.append('sid', store.id);
		formData.append('details', details);
		formData.append('prescription_img', prescriptionImage);

		uploadPrescriptionApiFunc(formData, handleResponse);
	};

	const handleResponse = response => {
		console.log(
			'🚀 ~ file: SubmitPrescription.js ~ line 45 ~ SubmitPrescription ~ response',
			response
		);
		setShowLoadingModal(false);
		if (response && response.ResponseCode === '200') {
			ShowToast('Prescription Uploaded Successfully', setToast);
			setTimeout(() => {
				navigate('/home');
			}, 500);
		}
	};

	return (
		<>
			<Loading />
			<div className="h-screen">
				<div
					className="ion-padding background-primary font-semibold rounded-sm flex items-center "
					style={{ height: '8%' }}
				>
					<img
						onClick={() => navigate(-1)}
						src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
						style={{
							height: '25px',
							width: '20px',
							marginRight: '10px',
						}}
					/>
					<span>Upload Prescription</span>
				</div>
				<div className="bg-slate-100 " style={{ height: '92%' }}>
					<div className="flex items-center justify-center ion-padding 	">
						<div className="rounded-lg w-full ">
							<img src={prescriptionImage} alt="" />
						</div>
					</div>

					<div className="ion-padding">
						<div className=" w-full flex flex-col border rounded-md overflow-hidden">
							<label className="bg-white pl-2 pr-2 pb-1 pt-1 text-xs	font-semibold	">
								Additional Note
							</label>
							<textarea
								className="border-0 text-xs	font-semibold pl-2 pr-2"
								type="text"
								rows="5"
								onChange={({ target }) => {
									setDetails(target.value);
								}}
								placeholder="Enter any additional information regarding your order"
							/>
						</div>
					</div>
					<div className="ion-padding-x flex justify-center">
						<button
							className="px-20 py-1.5 bg-transparent border-2 border-primary rounded"
							onClick={handleSubmit}
						>
							ok
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default SubmitPrescription;
