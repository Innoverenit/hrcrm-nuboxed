
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Select ,Popconfirm} from "antd";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal, handleLeadModal,
 
   } from "../Account/AccountAction";
import {

  emptyOrders,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  deleteOrderRepairData,
  getRepairHighOrderList,
  getRepairMediumOrderList,
  getRepairLowOrderList
} from "./OrderAction";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
import { PersonAddAlt1 } from "@mui/icons-material";
import AddLeadModal from "./AddLeadModal";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import OrderSearchedData from "./OrderSearchedData";
const { Option } = Select;

function OrderTableByUserID(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    
    props.getRepairHighOrderList(props.userId, page,"High");
    props.getRepairMediumOrderList(props.userId, page,"Medium");
    props.getRepairLowOrderList(props.userId, page,"Low");
    // props.getOrderById(props.userId, page);
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
              "106",  // 'Urgent', // 0
              "660",    // 'Order', // 1
              "248",    // ' Customer', // 2
              "73",  // 'Contact', // 3
              "260",  // ' Units', // 4
              "77", // 'Owner', // 5
              "676",  // ' Supervisor',6
              "677",   // 'Lead',7
               
              "679",    // 'Created',8
              
              "108",  // "Normal"9
                 "100",     // New10
                 "1272",   // Add Lead11
                 "316",     // Notes12
                 "142",      // "Status"13
                 "920",      // "Collection"14
                 "1259",      // "Do you want to delete?15
               "84", //  Delete


          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
  useEffect(() => {
    return () => props.emptyOrders();
  }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }
  // props.getOrderById(props.userId,page);
 
  const handleLoadMore = () => {
    const callPageMapd = props.repairHighCompleteOrder && props.repairHighCompleteOrder.length &&props.repairHighCompleteOrder[0].pageCount
    setTimeout(() => {
      const {
        getRepairHighOrderList,
       
      } = props;
      if  (props.repairHighCompleteOrder)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getRepairHighOrderList(
            props.userId, page,"High"
          );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
//   const handleLoadMoreMedium = () => {
//     setPage(page + 1);
   
//     props.getRepairMediumOrderList(props.userId, page,"Medium");
// };
const handleLoadMoreMedium = () => {
  const callPageMapd = props.repairMediumCompleteOrder && props.repairMediumCompleteOrder.length &&props.repairMediumCompleteOrder[0].pageCount
  setTimeout(() => {
    const {
      getRepairMediumOrderList,
     
    } = props;
    if  (props.repairMediumCompleteOrder)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getRepairMediumOrderList(
          props.userId, page,"Medium"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};
// const handleLoadMoreLow = () => {
//     setPage(page + 1);
//     props.getRepairLowOrderList(props.userId, page,"Low");
// };
const handleLoadMoreLow = () => {
  const callPageMapd = props.repairLowCompleteOrder && props.repairLowCompleteOrder.length &&props.repairLowCompleteOrder[0].pageCount
  setTimeout(() => {
    const {
      getRepairLowOrderList,
     
    } = props;
    if  (props.repairLowCompleteOrder)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getRepairLowOrderList(
          props.userId, page,"Low"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};

  return (
    <div>
    {props.orderSearch.length > 0 ? (
      <OrderSearchedData
      orderSearch={props.orderSearch}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
      />
    ) : (
    <>
      <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]   bg-transparent font-bold sticky  z-10 max-sm:hidden">
                        <div className="font-bold font-poppins text-xs md:w-[3.54rem] text-[white] flex justify-center bg-[red]">{translatedMenuItems[0]} </div>
                        <div className="font-bold font-poppins text-xs md:w-[10rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className="font-bold font-poppins text-xs md:w-[11.6rem]">{translatedMenuItems[2]}</div>
          <div className="font-bold font-poppins text-xs md:w-[4.051rem] ">{translatedMenuItems[3]}</div>
          <div className="font-bold font-poppins text-xs md:w-[12.018rem]">{translatedMenuItems[4]}</div>
          <div className="font-bold font-poppins text-xs md:w-[6.031rem]">{translatedMenuItems[8]}</div>
          <div className="font-bold font-poppins text-xs md:w-[8.73rem]">{translatedMenuItems[5]}</div>
          <div className="font-bold font-poppins text-xs md:w-[7.8rem]">{translatedMenuItems[6]}</div>
          <div className="font-bold font-poppins text-xs md:w-[9.8rem]">{translatedMenuItems[7]}</div>
         
          <div className="md:w-24"></div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                   
                    <InfiniteScroll
          dataLength={props.repairHighCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingRepairHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          style={{ scrollbarWidth:"thin"}}
          height={"38vh"}
          endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairHighCompleteOrder.length ?
                            <>
                                {props.repairHighCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");

                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      
                                      <div>
                                         
                <div className="flex rounded justify-between max-sm:rounded-lg
               max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500
                bg-white mt-1 h-8 items-center  max-sm:h-24 max-sm:flex-col   p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center  md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class="  text-blue-500  font-poppins font-bold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                   
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex  font-bold  w-wk   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[10.43rem]">
                          <Badge size="small" count={item.count}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                        {props.user.accountInfoInd?
                        <div class="max-sm:w-full md:w-[9.02rem] font-bold">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:text-xs">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                         :null}
                      </div>
                    </div>
                    {props.user.accountInfoInd?
                    <div class="flex flex-row items-center md:w-[4.71rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                       :null}
                  
                    <div className=" flex items-center  text-xs md:w-[4.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins items-center text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>
                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex text-xs  items-center  md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex  flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row  items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />}
                      </div>
                    </div>
                  </div>
                 
                  <div className=" flex   md:w-[0.01rem] items-center max-sm:flex-row w-full max-sm:justify-between ">

                  <div class=" text-xs  font-semibold items-center font-poppins">
                    {item.noOfownerPhones}
                  </div>
                  </div>
                  <div class="rounded-full text-xs bg-white items-center  h-5 cursor-pointer w-8 justify-cente">
                  {item.orderStatus}
                  </div>
                  </div>
                  <div class="flex justify-end items-center max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   
                    
                      <div class=" text-xs  font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title={translatedMenuItems[11]}>
                          <PersonAddAlt1
                            className="!text-icon  max-sm:!text-2xl cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                    
                    </div>
                   
                      <div class=" text-xs  font-poppins">
                        <Tooltip title={translatedMenuItems[12]}>
                          <NoteAltIcon
                             className=" !text-icon cursor-pointer text-green-800 max-sm:!text-2xl"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                      <div class=" text-xs  font-poppins">
                        <Tooltip title={translatedMenuItems[13]}>
                          <EventRepeatIcon
                             className="!text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      

                    </div>
                    
                      <div class=" text-xs  font-poppins">
                        <Tooltip title={translatedMenuItems[14]}>
                          <PaidIcon
                             className="!text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
             
                   
                      <div class=" text-xs  font-poppins">
                        <Tooltip title= {translatedMenuItems[16]}>
                        <Popconfirm
                              title={translatedMenuItems[15]}
                              // "Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId,props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red] max-sm:!text-2xl"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </div>
                   


                  </div>

                </div>
                                
              </div>


                                    )
                                })}
                            </> : !props.repairHighCompleteOrder.length && !props.fetchingRepairHighOrderList ? <NodataFoundPage /> : null}
                    </InfiniteScroll>

                    {/* </div> */}

                </div>
            </div >
            
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]   bg-transparent font-bold sticky  z-10 max-sm:hidden">
           <div className="font-bold font-poppins text-xs md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">{translatedMenuItems[9]} </div>
           <div className="font-bold font-poppins text-xs md:w-[10.31rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className="font-bold font-poppins text-xs md:w-[8.6rem]">{translatedMenuItems[2]}</div>
          <div className="font-bold font-poppins text-xs md:w-[4.051rem] ">{translatedMenuItems[3]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.018rem]">{translatedMenuItems[4]}</div>
          <div className="font-bold font-poppins text-xs md:w-[6.031rem]">{translatedMenuItems[8]}</div>
          <div className="font-bold font-poppins text-xs md:w-[8.73rem]">{translatedMenuItems[5]}</div>
          <div className="font-bold font-poppins text-xs md:w-[7.8rem]">{translatedMenuItems[6]}</div>
          <div className="font-bold font-poppins text-xs md:w-[9.86rem]">{translatedMenuItems[7]}</div>
         
          <div className="md:w-24"></div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                   
                    <InfiniteScroll
          dataLength={props.repairLowCompleteOrder.length}
          next={handleLoadMoreLow}
          hasMore={hasMore}
          loader={props.fetchingRepairLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"38vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
                        {props.repairLowCompleteOrder.length ?
                            <>
                                {props.repairLowCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                       
                <div className="flex rounded justify-between max-sm:flex-col  mt-1 bg-white h-8 items-center p-1  max-sm:rounded-lg max-sm:h-[9rem]
                max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                         <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                  
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                          </Tooltip>
                    </div>
                    <div className=" flex   w-wk   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[10.43rem]">
                          <Badge size="small" count={item.count}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold"  >
                                 {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                        {props.user.accountInfoInd?
                        <div class="max-sm:w-full md:w-[7.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:text-xs font-bold">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                            :null}
                      </div>
                    </div>
                    {props.user.accountInfoInd?
                    <div class="flex flex-row items-center md:w-[4.21rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                     :null}
                     <div className=" flex  items-center md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>
                 
                  </div>
                  <div class="flex justify-end max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex text-xs items-center md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
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
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />}
                      </div>
                    </div>
                    </div>
                  
                  <div className=" flex   md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    </div>
                    <div class="flex justify-end max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title= {translatedMenuItems[11]}>
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer max-sm:!text-2xl"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </div>
                    </div>
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs  font-poppins">
                        <Tooltip title= {translatedMenuItems[12]}>
                          <NoteAltIcon
                            className=" !text-icon cursor-pointer text-green-800 max-sm:!text-2xl"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>

                  
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title= {translatedMenuItems[13]}>
                          <EventRepeatIcon
                            className="!text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title= {translatedMenuItems[14]}>
                          <PaidIcon
                            className="!text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title= {translatedMenuItems[16]}>
                        <Popconfirm
                              title= {translatedMenuItems[15]}
                               onConfirm={() => props.deleteOrderRepairData(item.orderId,props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red] max-sm:!text-2xl"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </div>
                    </div>


                  </div>

                </div>
                             
              </div>


                                    )
                                })}
                            </> : !props.repairLowCompleteOrder.length && !props.fetchingRepairLowOrderList ? <NodataFoundPage /> : null}
                    </InfiniteScroll>

                    {/* </div> */}

                </div>
            </div >
      <AddNotesOrderDrawer
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
      <AddLeadModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        particularRowData={particularRowData}
        addLeadInOrder={props.addLeadInOrder}
        handleLeadModal={props.handleLeadModal}
      />
      <StatusOfOrderModal
       selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
        handleStatusOfOrder={props.handleStatusOfOrder}
        addStatusOfOrder={props.addStatusOfOrder}
        particularRowData={particularRowData}
      />
      <PaidButtonModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        type={props.type}
        addPaidButtonModal={props.addPaidButtonModal}
        handlePaidModal={props.handlePaidModal}
        particularRowData={particularRowData}
      />
      <AccountOrderDetailsModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal} />
    </>
  )}
  </div>
  );



}

const mapStateToProps = ({ order, auth, distributor }) => ({
  allOrderList: order.allOrderList,
  repairHighCompleteOrder:order.repairHighCompleteOrder,
  fetchingRepairHighOrderList:order.fetchingRepairHighOrderList,
  repairMediumCompleteOrder:order.repairMediumCompleteOrder,
  fetchingRepairMediumOrderList:order.fetchingRepairMediumOrderList,
  repairLowCompleteOrder:order.repairLowCompleteOrder,
  fetchingRepairLowOrderList:order.fetchingRepairLowOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  departmentUser: distributor.departmentUser,
  fetchingOrderByIdError: distributor.fetchingOrderByIdError,
  fetchingOrderById: distributor.fetchingOrderById,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addLeadInOrder: distributor.addLeadInOrder,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  orderShowById: distributor.orderShowById,
  orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOrderById,
      getRepairHighOrderList,
      getRepairMediumOrderList,
      getRepairLowOrderList,
      emptyOrders,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      handleOrderDetailsModal,
      handleLeadModal,
      deleteOrderRepairData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableByUserID);
