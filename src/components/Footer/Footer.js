import './Footer.scss';

import { useNavigate } from 'react-router';

// import Icon from "../../public/assets/icon/home.png";

function Footer({ popUpToggle }) {
	const navigate = useNavigate();
	const footer = [
		{ name: 'Home', link: '' },
		{ name: 'Prescription', link: '' },
		{ name: 'Category', link: '' },
		{ name: 'Notification', link: '' },
		{ name: 'User', link: '' },
	];

	const onLinkPress = linkType => {
		switch (linkType) {
			case 'Home':
				navigate('/');
				break;
			case 'Prescription':
				popUpToggle();
				break;
			case 'Notification':
				navigate('/notification-page');
				break;
			case 'User':
				navigate('/profile-page');
				break;
			case 'Category':
				navigate('/categories-page');
				break;
			default:
		}
	};

	return (
		<div className="footer fixed w-full flex flex-row justify-between bg-white py-2 ion-padding-x leading-4 bottom-0 left-0">
			{footer.map((item, key) => {
				return (
					<div key={key} className="flex items-center flex-col">
						<div className="footer-img bg-green-400"></div>
						<span
							className="pt-1.5 text-xs text-slate-500 font-medium "
							onClick={() => {
								onLinkPress(item.name);
							}}
						>
							{item.name}
						</span>
					</div>
				);
			})}
		</div>
	);
}

export default Footer;
