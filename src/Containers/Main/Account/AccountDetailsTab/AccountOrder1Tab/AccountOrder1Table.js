
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
import { Button,  Tooltip } from 'antd';
import { BundleLoader } from "../../../../../Components/Placeholder";
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import InfiniteScroll from 'react-infinite-scroll-component';
import NodataFoundPage from '../../../../../Helpers/ErrorBoundary/NodataFoundPage';

const ProductionPaymentModal = lazy(() => import('./ProductionPaymentModal'));
const ItemsSearchModal = lazy(() => import('./ItemsSearchModal'));
const  OrderDetailModal = lazy(() => import('./OrderDetailModal'));

const AccountOrder1Table = (props) => {
    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    useEffect(() => {
        setPage(page + 1);
        props.getProductionOrder(props.distributorId, page)
    }, [])
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
             "660",//0 Order no
              "679",//1 Created
              "658",//2 Location
              "260",//3 units
              "73",//4 contact
              "14", //Category
     
       
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
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
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
                        <div className="w-[10.41rem] md:w-[10.41rem]">
                        {translatedMenuItems[0]} no
                        {/* Order no */}
                        </div>
                        <div className=" md:w-[8.1rem]">
                        {translatedMenuItems[1]}
                        {/* Created */}
                        </div>
                        <div className="w-[12.2rem] md:w-[12.2rem]">
                        {translatedMenuItems[2]}
                        {/* location */}
                        </div>
                        <div className="md:w-[5.8rem]">
                        {translatedMenuItems[3]}
                        {/* units */}
                        </div>
                        <div className="w-[5.9rem] md:w-[7.9rem]">
                        {translatedMenuItems[4]}
                        {/* Contact */}
                        </div>
                        <div className="md:w-[3.8rem]"> {translatedMenuItems[5]}</div>
                    </div>


                    <div class="overflow-x-auto ">
                        <InfiniteScroll
                            dataLength={props.productionOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingProductionOrderById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"75vh"}
                            style={{scrollbarWidth:"thin"}}
                        >
                            {props.productionOrder.length ? <>
                                {props.productionOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div >
                                            <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
                                                <div class="flex w-3/4">
                                                    <div className=" flex  md:w-[1.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

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
                                                        <div className="ml-1  flex items-center md:w-[9.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                            <div class=" text-xs  font-poppins">
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
                                                                        class="text-[tomato] font-bold text-[0.65rem]">
                                                                      New
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=" flex   md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <MultiAvatar2
                                                                primaryTitle={item.userName}
                                                                imageURL={item.imageURL}
                                                                imgWidth={"1.8rem"}
                                                                imgHeight={"1.8rem"}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className=" flex   md:w-[17.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.type === "Catalogue" ?
                                                                item.productionLocationDetailsViewDTO && item.productionLocationDetailsViewDTO.name || "" :
                                                                item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}
                                                        </div>
                                                    </div>

                                                    <div className=" flex  items-center  md:w-[4.51rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                        <div class=" text-xs  font-poppins text-center">
                                                            {item.count}

                                                        </div>
                                                    </div>
                                                    <div class="flex flex-row items-center md:w-[10.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-xs">
                                              {item.shipById}
                                            </div>
                                        </div>
                                                    <div className=" flex  items-center  md:w-[11.52rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                        <div class=" text-xs  font-poppins text-center">
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
                                                    <div className=" flex  items-center  md:w-[11.53rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <Tooltip title="Collection">
                                                                <PaidIcon
                                                                    className="!text-xl cursor-pointer"
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
            <Suspense fallback={<BundleLoader />}>
            <ItemsSearchModal
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} 
                searchItemsInLocation={props.searchItemsInLocation}
                handleSearchItem={props.handleSearchItem}
                particularRowData={particularRowData}
            />
            <OrderDetailModal
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} 
                particularRowData={particularRowData}
                showProductList={props.showProductList}
                handleProductOrderDetailsModal={props.handleProductOrderDetailsModal} />
            <ProductionPaymentModal
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} 
                showPaymentListModal={props.showPaymentListModal}
                handleOrderPaymentModal={props.handleOrderPaymentModal}
                particularRowData={particularRowData}
            />
            </Suspense>
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
