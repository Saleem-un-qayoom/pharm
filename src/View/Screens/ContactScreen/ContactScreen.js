import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { contactAtom } from "../../../Recoil/atom";
// import { contactAtom } from "../../../../Recoil/atom";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";

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
      <CommonScreenPage headingTitle={"Contact"}></CommonScreenPage>
      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: contactRecoil }}
      />
    </>
  );
}

export default ContactScreen;
