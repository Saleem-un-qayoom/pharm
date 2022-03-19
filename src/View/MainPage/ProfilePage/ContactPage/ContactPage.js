import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { contactAtom, ContactData } from "../../../../Recoil/atom";

function ContactPage({ history }) {
  let navigate = useNavigate();

  const [contactRecoil, setContactRecoil] = useRecoilState(contactAtom);
  return (
    <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
      <img
        onClick={() => navigate(-1)}
        src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
        style={{ height: "25px", width: "20px", marginRight: "10px" }}
      />
      <span>Contact</span>
      {contactRecoil}
    </div>
  );
}

export default ContactPage;
