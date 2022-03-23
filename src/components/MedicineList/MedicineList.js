// import React, { useEffect, useState } from "react";
// import {
//   categoryListData,
//   pinCodeData,
//   storeData,
//   userData,
//   userDataAtom,
// } from "../../Recoil/atom";
// import { useRecoilState, useRecoilValue } from "recoil";

// import config from "../../Services/config";
// // import { getCategoryListApi } from "../../Services/apis";

// function MedicineList() {
//   const [categoryList, setCategoryList] = useState([]);
//   const userRecoil = useRecoilValue(userDataAtom);
//   const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
//   const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
//   const [categoryListRecoil, setCategoryListRecoil] =
//     useRecoilState(categoryListData);

//   //   const getCategoryListApiFunc = getCategoryListApi();

//   useEffect(() => {
//     const data = {
//       uID: userRecoil.id || "0",
//       storeId: storeRecoil.id,
//       pinCode: pinCodeRecoil.id,
//     };
//     // getCategoryListApiFunc(data, handleResponse);
//   }, []);

//   const handleResponse = (res) => {
//     if (res && res.ResponseCode === "200") {
//       setCategoryList(res.CategoryData);
//     }
//   };

//   return (
//     <div className="pt-2  background-tertiary h-screen relative mb-4">
//       <div className="flex items-center justify-center ">
//         <span className="text-slate-600 font-w-500">Medicine</span>
//       </div>
//       {categoryListRecoil.map((item, key) => (
//         <div key={key} className="ion-padding  ">
//           <div className="bg-white  flex rounded-lg">
//             <img
//               style={{ width: "27%" }}
//               // src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
//               src={`${config.baseUrl}/${item.catimg}`}
//               alt=""
//             />
//             <div
//               className="flex flex-col absolute rounded-br-full background-primary "
//               style={{
//                 top: "48px",
//                 left: "15px",
//                 padding: "5px 13px",
//                 // borderRadius: "10px",
//               }}
//             >
//               <span className="font12 font-w-500">10%</span>
//               <span className="font12 font-w-500">OFF</span>
//             </div>
//             <div className="ml-2 py-4">
//               <h1 className="font13 font-w-600">{item.catname}</h1>
//               <span className="font13 font-w-600">{item.price1}</span>
//               <span className="font13 font-w-600 ml-1 text-slate-500">
//                 {item.price2}
//               </span>
//             </div>
//             <div className="absolute" style={{ top: "113px", left: "248px" }}>
//               <button className="background-primary font13 font-w-500 py-1 px-5">
//                 {item.button}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MedicineList;
