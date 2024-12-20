import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';


import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {
    getDistributorOrderByDistributorId,
    getHighCompleteOrders,
    getMediumCompleteOrders,
    getLowCompleteOrders,
    handleInventoryLocationInOrder,
    handleOrderPickupModal,
    handleOrderDetailsModal,
    handleNotesModalInOrder,
    handlePaidModal,
    handleStatusOfOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    removeOrderAcc,
    getOrderRecords,
    deleteDistributorData,
     updateSubOrderAwb,
} from "../../AccountAction";
import { Badge, Button, Input, Select, Tooltip } from 'antd';
import { MultiAvatar } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import { base_url2 } from '../../../../../Config/Auth';

const SubOrderList = lazy(() => import('./SubOrderList'));
const AddPickupModal = lazy(() => import('./AddPickupModal'));
const AddLocationInOrder = lazy(() => import('./AddLocationInOrder'));
const AccountOrderDetailsModal = lazy(() => import('./AccountOrderDetailsModal'));
const StatusOfOrderModal = lazy(() => import('./StatusOfOrderModal'));
const AddNotesOrderModal = lazy(() => import('./AddNotesOrderModal'));
const PaidButtonModal = lazy(() => import('./PaidButtonModal'));
const AccountproductionModal = lazy(() => import('./AccountProductionModal'));
const UpdateOrderModal = lazy(() => import('./UpdateAccountOrder/UpdateOrderModal'));
const { Option } = Select;

