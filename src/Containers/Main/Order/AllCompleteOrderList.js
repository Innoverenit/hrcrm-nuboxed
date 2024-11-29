
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select, Button, Badge } from "antd";
import dayjs from "dayjs";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import relativeTime from 'dayjs/plugin/relativeTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ContactsIcon from '@mui/icons-material/Contacts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {
  emptyCompleteOrders,
    getCompletedHighOrderList,
    getCompletedMediumOrderList,
    getCompletedLowOrderList,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal,
    deleteOrderData
} from "./OrderAction";
import EmptyPage from "../../Main/EmptyPage";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { handleOrderDetailsModal } from "../Account/AccountAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar2,MultiAvatar } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
import { PersonAddAlt1 } from "@mui/icons-material";
import OrderSearchedData from "./OrderSearchedData";
import { base_url2 } from "../../../Config/Auth";
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

function AllCompleteOrderList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
              // 2
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
  "1380",   // Add Supervisor11
  "316",     // Notes12
  "142",      // "Status"13
  "920",      // "Collection"14
  
        "85",  // Add15
       "1079"   // Cancel16
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
      
        props.getCompletedHighOrderList(props.userId, page,"High");
        props.getCompletedMediumOrderList(props.userId, page,"Medium");
        props.getCompletedLowOrderList(props.userId, page,"Low");
        
        setPage(page + 1);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");
    const [lead, setLead] = useState("")

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }
    function handleCancel() {
        setshow(false)
      }
      function handleShow() {
        setshow(true)
      }
      function handleLeadData(val) {
        setLead(val)
      }
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getCompletedHighOrderList(props.userId, props.currentUser ? props.currentUser : page,"High");
    }

    const handleLoadMoreMedium = () => {
      setPage(page + 1);
      props.getCompletedMediumOrderList(props.userId, props.currentUser ? props.currentUser : page,"Medium");
  }

  
  const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getCompletedLowOrderList(props.userId, props.currentUser ? props.currentUser : page,"Low");
}

