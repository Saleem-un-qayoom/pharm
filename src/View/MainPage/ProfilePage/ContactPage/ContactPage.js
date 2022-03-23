import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { contactAtom, ContactData } from "../../../../Recoil/atom";

var stringToHTML = function (str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

function ContactPage({ history }) {
  let navigate = useNavigate();

  // const [contactRecoil, setContactRecoil] = useRecoilState(contactAtom);
  const contactRecoil = useRecoilValue(contactAtom);
  return (
    <>
      <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
        <img
          onClick={() => navigate(-1)}
          src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
          style={{ height: "25px", width: "20px", marginRight: "10px" }}
        />
        <span>Contact</span>
      </div>
      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: contactRecoil }}
      />
    </>
  );
}

export default ContactPage;
