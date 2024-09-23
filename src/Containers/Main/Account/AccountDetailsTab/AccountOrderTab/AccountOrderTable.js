import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteOutlined } from "@ant-design/icons";
import AddPickupModal from "./AddPickupModal"
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {
    getDistributorOrderByDistributorId,
    getDistributorOrderOfHigh,
    getDistributorOrderOfMedium,
    getDistributorOrderOfLow,
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
    getLocationList,
    updateSubOrderAwb,
    handlePIModal
} from "../../AccountAction";
import { Badge, Button, Input, Select, Tooltip } from 'antd';
import { MultiAvatar } from '../../../../../Components/UI/Elements';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import { PersonAddAlt1 } from '@mui/icons-material';
import PIOPenModal from './PIOPenModal';
const SubOrderList = lazy(() => import('./SubOrderList'));
const AddLocationInOrder = lazy(() => import('./AddLocationInOrder'));
const AccountOrderDetailsModal = lazy(() => import('./AccountOrderDetailsModal'));
const StatusOfOrderModal = lazy(() => import('./StatusOfOrderModal'));
const AddNotesOrderModal = lazy(() => import('./AddNotesOrderModal'));
const PaidButtonModal = lazy(() => import('./PaidButtonModal'));
const AccountproductionModal = lazy(() => import('./AccountProductionModal'));
const UpdateOrderModal = lazy(() => import('./UpdateAccountOrder/UpdateOrderModal'));
const { Option } = Select;