const CompleteOrderTable = (props) => {
    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
             "106",   // "Urgent",0
             "660",    // "Order",1
             "280",     // "LOB",2
                "77",    // "Owner",3
                "73",   // "Contact",4
                "770",  // "Quoted",5
                "771",   // "Final",6
                "1332",   // "Revised",7
                "1085",  // "Received",8
                "676",   // "Supervisor",9
                "677",  // "Lead",10
                "661",  // "Repair",11           
                "108",   // "Normal",12
                "679",   // "Created "13
                "100",   //     "New"14
                "1377",  // Ship15
                "1078",      // "Save"16
                "1079",      // "Cancel"17
                "1339",      // "Update Revised Price"18
                "1381",     // Tag Supervisor19
                "1383",     // "Select Inventory Location"20
               "1378",       // "Pickup"21
               "1384",      // "PI List"22
               "316",      // "Notes"23
               "142",      // "Status"24
               "920",      // "Collections"25
               "1382",       // "Rating"26
               "1389",      // "Feedback"27
             
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
        props.getOrderRecords(props.distributorId,"repair");
        // props.getLocationList(props.orgId);
        props.getHighCompleteOrders(props.distributorId,"repair", page, "High");
        props.getMediumCompleteOrders(props.distributorId,"repair", page, "Medium");
        props.getLowCompleteOrders(props.distributorId,"repair", page, "Low")
        
        // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
    }, [])

    const [print, setprint] = useState(false);
    const handlePrint = () => {
        setprint(!print)
    }
    const [particularRowData, setParticularRowData] = useState({});
    const [locationChange, setLocationChange] = useState(false);
    const [locationValue, setLocationValue] = useState("");



    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }

    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getHighCompleteOrders(props.distributorId,"repair", page, "High")
    };

    const handleLoadMoreMedium = () => {
        setPage(page + 1);
        props.getMediumCompleteOrders(props.distributorId,"repair", page, "Medium")
    };
    const handleLoadMoreLow = () => {
        setPage(page + 1);
        // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
        props.getLowCompleteOrders(props.distributorId, "repair",page, "Low")
    };
    const [visible, setVisible] = useState(false)
    const handleUpdateRevisePrice = () => {
        setVisible(!visible)
    }
    const [price, setPrice] = useState(particularRowData.offerPrice)
    const [checkAwb, setCheckAwb] = useState(false)

    const handleCheckAwb = () => {
        setCheckAwb(!checkAwb)
    }
    const handleChange = (val) => {
        setPrice(val)
    }
    const handleSubmitPrice = () => {
        props.updateOfferPrice(
            {
                offerPrice: price,
                orderPhoneId: particularRowData.orderId,
                customerPriceInd: true
            },
            particularRowData.orderId,
            props.distributorId,
        );
        setVisible(false)
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
    return (
        <>
      
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]   bg-transparent font-bold sticky text-xs font-poppins  z-10">
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">{translatedMenuItems[0]}</div>
                        <div className=" md:w-[11.41rem] ml-2">
                        {translatedMenuItems[1]} 
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[2]}  {/* LOB */}
                        </div>
                       

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                        {translatedMenuItems[4]}  
                        </div>
                        <div className="md:w-[8.11rem]">
                        {translatedMenuItems[5]} 
                        </div>
                        <div className="md:w-[5.09rem]">
                        {translatedMenuItems[6]}  
                        </div>
                        <div className="w-[5.076rem]">
                        {translatedMenuItems[7]} 
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                        {translatedMenuItems[8]}  
                        </div>
                        <div className=" md:w-[8.03rem]">
                        {translatedMenuItems[9]} 
                        </div>
                        <div className=" md:w-[8.12rem]">
                        {translatedMenuItems[10]}  
                        </div>

                        <div className=" md:w-[8.02rem]">
                        {translatedMenuItems[11]} 
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                    style={{scrollbarWidth:"thin"}}
                        dataLength={props.highCompleteOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingHighCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"37vh"}
                    >
                        {props.highCompleteOrder.length ?
                            <>
                                {props.highCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex ">
                                                    <div className=" flex  items-center  md:w-[2.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

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


                                                    <div className="ml-1  flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs  font-poppins">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.count || 0}
                                                                overflowCount={999}
                                                            >
                                                                <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleOrderDetailsModal(true);
                                                                    }}
                                                                >{item.newOrderNo}</span>
                                                            </Badge>
                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span
                                                                    class="text-[tomato] font-bold">
                                                                   {translatedMenuItems[14]} 
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>

                                                    {/* <div className=" flex   md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div> */}

                                                    <div className=" flex   md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                            >
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                        handleCheckAwb();
                                                                        handleSetParticularOrderData(item)
                                                                    }
                                                                    }
                                                                ><span className='!text-[#faad14]'>AWB</span></Button>
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className=" flex    md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex   items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[4.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />
                                                            {visible && (item.orderId === particularRowData.orderId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                                : item.offerPrice}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex    md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                        {translatedMenuItems[16]}
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[17]}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={translatedMenuItems[18]}>
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-icon cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> : null}

                                                    </div>

                                                </div>
                                                <div className=" flex   md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                
                                                <div class="flex justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[23]}>
                                                                <NoteAltIcon
                                                                    className="!text-icon cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handleNotesModalInOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />

                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                            <Tooltip title={translatedMenuItems[24]}>
                                                                <EventRepeatIcon

                                                                    className="!text-icon cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                 
                                                 

                                                        <div>
                                                            <Tooltip title={translatedMenuItems[25]}>
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                       

                                                    
                                                  
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[26]}>
                                                                <StarBorderIcon

                                                                    className="!text-icon cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[27]}>
                                                                <FeedbackIcon
                                                                    className="!text-icon cursor-pointer"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                  

                                                   
                                                       
                                                        

                                                    </div>
                                                </div>

                                            </div>

                                            {checkAwb && (item.orderId === particularRowData.orderId) &&
                                                <SubOrderList orderId={particularRowData.orderId} />
                                            }
                                        </div>


                                    )
                                })}
                            </> : !props.highCompleteOrder.length && !props.fetchingHighCompleteOrders ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
            
           
           
         
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]   bg-transparent font-bold sticky text-xs font-poppins z-10">
                    <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] " >{translatedMenuItems[12]}</div>
                        <div className=" md:w-[11.41rem] ml-2">
                        {translatedMenuItems[1]}  
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[2]}  {/* LOB */}
                        </div>
                       

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                        {translatedMenuItems[4]}  
                        </div>
                        <div className="md:w-[8.11rem]">
                        {translatedMenuItems[5]}   
                        </div>
                        <div className="md:w-[5.09rem]">
                        {translatedMenuItems[6]}
                        </div>
                        <div className="w-[5.076rem]">
                        {translatedMenuItems[7]}  
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                        {translatedMenuItems[8]} 
                        </div>
                        <div className=" md:w-[8.03rem]">
                        {translatedMenuItems[9]} 
                        </div>
                        <div className=" md:w-[8.12rem]">
                        {translatedMenuItems[10]}
                        </div>

                        <div className=" md:w-[8.02rem]">
                         {translatedMenuItems[11]} 
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                    style={{scrollbarWidth:"thin"}}
                        dataLength={props.lowCompleteOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingLowCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"37vh"}
                    >
                        {props.lowCompleteOrder.length ?
                            <>
                                {props.lowCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex ">
                                                    <div className=" flex  items-center md:w-[2.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

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


                                                    <div className="ml-1  flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs  font-poppins">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.count || 0}
                                                                overflowCount={999}
                                                            >
                                                                <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleOrderDetailsModal(true);
                                                                    }}
                                                                >{item.newOrderNo}</span>
                                                            </Badge>
                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span
                                                                    class="text-[tomato] font-bold">
                                                                  {translatedMenuItems[14]}  
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>
{/* 
                                                    <div className=" flex   md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div> */}

                                                    <div className=" flex   md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                            >
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                        handleCheckAwb();
                                                                        handleSetParticularOrderData(item)
                                                                    }
                                                                    }
                                                                ><span className='!text-[#faad14]'>AWB</span></Button>
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className=" flex    md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex   items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[4.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />
                                                            {visible && (item.orderId === particularRowData.orderId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                                : item.offerPrice}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex    md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                      {translatedMenuItems[16]}
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[17]}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={translatedMenuItems[18]}>
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-icon cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> : null}

                                                    </div>

                                                </div>
                                                <div className=" flex   md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                               
                                                <div class="flex justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[23]}>
                                                                <NoteAltIcon
                                                                    className="!text-icon cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handleNotesModalInOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />

                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                            <Tooltip title={translatedMenuItems[24]}>
                                                                <EventRepeatIcon

                                                                    className="!text-icon cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                        <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
                                                            onClick={()=> viewAnDownloadPdf(item)}
                                                        />
                                                        </div>
                                                  

                                                        <div>
                                                            <Tooltip title={translatedMenuItems[25]}>
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                      
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[26]}>
                                                                <StarBorderIcon

                                                                    className="!text-icon cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[27]}>
                                                                <FeedbackIcon
                                                                    className="!text-icon cursor-pointer"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                    
                                                    </div>
                                                </div>

                                            </div>

                                            {checkAwb && (item.orderId === particularRowData.orderId) &&
                                                <SubOrderList orderId={particularRowData.orderId} />
                                            }
                                        </div>


                                    )
                                })}
                            </> : !props.lowCompleteOrder.length && !props.fetchingLowCompleteOrders ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
           
            <Suspense fallback={<BundleLoader />}>
                <AddLocationInOrder
                    particularRowData={particularRowData}
                    addInventoryInOrder={props.addInventoryInOrder}
                    handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
                />
                <AddPickupModal
                    handleOrderPickupModal={props.handleOrderPickupModal}
                    addpickupLocation={props.addpickupLocation}
                    particularRowData={particularRowData}
                />
                <AddNotesOrderModal
                    particularRowData={particularRowData}
                    addNotesInOrder={props.addNotesInOrder}
                    handleNotesModalInOrder={props.handleNotesModalInOrder}
                />
                <AccountOrderDetailsModal
                    particularRowData={particularRowData}
                    handleOrderDetailsModal={props.handleOrderDetailsModal}
                    addOrderDetailsModal={props.addOrderDetailsModal} />
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
                <AccountproductionModal
                    particularRowData={particularRowData}
                    accountOrderProduction={props.accountOrderProduction}
                    handleAccountProduction={props.handleAccountProduction}
                />
                <UpdateOrderModal
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateOrder={props.handleUpdateOrder}
                    updateOrderModal={props.updateOrderModal}
                />

            </Suspense>
        </>
    )
}
const mapStateToProps = ({ distributor, auth, departments }) => ({
    accountOrderProduction: distributor.accountOrderProduction,
    distributorOrder: distributor.distributorOrder,
    addNotesInOrder: distributor.addNotesInOrder,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    addInventoryInOrder: distributor.addInventoryInOrder,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    addStatusOfOrder: distributor.addStatusOfOrder,
    updateOrderModal: distributor.updateOrderModal,
    addPaidButtonModal: distributor.addPaidButtonModal,
    orgId: auth.userDetails.organizationId,
    addpickupLocation: distributor.addpickupLocation,

    userId: auth.userDetails.userId,

    updatingSuborderAwb: distributor.updatingSuborderAwb,
    addingLocationInOrder: distributor.addingLocationInOrder,
    fetchingDistributorByDistributorId: distributor.fetchingDistributorByDistributorId,
    highCompleteOrder:distributor.highCompleteOrder,
    fetchingHighCompleteOrders:distributor.fetchingHighCompleteOrders,
    mediumCompleteOrder:distributor.mediumCompleteOrder,
    fetchingMediumCompleteOrders:distributor.fetchingMediumCompleteOrders,
    lowCompleteOrder:distributor.lowCompleteOrder,
    fetchingLowCompleteOrders:distributor.fetchingLowCompleteOrders,

});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDistributorOrderByDistributorId,
    getHighCompleteOrders,
    getMediumCompleteOrders,
    getLowCompleteOrders,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleStatusOfOrder,
    handlePaidModal,
    handleNotesModalInOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    handleOrderPickupModal,
    removeOrderAcc,
    deleteDistributorData,
    // getLocationList,
    updateSubOrderAwb,
    getOrderRecords
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrderTable);
