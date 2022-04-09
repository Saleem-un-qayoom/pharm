// import React from "react";
// import { useNavigate } from "react-router";
// import { useRecoilState } from "recoil";
// import { CartAtom } from "../../../Recoil/atom";
// import config from "../../../Services/config";

// function OrderCartScreen() {
//   const [cart, setCart] = useRecoilState(CartAtom);

//   const [paymentMethod, setPaymentMethod] = useState(false);

//   let navigate = useNavigate();

//   const removeItem = (id) => {
//     var temp = [];
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].id != id) {
//         temp.push(cart[i]);
//       }
//     }
//     setCart(temp);
//     localStorage.setItem("pharm-box-cart", JSON.stringify(temp));
//   };
//   return (
//     <CommonScreenPage
//       headingTitle={"Cart"}
//       contentBg={"bg-gray-100"}
//       showLoading={loading}
//       showPaymentMethod={paymentMethod}
//     >
//       <div
//         className="ion-padding-x scrollable-element"
//         style={{
//           height: "70%",
//         }}
//       >
//         {cart.map((item) => (
//           <>
//             <div className="flex justify-between w-full h-20 py-2">
//               <div className="flex items-center">
//                 <img
//                   className="h-full"
//                   src={`${config.baseUrl}/${item.product_image[0]}`}
//                 />
//                 <div className="flex flex-col ml-4">
//                   <span className="font14 text-slate-600">
//                     {item.product_name}
//                   </span>
//                   <div>
//                     <span className="font12 font-semibold pl-2">
//                       Rs
//                       {parseFloat(
//                         item.product_info[0].product_price -
//                           (item.product_info[0].product_price / 100) *
//                             item.product_info[0].product_discount
//                       ).toFixed(2)}
//                     </span>
//                     <span className="font12 line-through ml-1">
//                       {item.product_info[0].product_price}
//                     </span>
//                   </div>
//                   <span className="font12 text-slate-600">
//                     {item.product_info[0].product_type}
//                   </span>
//                 </div>
//               </div>
//               <div className="ml-14">
//                 <img
//                   onClick={() => removeItem(item.id)}
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fvcEYsspnKiJbTYbMiXKHfgW94J2_gv4NQ&usqp=CAU"
//                   className="w-6"
//                 />
//                 <div className="mt-6">
//                   <button> - </button>
//                   <button> + </button>
//                 </div>
//               </div>
//             </div>
//             <hr />
//           </>
//         ))}
//       </div>

//       <div
//         className=" bg-white w-full "
//         style={{
//           height: "22%",
//         }}
//       >
//         <div className="flex justify-between bg-slate-100 items-start ion-padding">
//           <div className=" flex ">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDehGux_qQs1IgviBho1TINfNpM4J4VDKNQ&usqp=CAU"
//               style={{ width: "45px", height: "50px" }}
//             />
//             <p className="ml-2">Other</p>
//           </div>
//           <div>
//             <span className="">Change</span>
//           </div>
//         </div>
//         <div className=" ion-padding flex items-center justify-center  rounded-lg">
//           <button
//             className="py-2.5 font-bold background-primary w-full rounded-lg"
//             onClick={() => setPaymentMethod(console.log("first"))}
//           >
//             Proceed To Buy
//           </button>
//         </div>
//       </div>
//     </CommonScreenPage>
//   );
// }

// export default OrderCartScreen;
