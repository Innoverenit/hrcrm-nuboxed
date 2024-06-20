
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal } from "../Account/AccountAction";
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
            <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
                    <div className=" md:w-[12rem]">Order ID</div>
                    <div className=" md:w-28">Customer</div>
                    <div className=" md:w-28 ">Contact</div>
                    <div className="md:w-32">#Phone</div>
                    <div className="md:w-[16rem]">Creation Date</div>
                    <div className="md:w-24"></div>
                </div>
                <InfiniteScroll
                    dataLength={props.comepletOrder.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={props.fetchingCompleteOrders ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                    height={"80vh"}
                >
                    {props.comepletOrder.map((item) => {
                        const currentdate = dayjs().format("DD/MM/YYYY");
                        const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                        return (
                            <div>
                                <div
                                    className="flex rounded justify-between mt-4 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                                // style={{
                                //   borderBottom: "3px dotted #515050",
                                // }}
                                >
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                                            <div className="flex max-sm:w-full">
                                                <div class="w-60">
                                                    <Badge size="small" count={item.productNum}>
                                                        <span
                                                            class="underline cursor-pointer text-[#1890ff]"
                                                            onClick={() => {
                                                                handleOrder(item.orderId);
                                                                handleSetParticularOrderData(item);
                                                                props.handleOrderDetailsModal(true);
                                                            }}

                                                        >{`${item.newOrderNo} `}

                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span
                                                                    style={{
                                                                        color: "tomato",
                                                                        fontWeight: "bold",
                                                                    }}
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
                                        <div className=" flex font-medium flex-col  md:w-48 max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.noOfPhones}
                                            </h4>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                            <span>{date}</span>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.noOfownerPhones}
                                            </h4>
                                        </div>
                                        <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                                            {item.orderStatus}
                                        </div>
                                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Notes">
                                                    <NoteAltIcon
                                                        style={{ cursor: "pointer", color: "green", fontSize: "1rem" }}
                                                        onClick={() => {

                                                            props.handleNotesModalInOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />

                                                </Tooltip>
                                            </h4>


                                        </div>


                                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Status">
                                                    <EventRepeatIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }}
                                                        onClick={() => {
                                                            props.handleStatusOfOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </h4>
                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}


                                        </div>
                                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Collection">
                                                    <PaidIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }}
                                                        onClick={() => {
                                                            props.handlePaidModal(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    // style={{ color: "blue" }}
                                                    />
                                                </Tooltip>

                                            </h4>
                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}


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
