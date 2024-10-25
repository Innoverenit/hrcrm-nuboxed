
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import relativeTime from 'dayjs/plugin/relativeTime';
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import OrderSearchedData from "./OrderSearchedData";
const { Option } = Select;

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
  const now = dayjs();
  const creationDay = dayjs(creationDate);

  if (creationDay.isSame(now, 'day')) {
      return 'Today';
  } else {
      return creationDay.from(now); 
  }
};

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
              // 1
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
const exportPDFAnnexure = async () => {
  var doc = new jsPDF();

  var name1 = `East Repair Inc `
  var name2 =`1912 Harvest Lane New York ,NY 12210`
  var name3 =`BILL TO`
  var name4 = `SHIP TO`
  var name5 = ` ORDER #`
  var name6 = `ORDER DATE`
  var name7 = `P.O.#`
  var name8 = `Order Total`
  var name9 = `QTY`
  var name10 = `DESCRIPTION`
  var name11 = `UNIT PRICE`
  var name12 = `AMOUNT`
  var name13= `TERM & CONDITIONS`
  var name14= `Payement id due within 15 days`
  var name15= `Please make checks payble to: East repair Inc. `


  doc.setFont("Montserrat");
  doc.setFillColor(62, 115, 185);
  doc.rect(0, 0, 230, 13, 'F');
  doc.setFontSize(25);
  doc.setFontSize(14);
  doc.setDrawColor(0, 0, 0)
  // doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
  doc.text(name1, 8, 25);
  doc.setFontSize(10);
  let yPosition = 32;

  doc.setFontSize(12);
  doc.text(name3, 8, 50);
  doc.text(name4, 60, 50);
  doc.text(name5, 120, 50);
  doc.text(name6, 120, 58);
  doc.text(name7, 120, 66);
  doc.line(8, 80, 200, 80);
  doc.setFontSize(22);
  doc.text(name8, 8, 90);
  doc.line(8, 100, 200, 100);
  doc.setFontSize(10);
  doc.text(name9, 8, 110);
  doc.text(name10, 30, 110);
  doc.text(name11, 90, 110);
  doc.text(name12, 140, 110);
  doc.setFontSize(12);
  doc.text(name13, 8, 250);
  doc.setFontSize(9);
  doc.text(name14, 8, 260);
  doc.text(name15, 8, 270);
  //footer
  doc.setFillColor(62, 115, 185);
  doc.rect(0, 276, 230, 15, 'F');

  doc.save("Orders.pdf")

}
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
                    <div className=" flex  w-[100%]   bg-transparent  sticky  z-10 max-sm:hidden">
                    <div class=" flex justify-between  text-xs font-poppins  font-bold  w-[96%]  ">
                        <div className="w-[3.54rem] md:w-[5.54rem] items-center  text-[white] flex justify-center bg-[red]">{translatedMenuItems[0]} </div>
                        <div className="flex items-center text-[#00A2E8] text-base w-[4rem] md:w-[5rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className="flex items-center w-[10.6rem] md:w-[5.6rem]">{translatedMenuItems[2]}</div>
          <div className="flex items-center w-[2.051rem] md:w-[3.051rem] ">{translatedMenuItems[3]}</div>
          <div className="flex items-center w-[2.018rem] md:w-[10.018rem]">{translatedMenuItems[4]}</div>      
          <div className="flex items-center w-[5.73rem] md:w-[1.73rem]">{translatedMenuItems[5]}</div>
          <div className="flex items-center w-[5.8rem] md:w-[2.8rem]">{translatedMenuItems[6]}</div>
          <div className="flex items-center w-[9.8rem] md:w-[21.8rem]">{translatedMenuItems[7]}</div>               
          </div>
                    </div>                           
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
                bg-white mt-1 h-8 items-center  max-sm:h-24 max-sm:    scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center  md:w-[4.26rem] max-sm:w-full border-l-2 border-green-500 bg-[#eef2f9] justify-center  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-center w-full md:">
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
                    <div className=" flex  font-bold  max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]  items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                          <Badge size="small" count={item.count}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] ml-gap font-bold text-xs "
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold" >
                                {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                        {props.user.accountInfoInd?
                        <div class="max-sm:w-full md:w-[11.02rem] font-bold  items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between ml-gap flex md:text-xs">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                         :null}
                      </div>
                    </div>
                    {props.user.accountInfoInd?
                    <div class="flex flex-row items-center md:w-[5.71rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
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
                  
                    <div className=" flex items-center  text-xs md:w-[5.31rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins items-center text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>
                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                  <div class="flex  flex-row  items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row   items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row  items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[6.04rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />}
                      </div>
                    </div>
                  </div>
                 
                  <div className=" flex   md:w-[5.05rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">

                  <div class=" text-xs  font-semibold items-center font-poppins">
                    {item.noOfownerPhones}
                  </div>
                  </div>
                  <div class="  md:w-[6.06rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  text-xs  cursor-pointer w-8 flex ">
                  {item.status}
                  </div>
                  </div>
                  <div class="flex  items-center bg-[#eef2f9]  max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   
                  <div class="  items-center ml-gap flex">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </span>
          </div>            
                      <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
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
                   
                      <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
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

                      <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
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
                    
                      <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
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
             
                   
                      <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
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
                <div className=" flex  w-[100%]   bg-transparent  sticky  z-10 max-sm:hidden">
                    <div class=" flex justify-between  text-xs font-poppins  font-bold  w-[96%]  ">
                        <div className="w-[3.54rem] items-center md:w-[5.54rem]  text-[white] flex justify-center bg-[blue]">{translatedMenuItems[9]} </div>
                        <div className="flex items-center text-[#00A2E8] text-base w-[4rem] md:w-[5rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className="flex items-center w-[10.6rem] md:w-[5.6rem]">{translatedMenuItems[2]}</div>
          <div className="flex items-center w-[2.051rem] md:w-[3.051rem] ">{translatedMenuItems[3]}</div>
          <div className="flex items-center w-[2.018rem] md:w-[10.018rem]">{translatedMenuItems[4]}</div>      
          <div className="flex items-center w-[5.73rem] md:w-[1.73rem]">{translatedMenuItems[5]}</div>
          <div className="flex items-center w-[5.8rem] md:w-[2.8rem]">{translatedMenuItems[6]}</div>
          <div className="flex items-center w-[9.8rem] md:w-[21.8rem]">{translatedMenuItems[7]}</div>               
          </div>
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
                                       
                <div className="flex rounded justify-between max-sm:  mt-1 bg-white h-8 items-center   max-sm:rounded-lg max-sm:h-[9rem]
                max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full border-l-2 border-green-500 bg-[#eef2f9] justify-center ">
                         <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-center w-full md:">
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
                    <div className=" flex max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]  items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                          <Badge size="small" count={item.count}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] ml-gap font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold"  >
                                 {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                        {props.user.accountInfoInd?
                        <div class="max-sm:w-full md:w-[11.02rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] font-bold">
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
                    <div class="flex flex-row items-center md:w-[5.71rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
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
                     <div className=" flex  items-center md:w-[5.31rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>
                 
                  </div>
                  <div class="flex justify-end max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                  <div class="flex flex-row items-center md:w-[6.03rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center md:w-[6.02rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[6.04rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />}
                      </div>
                    </div>
                    </div>
                  
                  <div className=" flex   md:w-[5.05rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="flex  md:w-[6.06rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] text-xs  h-5 cursor-pointer w-8 justify-cente">
                    {item.status}
                    </div>
                    </div>
                    <div class="flex justify-end max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </span>
          </div>            
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
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
                      <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
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
                      <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
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
                      <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
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
                      <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
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
