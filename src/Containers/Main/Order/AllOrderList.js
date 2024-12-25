
import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Badge,Select } from "antd";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import {  base_url2 } from "../../../Config/Auth";
import DateRangeIcon from '@mui/icons-material/DateRange';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import {
  // getAllOrderList,
  getAllHighOrderList,
  getAllMediumOrderList,
  getAllLowOrderList,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  emptyOrders,
  deleteOrderRepairData
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { PersonAddAlt1 } from "@mui/icons-material";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { MultiAvatar2,MultiAvatar } from "../../../Components/UI/Elements";
import axios from "axios";


const AddNotesOrderDrawer=lazy(()=>import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"));
const StatusOfOrderModal=lazy(()=>import("../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal"));
const PaidButtonModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal"));
const OrderSearchedData = lazy(() => import("./OrderSearchedData"));
const { Option } = Select;
function AllOrderList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [lead, setLead] = useState("")
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
  "676",  // ' Supervisor',
  "677",   // 'Lead', 
   
  "679",    // 'Created',
  
  "108",  // "Normal"
  "100",     // New10
  "1380",   // Add supervisor11
  "316",     // Notes12
  "142",      // "Status"13
  "920",      // "Collection"14
  "85", // Add15
  "1079"// Cancel16

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
    setPage(page + 1);
    // props.getAllOrderList(props.orgId, page);
    props.getAllHighOrderList(props.orgId,page,"High");
    props.getAllMediumOrderList(props.orgId,page,"Medium");
    props.getAllLowOrderList(props.orgId,page,"Low")
    
 
  }, []);

  const [show, setshow] = useState(false);
  const [orderId, setorderId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [particularRowData, setParticularRowData] = useState({});
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleOrder(orderId) {
    setshow(true);
    setorderId(orderId);
  }
  function handleCancel() {
    setshow(false)
  }
  function handleLeadData(val) {
    setLead(val)
  }
  function handleShow() {
    setshow(true)
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllHighOrderList(props.orgId,page,"High")
    // props.getAllOrderList(props.orgId, props.currentUser ? props.currentUser : page);
  }

  const handleLoadMoreMedium = () => {
    setPage(page + 1);  
    props.getAllMediumOrderList(props.orgId,page,"Medium")
};
const handleLoadMoreLow = () => {
    setPage(page + 1);
  
    props.getAllLowOrderList(props.orgId,page,"Low")
};

const viewAnDownloadPdf= async (item) => {  
  try {
    const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`order`}/${item.orderId}`, {
      responseType: 'blob',
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    });

    const blob = response.data;
    const url = window.URL.createObjectURL(blob);
    const filename = 'custom-pdf-name.pdf';

    window.open(url, '_blank');
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename; 
    downloadLink.click(); 
  } catch (error) {
    console.error('Error fetching PDF:', error);
  }  

}; 
  useEffect(() => {
    return () => props.emptyOrders();
  }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
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
        <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky items-end text-xs z-10 max-sm:hidden">
      <div className=" w-[3rem]  max-md:w-[3rem] text-[white] flex justify-center bg-[red]">
        {translatedMenuItems[0]} </div>
      <div className=" w-[7.31rem] text-[#00A2E8] text-base max-md:w-[7.31rem] ">
      <DynamicFeedIcon className='!text-base mr-1 '/>
      {translatedMenuItems[1]} ID</div>
          <div className="w-[8.6rem]  max-md:w-[8.6rem]">
            <ApartmentIcon className='!text-base mr-1  text-[#e4eb2f]'/>
            {translatedMenuItems[2]}</div>
          <div className=" w-[4.051rem] max-md:w-[4.051rem] ">
             <ContactsIcon className='!text-base mr-1 text-[#196820]'/>
             {translatedMenuItems[3]}</div>
          <div className=" w-[5.018rem]  max-md:w-[5.018rem]">
            {translatedMenuItems[4]}</div>
          <div className="w-[5.03rem]  max-md:w-[5.03rem]">
            <DateRangeIcon className="!text-icon "/>
            {translatedMenuItems[8]}</div>
          <div className=" w-[5.031rem] max-md:w-[5.031rem]">
            <AccountCircleIcon className="!text-icon  text-[#f28482]"/>
            {translatedMenuItems[5]}</div>
          <div className="w-[5.2rem]  max-md:w-[5.2rem]"> 
             {translatedMenuItems[6]}</div>
          <div className="w-[9.76rem]  max-md:w-[9.76rem]">
            <GroupsIcon className='!text-base mr-1  text-[#831f68]'/>
            {translatedMenuItems[7]}</div>
          
          <div className="w-[24rem] max-md:w-[24rem]"></div>
        </div>
        <InfiniteScroll
          dataLength={props.allHighCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"38vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {/* {props.allHighCompleteOrder.length === 0? */}
            <>
            {/* <EmptyPage/> */}
              {props.allHighCompleteOrder.map((item) => {
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
              <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col 
              scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center md:w-[4.26rem]  border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[#0f0e0d]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex   items-center    max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[11.43rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                        <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                 {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                        </div>
                        

                        <div class="max-sm:w-full md:w-[5.04rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[14.20rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex">
                    <div className=" flex  md:w-[6.32rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row items-center w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>

                    <div className=" flex text-xs md:w-[1.913rem]  justify-center h-8 ml-gap  bg-[#eef2f9] items-center max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  </div>
                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div class="flex flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[9.04rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[3.024rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {show && (particularRowData.orderId === item.orderId) ?
                          <div class=" flex justify-between">
                            <Select
                              className="w-[350px]"
                              value={lead}
                              onChange={(value) => handleLeadData(value)}
                            >
                              {props.departmentUser.map((a) => {
                                return <Option value={a.employeeId}>{a.empName}</Option>;
                              })}
                            </Select>
                            <Button
                              type="primary"
                            >
                            {translatedMenuItems[15]}  {/* Add */}
                            </Button>
                            <Button onClick={handleCancel}>
                              {translatedMenuItems[16]}{/* Cancel */}
                            </Button>
                          </div>
                          :
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        }
                      </div>
                    </div>
                     </div>
                  
                  <div className=" flex  md:w-[0.01rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row items-center w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  items-center font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs  justify-center  ml-gap  bg-[#eef2f9] items-center h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    </div>
                    <div class="flex max-sm:justify-between items-center max-sm:w-wk max-sm:items-center">
                    
                    <div class="w-6 items-center justify-center h-8   bg-[#eef2f9]">
                    <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>
                      <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
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


                   
                      <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                        <Tooltip title={translatedMenuItems[11]}>
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer max-sm:!text-2xl"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </div>
                   
                  
                      <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                        <Tooltip title={translatedMenuItems[13]}>
                          <EventRepeatIcon
                          className=" !text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    
                    
                      <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                        <Tooltip title={translatedMenuItems[14]}>
                          <PaidIcon
                           className=" !text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    

                   


                  </div>

                </div>
              </div>
                );
              })}
            </> 
             {/* : !props.allHighCompleteOrder.length && !props.fetchingAllHighOrderList ? <NodataFoundPage /> : null} */}
        </InfiniteScroll>
      </div>
      </div>
     
      <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:hidden max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
       <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky items-end z-10 max-sm:hidden">
      <div className="font-bold font-poppins text-xs md:w-[3rem] text-[white] flex justify-center bg-[teal]">{translatedMenuItems[9]} </div>
      <div className="font-bold font-poppins text-[#00A2E8] text-base md:w-[7.31rem] ">
      <DynamicFeedIcon className='!text-base mr-1 '/>{translatedMenuItems[1]} ID</div>
          <div className="font-bold font-poppins text-xs md:w-[8.6rem]"><ApartmentIcon className='!text-base mr-1 text-[#e4eb2f]'/>{translatedMenuItems[2]}</div>
          <div className="font-bold font-poppins text-xs md:w-[4.051rem] "> <ContactsIcon className='!text-base   text-[#196820]'/>{translatedMenuItems[3]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.018rem]">{translatedMenuItems[4]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.03rem]"><DateRangeIcon className="!text-icon "/>{translatedMenuItems[8]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.031rem]"><AccountCircleIcon className="!text-icon  text-[#f28482]"/>{translatedMenuItems[5]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.2rem]">  {translatedMenuItems[6]}</div>
          <div className="font-bold font-poppins text-xs md:w-[9.76rem]"><GroupsIcon className='!text-base mr-1    text-[#831f68]'/>{translatedMenuItems[7]}</div>
          
          <div className="md:w-24"></div>
        </div>
         <InfiniteScroll
           dataLength={props.allLowCompleteOrder.length}
           next={handleLoadMoreLow}
           hasMore={hasMore}
           loader={props.fetchingAllLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
           height={"38vh"}
           style={{ scrollbarWidth:"thin"}}
           endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
         >
           {/* {props.allLowCompleteOrder.length === 0 ? */}
             <>
             {/* <EmptyPage/> */}
               {props.allLowCompleteOrder.map((item) => {
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
                <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex max-sm:justify-between  max-sm:w-wk max-sm:items-center">
                   <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
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
                     <div className=" flex items-center    max-sm:w-full">
                       <div className="flex  items-center max-sm:w-full">
                         <div class="w-[11.43rem] items-center justify-center h-8  ml-gap bg-[#eef2f9]">
                           <Badge size="small" count={item.productNum}>
                             <span
                               class="underline font-bold cursor-pointer text-[#1890ff] text-xs"
                               onClick={() => {
                                 handleSetParticularOrderData(item);
                                 props.handleOrderDetailsModal(true);
                               }}
 
                             >{`${item.newOrderNo} `}
 
                               
                             </span>
                           </Badge>
                           &nbsp;&nbsp;
                               {date === currentdate ? (
                                 <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  {translatedMenuItems[10]} {/* New */}
                                 </span>
                               ) : null}
                         </div>
                       
 
                         <div class="max-sm:w-full md:w-[11.02rem] items-center justify-center h-8  ml-gap bg-[#eef2f9]">
                           <Tooltip>
                             <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                               {item.distributorName}
 
                             </div>
                           </Tooltip>
                         </div>
                       </div>
                     </div>
 
                     <div class="flex flex-row items-center justify-center h-8  ml-gap bg-[#eef2f9] md:w-[7.21rem] max-sm:flex-row w-full max-sm:justify-between">
                       <div>
                         <MultiAvatar2
                           primaryTitle={item.contactPersonName}
                           imageURL={item.imageURL}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
 
                       </div>
 
 
 
                     </div>
                     <div class="flex">
                     <div className=" flex  md:w-[4.31rem] max-sm:flex-row items-center justify-center h-8  ml-gap bg-[#eef2f9] w-full max-sm:justify-between ">
                       <div class=" font-poppins text-xs">
                         {item.noOfPhones}
                       </div>
                     </div>
 
 
                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   <div className=" flex text-xs items-center justify-center h-8  ml-gap bg-[#eef2f9] md:w-[8.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                     <span>{date}</span>
                   </div>
                   <div class="flex flex-row items-center justify-center h-8  ml-gap bg-[#eef2f9] md:w-[8.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                     <div class="flex flex-row items-center justify-center h-8  ml-gap bg-[#eef2f9]  md:w-[7.02rem] max-sm:flex-row w-full max-sm:justify-between">
                       <div>
                         <MultiAvatar2
                           primaryTitle={item.supervisorUserName}
                           imageURL={item.imageURL}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                         />
 
                       </div>
 
 
 
                     </div>
                     <div class="flex flex-row items-center justify-center h-8  ml-gap bg-[#eef2f9] md:w-[7.023rem] max-sm:flex-row w-full max-sm:justify-between">
                       <div>
                         {show && (particularRowData.orderId === item.orderId) ?
                           <div class=" flex justify-between">
                             <Select
                               className="w-[350px]"
                               value={lead}
                               onChange={(value) => handleLeadData(value)}
                             >
                               {props.departmentUser.map((a) => {
                                 return <Option value={a.employeeId}>{a.empName}</Option>;
                               })}
                             </Select>
                             <Button
                               type="primary"
                             >
                            {translatedMenuItems[15]}   {/* Add */}
                             </Button>
                             <Button onClick={handleCancel}>
                             {translatedMenuItems[16]} {/* Cancel */}
                             </Button>
                           </div>
                           :
                           <MultiAvatar2
                             primaryTitle={item.lead}
                             imageURL={item.imageURL}
                             imgWidth={"1.8rem"}
                             imgHeight={"1.8rem"}
                           />
 
 
                         }
                       </div>
                     </div>
                     
                   </div>
                  
                   <div className=" flex  items-center justify-center h-8  ml-gap bg-[#eef2f9] md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">
 
                       <div class=" text-xs  font-semibold  font-poppins ">
                         {item.noOfownerPhones}
                       </div>
                     </div>
                     <div class="rounded-full text-xs  items-center justify-center   ml-gap bg-[#eef2f9]  h-5 cursor-pointer w-8 justify-cente">
                       {item.orderStatus}
                     </div>
                     </div>
                     <div class="flex max-sm:justify-between  max-sm:w-wk max-sm:items-center">
                     
                     
 
                      
                       <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
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
 
 
                       <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                         <Tooltip title="{translatedMenuItems[11]}">
                           <PersonAddAlt1
                             className="!text-icon cursor-pointer max-sm:!text-2xl"
                             style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                             onClick={() => {
                               handleShow()
                               handleSetParticularOrderData(item)
                             }} />
                         </Tooltip>
                       </div>
                    
                       <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                         <Tooltip title={translatedMenuItems[13]}>
                           <EventRepeatIcon
                              className=" !text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                             onClick={() => {
                               props.handleStatusOfOrder(true);
                               handleSetParticularOrderData(item);
                             }}
                           />
                         </Tooltip>
                       </div>
 
                    
                       <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                         <Tooltip title={translatedMenuItems[14]}>
                           <PaidIcon
                             className=" !text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                             onClick={() => {
                               props.handlePaidModal(true);
                               handleSetParticularOrderData(item);
                             }}
                           // style={{ color: "blue" }}
                           />
                         </Tooltip>
 
                       </div>
                     </div>
 
                  
 
 
                   </div>
 
                 </div>
              
                 );
               })}
             </> 
             {/* :!props.allLowCompleteOrder.length && !props.fetchingAllLowOrderList ? <NodataFoundPage /> : null} */}
         </InfiniteScroll>
       </div>
       </div>
      <AddNotesOrderDrawer
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
     <StatusOfOrderModal
                    handleStatusOfOrder={props.handleStatusOfOrder}
                    addStatusOfOrder={props.addStatusOfOrder}
                    particularRowData={particularRowData}
                />
      <PaidButtonModal
                    type={props.type}
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={particularRowData}
                />
      <AccountOrderDetailsModal
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal} />
    </>
     )}
  </div>
  );

}

const mapStateToProps = ({ order, auth, distributor }) => ({
  allCompleteOrder: order.allCompleteOrder,
  allHighCompleteOrder:order.allHighCompleteOrder,
  fetchingAllHighOrderList:order.fetchingAllHighOrderList,
  allMediumCompleteOrder:order.allMediumCompleteOrder,
  fetchingAllMediumOrderList:order.fetchingAllMediumOrderList,
  allLowCompleteOrder:order.allLowCompleteOrder,
  fetchingAllLowOrderList:order.fetchingAllLowOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  fetchingAllOrderList: order.fetchingAllOrderList,
  userId: auth.userDetails.userId,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  orgId: auth.userDetails.organizationId,
  orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAllOrderList,
      getAllHighOrderList,
      getAllMediumOrderList,
      getAllLowOrderList,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      emptyOrders,
      handleOrderDetailsModal,
      deleteOrderRepairData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderList);
