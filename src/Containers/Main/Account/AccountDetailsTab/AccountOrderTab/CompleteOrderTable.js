import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
    getCompleteOrders,
    handleOrderDetailsModal,
    handleStatusOfOrder,
    handlePaidModal
} from "../../AccountAction";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input, Select, Tooltip } from 'antd';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import SubOrderList from './SubOrderList';
const AccountOrderDetailsModal = lazy(() => import('./AccountOrderDetailsModal'));
const StatusOfOrderModal = lazy(() => import('./StatusOfOrderModal'));
const PaidButtonModal = lazy(() => import('./PaidButtonModal'));

const CompleteOrderTable = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getCompleteOrders(props.distributorId, page)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getCompleteOrders(props.distributorId, page)
    };

    const [checkAwb, setCheckAwb] = useState(false)
    const [particularRowData, setParticularRowData] = useState({});

    const handleCheckAwb = () => {
        setCheckAwb(!checkAwb)
    }
    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[1.56rem]"> </div>
                        <div className=" md:w-[7.4rem]">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order No"
                            />
                        </div>
                        <div className=" md:w-[5rem]">
                            <FormattedMessage
                                id="app.created"
                                defaultMessage="Created"
                            />
                        </div>

                        <div className="md:w-[5.8rem]">
                        </div>
                        <div className="md:w-[5.9rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[6rem]">
                            <FormattedMessage
                                id="app.expectedprice"
                                defaultMessage="Expected Price"
                            />
                        </div>
                        <div className="md:w-[5rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>
                        <div className=" md:w-[5rem]">
                        </div>
                        <div className=" md:w-[10.1rem]">
                            <FormattedMessage
                                id="app.location"
                                defaultMessage="Location"
                            />
                        </div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                    <InfiniteScroll
                        dataLength={props.completeOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingCompleteOrders ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.completeOrder.length ?
                            <>
                                {props.completeOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3">
                                                <div class="flex w-3/4">
                                                    <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">
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

                                                    <div class="flex">
                                                        <div className="ml-1 font-medium flex-col md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
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
                                                    </div>

                                                    <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium flex-col md:w-[5.8rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <Button
                                                                class=" bg-green-500"
                                                                onClick={() => {
                                                                    handleCheckAwb();
                                                                    handleSetParticularOrderData(item)
                                                                }
                                                                }
                                                            >Check AWB</Button>
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[5.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <MultiAvatar2
                                                                primaryTitle={item.contactPersonName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8em"}
                                                                imgHeight={"1.8em"}
                                                            />
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                        </div>

                                                    </div>


                                                    <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <CurrencySymbol currencyType={item.orderCurrencyName} /> {item.offerPrice}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.locationName}
                                                    </div>
                                                </div>

                                                <div class="flex justify-end">
                                                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.notes"
                                                                defaultMessage="Notes"
                                                            />}>
                                                                <NoteAltIcon
                                                                    className="!text-base cursor-pointer text-[green]"
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

                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleStatusOfOrder(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>

                                                    </div>
                                                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">

                                                        <div>
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handlePaidModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>

                                                        </div>

                                                    </div>
                                                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.rating"
                                                                defaultMessage="Rating"
                                                            />}>
                                                                <StarBorderIcon

                                                                    className="!text-base cursor-pointer" />
                                                            </Tooltip>

                                                        </div>
                                                        <div>
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.feedback"
                                                                defaultMessage="Feedback"
                                                            />}>
                                                                <FeedbackIcon
                                                                    className="!text-base cursor-pointer"
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
                            </> : !props.completeOrder.length && !props.fetchingCompleteOrders ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                    {/* </div> */}

                </div>
            </div >
            <Suspense fallback={<BundleLoader />}>

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
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    addStatusOfOrder: distributor.addStatusOfOrder,
    addPaidButtonModal: distributor.addPaidButtonModal,
    completeOrder: distributor.completeOrder,
    fetchingCompleteOrders: distributor.fetchingCompleteOrders
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getCompleteOrders,
    handleOrderDetailsModal,
    handleStatusOfOrder,
    handlePaidModal

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrderTable);
