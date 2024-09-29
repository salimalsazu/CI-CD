// "use client";
// import { useGetAvailableBarCodeQuery } from "@/redux/api/features/kids/barCodeApi";
// import SecondStep from "./SecondStep";
// import { useDebounced } from "@/redux/hooks";
// import { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { Button } from "rsuite";

// const CreateKidAllStep = () => {
//   const query: Record<string, any> = {};
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const debouncedTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 300,
//   });

//   if (!!debouncedTerm) {
//     query["code"] = debouncedTerm;
//   }

//   const { data, isLoading, isError, error, isSuccess, isFetching } =
//     useGetAvailableBarCodeQuery(
//       { ...query }
//       // {
//       //   skip: !searchTerm,
//       // }
//     );

//   const [step, setStep] = useState(0);

//   return (
//     <div className="md:max-w-screen-md md:mx-auto min-h-screen">
//       <div className="pt-10 pb-5">
//         {step === 0 && (
//           <div>
//             <div>
//               <h2 className="text-center text-4xl font-bold">
//                 Create New Kid{" "}
//               </h2>
//               <p className="pt-2 px-4 text-base text-center text-gray-500">
//                 Step one: Enter the code on the back of your ETPhoneHome. For
//                 example,
//                 <br /> if the link on your ETPhoneHome is
//                 etphonehome.co/tag/aBc123, your code is aBc123.
//               </p>
//               {/* search form */}
//               <div className="mt-5">
//                 <label className="text-base mb-2 block px-5 font-semibold">
//                   Type product code
//                 </label>
//                 <div className="relative  px-5">
//                   <input
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onBlur={(e) => setSearchTerm(e.target.value)}
//                     name="email"
//                     type="text"
//                     required
//                     className="w-full bg-transparent font-bold text-md border-2 rounded-lg focus:border-cyan-400 px-3 py-3 outline-none"
//                     placeholder="Enter code"
//                   />
//                   <div className="h-10">
//                     <p className="mt-2">
//                       {!isSuccess && isError && error && (
//                         <span className="text-red-600 text-sm">
//                           {
//                             // @ts-ignore
//                             error.message
//                           }
//                         </span>
//                       )}
//                       {!isError &&
//                         isSuccess &&
//                         data &&
//                         !isLoading &&
//                         debouncedTerm &&
//                         !isFetching &&
//                         data?.message && (
//                           <span className="text-green-700 text-sm">
//                             {data?.message}
//                           </span>
//                         )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <p className="pt-2 text-sm px-5 text-gray-500 ">
//                   {`Note: if you're having trouble, simply scan the QR code on the back of
//         your E.T.Phone home with your phone's camera (please use your phone's native
//         camera app), and follow the link!`}
//                 </p>
//               </div>
//             </div>
//             <div className="flex justify-end mt-10">
//               <Button
//                 loading={isLoading || isFetching}
//                 className=" !bg-[#29aae1] !p-5 !text-white hover:!bg-[#38addf]  !shadow-xl  !rounded-full !transition-all !duration-300 !ease-in-out "
//                 onClick={() => setStep(1)}
//                 disabled={!!isError && !!error}
//               >
//                 <span>
//                   <FaArrowRight size={25} />
//                 </span>
//               </Button>
//             </div>
//           </div>
//         )}

//         {step === 1 && <SecondStep barCode={searchTerm} setStep={setStep} />}
//       </div>
//     </div>
//   );
// };

// export default CreateKidAllStep;
