
import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from "dayjs";
import {
    getProductionOrder,
    handleProductOrderDetailsModal,
    handleSearchItem,
    handleOrderPaymentModal
} from "../../AccountAction";
import PaidIcon from '@mui/icons-material/Paid';
import { FormattedMessage } from 'react-intl';
import { Button, Input, Tooltip } from 'antd';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import OrderDetailModal from './OrderDetailModal';
import ItemsSearchModal from './ItemsSearchModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import ProductionPaymentModal from './ProductionPaymentModal';


const AccountOrder1Table = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getProductionOrder(props.distributorId, page)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProductionOrder(props.distributorId, page)
    };
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
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

                    </div>


                    <div class="overflow-x-auto ">
                        <InfiniteScroll
                            dataLength={props.productionOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingProductionOrderById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"67vh"}
                        >
                            {props.productionOrder.length ? <>
                                {props.productionOrder.map((item) => {
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
                                                        <div className="ml-1 font-medium flex items-center md:w-[9.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                            <div class=" text-xs text-cardBody font-poppins">
                                                                <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleProductOrderDetailsModal(true);
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

                                                    <div className=" flex font-medium  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[17.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            {item.type === "Catalogue" ?
                                                                item.productionLocationDetailsViewDTO && item.productionLocationDetailsViewDTO.name || "" :
                                                                item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium items-center  md:w-[4.51rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            {item.count}

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium items-center  md:w-[11.52rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <Button
                                                                type='primary'
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleSearchItem(true)
                                                                }}
                                                            >
                                                                Check In Inventory
                                                            </Button>

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium items-center  md:w-[11.53rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-base cursor-pointer"
                                                                    onClick={() => {
                                                                        props.handleOrderPaymentModal(true);
                                                                        handleSetParticularOrderData(item);
                                                                    }}

                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })}</>
                                : !props.productionOrder.length
                                    && !props.fetchingProductionOrderById ? <NodataFoundPage /> : null}
                        </InfiniteScroll>
                    </div>

                </div>
            </div>
            <ItemsSearchModal
                searchItemsInLocation={props.searchItemsInLocation}
                handleSearchItem={props.handleSearchItem}
                particularRowData={particularRowData}
            />
            <OrderDetailModal
                particularRowData={particularRowData}
                showProductList={props.showProductList}
                handleProductOrderDetailsModal={props.handleProductOrderDetailsModal} />
            <ProductionPaymentModal
                showPaymentListModal={props.showPaymentListModal}
                handleOrderPaymentModal={props.handleOrderPaymentModal}
                particularRowData={particularRowData}
            />
        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    accountOrderProduction: distributor.accountOrderProduction,
    productionOrder: distributor.productionOrder,
    showProductList: distributor.showProductList,
    searchItemsInLocation: distributor.searchItemsInLocation,
    showPaymentListModal: distributor.showPaymentListModal,
    fetchingProductionOrderById: distributor.fetchingProductionOrderById,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getProductionOrder,
    handleSearchItem,
    handleProductOrderDetailsModal,
    handleOrderPaymentModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrder1Table);
