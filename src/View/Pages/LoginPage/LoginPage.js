import './LoginPage.scss';

import React, { useState } from 'react';
import { getOtpApi, loginApi } from '../../../Services/apis';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../../../Recoil/atom';

function Login() {
	const [userData, setUserData] = useRecoilState(userDataAtom);
	const loginApiFunc = loginApi();

	const getOtpApiFunc = getOtpApi();

	const navigate = useNavigate();

	const [number, setNumber] = useState('');
	const [numberError, setNumberError] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const [showSignUpModule, setShowSignUpModule] = useState(true);

	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		if (userData) {
			navigate('/home');
		}
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		console.log('first');
		let error = 0;

		if (!number) {
			setNumberError(true);
			error++;
		}

		if (!showSignUpModule) {
			if (!password) {
				setPasswordError(true);
				error++;
			}
		}

		if (error === 0) {
			//
			if (showSignUpModule) {
				const data = {
					mobile: number,
				};
				getOtpApiFunc(data, res => {
					console.log('res', res);
					navigate('/otp-page');
				});
			} else {
				const data = {
					mobile: number,
					password: password,
				};
				loginApiFunc(data, handleResponse);
			}
		}
	};

	const handleResponse = res => {
		if (res.Result == 'true') {
			if (rememberMe) {
				localStorage.setItem(
					'pharm-box-user',
					JSON.stringify(res.UserLogin)
				);
			} else {
				sessionStorage.setItem(
					'pharm-box-user',
					JSON.stringify(res.UserLogin)
				);
			}
			setUserData(res.UserLogin);
			navigate('/home');
		}
		// ShowToast(res.ResponseMsg, setToast);
		toast(res.ResponseMsg);
	};

	const toggleShowModal = value => {
		setNumber('');
		setNumberError('');
		setPassword('');
		setPasswordError('');

		setShowSignUpModule(value);
	};

	return (
		<div className="pharm-box__login h-screen flex flex-col justify-end">
			<form onSubmit={handleSubmit} className="pharm-box__login-form ">
				<div className="login-info ion-padding font-w-700 pt-2">
					<p className="text-xs">Sign in / Sign Up</p>
					{showSignUpModule ? (
						<>
							<input
								value={number}
								onChange={({ target }) => {
									setNumber(target.value);
									setNumberError(false);
								}}
								type="text"
								placeholder="Phone Number "
								className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
							/>
							{numberError && (
								<span className="text-red-700 text-xs">
									Number Required
								</span>
							)}

							<p
								className="pt-1 text-xs font-w-700"
								onClick={() => toggleShowModal(false)}
							>
								Have a Email/Password Account?
							</p>
						</>
					) : (
						<>
							<input
								value={number}
								onChange={({ target }) => {
									setNumber(target.value);
									setNumberError(false);
								}}
								type="text"
								placeholder="Phone Number "
								className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
							/>
							{numberError && (
								<span className="text-red-700 text-xs">
									Number Required
								</span>
							)}

							<input
								type="password"
								value={password}
								onChange={({ target }) => {
									setPassword(target.value);
									setPasswordError(false);
								}}
								placeholder="Password "
								className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
							/>

							{passwordError && (
								<span className="text-red-700 text-xs">
									Password Required
								</span>
							)}

							<p
								className="pt-1 text-xs font-w-700"
								onClick={() => toggleShowModal(true)}
							>
								Sign Up?
							</p>
						</>
					)}
					<div className="flex items-center mt-4">
						<input
							type="checkbox"
							value={rememberMe}
							onChange={({ target }) =>
								setRememberMe(target.value)
							}
							className="mr-2"
						/>
						<span className="text-xs font-medium">
							Remember Me
						</span>
					</div>
					<div className="mt-4">
						<p className="font10 text-slate-400">
							By clicking continue, you agree with our
							Privacy Policy
						</p>
					</div>
					<button className="py-3 font-w-700 flex  justify-center bg-green-400 w-full rounded-xl mt-1">
						Continue
					</button>
					<span className="flex items-center justify-center mt-3 text-xs">
						Forgot Password?
					</span>
				</div>
			</form>
		</div>
	);
}

export default Login;
