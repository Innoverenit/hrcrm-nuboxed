import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getRepairDashboardOrderAdded,getRepairDashboardOrderOpen,
    getRepairDashboardOrderClose,getRepairDashboardOrderCancelled } from "../../DashboardAction";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Badge,Select } from "antd";
import dayjs from "dayjs";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";


// const actionCreators = {
//     Added: getRepairDashboardOrderAdded,
//     Open: getRepairDashboardOrderOpen,
//     Closed: getRepairDashboardOrderClose,
//     Cancelled: getRepairDashboardOrderCancelled
//   };

function FinaceRapairDrawerCard (props) {

  // const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

      // useEffect(()=> {
      //   if(props.buttonName==="My View"){
      //   if (props.timeRangeType === "today"){
      //     props.fetchOrdersData(props.userId,props.endDate,props.startDate,page);
      //   }
      //   else {
      //     props.fetchOrdersData(props.userId,props.endDate,props.startDate,page); 
      //   }}
      //   else if (props.buttonName==="Enterprise"){
      //     if (props.timeRangeType === "today"){
      //       props.fetchOrdersData(props.orgId,props.endDate,props.startDate,page);
      //     }
      //     else {
      //       props.fetchOrdersData(props.orgId,props.endDate,props.startDate,page); 
      //     }
      //   }

      // }, [props.userId,props.orgId,props.endDate,props.startDate,props.type]);


      // const handleLoadMore = () => {
      //   const proPag = props.ordersData && props.ordersData.length && props.ordersData[0].pageCount
      //   setTimeout(() => {
      //     if (props.ordersData) {
      //       if (page < proPag) {
      //         setPage(page + 1);
      //         props.fetchOrdersData(props.userId,props.endDate,props.startDate,page);
      //       }
      //       if (page === proPag) {
      //         props.setHasMore(false)
      //       }
      //     }
      //   }, 100);
      // };


  return (
   <>
     <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
      <div className="text-xs font-poppins font-bold md:w-[3.25rem] text-[white] flex justify-center bg-[red]">Urgent </div>
          <div className="text-xs font-poppins font-bold md:w-[10.31rem] ml-2">Order ID</div>
          <div className="text-xs font-poppins font-bold md:w-[8.6rem]">Customer</div>
          <div className="text-xs font-poppins font-bold md:w-[4.051rem] ">Contact</div>
          <div className="text-xs font-poppins font-bold md:w-[5.01rem]">Units</div>
          <div className="text-xs font-poppins font-bold md:w-[5.031rem]">Owner</div>
          <div className="text-xs font-poppins font-bold md:w-[5.2rem]">Supervisor</div>
          <div className="text-xs font-poppins font-bold md:w-[5.06rem]">Lead</div>
          <div className="text-xs font-poppins font-bold md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
        </div>
       
        {/* <InfiniteScroll
            dataLength={props.modalData.length}
            // next={handleLoadMore}
            hasMore={props.hasMore}
            // loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
            height={"85vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
          >
            <> */}
              {props.modalData.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");

                const diff = Math.abs(
                  dayjs().diff(dayjs(item.lastRequirementOn), "days")
                );
                const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                  } 
                   Street : ${item.address && item.address.length && item.address[0].street
                  }   
                  State : ${item.address && item.address.length && item.address[0].state
                  }
                 Country : ${(item.address &&
                    item.address.length &&
                    item.address[0].country) ||
                  ""
                  } 
                   PostalCode : ${item.address &&
                  item.address.length &&
                  item.address[0].postalCode
                  } `;
                return (
                  <div>
              <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                  <div class="flex">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex  w-wk     max-sm:w-full">
                      <div className="flex max-sm:w-full">
                        <div class="w-[9.43rem]">
                        <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs"
                              // onClick={() => {
                              //   handleSetParticularOrderData(item);
                              //   props.handleOrderDetailsModal(true);
                              // }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.21rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>


                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />

                    </div>



                  </div>
                  <div class=" flex">
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row items-center md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        
                      </div>
                    </div>
                     </div>
                  <div className=" flex text-xs md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                  

                 
                  
                 

                   


                  </div>

                </div>
              </div>
                );
              })}
            {/* </> 

            </InfiniteScroll> */}
           
   
      </div>
      </div>
   </>
  )
}


const mapStateToProps = ({ auth, dashboard }) => ({
    userId: auth.userDetails.userId,
    user: auth.userDetails,
    // repairDashboardOrderAdded:dashboard.repairDashboardOrderAdded,
    orgId: auth.userDetails.organizationId,
  
  });
  const mapDispatchToProps = (dispatch,ownProps) => {
    // const fetchOrdersData = actionCreators[ownProps.type];

     return bindActionCreators(
      {
        // fetchOrdersData,
        // getRepairDashboardOrderAdded,
        // getRepairDashboardOrderOpen,
      
      },
      dispatch
    )};
  export default connect(mapStateToProps, mapDispatchToProps)(FinaceRapairDrawerCard );



//   import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import RepairValuePieChart from "../JumpStart/RepairValuePieChart"
// import RepairVolumePieChart from "../JumpStart/RepairVolumePieChart"
// import { JumpStartBox,  } from "../../../../Components/UI/Elements";
// import {
//   getFinaceOrderDetails,
//   getRepairDashboardOrderAdded,getRepairDashboardOrderOpen,
//     getRepairDashboardOrderClose,getRepairDashboardOrderCancelled   
// } from "../../DashboardAction";
// import FinaceRapairDrawer from "./FinaceRapairDrawer";
// import CustomerPieChart from "./CustomerPieChart";
// import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
// import axios from "axios";
// import { base_url2 } from "../../../../Config/Auth";


// function DashboardFinanceJumpstart(props) {

// const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentOrderType, setCurrentOrderType] = useState("");
//   const [modalData, setModalData] = useState([]);
//   const [hasMore, setHasMore] = useState(true);

//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         setLoading(true); 
//         const itemsToTranslate = [
//     "1229",  //  ""Orders Added" // 0
//      "1230", // "Orders Open" // 1
//         "1231",    // "Orders Closed"
//         "1232",    // "Orders  Cancelled"
//         // "",    // By Order Value
//         // "",    // By Order Volume

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
//      props.getFinaceOrderDetails(props.orgId,props.timeRangeType)
//   }, [props.timeRangeType]);
//   console.log(props.timeRangeType)


//   useEffect(() => {
//     if(props.buttonName==="My View"){
//       props.getFinaceOrderDetails(props.userId,props.timeRangeType)

//     } else if(props.buttonName==="Enterprise"){
//     props.getFinaceOrderDetails(props.orgId,props.timeRangeType)
//     }
//  }, [props.buttonName,props.orgId,props.userId,props.timeRangeType]);

// // const openModal = (type) => {
// //     setOrderType(type);
// //     setModalVisible(true);
// //     // fetchOrdersData(type, 0); 
// //   };

// //   const closeModal = () => {
// //     setModalVisible(false);
// //   };

//   // const fetchOrdersData = (type, page) => {
//   //   const fetchOrders = {
//   //     Added: props.getRepairDashboardOrderAdded,
//   //     Open: props.getRepairDashboardOrderOpen,
//   //     Closed: props.getRepairDashboardOrderClose,
//   //     Cancelled: props.getRepairDashboardOrderCancelled
//   //   }[type];

//   //   if (typeof fetchOrders !== 'function') {
//   //     console.error('Invalid fetchOrders type:', type);
//   //     return; 
//   //   }

//   //   if(props.buttonName==="My View"){
//   //   fetchOrders(props.orgId, props.endDate,props.startDate,page)
//   //     .then(data => {
//   //       setOrdersData(data.orders);
//   //       setHasMore(data.hasMore);
//   //     });}
//   //     else if(props.buttonName==="Enterprise") {
//   //       fetchOrders(props.orgId, props.endDate,props.startDate,page)
//   //       .then(data => {
//   //         setOrdersData(data.orders);
//   //         setHasMore(data.hasMore);
//   //       });}
//   // };
  
//   const [RepairOrderAdded, setRepairOrderAdded] = useState([]);
//   const [loading1, setLoading1] = useState(false);
//   const [error1,setError1]=useState(null);

//     const fetchRepairOrderAdded= async () => {
//       try {
//         const response = await axios.get(`${base_url2}/dashboard/allOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
//           headers: {
//             Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//           },
//         });
//         setRepairOrderAdded(response.data);
//         setLoading1(false);
//       } catch (error) {
//         setError1(error);
//         setLoading1(false);
//       }
//     };

//     const [RepairOrderOpen, setRepairOrderOpen] = useState([]);
//     const [loading2, setLoading2] = useState(false);
//     const [error2,setError2]=useState(null);
  
//       const fetchRepairOrderOpen= async () => {
//         try {
//           const response = await axios.get(`${base_url2}/dashboard/inCompleteOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
//             headers: {
//               Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//             },
//           });
//           setRepairOrderOpen(response.data);
//           setLoading2(false);
//         } catch (error) {
//           setError2(error);
//           setLoading2(false);
//         }
//       };

//       const [RepairOrderClosed, setRepairOrderClosed] = useState([]);
//       const [loading3, setLoading3] = useState(false);
//       const [error3,setError3]=useState(null);
    
//         const fetchRepairOrderClosed= async () => {
//           try {
//             const response = await axios.get(`${base_url2}/dashboard/completeOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
//               headers: {
//                 Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//               },
//             });
//             setRepairOrderClosed(response.data);
//             setLoading3(false);
//           } catch (error) {
//             setError3(error);
//             setLoading3(false);
//           }
//         };
//         const [RepairOrderCancelled, setRepairOrderCancelled] = useState({});
//         const [loading4, setLoading4] = useState(false);
//         const [error4,setError4]=useState(null);
      
//           const fetchRepairOrderCancelled= async () => {
//             try {
//               const response = await axios.get(`${base_url2}/dashboard/allDeletelOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
//                 headers: {
//                   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//                 },
//               });
//               setRepairOrderCancelled(response.data);
//               setLoading4(false);
//             } catch (error) {
//               setError4(error);
//               setLoading4(false);
//             }
//           };

//   useEffect(() => {
//     if (RepairOrderAdded) {
//       setModalData(RepairOrderAdded);
//     }
//   }, [RepairOrderAdded]);

//   useEffect(() => {
//     if (RepairOrderOpen) {
//       setModalData(RepairOrderOpen);
//     }
//   }, [RepairOrderOpen]);

//   useEffect(() => {
//     if (RepairOrderClosed) {
//       setModalData(RepairOrderClosed);
//     }
//   }, [RepairOrderClosed]);

//   useEffect(() => {
//     if (RepairOrderCancelled) {
//       setModalData(RepairOrderCancelled);
//     }
//   }, [RepairOrderCancelled]);

  
//   const handleClick = (type) => {
//     setCurrentOrderType(type);
//     setIsModalOpen(true);

//     switch(type) {
//       case 'Added':
//         fetchRepairOrderAdded(props.orgId,props.endDate,props.startDate,"0");
//         break;
//       case 'Open':
//         fetchRepairOrderOpen(props.orgId,props.endDate,props.startDate,"0");
//         break;
//       case 'Closed':
//         fetchRepairOrderClosed(props.orgId,props.endDate,props.startDate,"0");
//         break;
//       case 'Cancelled':
//         fetchRepairOrderCancelled(props.orgId,props.endDate,props.startDate,"0");
//         break;
//       default:
//         break;
//     }
//   };


//   return (
//     <>
//       <div class=" flex flex-col" >
//         <div class=" flex w-full" >
          
//           <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
//                      <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
//                          <div class="flex flex-row items-center text-xs">
//                              <div class="flex-shrink pr-3">
//                                  <div class="rounded-full p-2 bg-green-600"><DynamicFeedIcon className="text-white"/></div>
//                              </div>
//                              <JumpStartBox
//               bgColor="linear-gradient(270deg,#F15753,orange)"
//               noProgress
//               title={translatedMenuItems[0]}
//               jumpstartClick={() => handleClick("Added")}
//               cursorData={"pointer"}
//               value={props.finaceOrderinDashboard.totalOrder}
//              isLoading={props.fetchingFinaceorderDetails}
//             /> 
//                          </div>
//                      </div>
//                      </div>
                
//                  <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
//                        <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
//                            <div class="flex flex-row items-center text-xs">
//                                <div class="flex-shrink pr-3">
//                                    <div class="rounded-full p-2 bg-pink-600"><DynamicFeedIcon className="text-white"/></div>
//                                </div>
//                                <JumpStartBox
//             bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
//               noProgress
//               title={translatedMenuItems[1]}
//               jumpstartClick={() => handleClick("Open")}
//               cursorData={"pointer"}
//             value={ props.finaceOrderinDashboard.pendingOrder}
//             isLoading={props.fetchingFinaceorderDetails}
//             />
//                            </div>
//                        </div>
                    
//                    </div>  
//                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
//                        <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494]  rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
//                            <div class="flex flex-row items-center text-xs">
//                                <div class="flex-shrink pr-3">
//                                    <div class="rounded-full p-2 bg-yellow-600"><DynamicFeedIcon className="text-white"/></div>
//                                </div>
//                                <JumpStartBox
//            bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
//               noProgress
//               title={translatedMenuItems[2]}
             
//               jumpstartClick={() => handleClick("Closed")}
//               cursorData={"pointer"}
//               value={props.finaceOrderinDashboard.completeOrder}
//               isLoading={props.fetchingFinaceorderDetails}
//             />
//                            </div>
//                        </div>
                     
//                    </div>  
//                    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
//                       <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
//                           <div class="flex flex-row items-center text-xs">
//                               <div class="flex-shrink pr-3">
//                                   <div class="rounded-full p-2 bg-blue-600"><DynamicFeedIcon className="text-white"/></div>
//                               </div>
//                               <JumpStartBox
//                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
//               noProgress
//               title={translatedMenuItems[3]}
//               jumpstartClick={() => handleClick("Cancelled")}
//               cursorData={"pointer"}
//               value={props.finaceOrderinDashboard.cancelOrder}
//               isLoading={props.fetchingFinaceorderDetails}
//             />
//                           </div>
//                       </div>
                     
//                   </div>
            
//         </div>

//         <div class=" mt-1 flex flex-row justify-between" >
//         <div>
//         <div class=" font-poppins font-bold text-base ">By Order Value</div>
//         <RepairValuePieChart/>
//         </div>
//         <div>
//         <div class=" font-poppins font-bold text-base ">By Order Volume</div>
//         <RepairVolumePieChart/>
//         </div>
//       </div>
//       </div>


// <FinaceRapairDrawer
//      selectedLanguage={props.selectedLanguage}
//      translateText={props.translateText}
//      isModalOpen={isModalOpen}
//      setIsModalOpen={() => setIsModalOpen(false)}
//      modalData={modalData}
//      title={currentOrderType}
//         hasMore={hasMore}
//         setHasMore={setHasMore}
//         buttonName={props.buttonName}
//       />
//     </>

//   );
// }
// const mapStateToProps = ({ dashboard, auth }) => ({
//   user: auth.userDetails,
//   orderinDashboard: dashboard.orderinDashboard,
//   orgId: auth.userDetails.organizationId,
//   fetchingJumpOrderCount: dashboard.fetchingJumpOrderCount,
//   userId: auth.userDetails.userId,
//   finaceOrderinDashboard: dashboard.finaceOrderinDashboard,
//   fetchingFinaceorderDetails: dashboard.fetchingFinaceorderDetails,
//   timeRangeType: dashboard.timeRangeType,
//   repairDashboardOrderAdded:dashboard.repairDashboardOrderAdded,
//   repairDashboardOrderOpen:dashboard.repairDashboardOrderOpen,
//   repairDashboardOrderCancelled:dashboard.repairDashboardOrderCancelled,
//   repairDashboardOrderClose:dashboard.repairDashboardOrderClose,
//   startDate: dashboard.startDate,
//   endDate:dashboard.endDate,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getFinaceOrderDetails,
//       getRepairDashboardOrderAdded,getRepairDashboardOrderOpen,
//     getRepairDashboardOrderClose,getRepairDashboardOrderCancelled
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DashboardFinanceJumpstart);
