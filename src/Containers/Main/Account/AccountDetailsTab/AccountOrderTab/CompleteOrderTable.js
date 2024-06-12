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
    getLocationList,
    updateSubOrderAwb,
} from "../../AccountAction";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input, Select, Tooltip } from 'antd';
import { MultiAvatar, MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import SubOrderList from './SubOrderList';
import { PersonAddAlt1 } from '@mui/icons-material';

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
    useEffect(() => {
        setPage(page + 1);
        props.getOrderRecords(props.distributorId,"repair");
        props.getLocationList(props.orgId);
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


    return (
        <>
      
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">Urgent </div>
                        <div className=" md:w-[11.41rem] ml-2">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order ID"
                            />
                        </div>
                        <div className=" md:w-[5.012rem]">
                            LOB
                        </div>
                        <div className=" md:w-[5.08rem]">
                            <FormattedMessage
                                id="app.owner"
                                defaultMessage="Owner"
                            />
                        </div>

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[8.11rem]">
                            <FormattedMessage
                                id="app.quoted"
                                defaultMessage="Quoted"
                            />
                        </div>
                        <div className="md:w-[5.09rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5.076rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                            <FormattedMessage
                                id="app.received"
                                defaultMessage="Received"
                            />
                        </div>
                        <div className=" md:w-[8.03rem]">
                            <FormattedMessage
                                id="app.supervisor"
                                defaultMessage="Supervisor"
                            />
                        </div>
                        <div className=" md:w-[8.12rem]">
                            <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            />
                        </div>

                        <div className=" md:w-[8.02rem]">
                            <FormattedMessage
                                id="app.repair"
                                defaultMessage="Repair"
                            />
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                        dataLength={props.highCompleteOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingHighCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"19vh"}
                    >
                        {props.highCompleteOrder.length ?
                            <>
                                {props.highCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                                <div class="flex ">
                                                    <div className=" flex font-medium items-center  md:w-[2.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

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


                                                    <div className="ml-1 font-medium flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                                    {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                    <div className=" flex font-medium   md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium  items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                <div className=" flex font-medium   md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                        <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        />
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}><FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /></Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={<FormattedMessage
                                                            id="app.updaterevisedprice"
                                                            defaultMessage="Update Revised Price"
                                                        />}>
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-xl cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> : null}

                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[11.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    {item.inventoryReceiveInd ? null
                                                        :
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.selectinventorylocation"
                                                            defaultMessage="Select Inventory Location"
                                                        />}>
                                                            <Button
                                                                type='primary'
                                                                className="cursor-pointer text-sm bg-[#3096e9] text-white"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderPickupModal(true);
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="app.orderpickup"
                                                                    defaultMessage="Pickup"
                                                                />

                                                            </Button>
                                                        </Tooltip>}
                                                </div>
                                                <div class="flex justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.notes"
                                                                defaultMessage="Notes"
                                                            />}>
                                                                <NoteAltIcon
                                                                    className="!text-xl cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handleNotesModalInOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />

                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}>
                                                                <EventRepeatIcon

                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                 
                                                 

                                                        <div>
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                        {/* {item.locationName && !item.inventoryReceiveInd && <div class=" cursor-pointer"> */}
                                                        <Tooltip title="Add Supervisor">
                                                            <PersonAddAlt1
                                                                className="!text-xl cursor-pointer"
                                                                style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                                onClick={() => {
                                                                    props.handleInventoryLocationInOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }} />
                                                        </Tooltip>
                                                        {/* </div>} */}

                                                    
                                                  
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.rating"
                                                                defaultMessage="Rating"
                                                            />}>
                                                                <StarBorderIcon

                                                                    className="!text-xl cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.feedback"
                                                                defaultMessage="Feedback"
                                                            />}>
                                                                <FeedbackIcon
                                                                    className="!text-xl cursor-pointer"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                  

                                                   
                                                        <div>
                                                            {item.inventoryReceiveInd ? null : <Tooltip title={<FormattedMessage
                                                                id="app.updateorder"
                                                                defaultMessage="Update Order"
                                                            />}>
                                                                <BorderColorIcon
                                                                    className=" !text-xl cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditOrder(item)
                                                                        props.handleUpdateOrder(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                            </Tooltip>}
                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.delete"
                                                                defaultMessage="Detele"
                                                            />}>
                                                                <DeleteOutlined
                                                                    className="!text-xl cursor-pointer text-[red]"
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
                            </> : !props.highCompleteOrder.length && !props.fetchingHighCompleteOrders ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
            
           
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[orange] ">High </div>
                        <div className=" md:w-[11.41rem] ml-2">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order ID"
                            />
                        </div>
                        <div className=" md:w-[5.012rem]">
                            LOB
                        </div>
                        <div className=" md:w-[5.08rem]">
                            <FormattedMessage
                                id="app.owner"
                                defaultMessage="Owner"
                            />
                        </div>

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[8.11rem]">
                            <FormattedMessage
                                id="app.quoted"
                                defaultMessage="Quoted"
                            />
                        </div>
                        <div className="md:w-[5.09rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5.076rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                            <FormattedMessage
                                id="app.received"
                                defaultMessage="Received"
                            />
                        </div>
                        <div className=" md:w-[8.03rem]">
                            <FormattedMessage
                                id="app.supervisor"
                                defaultMessage="Supervisor"
                            />
                        </div>
                        <div className=" md:w-[8.12rem]">
                            <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            />
                        </div>

                        <div className=" md:w-[8.02rem]">
                            <FormattedMessage
                                id="app.repair"
                                defaultMessage="Repair"
                            />
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                        dataLength={props.mediumCompleteOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingMediumCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"19vh"}
                    >
                        {props.mediumCompleteOrder.length ?
                            <>
                                {props.mediumCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                                                                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                                <div class="flex ">
                                                    <div className=" flex font-medium items-center  md:w-[3.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

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


                                                    <div className="ml-1 font-medium flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                                    {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                    <div className=" flex font-medium   md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium  items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                <div className=" flex font-medium   md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                        <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        />
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}><FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /></Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={<FormattedMessage
                                                            id="app.updaterevisedprice"
                                                            defaultMessage="Update Revised Price"
                                                        />}>
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-xl cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> : null}

                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[11.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    {item.inventoryReceiveInd ? null
                                                        :
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.selectinventorylocation"
                                                            defaultMessage="Select Inventory Location"
                                                        />}>
                                                            <Button
                                                                type='primary'
                                                                className="cursor-pointer text-sm bg-[#3096e9] text-white"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderPickupModal(true);
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="app.orderpickup"
                                                                    defaultMessage="Pickup"
                                                                />

                                                            </Button>
                                                        </Tooltip>}
                                                </div>
                                                <div class="flex justify-end w-[8rem]">
                                                    <div class="flex flex-row max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.notes"
                                                                defaultMessage="Notes"
                                                            />}>
                                                                <NoteAltIcon
                                                                    className="!text-xl cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handleNotesModalInOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />

                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}>
                                                                <EventRepeatIcon

                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                  
                                                   

                                                        <div>
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                        {/* {item.locationName && !item.inventoryReceiveInd && <div class=" cursor-pointer"> */}
                                                        <Tooltip title="Add Supervisor">
                                                            <PersonAddAlt1
                                                                className="!text-xl cursor-pointer"
                                                                style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                                onClick={() => {
                                                                    props.handleInventoryLocationInOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }} />
                                                        </Tooltip>
                                                        {/* </div>} */}

                                                    
                                                  
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.rating"
                                                                defaultMessage="Rating"
                                                            />}>
                                                                <StarBorderIcon

                                                                    className="!text-xl cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.feedback"
                                                                defaultMessage="Feedback"
                                                            />}>
                                                                <FeedbackIcon
                                                                    className="!text-xl cursor-pointer"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                   

                                                 
                                                        <div>
                                                            {item.inventoryReceiveInd ? null : <Tooltip title={<FormattedMessage
                                                                id="app.updateorder"
                                                                defaultMessage="Update Order"
                                                            />}>
                                                                <BorderColorIcon
                                                                    className=" !text-xl cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditOrder(item)
                                                                        props.handleUpdateOrder(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                            </Tooltip>}
                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.delete"
                                                                defaultMessage="Detele"
                                                            />}>
                                                                <DeleteOutlined
                                                                    className="!text-xl cursor-pointer text-[red]"
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
                            </> : !props.mediumCompleteOrder.length && !props.fetchingMediumCompleteOrders ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
         
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">Normal </div>
                        <div className=" md:w-[11.41rem] ml-2">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order ID"
                            />
                        </div>
                        <div className=" md:w-[5.012rem]">
                            LOB
                        </div>
                        <div className=" md:w-[5.08rem]">
                            <FormattedMessage
                                id="app.owner"
                                defaultMessage="Owner"
                            />
                        </div>

                        <div className="md:w-[5.81rem]">
                        </div>
                        <div className="md:w-[7.91rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[8.11rem]">
                            <FormattedMessage
                                id="app.quoted"
                                defaultMessage="Quoted"
                            />
                        </div>
                        <div className="md:w-[5.09rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5.076rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>
                        <div className=" md:w-[5.063rem]">
                        </div>
                        <div className=" md:w-[8.10rem]">
                            <FormattedMessage
                                id="app.received"
                                defaultMessage="Received"
                            />
                        </div>
                        <div className=" md:w-[8.03rem]">
                            <FormattedMessage
                                id="app.supervisor"
                                defaultMessage="Supervisor"
                            />
                        </div>
                        <div className=" md:w-[8.12rem]">
                            <FormattedMessage
                                id="app.lead"
                                defaultMessage="Lead"
                            />
                        </div>

                        <div className=" md:w-[8.02rem]">
                            <FormattedMessage
                                id="app.repair"
                                defaultMessage="Repair"
                            />
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                        dataLength={props.lowCompleteOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingLowCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"19vh"}
                    >
                        {props.lowCompleteOrder.length ?
                            <>
                                {props.lowCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                                <div class="flex ">
                                                    <div className=" flex font-medium items-center md:w-[2.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

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


                                                    <div className="ml-1 font-medium flex items-center md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                                    {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[6.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                    <div className=" flex font-medium   md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <MultiAvatar
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium  items-center  md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium  items-center  md:w-[4.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
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
                                                <div className=" flex font-medium   md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {visible && (item.orderId === particularRowData.orderId) ? (
                                                            <>
                                                                <div className=" flex justify-between flex-col">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >
                                                                        <FormattedMessage
                                                                            id="app.save"
                                                                            defaultMessage="Save"
                                                                        />
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}><FormattedMessage
                                                                        id="app.cancel"
                                                                        defaultMessage="Cancel"
                                                                    /></Button>
                                                                </div>
                                                            </>
                                                        ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={<FormattedMessage
                                                            id="app.updaterevisedprice"
                                                            defaultMessage="Update Revised Price"
                                                        />}>
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-xl cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> : null}

                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  md:w-[14.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[17.05rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.productionLocationName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[11.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    {item.inventoryReceiveInd ? null
                                                        :
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.selectinventorylocation"
                                                            defaultMessage="Select Inventory Location"
                                                        />}>
                                                            <Button
                                                                type='primary'
                                                                className="cursor-pointer text-sm bg-[#3096e9] text-white"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderPickupModal(true);
                                                                }}
                                                            >
                                                                <FormattedMessage
                                                                    id="app.orderpickup"
                                                                    defaultMessage="Pickup"
                                                                />

                                                            </Button>
                                                        </Tooltip>}
                                                </div>
                                                <div class="flex justify-end w-[8rem]">
                                                    <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.notes"
                                                                defaultMessage="Notes"
                                                            />}>
                                                                <NoteAltIcon
                                                                    className="!text-xl cursor-pointer text-[green]"
                                                                    onClick={() => {
                                                                        props.handleNotesModalInOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />

                                                            </Tooltip>
                                                        </div>

                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.status"
                                                                defaultMessage="Status"
                                                            />}>
                                                                <EventRepeatIcon

                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                  
                                                  

                                                        <div>
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-xl cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>
                                                        {/* {item.locationName && !item.inventoryReceiveInd && <div class=" cursor-pointer"> */}
                                                        <Tooltip title="Add Supervisor">
                                                            <PersonAddAlt1
                                                                className="!text-xl cursor-pointer"
                                                                style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                                onClick={() => {
                                                                    props.handleInventoryLocationInOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }} />
                                                        </Tooltip>
                                                        {/* </div>} */}

                                                    
                                                  
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.rating"
                                                                defaultMessage="Rating"
                                                            />}>
                                                                <StarBorderIcon

                                                                    className="!text-xl cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.feedback"
                                                                defaultMessage="Feedback"
                                                            />}>
                                                                <FeedbackIcon
                                                                    className="!text-xl cursor-pointer"
                                                                />
                                                            </Tooltip>

                                                        </div>
                                                    

                                                   
                                                        <div>
                                                            {item.inventoryReceiveInd ? null : <Tooltip title={<FormattedMessage
                                                                id="app.updateorder"
                                                                defaultMessage="Update Order"
                                                            />}>
                                                                <BorderColorIcon
                                                                    className=" !text-xl cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditOrder(item)
                                                                        props.handleUpdateOrder(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                            </Tooltip>}
                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.delete"
                                                                defaultMessage="Detele"
                                                            />}>
                                                                <DeleteOutlined
                                                                    className="!text-xl cursor-pointer text-[red]"
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
    getLocationList,
    updateSubOrderAwb,
    getOrderRecords
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrderTable);
