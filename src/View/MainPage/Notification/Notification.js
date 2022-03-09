import { useNavigate } from 'react-router';

function Notification({ history }) {
	let navigate = useNavigate();
	return (
		<div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
			<img
				onClick={() => navigate(-1)}
				src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
				style={{
					height: '25px',
					width: '20px',
					marginRight: '10px',
				}}
			/>
			<span>Notification</span>
		</div>
	);
}

export default Notification;
