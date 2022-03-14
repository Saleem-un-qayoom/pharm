import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CategoryData,
  pinCodeData,
  storeData,
  userData,
} from "../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCategoryApi, getCategoryListApi } from "../../Services/apis";
import config from "../../Services/config";

// const category = [
//   {
//     name: "Medicine (879)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
//   {
//     name: "Personal (18)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
//   {
//     name: "Ayurvedic (59)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
//   {
//     name: "Surgical (28)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
//   {
//     name: "Cosmetics (8)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
//   {
//     name: "Covid Essentials (0)",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//   },
// ];

function Catlist({ history, showHeader = false }) {
  let navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const userRecoil = useRecoilValue(userData);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);

  //   const pinCodeRecoil = useRecoilValue(pinCodeData);
  const [categoryRecoil, setCategoryRecoil] = useRecoilState(CategoryData);

  const getCategoryApiFunc = getCategoryApi();

  useEffect(() => {
    const data = {
      uID: userRecoil.id || "0",
      storeId: storeRecoil.id,
      pinCode: pinCodeRecoil.id,
    };
    getCategoryApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      // setStores(res.StoreData);
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
            <button className="text-xs font-medium">View all</button>
          </>
        )}
      </div>

      <div>
        <ul className="flex justify-between flex-wrap items-center ">
          {categoryRecoil.map((item, key) => {
            return (
              <div
                key={key}
                onClick={() => navigate("/medicine-page")}
                className="flex flex-col items-center bg-white mb-2 p-1 rounded-xl	"
                style={{ width: "31%" }}
              >
                <img
                  src={`${config.baseUrl}/${item.catimg}`}
                  className="w-20"
                />
                <div className="flex items-end">
                  <span className="text-slate-700 mt-2 font10 font-w-700">
                    {item.catname}
                  </span>
                  <p className="font10 text-slate-700 font-w-900 ml-2">
                    {item.count}
                  </p>
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
