// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import dayjs from "dayjs";
// import { Tooltip} from "antd";
// import {
//   MultiAvatar,
//   MultiAvatar2,
// } from "../../../../Components/UI/Elements";
// import { Link } from 'react-router-dom';
// import { getDeletedCustomers } from "../../CustomerAction";

// function CustomerDeletecard(props) {


//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

  

//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         setLoading(true); 
//         const itemsToTranslate = [

//    "110", // 'Name', // 0
//    "378",// 'Work', // 1
//    "278",// 'Sector', // 2
//    "279",// 'Source', // 3
//    "213",// 'Quotation', // 4
//    "328",// 'PipeLine', // 5
//    "76",// 'Assigned', // 6 
//    "248",// 'Customer', // 7
//     "100",   // new 8
//     "1300" , //  Change status to Customer?"9
//     "213" ,  // "Opportunity"10
//     "392" ,  // Pulse 11
//     "316" ,  // "Notes"12
//     "170" ,  // "Edit" 13
//    "73", // Contact 14
//    "144" ,//In Progress 15
//    "387",//  Convert 16
//    "389",//   Converted 17
//    "1581" //Score 18
//         ];

//         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);

//   useEffect(() => {
//     props.getDeletedCustomers();
// }, []);
// const {  deletedCustomers } = props;
// const [ setCurrentCustomerId] = useState("");
// function handleSetCurrentCustomerId(customerId) {
//     setCurrentCustomerId(customerId);
// }

//   return (
//     <>
    
//       <div className=' flex  sticky  z-auto'>
//         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//           <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky z-10">
//             <div class=" flex justify-between font-poppins w-[89%]">
//             <div className="font-poppins font-bold text-xs w-[15.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
//             {translatedMenuItems[0]}
//            {/* name */}
//             </div>
//             <div className="font-poppins  font-bold text-xs  w-[8.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
//             {translatedMenuItems[1]}
//              {/* work */}
//             </div>
//             <div className="font-poppins font-bold text-xs  w-[9.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
//             {translatedMenuItems[2]}
//               {/* "Sector" */}
          
//             </div>
//             <div className="font-poppins font-bold text-xs  w-[12.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
//             {translatedMenuItems[3]}
//              {/* "Source" */}
         
//             </div>         
//             <div className="font-poppins font-bold text-xs w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
//             {translatedMenuItems[4]}
//               {/* Quotation" */}
     
//             </div>
//             <div className="font-poppins font-bold text-xs  w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
//             {translatedMenuItems[5]}
//              {/* Pipeline" */}
//             </div>   
//             {props.user.aiInd && (
//             <div className="font-poppins font-bold text-xs w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
//             {/* Score */}
//             {translatedMenuItems[18]}
//             </div>
//             )}    
//             <div className="font-poppins font-bold text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
//             {translatedMenuItems[6]}
//             {/* Assigned */}
//             </div>          
//             <div className="font-poppins font-bold text-xs w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
//             {translatedMenuItems[7]}
//               {/* Customer" */}
          
//             </div>
         
//             </div>
           

//           </div>
//           {deletedCustomers.map((item) => {
//                const currentdate = dayjs().format("DD/MM/YYYY");
//                        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//               return (
//                 <div>
//                   <div
//                 className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
//               >
//                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
//                       <div className=" flex  w-[13rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
//                         <div className="flex max-sm:w-auto">
//                           <div>
//                             {/* <Tooltip title={item.name}> */}
//                             <MultiAvatar
//                               primaryTitle={item.name}
//                               imageId={item.imageId}
//                               imageURL={item.imageURL}
//                               imgWidth={"1.8rem"}
//                               imgHeight={"1.8rem"}
//                             />
//                             {/* </Tooltip> */}
//                           </div>
//                           <div class="w-[4%]"></div>

//                           <div class="max-sm:w-full flex items-center">
//                             <Tooltip>
//                               <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
//                                 <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

