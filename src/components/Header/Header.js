import "./Header.css";

import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { storeDataAtom } from "../../Recoil/atom";

function Header() {
  let navigate = useNavigate();

  const [storeData, setStoreData] = useRecoilState(storeDataAtom);
  return (
    <>
      <div className="ion-padding background-primary fixed top-0 w-full border-b-4 z-50 border-white">
        <div className="flex items-center">
          <img
            className="mr-1 h-4"
            src="https://img.icons8.com/ios-filled/50/000000/marker.png"
          />
          <span className="font-semibold grow	">Change Store</span>
          <img
            onClick={() => navigate("/cart-page")}
            style={{ width: "20px" }}
            src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/2x/external-cart-user-interface-icongeek26-glyph-icongeek26.png"
          />
        </div>
        <div className="header-paragraph">
          <p>
            Welcome to
            <span
              className="text-color-secondary ml-1"
              onClick={() => {
                navigate("/store-page");
              }}
            >
              {storeData.title}
            </span>
          </p>
        </div>
        <div className="w-full mt-2">
          <input
            type="text"
            className="w-full py-1 px-3 pl-7 rounded-full input-border-none"
            placeholder="Search items.."
          />
        </div>
      </div>
    </>
  );
}

export default Header;
