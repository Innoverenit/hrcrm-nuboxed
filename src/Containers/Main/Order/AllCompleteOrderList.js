
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    emptyOrders,
    getAllComepleteOrderList,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
// import OrderDetailsTable from "../../Customer/Child/CustomerDetail/CustomerDetailsTab/OrderDetailsTable";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar2 } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";

function AllCompleteOrderList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.getAllComepleteOrderList(props.orgId, page);
        setPage(page + 1);
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
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getAllComepleteOrderList(props.orgId, props.currentUser ? props.currentUser : page);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    useEffect(() => {
        return () => props.emptyOrders();
    }, []);
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[12rem]">Order ID</div>
                        <div className=" md:w-[10rem]">Customer</div>
                        <div className=" md:w-[10rem] ">Contact</div>
                        <div className="md:w-[10rem]">#Phone</div>
                        <div className="md:w-[10rem]">Owner</div>
                        <div className="md:w-[10rem]">Creation Date</div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.allCompleteOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingALlCompleteOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                        height={"75vh"}
                    >
                        {props.allCompleteOrder.length ?
                            <>
                                {props.allCompleteOrder.map((item) => {
                                    const currentdate = moment().format("DD/MM/YYYY");
                                    const date = moment(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                                            <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                                <div class="flex">
                                                    <div className=" flex font-medium  md:w-[12.2rem] max-sm:w-full ">
                                                        <Badge size="small" count={item.productNum}>
                                                            <span
                                                                class="underline cursor-pointer text-[#1890ff]"
                                                                onClick={() => {
                                                                    handleOrder(item.orderId);
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderDetailsModal(true);
                                                                }}

                                                            >{item.newOrderNo}

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

                                                    <div className=" flex font-medium   md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.distributorName}
                                                        </div>

                                                    </div>

                                                    <div className=" flex font-medium  md:w-[10em] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-sm text-cardBody font-poppins">

                                                            <MultiAvatar2
                                                                primaryTitle={item.contactPersonName}
                                                                imgWidth={"2.1em"}
                                                                imgHeight={"2.1em"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.noOfPhones}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        <MultiAvatar2
                                                            primaryTitle={item.userName}
                                                            imageURL={item.imageURL}
                                                            imgWidth={"1.8rem"}
                                                            imgHeight={"1.8rem"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {date}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    );
                                })}
                            </> :
                            !props.allCompleteOrder.length && !props.fetchingALlCompleteOrderList ? <NodataFoundPage /> : null}


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
    )
}

const mapStateToProps = ({ order, auth, distributor }) => ({
    allCompleteOrder: order.allCompleteOrder,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingALlCompleteOrderList: order.fetchingALlCompleteOrderList,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllComepleteOrderList,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyOrders
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AllCompleteOrderList);
