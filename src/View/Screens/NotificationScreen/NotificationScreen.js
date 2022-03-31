import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import { getNotificationApi } from '../../../Services/apis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { userDataAtom } from '../../../Recoil/atom';

function Notification() {
	const getNotificationApiFunc = getNotificationApi();

	const userData = useRecoilValue(userDataAtom);
	const [notification, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const data = {
			uid: userData.id,
		};
		getNotificationApiFunc(data, handleResponse);
	}, []);

	const handleResponse = response => {
		if (response.ResponseCode === '200') {
			setNotifications(response.NotificationData);
		}
		setLoading(false);
	};

	return (
		<CommonScreenPage
			headingTitle={'Notification'}
			contentBg={'bg-gray-100'}
			showLoading={loading}
		>
			{notification.map(item => (
				<div className=" bg-white mx-1 my-1 px-1 py-1 rounded-sm">
					<div className="flex justify-between items-center">
						<span className="bg-yellow-400 font-medium text-xs px-2 py-0.5 ">
							{item.title}
						</span>
						<span className="font-medium text-xs text-zinc-600">
							{item.datetime}
						</span>
					</div>
					<div className="text-xs font-medium mt-1.5">
						{item.description}
					</div>
				</div>
			))}
		</CommonScreenPage>
	);
}

export default Notification;
