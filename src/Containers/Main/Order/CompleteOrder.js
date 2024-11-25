
import React, {  useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,  Badge } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import PaidIcon from '@mui/icons-material/Paid';
import dayjs from "dayjs";
import {
    getCompleteOrders,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal,
    emptyOrders
} from "./OrderAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar2 } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";

function CompleteOrder(props) {
    const [page, setPage] = useState(0);
    useEffect(() => {
        props.getCompleteOrders(props.userId, page);
        setPage(page + 1);
    }, []);
    const [hasMore, setHasMore] = useState(true);
    const [particularRowData, setParticularRowData] = useState({});
    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }
    // props.getCompleteOrders(props.userId,page);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getCompleteOrders(props.userId, page);
    }
    useEffect(() => {
        return () => props.emptyOrders();
    }, []);

    return (
        <>
            <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
                    <div className="w-[12rem] max-md:w-[12rem]">Order ID</div>
                    <div className="w-[28rem] max-md:w-[28rem]">Customer</div>
                    <div className="w-[28rem] max-md:w-[28rem] ">Contact</div>
                    <div className="w-[32rem] max-md:w-[32rem]">#Phone</div>
                    <div className="w-[16rem] max-md:w-[16rem]">Creation Date</div>
                    <div className="w-[24rem] max-md:w-[24rem]"></div>
                </div>
                <InfiniteScroll
                    dataLength={props.comepletOrder.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={props.fetchingCompleteOrders ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                    height={"80vh"}
                    style={{scrollbarWidth:"thin"}}
                >
                    {props.comepletOrder.map((item) => {
                        const currentdate = dayjs().format("DD/MM/YYYY");
                        const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                        return (
                            <div>
                                <div
                                    className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                                // style={{
                                //   borderBottom: "3px dotted #515050",
                                // }}
                                >
                                    <div class="flex">
                                        <div className=" flex items-center w-wk   max-sm:w-full">
                                            <div className="flex  items-center max-sm:w-full">
                                                <div class="w-60">
                                                    <Badge size="small" count={item.productNum}>
                                                        <span
                                                            class="underline cursor-pointer text-[#1890ff] font-bold"
                                                            onClick={() => {
                                                                handleOrder(item.orderId);
                                                                handleSetParticularOrderData(item);
                                                                props.handleOrderDetailsModal(true);
                                                            }}

                                                        >{`${item.newOrderNo} `}

                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span class=" cursor-pointer text-red-600 font-bold text-[0.65rem]"
                                                                   
                                                                >
                                                                    New
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                    </Badge>
                                                </div>
                                                <div class="w-[4%]"></div>

                                                <div class="max-sm:w-full md:w-44">
                                                    <Tooltip>
                                                        <div class="max-sm:w-full justify-between flex md:flex-col">
                                                            {item.distributorName}

                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex flex-row items-center md:w-44 max-sm:flex-row w-full max-sm:justify-between">
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
                                        <div className=" flex   md:w-48 max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.noOfPhones}
                                            </h4>
                                        </div>
                                        <div className=" flex  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                            <span>{date}</span>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div className=" flex   md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <h4 class=" text-xs  font-semibold  font-poppins">
                                                {item.noOfownerPhones}
                                            </h4>
                                        </div>
                                        <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                                            {item.orderStatus}
                                        </div>
                                        <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm  font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs  font-poppins">
                                                <Tooltip title="Notes">
                                                    <NoteAltIcon className=" cursor-pointer text-green-600 !text-icon"
                                                        onClick={() => {

                                                            props.handleNotesModalInOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />

                                                </Tooltip>
                                            </h4>


                                        </div>


                                        <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                <Tooltip title="Status">
                                                    <EventRepeatIcon  className=" cursor-pointer !text-icon"
                                                    
                                                        onClick={() => {
                                                            props.handleStatusOfOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </h4>
                                            {/* <h4 class=" text-sm  font-poppins max-sm:hidden"> Sector </h4> */}


                                        </div>
                                        <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                <Tooltip title="Collection">
                                                    <PaidIcon  className=" cursor-pointer  !text-icon"
                                                      
                                                        onClick={() => {
                                                            props.handlePaidModal(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    // style={{ color: "blue" }}
                                                    />
                                                </Tooltip>

                                            </h4>
                                            {/* <h4 class=" text-sm  font-poppins max-sm:hidden"> Sector </h4> */}


                                        </div>


                                    </div>

                                </div>
                            </div>
                            // </div>
                        );
                    })}
                </InfiniteScroll>
            </OnlyWrapCard>
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
    );



}

const mapStateToProps = ({ order, auth, distributor }) => ({
    allOrderList: order.allOrderList,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingCompleteOrdersError: order.fetchingCompleteOrdersError,
    fetchingCompleteOrders: order.fetchingCompleteOrders,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    comepletOrder: order.comepletOrder,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCompleteOrders,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyOrders
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
