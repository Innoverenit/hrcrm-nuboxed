import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import BorderColorOutlined from "@mui/icons-material/BorderColor";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleNotesModalInOrder,
    handlePaidModal,
    handleStatusOfOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    removeOrderAcc,
    deleteDistributorData
} from "../../AccountAction";
import { FormattedMessage } from 'react-intl';
import { Button, Input, Tooltip } from 'antd';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';

const AddLocationInOrder = lazy(() => import('./AddLocationInOrder'));
const AccountOrderDetailsModal = lazy(() => import('./AccountOrderDetailsModal'));
const StatusOfOrderModal = lazy(() => import('./StatusOfOrderModal'));
const AddNotesOrderModal = lazy(() => import('./AddNotesOrderModal'));
const PaidButtonModal = lazy(() => import('./PaidButtonModal'));
const AccountproductionModal = lazy(() => import('./AccountProductionModal'));
const UpdateOrderModal = lazy(() => import('./UpdateAccountOrder/UpdateOrderModal'));


const AccountOrderTable = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getDistributorOrderByDistributorId(props.distributorId, page)
    }, [props.distributorId, page])
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getDistributorOrderByDistributorId(props.distributorId, page)
    };
    const [visible, setVisible] = useState(false)
    const handleUpdateRevisePrice = () => {
        setVisible(!visible)
    }
    const [price, setPrice] = useState(particularRowData.offerPrice)

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
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[9.41rem]">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order No"
                            />
                        </div>
                        <div className=" md:w-[8.1rem]">
                            <FormattedMessage
                                id="app.created"
                                defaultMessage="Created"
                            />
                        </div>
                        <div className=" md:w-[11.2rem]">
                            <FormattedMessage
                                id="app.location"
                                defaultMessage="Location"
                            />
                        </div>
                        <div className="md:w-[5.8rem]">
                            <FormattedMessage
                                id="app.units"
                                defaultMessage="Units"
                            />
                        </div>
                        <div className="md:w-[5.9rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[9.12rem]">
                            <FormattedMessage
                                id="app.expectedprice"
                                defaultMessage="Expected Price"
                            />
                        </div>
                        <div className="md:w-[4.31rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5.8rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>

                    </div>

                    <div class="overflow-x-auto h-[64vh]">
                        <InfiniteScroll
                            dataLength={props.distributorOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingDistributorByDistributorId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.distributorOrder.length ?
                                <>
                                    {props.distributorOrder.map((item) => {
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
                                                                    <span
                                                                        class="underline cursor-pointer text-[#1890ff]"
                                                                        onClick={() => {
                                                                            handleSetParticularOrderData(item);
                                                                            props.handleOrderDetailsModal(true);
                                                                        }}
                                                                    >{item.newOrderNo}</span>
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



                                                        <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                                <MultiAvatar2
                                                                    primaryTitle={item.userName}
                                                                    imageURL={item.imageURL}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">


                                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                                {item.type === "Catalogue" ?
                                                                    item.productionLocationDetailsViewDTO && item.productionLocationDetailsViewDTO.name || "" :
                                                                    item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}
                                                            </div>
                                                        </div>

                                                        <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                                {item.count}

                                                            </div>
                                                        </div>
                                                        <div className=" flex font-medium flex-col  md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                <MultiAvatar2
                                                                    primaryTitle={item.contactPersonName}
                                                                    imageURL={item.imageURL}
                                                                    imgWidth={"1.8em"}
                                                                    imgHeight={"1.8em"}
                                                                />
                                                            </div>

                                                        </div>


                                                        <div className=" flex font-medium flex-col  md:w-[3.5rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                            </div>

                                                        </div>
                                                        <div className=" flex font-medium flex-col  md:w-[4.7rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                            </div>

                                                        </div>


                                                        <div className=" flex font-medium flex-col  md:w-[3.9rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                <CurrencySymbol currencyType={item.orderCurrencyName} />{visible && (item.orderId === particularRowData.orderId) ?
                                                                    <Input
                                                                        type='text'
                                                                        value={price}
                                                                        onChange={(e) => handleChange(e.target.value)}
                                                                    />
                                                                    : item.offerPrice}
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[5.4rem] max-sm:flex-row w-full max-sm:justify-between  ">


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
                                                                    className="!text-base cursor-pointer"
                                                                />
                                                            </Tooltip> : null}

                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[6.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        {props.inspectionRequiredInd ?
                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                {item.transferInd === 0 ? (
                                                                    <Tooltip title="Send To Refurbish">
                                                                        <Button
                                                                            class="cursor-pointer bg-[#3096e9] text-white text-base"
                                                                            onClick={() => {
                                                                                handleSetParticularOrderData(item);
                                                                                props.handleAccountProduction(true);
                                                                            }}
                                                                        >
                                                                            <FormattedMessage
                                                                                id="app.sendtostore"
                                                                                defaultMessage="Send To Store"
                                                                            />

                                                                        </Button>
                                                                    </Tooltip>

                                                                ) : null
                                                                }
                                                            </div>
                                                            :
                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                {item.transferInd === 0 ? (
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.selectinventorylocation"
                                                                        defaultMessage="Select Inventory Location"
                                                                    />}>
                                                                        <Button
                                                                            type='primary'
                                                                            className="cursor-pointer text-sm bg-[#3096e9] text-white"
                                                                            onClick={() => {
                                                                                handleSetParticularOrderData(item);
                                                                                props.handleInventoryLocationInOrder(true);
                                                                            }}
                                                                        >
                                                                            <FormattedMessage
                                                                                id="app.orderpickup"
                                                                                defaultMessage="Pickup"
                                                                            />

                                                                        </Button>
                                                                    </Tooltip>

                                                                ) : null
                                                                }
                                                            </div>}


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
                                                            <div>
                                                                <Tooltip title={<FormattedMessage
                                                                    id="app.updateorder"
                                                                    defaultMessage="Update Order"
                                                                />}>
                                                                    <BorderColorOutlined
                                                                        onClick={() => {
                                                                            props.setEditOrder(item)
                                                                            props.handleUpdateOrder(true)
                                                                            handleSetParticularOrderData(item)
                                                                        }}
                                                                        className="!text-base cursor-pointer" />
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
                                                        <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                            <div>
                                                                <Tooltip title={<FormattedMessage
                                                                    id="app.delete"
                                                                    defaultMessage="Detele"
                                                                />}>
                                                                    <DeleteIcon
                                                                        className="!text-base cursor-pointer text-[red]"
                                                                        onClick={() => { props.removeOrderAcc(item.orderId) }}
                                                                    />
                                                                </Tooltip>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        )
                                    })}
                                </> : !props.fetchingDistributorByDistributorId && !props.distributorOrder.length ? <NodataFoundPage /> : null}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
                <AddLocationInOrder
                    particularRowData={particularRowData}
                    addInventoryInOrder={props.addInventoryInOrder}
                    handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
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
                    handleUpdateOrder={props.handleUpdateOrder}
                    updateOrderModal={props.updateOrderModal}
                />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    accountOrderProduction: distributor.accountOrderProduction,
    distributorOrder: distributor.distributorOrder,
    addNotesInOrder: distributor.addNotesInOrder,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    addInventoryInOrder: distributor.addInventoryInOrder,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    addStatusOfOrder: distributor.addStatusOfOrder,
    updateOrderModal: distributor.updateOrderModal,
    addPaidButtonModal: distributor.addPaidButtonModal,
    fetchingDistributorByDistributorId: distributor.fetchingDistributorByDistributorId,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleStatusOfOrder,
    handlePaidModal,
    handleNotesModalInOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    removeOrderAcc,
    deleteDistributorData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderTable);