//                                   <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
//                                     {item.name}
//                                   </Link>

//                                   &nbsp;&nbsp;
//                                   {date === currentdate ? (
//                                     <div class="text-[0.65rem] mt-[0.4rem] text-[tomato] font-bold"
//                                     >
//                                       {translatedMenuItems[8]}
//                                     </div>
//                                   ) : null}
//                                   {/* <a class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[blue] cursor-pointer" 
//                             href={`customer/${item.customerId}`}>{item.name} </a>
//                               &nbsp;&nbsp;
//         {date === currentdate ? (
//           <div class="text-xs"
//             style={{
//               color: "tomato",
//               fontWeight: "bold",
//             }}
//           >
//             New
//           </div>
//         ) : null}
//         */}
//                                 </div>
//                               </div>
//                             </Tooltip>
//                           </div>
//                         </div>
//                       </div>
//                       <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


//                         <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//                         {
  
//   (item.countryDialCode !== null && item.countryDialCode !== undefined) && 
//   (item.phoneNumber !== null && item.phoneNumber !== undefined) ?

 
//   `${item.countryDialCode} ${item.phoneNumber}` :

  
//   (item.phoneNumber !== null && item.phoneNumber !== undefined) ?
//   `${item.phoneNumber}` : 
//   '' 
// }

//                           {/* {
//                           `${item.countryDialCode} ${item.phoneNumber}`
//                           } */}
//                         </div>

//                       </div>
//                       <div className=" flex  items-center max-sm:w-auto  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
//                     {/* Sector  */}
//                         <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//                           {item.sector}
//                         </div>

//                       </div>
//                     </div>
//                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
//                       <div className=" flex max-sm:w-auto  items-center  w-[5.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


//                         <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//                           {item.source}
//                         </div>

//                       </div>
//                       <div className=" flex max-sm:w-auto  items-center  w-[5.1rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
//                   {/* Country */}
//                         <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//                           {/* <CountryFlag1 countryCode={countryCode} /> */}
//                           {/* &nbsp;
//                           {countryCode} */}
//                         </div>
//                       </div>
//                       <div className=" flex items-center  max-sm:w-auto w-[6.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
//                      {/* Pipeline Value */}

//                         <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//                           {item.oppNo}

//                         </div>
//                       </div>
                    
                   
//                       <div className=" flex max-sm:w-auto w-[2.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
//                        {/* Pipeline Value */}

//                         {/* {item.totalProposalValue > 0 && (
//       <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//         {`${item.userCurrency} ${item.totalProposalValue}`}
//       </div>
//     )} */}
//                             {item.totalProposalValue && (
//       <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
//       {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
//       </div>
//     )}
//                       </div> 
//                       </div>
//                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">  
//                       {props.user.aiInd && (
//            <div className=" flex  justify-center  w-[9.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
//          {item.noteScoreInd}
          
//             </div>
//             )}               
//                       <div className=" flex items-center max-sm:w-auto   w-[4rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
//                         {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned</div> */}

//                         <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

//                           <div>
//                             {item.assignedTo === null ? (
//                               <div class="text-xs  font-poppins">No Data</div>
//                             ) : (
//                               <>
//                                 {item.assignedTo === item.ownerName ? (

//                                   null
//                                 ) : (
//                                   <MultiAvatar2
//                                     primaryTitle={item.assignedTo}
//                                     imgWidth={"1.8rem"}
//                                     imgHeight={"1.8rem"}
//                                   />
//                                 )}
//                               </>
//                             )}
//                           </div>

//                         </div>
//                       </div>
          
              
                      
//                       </div>
                     
//                 </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
  
 
//     </>
//   );
// }

// const mapStateToProps = ({
//   auth,
//   customer

// }) => ({
//     deletedCustomers: customer.deletedCustomers,
//     userId: auth.userDetails.userId,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getDeletedCustomers
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(CustomerDeletecard);