const exportPDFAnnexure = async () => {
  var doc = new jsPDF();
  // const {
  //   userDetails:
  //   {address},
  //     imageId
  // }=props
 
  // let cityd=`${address.city}`
  // let countryd=`${address.country}`
  // let addressde=`${address.state}`
  // let cityde=`${address.street}`
  // var imageUrl = `${base_url}/image/${imageId || ""}`;
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
//   address.forEach(item => {
//     doc.text(` ${item.city}  ${item.country}  ${item.state}  ${item.street}`, 8, yPosition);
//     yPosition += 4
// });
  // doc.text(name2, 8, 32);
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


    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    useEffect(() => {
        return () => props.emptyCompleteOrders();
    }, []);
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
              <div className=' flex sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              
                <div className=" flex justify-between w-[94%] p-1 text-xs bg-transparent  items-end sticky font-bold font-poppins  z-10 max-sm:hidden">
                  
                <div className="  w-[3.54rem] max-md:w-[3.54rem] text-[white] flex justify-center bg-[red]">{translatedMenuItems[0]} </div>
                        <div className=" text-[#00A2E8] text-base max-md:w-[8.31rem] ml-2">
                        <DynamicFeedIcon className='!text-base mr-1 '/>{translatedMenuItems[1]}  ID</div>
                      <div className=" w-[9.6rem]  max-md:w-[9.6rem]">
                        <ApartmentIcon className='!text-base    text-[#43e035]'/>{translatedMenuItems[2]}</div>
                      <div className=" w-[5.051rem]  max-md:w-[5.051rem] ">
                        <ContactsIcon className='!text-base mr-1 text-[#9737c4]'/> 
                         {translatedMenuItems[3]}</div>
                      <div className="  w-[5.018rem] max-md:w-[5.018rem]">
                        {translatedMenuItems[4]}</div>
                      <div className="  w-[5.031rem] max-md:w-[5.031rem]">
                        <DateRangeIcon className="!text-icon  mr-1"/>
                        {translatedMenuItems[8]}</div>
                      <div className="  w-[3.2rem] max-md:w-[3.2rem]">
                        {translatedMenuItems[6]}</div>
                      <div className="  w-[5.06rem] max-md:w-[5.06rem]">
                        <GroupsIcon className='!text-base mr-1 text-[#e93aa3]'/>
                        {translatedMenuItems[7]}</div>
                      <div className="  w-[12.73rem] max-md:w-[12.73rem]">   
                         <AccountCircleIcon className="!text-icon text-[#dd5738]"/>
                          {translatedMenuItems[5]}</div>
         
        </div>
                    <InfiniteScroll
                        dataLength={props.completedHighOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingCompletedHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{scrollbarWidth:"thin"}}
                        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
                    >
                        {props.completedHighOrder.length === 0 ?
                            <><EmptyPage/>
                                {props.completedHighOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white py-ygap items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
           
                >
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center justify-center max-md:w-[4.26rem] w-[4.26rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full items-center max-md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex  items-center  max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class=" flex w-[9.43rem] font-semibold items-center justify-start ml-gap bg-[#eef2f9] h-8 ">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] ml-gap items-center text-xs "
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span  className=" text-[0.65rem] text-[tomato] font-bold" 
                                >
                                 {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                            </span>
                          </Badge>
                        </div>
                      

                        <div class="flex max-sm:w-full max-md:w-[13.02rem] w-[13.02rem] font-poppins items-center justify-start ml-gap bg-[#eef2f9] h-8 ">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between ml-gap flex max-md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center w-[7.71rem] max-md:w-[7.71rem]  justify-center ml-gap bg-[#eef2f9] h-8  max-sm:flex-row  max-sm:justify-between">
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
                    <div className=" flex   max-md:w-[7.31rem] w-[7.31rem] items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:flex-row  max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
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
                  <div class="flex flex-row items-center justify-center ml-gap bg-[#eef2f9] w-[6.03rem] h-8  max-md:w-[6.03rem] max-sm:flex-row max-sm:justify-between">
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
                    <div class="flex flex-row items-center w-[6.02rem] max-md:w-[6.02rem] justify-center ml-gap bg-[#eef2f9] h-8  max-sm:flex-row max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row w-[6.05rem]  max-md:w-[6.05rem] items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:flex-row  max-sm:justify-between">
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
                  
                  </div>
                  <div class="flex  w-[6rem] h-8 max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   {/* <div className=" flex  max-md:w-[0.01rem] items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div> */}
                    <div class="rounded-full text-xs items-center justify-center ml-gap bg-[#eef2f9] h-8  cursor-pointer w-8 ">
                      {item.status}
                    </div>
               
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div class="w-[1.2rem] items-center justify-center  bg-[#eef2f9] h-8 ">
                    <a
              href={`${base_url2}/customer/pdf/${item.orderId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </a>
          </div> 
                    <div class=" font-poppins items-center justify-center  bg-[#eef2f9] h-8">
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
                      <div class=" text-xs  font-poppins items-center justify-center  bg-[#eef2f9] h-8">
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
                   
                      <div class=" text-xs  font-poppins items-center justify-center  bg-[#eef2f9] h-8">
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

                  
                      <div class=" text-xs  font-poppins items-center justify-center  bg-[#eef2f9] h-8">
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
                            </> :
                            !props.completedHighOrder.length && !props.fetchingCompletedHighOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>
          

            <div className=' flex  sticky  z-auto'>
            <div class="rounded  m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              
            <div className=" flex justify-between w-[94%] p-1 bg-transparent text-xs items-end sticky font-bold font-poppins  z-10 max-sm:hidden">
                  
                  <div className=" text-xs w-[3.54rem] max-md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">
                    {translatedMenuItems[9]} </div>
                          <div className=" text-[#00A2E8] w-[8.31rem] text-base max-md:w-[8.31rem] ml-2">
                          <DynamicFeedIcon className='!text-base mr-1 '/>{translatedMenuItems[1]} ID</div>
                          <div className="  w-[9.6rem] max-md:w-[9.6rem]">
                          <ApartmentIcon className='!text-base   text-[#43e035]'/>{translatedMenuItems[2]}</div>
                          <div className="  w-[5.051rem] max-md:w-[5.051rem] ">
                          <ContactsIcon className='!text-base  text-[#9737c4]'/>  {translatedMenuItems[3]}</div>
                          <div className=" w-[5.018rem] max-md:w-[5.018rem]">{translatedMenuItems[4]}</div>
                          <div className="  w-[5.031rem] max-md:w-[5.031rem]">
                          <DateRangeIcon className="!text-icon  mr-1"/>{translatedMenuItems[8]}</div>
                          <div className="  w-[3.2rem] max-md:w-[3.2rem]">{translatedMenuItems[6]}</div>
                          <div className="  w-[5.06rem] max-md:w-[5.06rem]">
                            <GroupsIcon className='!text-base mr-1 text-[#e93aa3]'/>{translatedMenuItems[7]}</div>
                          <div className="  w-[12.73rem] max-md:w-[12.73rem]">   
                             <AccountCircleIcon className="!text-icon mr-1  text-[#dd5738]"/> {translatedMenuItems[5]}</div>
           
          </div>
                    <InfiniteScroll
                        dataLength={props.completedLowOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingCompletedLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{scrollbarWidth:"thin"}}
                        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
                    >
                        {props.completedLowOrder.length === 0 ?
                            <><EmptyPage/>
                                {props.completedLowOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex items-center w-[4.26rem]  max-md:w-[4.26rem] max-sm:w-full border-l-2 border-green-500 bg-[#eef2f9]  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between items-center w-full max-md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex items-center   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs font-bold"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                            
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold"  >
                                 {translatedMenuItems[10]} {/* New */}
                                </span>
                              ) : null}
                            </span>
                          </Badge>
                        </div>
                      

                        <div class="flex max-sm:w-full w-[13.02rem] max-md:w-[13.02rem] h-8 items-center justify-start font-poppins ml-gap bg-[#eef2f9]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between ml-gap flex max-md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center w-[7.71rem] justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[7.71rem] max-sm:flex-row  max-sm:justify-between">
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
                    <div className=" flex  max-md:w-[7.31rem] items-center  w-[7.31rem] justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
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
                  <div className=" flex text-xs w-[8.912rem] max-md:w-[8.912rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex flex-row items-center w-[6.03rem] max-md:w-[6.03rem]  justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
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
                    <div class="flex flex-row items-center w-[6.02rem] max-md:w-[6.02rem] justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row w-[6.05rem] max-md:w-[6.05rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
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
                            {translatedMenuItems[16]}  {/* Cancel */}
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
                 
                  </div>
                  <div class="flex w-[6rem] h-8 max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  {/* <div className=" flex  max-md:w-[0.01rem] items-center justify-center ml-gap h-8 bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div> */}
                    {/* <div class="rounded-full text-xs bg-white  items-center justify-center ml-gap h-8 bg-[#eef2f9] h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div> */}
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div class="w-[1.2rem]  items-center justify-center h-8 bg-[#eef2f9]">
                    <a
              href={`${base_url2}/customer/pdf/${item.orderId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon"/>
                           </a>
          </div>
                    
                      <div class=" text-xs  font-poppins items-center justify-center h-8 bg-[#eef2f9]">
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


                    
                      <div class=" text-xs  font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
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
                    
                      <div class=" text-xs  font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
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

                    
                      <div class=" text-xs  font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
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
                            </> :
                            !props.completedLowOrder.length && !props.fetchingCompletedLowOrderList ? <NodataFoundPage /> : null}


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
    )
}

const mapStateToProps = ({ order, auth, distributor }) => ({
  completedHighOrder: order.completedHighOrder,
  completedMediumOrder:order.completedMediumOrder,
  fetchingCompletedMediumOrderList:order.fetchingCompletedMediumOrderList,
  completedLowOrder:order.completedLowOrder,
  fetchingCompletedLowOrderList:order .fetchingCompletedLowOrderList,
  
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingCompletedHighOrderList: order.fetchingCompletedHighOrderList,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orgId: auth.userDetails.organizationId,
    orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getCompletedHighOrderList,
          getCompletedMediumOrderList,
          getCompletedLowOrderList,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyCompleteOrders,
            deleteOrderData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AllCompleteOrderList);
