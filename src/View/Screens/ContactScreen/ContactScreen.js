import CommonScreenPage from '../../../components/CommonScreenPage/CommonScreenPage';
import { contactAtom } from '../../../Recoil/atom';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';

// import { contactAtom } from "../../../../Recoil/atom";

// var stringToHTML = function (str) {
//   var parser = new DOMParser();
//   var doc = parser.parseFromString(str, "text/html");
//   return doc.body;
// };

function ContactScreen({ history }) {
	let navigate = useNavigate();

	// const [contactRecoil, setContactRecoil] = useRecoilState(contactAtom);
	const contactRecoil = useRecoilValue(contactAtom);
	return (
		<>
			<CommonScreenPage headingTitle={'Contact'}>
				<div
					className="ion-padding font11 font-w-700"
					dangerouslySetInnerHTML={{ __html: contactRecoil }}
				/>
			</CommonScreenPage>
		</>
	);
}

export default ContactScreen;
