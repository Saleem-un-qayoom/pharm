import config from "../../Services/config";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  catListAtom,
  pinCodeData,
  storeDataAtom,
  userDataAtom,
} from "../../Recoil/atom";
import { getCategoryApi } from "../../Services/apis";

function Catlist({ showHeader = false, catList }) {
  let navigate = useNavigate();

  const [categoryList, seContactPagetCategoryList] = useState([]);
  const userRecoil = useRecoilValue(userDataAtom);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeDataAtom);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);

  // const pinCodeRecoil = useRecoilValue(pinCodeData);
  const [categoryRecoil, setCategoryRecoil] = useRecoilState(catListAtom);

  const getCategoryApiFunc = getCategoryApi();

  useEffect(() => {
    const data = {
      uID: userRecoil.id || "0",
      storeId: storeRecoil.id,
      pinCode: pinCodeRecoil.id,
    };
    // getCategoryApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      setCategoryRecoil(res.CategoryData);
    }
  };

  return (
    <div className="shop-by-category background-tertiary ion-padding">
      <div className="shop-by-category-head flex justify-between items-center mb-2">
        <p className="text-xs font-medium	text-color-primary">
          Shop by Category
        </p>
        {showHeader && (
          <>
            <button
              className="text-xs font-medium"
              onClick={() => navigate("/categories-page")}
            >
              View all
            </button>
          </>
        )}
      </div>

      <div>
        <ul className="flex justify-between flex-wrap items-center">
          {catList.map((item, key) => {
            return (
              <div
                key={key}
                onClick={() => navigate(`/cat-result-page/${item.id}`)}
                className="flex flex-col items-center bg-white mb-2 p-1 rounded-xl width-30-per"
              >
                <img
                  className="inline-block h-14 "
                  src={`${config.baseUrl}/${item.catimg}`}
                />
                <div className="flex items-end">
                  <span className="text-slate-700 mt-2 font10 font-w-700">
                    {`${item.catname} (${item.count})`}
                  </span>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Catlist;