const AccountOrderTable = (props) => {
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
               "170",      // Edit28
               "84",      // Delete29
              "1380", // "Add Supervisor"
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
        props.getLocationList(props.orgId);
        props.getDistributorOrderOfHigh(props.distributorId, page, "repair","High");
        // props.getDistributorOrderOfMedium(props.distributorId, page, "repair","Medium");
        props.getDistributorOrderOfLow(props.distributorId, page, "repair","Low")
        
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
        // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
        props.getDistributorOrderOfHigh(props.distributorId, page, "repair","High")
    };

    // const handleLoadMoreMedium = () => {
    //     setPage(page + 1);
    //     // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
    //     props.getDistributorOrderOfMedium(props.distributorId, page, "repair","Medium")
    // };
    const handleLoadMoreLow = () => {
        setPage(page + 1);
        // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
        props.getDistributorOrderOfLow(props.distributorId, page, "repair","Low")
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


    return (
        <>
      
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  bg-transparent font-bold font-poppins sticky top-0 z-10">
                        <div className='flex justify-between w-[85%]  text-xs font-bold font-poppins'>
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">
                    {translatedMenuItems[0]}   {/* Urgent */}
                         </div>
                        <div className=" md:w-[9.41rem] ml-2">
                            {/* <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order ID"
                            /> */}
                             {translatedMenuItems[1]} ID
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[13]}
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[2]}  {/* LOB */}
                        </div>
                        {/* <div className=" md:w-[5.08rem]">
                        {translatedMenuItems[3]} 
                           
                        </div> */}

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                        {translatedMenuItems[4]}   {/* <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            /> */}
                        </div>
                        <div className="md:w-[6.11rem]">
                        {translatedMenuItems[5]}  {/* <FormattedMessage
                                id="app.quoted"
                                defaultMessage="Quoted"
                            /> */}
                        </div>
                        <div className="md:w-[5.09rem]">
                        {translatedMenuItems[6]}  {/* <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            /> */}
                        </div>
                        <div className="w-[5.076rem]">
                        {translatedMenuItems[7]}    {/* <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            /> */}
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                        {translatedMenuItems[8]}  {/* <FormattedMessage
                                id="app.received"
                                defaultMessage="Received"
                            /> */}
                        </div>
                        <div className=" md:w-[8.03rem]">
                        {translatedMenuItems[9]}   {/* <FormattedMessage
                                id="app.supervisor"
                                defaultMessage="Supervisor"
                            /> */}
                        </div>
                        <div className=" md:w-[8.12rem]">
                        {translatedMenuItems[10]}  {/* <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            /> */}
                        </div>

                        {/* <div className=" md:w-[8.02rem]">
                        {translatedMenuItems[11]}   
                        </div> */}
                    </div>
             </div>
                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                        dataLength={props.highDistributorOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfHigh ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.highDistributorOrder.length ?
                            <>
                                {props.highDistributorOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex ">
                                                    <div className=" flex items-center   md:w-[2.56rem] max-sm:w-full  ">
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


                                                    <div className=" flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs font-poppins">
                                                          
                                                                <span
                                                                    class="underline cursor-pointer font-bold text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleOrderDetailsModal(true);
                                                                    }}
                                                                >{item.newOrderNo}</span>
                                                                  <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.count || 0}
                                                                overflowCount={999}
                                                                offset={[ 0, -16]}
                                                            >
                                                            </Badge>
                                                           
                                                            {date === currentdate ? (
                                                                <span
                                                                    class="text-[tomato] text-[0.65rem] font-bold">
                                                                    {/* {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />} */}{translatedMenuItems[14]}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex md:w-[4.81rem] text-xs items-center max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                                    <div className=" flex md:w-[6.31rem] text-xs max-sm:flex-row w-full max-sm:justify-between ">
                                                    
                                                    </div>
                                                    {/* <div className=" flex   md:w-[4.02rem] text-xs max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div >
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div> */}

                                                    <div className=" flex md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" font-poppins ">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                                offset={[ 0, -16]}
                                                            >
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                        handleCheckAwb();
                                                                        handleSetParticularOrderData(item)
                                                                    }
                                                                    }
                                                                ><span className='!text-[#faad14]'>
                                                                    {/* Ship  */}
                                                                    {translatedMenuItems[15]} ID</span></Button>
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className=" flex md:w-[5.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div >
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex  items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.expectedPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>
                                                    <div className=" flex  items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.finalPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>


                                                    <div className=" flex items-center  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} /> {visible && (item.orderId === particularRowData.orderId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                                : (item.offerPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex  md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                       {translatedMenuItems[16]} {/* <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        /> */}
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[17]}  {/* <FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /> */}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title=
                                                        {translatedMenuItems[18]}   // {<FormattedMessage
                                                        //     id="app.updaterevisedprice"
                                                        //     defaultMessage="Update Revised Price"
                                                        // />}
                                                        >
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
                                                <div className=" flex   md:w-[15.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex  md:w-[16.04rem] text--xs max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div >
                                                    {item.supervisorUserName ? 
                                                    <MultiAvatar
                                                                primaryTitle={item.supervisorUserName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />:<div class="text-[red]">
                                                                {/* Tag Supervisor */}{translatedMenuItems[19]}
                                                                </div>}
                                                        {/* <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span> */}
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                <div className=" flex  md:w-[11.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    {item.inventoryReceiveInd ? null
                                                        :
                                                        <Tooltip title={translatedMenuItems[20]}
                                                        // {<FormattedMessage
                                                        //     id="app.selectinventorylocation"
                                                        //     defaultMessage="Select Inventory Location"
                                                        // />}
                                                        >
                                                            <Button
                                                                type='primary'
                                                                className="cursor-pointer text-xs bg-[#3096e9] text-white"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderPickupModal(true);
                                                                }}
                                                            >{translatedMenuItems[21]}
                                                                {/* <FormattedMessage
                                                                    id="app.orderpickup"
                                                                    defaultMessage="Pickup"
                                                                /> */}

                                                            </Button>
                                                        </Tooltip>}
                                                </div>
                                                <div class="flex items-center  justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                    <div>
                                                            <Tooltip title={translatedMenuItems[22]}
                                                            // "PI List"
                                                            >
                                                                <span
                                                                    className="!text-icon cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handlePIModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}>PI</span>
                                                                

                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[23]}
                                                            // {<FormattedMessage
                                                            //     id="app.notes"
                                                            //     defaultMessage="Notes"
                                                            // />}
                                                            >
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
                                                            <Tooltip title={translatedMenuItems[24]}
                                                            // {<FormattedMessage
                                                            //     id="app.status"
                                                            //     defaultMessage="Status"
                                                            // />}
                                                            >
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
                                                            <Tooltip title={translatedMenuItems[25]}
                                                            // "Collection"
                                                            >
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                        { !item.inventoryReceiveInd ? (
                                                        <div class=" cursor-pointer">
                                                        <Tooltip title={translatedMenuItems[30]}
                                                        // "Add Supervisor"
                                                        >
                                                            <PersonAddAlt1
                                                                className="!text-icon cursor-pointer"
                                                                style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                                onClick={() => {
                                                                    props.handleInventoryLocationInOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }} />
                                                        </Tooltip>
                                                        </div> ) : null
                                                    }

                                                    
                                                   
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[26]}
                                                            // {<FormattedMessage
                                                            //     id="app.rating"
                                                            //     defaultMessage="Rating"
                                                            // />}
                                                            >
                                                                <StarBorderIcon

                                                                    className="!text-icon cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[27]}
                                                            // {<FormattedMessage
                                                            //     id="app.feedback"
                                                            //     defaultMessage="Feedback"
                                                            // />}
                                                            >
                                                                <FeedbackIcon
                                                                    className="!text-icon cursor-pointer text-[#10d512] "
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                 

                                                    
                                                        <div>
                                                            {item.inventoryReceiveInd ? null : <Tooltip title={translatedMenuItems[28]}
                                                            // {<FormattedMessage
                                                            //     id="app.edit"
                                                            //     defaultMessage="Edit"
                                                            // />}
                                                            >
                                                                <BorderColorIcon
                                                                    className=" !text-icon cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditOrder(item)
                                                                        props.handleUpdateOrder(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                            </Tooltip>}
                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[29]}
                                                            // {<FormattedMessage
                                                            //     id="app.delete"
                                                            //     defaultMessage="Detele"
                                                            // />}
                                                            >
                                                                <DeleteOutlined
                                                                    className="!text-icon cursor-pointer text-[red]"
                                                                    onClick={() => { props.removeOrderAcc(item.orderId) }}
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
                            </> : !props.highDistributorOrder.length && !props.fetchingDistributorOfHigh ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
            
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex  w-[100%]  bg-transparent  sticky z-10">
                <div className='flex   justify-between w-[85%]  text-xs font-bold font-poppins'>
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">
                    {translatedMenuItems[12]}   {/* Normal */}
                         </div>
                        <div className=" md:w-[9.41rem] ml-2">
                        
                             {translatedMenuItems[1]}ID
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[13]}
                        </div>
                        <div className=" md:w-[5.012rem]">
                        {translatedMenuItems[2]}  {/* LOB */}
                        </div>
                        {/* <div className=" md:w-[5.08rem]">
                        {translatedMenuItems[3]}   
                        </div> */}

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                        {translatedMenuItems[4]}
                        </div>
                        <div className="md:w-[6.11rem]">
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
                        </div>
                    </div>

                   
                    <InfiniteScroll
                        dataLength={props.lowDistributorOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfLow ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"33vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.lowDistributorOrder.length ?
                            <>
                                {props.lowDistributorOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex ">
                                                    <div className=" flex items-center  md:w-[2.56rem] max-sm:w-full  ">
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


                                                    <div className=" flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs  font-poppins">
                                                           
                                                                <span
                                                                    class="underline cursor-pointer font-bold text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleOrderDetailsModal(true);
                                                                    }}
                                                                >{item.newOrderNo}</span>
                                                                 <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.count || 0}
                                                                overflowCount={999}
                                                                offset={[ 0, -16]}
                                                            >
                                                            </Badge>
                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span
                                                                    class="text-[tomato] text-[0.65rem] font-bold">
                                                                   {translatedMenuItems[14]} {/* {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />} */}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex md:w-[4.81rem] text-xs items-center max-sm:flex-row w-full max-sm:justify-between ">
                                                    {date}
                                                    </div>
                                                    <div className=" flex   md:w-[6.31rem] text-xs max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>

                                                    {/* <div className=" flex   md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div >
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div> */}

                                                    <div className=" flex  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class="  font-poppins">
                                                           
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                        handleCheckAwb();
                                                                        handleSetParticularOrderData(item)
                                                                    }
                                                                    }
                                                                ><span className='!text-[#faad14]'>
                                                                   {/* Ship  */}
                                                                   {translatedMenuItems[15]}  ID</span></Button>
                                                                   <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                            > </Badge>
                                                        </div>
                                                    </div>
                                                    <div className=" flex md:w-[5.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                        <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.expectedPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>
                                                    <div className=" flex   items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs  font-poppins">
                                                        <CurrencySymbol currencyType={item.orderCurrencyName} /> {(item.finalPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>


                                                    <div className=" flex   items-center  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} /> {visible && (item.orderId === particularRowData.orderId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                                : (item.offerPrice / 1000).toFixed(2)}k
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex    md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button 
                                                                    type='cancel'
                                                                    onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                    {translatedMenuItems[16]}     {/* <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        /> */}
                                                                    </Button>
                                                                    <Button
                                                                     type='cancel'
                                                                     onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[17]}     {/* <FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /> */}
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={translatedMenuItems[18]} 
                                                        // {<FormattedMessage
                                                        //     id="app.updaterevisedprice"
                                                        //     defaultMessage="Update Revised Price"
                                                        // />}
                                                        >
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
                                                <div className=" flex  md:w-[15.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex text-xs   md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div >
                                                        {/* <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span> */}
                                                        {item.supervisorUserName ? 
                                                    <MultiAvatar
                                                                primaryTitle={item.supervisorUserName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            /> : <div class="text-[red]">
                                                             {translatedMenuItems[19]}    {/* Tag Supervisor */}
                                                                </div>}
                                                    </div>
                                                </div>
                                                <div className=" flex   md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                <div className=" flex  md:w-[11.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    {item.inventoryReceiveInd ? null
                                                        :
                                                        <Tooltip title={translatedMenuItems[20]} 
                                                        // {<FormattedMessage
                                                        //     id="app.selectinventorylocation"
                                                        //     defaultMessage="Select Inventory Location"
                                                        // />}
                                                        >
                                                            <Button
                                                                type='primary'
                                                                className="cursor-pointer text-xs bg-[#3096e9] text-white"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderPickupModal(true);
                                                                }}
                                                            >
                                                              {translatedMenuItems[21]}   {/* <FormattedMessage
                                                                    id="app.orderpickup"
                                                                    defaultMessage="Pickup"
                                                                /> */}

                                                            </Button>
                                                        </Tooltip>}
                                                </div>
                                                <div class="flex items-center justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                    <div>
                                                            <Tooltip title={translatedMenuItems[22]} 
                                                            // "PI List"
                                                            >
                                                                <span
                                                                    className="!text-icon cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handlePIModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}>PI</span>
                                                                

                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[23]} 
                                                            // {<FormattedMessage
                                                            //     id="app.notes"
                                                            //     defaultMessage="Notes"
                                                            // />}
                                                            >
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
                                                            <Tooltip title={translatedMenuItems[24]} 
                                                            // {<FormattedMessage
                                                            //     id="app.status"
                                                            //     defaultMessage="Status"
                                                            // />}
                                                            >
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
                                                            <Tooltip title={translatedMenuItems[25]} 
                                                            // "Collection"
                                                            >
                                                                <PaidIcon
                                                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                        { !item.inventoryReceiveInd ? (
                                                        <div class=" cursor-pointer">
                                                        <Tooltip title={translatedMenuItems[30]} 
                                                        // "Add Supervisor"
                                                        >
                                                            <PersonAddAlt1
                                                                className="!text-icon cursor-pointer"
                                                                style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                                onClick={() => {
                                                                    props.handleInventoryLocationInOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }} />
                                                        </Tooltip>
                                                        </div> ) : null
                                                    }

                                                    
                                                  
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[26]} 
                                                            // {<FormattedMessage
                                                            //     id="app.rating"
                                                            //     defaultMessage="Rating"
                                                            // />}
                                                            >
                                                                <StarBorderIcon

                                                                    className="!text-icon cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[27]} 
                                                            // {<FormattedMessage
                                                            //     id="app.feedback"
                                                            //     defaultMessage="Feedback"
                                                            // />}
                                                            >
                                                                <FeedbackIcon
                                                                    className="!text-icon cursor-pointer text-[#10d512]"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                               

                                                 
                                                        <div>
                                                            {item.inventoryReceiveInd ? null : <Tooltip title={translatedMenuItems[28]} 
                                                            // {<FormattedMessage
                                                            //     id="app.updateorder"
                                                            //     defaultMessage="Update Order"
                                                            // />}
                                                            >
                                                                <BorderColorIcon
                                                                    className=" !text-icon cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditOrder(item)
                                                                        props.handleUpdateOrder(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                            </Tooltip>}
                                                        </div>
                                                        <div>
                                                            <Tooltip title={translatedMenuItems[29]} 
                                                            // {<FormattedMessage
                                                            //     id="app.delete"
                                                            //     defaultMessage="Detele"
                                                            // />}
                                                            >
                                                                <DeleteOutlined
                                                                    className="!text-icon cursor-pointer text-[red]"
                                                                    onClick={() => { props.removeOrderAcc(item.orderId) }}
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
                            </> : !props.lowDistributorOrder.length && !props.fetchingDistributorOfLow ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
           
          
                <AddLocationInOrder
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    addInventoryInOrder={props.addInventoryInOrder}
                    handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
                />
                <AddPickupModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    handleOrderPickupModal={props.handleOrderPickupModal}
                    addpickupLocation={props.addpickupLocation}
                    particularRowData={particularRowData}
                />
                <AddNotesOrderModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    addNotesInOrder={props.addNotesInOrder}
                    handleNotesModalInOrder={props.handleNotesModalInOrder}
                />
                <AccountOrderDetailsModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    handleOrderDetailsModal={props.handleOrderDetailsModal}
                    addOrderDetailsModal={props.addOrderDetailsModal} />
                <StatusOfOrderModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    handleStatusOfOrder={props.handleStatusOfOrder}
                    addStatusOfOrder={props.addStatusOfOrder}
                    particularRowData={particularRowData}
                />
                <PaidButtonModal
                distributorId={props.distributorId}
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    type={props.type}
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={particularRowData}
                />
                <AccountproductionModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    accountOrderProduction={props.accountOrderProduction}
                    handleAccountProduction={props.handleAccountProduction}
                />
                <UpdateOrderModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateOrder={props.handleUpdateOrder}
                    updateOrderModal={props.updateOrderModal}
                />
                 <PIOPenModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText} 
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handlePIModal={props.handlePIModal}
                    piButtonModal={props.piButtonModal}
                />

           
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
    highDistributorOrder:distributor.highDistributorOrder,
    fetchingDistributorOfHigh:distributor.fetchingDistributorOfHigh,
    mediumDistributorOrder:distributor.mediumDistributorOrder,
    fetchingDistributorOfMedium:distributor.fetchingDistributorOfMedium,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,
    piButtonModal: distributor.piButtonModal

});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDistributorOrderByDistributorId,
    getDistributorOrderOfHigh,
    getDistributorOrderOfMedium,
    getDistributorOrderOfLow,
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
    getLocationList,
    updateSubOrderAwb,
    getOrderRecords,
    handlePIModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderTable);