
import React, { useEffect, useState , lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select, Button, Badge } from "antd";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  emptyMOrders,
    getDeletedHighOrderList,
    getDeletedMediumOrderList,
    getDeletedLowOrderList,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal
} from "./OrderAction";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { MultiAvatar2,MultiAvatar } from "../../../Components/UI/Elements";
import { PersonAddAlt1 } from "@mui/icons-material";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios"

const NodataFoundPage = lazy(() => import("../../../Helpers/ErrorBoundary/NodataFoundPage")); //2
const AddNotesOrderDrawer=lazy(()=>import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"));
const StatusOfOrderModal=lazy(()=>import("../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal"));
const PaidButtonModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal"));
const ReInstateOrderToggle = lazy(() => import("./ReInstateOrderToggle")); //2
const OrderSearchedData = lazy(() => import("./OrderSearchedData"));
const { Option } = Select;

function DeletedOrderList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.getDeletedHighOrderList(props.userId, page,"High");
        props.getDeletedMediumOrderList(props.userId, page,"Medium");
        props.getDeletedLowOrderList(props.userId, page,"Low");
        
        
        setPage(page + 1);
    }, []);
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
        props.getDeletedHighOrderList(props.userId, props.currentUser ? props.currentUser : page,"High");
    }

    const handleLoadMoreMedium = () => {
      setPage(page + 1);
      props.getDeletedMediumOrderList(props.userId, props.currentUser ? props.currentUser : page,"Medium");
  }
  const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getDeletedLowOrderList(props.userId, props.currentUser ? props.currentUser : page,"Low");
}
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

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    useEffect(() => {
        return () => props.emptyMOrders();
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
            <div className=' flex justify-end sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
              
                <div className=" flex justify-between w-full p-1 bg-transparent  sticky font-bold font-poppins z-10 max-sm:hidden">
                        <div className="w-[3.54rem] max-md:w-[3.54rem] text-[white] flex justify-center bg-[red]">
                          {translatedMenuItems[0]} </div>
                        <div className=" text-[#00A2E8] text-base  md:w-[10.31rem] ml-2">
                          {translatedMenuItems[1]} ID</div>
                        <div className=" w-[8.6rem]] text-xs  max-md:w-[8.6rem]">
                          {translatedMenuItems[2]}</div>
                        <div className=" w-[4.051rem]] text-xs  max-md:w-[4.051rem] ">
                          {translatedMenuItems[3]}</div>
                        <div className=" w-[5.018rem] text-xs  max-md:w-[5.018rem]">
                          {translatedMenuItems[4]}</div>
                        <div className=" w-[5.031rem] text-xs  max-md:w-[5.031rem]">
                          {translatedMenuItems[8]}</div>
                        <div className=" w-[5.2rem] text-xs  max-md:w-[5.2rem]">
                          {translatedMenuItems[6]}</div>
                        <div className=" w-[5.06rem] text-xs  max-md:w-[5.06rem]">
                          {translatedMenuItems[7]}</div>
                        <div className=" w-[9.73rem] text-xs  max-md:w-[9.73rem]">
                          {translatedMenuItems[5]}</div>
                        <div className=" w-[24rem] text-xs  max-md:w-[24rem]"></div>
                      </div>
                    <InfiniteScroll
                        dataLength={props.deletedHighOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDeletedHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{ scrollbarWidth:"thin"}}
                        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
                    >
                        {props.deletedHighOrder.length ?
                            <>
                                {props.deletedHighOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex ">
                  <div className=" flex   md:w-[4.26rem] border-l-2 border-green-500 bg-[#eef2f9] justify-center  items-center max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
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
                    <div className=" flex  w-wk   max-sm:w-full">
                      <div className="flex  justify-center max-sm:w-full">
                        <div class="w-[9.43rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs font-bold"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                            </span>
                          </Badge>
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.23rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex   md:w-[3.31rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>


                  </div>
                  <div class="flex flex-row  md:w-[5.03rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                  <div className=" flex text-xs  md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
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
                    <div class="flex flex-row items-center md:w-[3.02rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row  md:w-[6.02rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
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
                              Add
                            </Button>
                            <Button onClick={handleCancel}>
                              Cancel
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
                
                  <div className=" flex   w-[5.5rem] max-xl:w-[6.9rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<ReInstateOrderToggle item={item} />

</div>
                  <div class="flex">
                    <div className=" flex   md:w-[0.01rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs cursor-pointer w-8 items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                      {item.orderStatus}
                    </div>
                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">
                    <div class="w-6 items-center justify-center h-8  bg-[#eef2f9]">
                    <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>        
                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs  font-poppins items-center justify-center h-8   bg-[#eef2f9]">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                             className=" !text-icon cursor-pointer text-green-800"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>

                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                    <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                                  className=" !text-icon cursor-pointer "
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                    <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Collection">
                          <PaidIcon
                                  className=" !text-icon cursor-pointer text-[#e5625e]"
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
              </div>

                                    );
                                })}
                            </> :
                            !props.deletedHighOrder.length && !props.fetchingDeletedHighOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>

            <div className=' flex sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10 max-sm:hidden">
                <div className="font-bold font-poppins text-xs md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">{translatedMenuItems[9]} </div>
                        <div className="font-bold font-poppins text-xs md:w-[10.31rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className="font-bold font-poppins text-xs md:w-[8.6rem]">{translatedMenuItems[2]}</div>
          <div className="font-bold font-poppins text-xs md:w-[4.051rem] ">{translatedMenuItems[3]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.018rem]">{translatedMenuItems[4]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.031rem]">{translatedMenuItems[8]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.2rem]">{translatedMenuItems[6]}</div>
          <div className="font-bold font-poppins text-xs md:w-[5.06rem]">{translatedMenuItems[7]}</div>
          <div className="font-bold font-poppins text-xs md:w-[9.73rem]">{translatedMenuItems[5]}</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.deletedLowOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDeletedLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{ scrollbarWidth:"thin"}}
                        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
                    >
                        {props.deletedLowOrder.length ?
                            <>
                                {props.deletedLowOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col p-1  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                  <div className=" flex    md:w-[4.26rem] items-center max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
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
                    <div className=" flex  w-wk   max-sm:w-full">
                      <div className="flex  items-centermax-sm:w-full">
                        <div class="w-[9.43rem] items-center justify-center ml-gap bg-[#eef2f9] h-8">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] ml-tiny text-xs font-bold items-center"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                            </span>
                          </Badge>
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem] items-center justify-center ml-gap bg-[#eef2f9] h-8">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.23rem]   justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex   md:w-[3.31rem]  items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
                        {item.noOfPhones}
                      </div>
                    </div>


                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem]   justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                  <div className=" flex text-xs  md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  
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
                    <div class="flex flex-row items-center md:w-[3.02rem]  justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>



                    </div>
                    <div class="flex flex-row items-center md:w-[6.02rem]   justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between">
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
                              Add
                            </Button>
                            <Button onClick={handleCancel}>
                              Cancel
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
                  
                  <div className=" flex   w-[5.5rem] max-xl:w-[6.9rem]  items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<ReInstateOrderToggle item={item} />

</div>
                  <div class="flex">
                    <div className=" flex   md:w-[0.01rem] max-sm:flex-row w-full   items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs cursor-pointer w-8  items-center justify-center ml-gap bg-[#eef2f9] h-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div class="w-6  items-center justify-center  bg-[#eef2f9] h-8">
                    <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>        
                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Notes">
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

                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                    <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer max-sm:!text-2xl"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                    <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                             className=" !text-icon cursor-pointer max-sm:!text-2xl "
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                    <div class=" text-xs  font-poppins items-center justify-center h-8  bg-[#eef2f9] ">
                        <Tooltip title="Collection">
                          <PaidIcon
                             className=" !text-icon cursor-pointer text-[#e5625e] max-sm:!text-2xl "
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
              </div>

                                    );
                                })}
                            </> :
                            !props.deletedLowOrder.length && !props.fetchingDeletedLowOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>
            <Suspense>
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
                addOrderDetailsModal={props.addOrderDetailsModal} /></Suspense>

        </>
          )}
  </div>
    )
}

const mapStateToProps = ({ order, auth, distributor }) => ({
  deletedHighOrder: order.deletedHighOrder,
  deletedMediumOrder:order.deletedMediumOrder,
  fetchingDeletedMediumOrderList:order.fetchingDeletedMediumOrderList,
  deletedLowOrder:order.deletedLowOrder,
  fetchingDeletedLowOrderList:order.fetchingDeletedLowOrderList,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingDeletedHighOrderList: order.fetchingDeletedHighOrderList,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orgId: auth.userDetails.organizationId,
    orderSearch:order.orderSearch
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getDeletedHighOrderList,
          getDeletedMediumOrderList,
          getDeletedLowOrderList,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyMOrders
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DeletedOrderList);
