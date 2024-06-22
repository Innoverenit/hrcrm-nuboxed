import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import MoveToProductionArchieve from './MoveToProductionArchieve'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getDispatchItemList } from "../../AccountAction"

const SearchedListItems = (props) => {
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    useEffect(() => {
        props.getDispatchItemList(props.productId, props.locationId, props.orderId)
    }, [])
    return (
        <>
            <div className='sticky top-20 z-auto'>
                <div class="rounded-lg mx-5 my-2 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[10rem]">
                            <FormattedMessage
                                id="app.Id"
                                defaultMessage="ID #"
                            />
                        </div>
                        <div className=" md:w-[10rem]">
                            <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            />
                        </div>
                        <div className=" md:w-[10rem]">
                            <FormattedMessage
                                id="app.category"
                                defaultMessage="Category"
                            />
                        </div>
                        <div className=" md:w-[10rem]">
                            <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute"
                            />
                        </div>
                        <div className=" md:w-[10rem]"></div>
                    </div>

                    <div class="overflow-x-auto h-[38vh]">
                        <InfiniteScroll
                            dataLength={props.searchedItem.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.searchingItemInLocation ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.searchedItem.map((item) => {

                                return (
                                    <div >
                                        <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3">
                                            <div class="flex w-3/4">
                                                <div className=" flex font-medium flex-col md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.manufactureId}

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.productFullName}

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.categoryName} {item.subCategoryName}

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.attributeName} {item.subAttributeName}

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">

                                                        <MoveToProductionArchieve
                                                            orderId={props.orderId}
                                                            orderProductLinkId={item.orderProductLinkId}
                                                            dispatchInd={item.dispatchInd}
                                                            productionProductId={item.productionProductId}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </InfiniteScroll>
                    </div>

                </div>

            </div>

        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    searchedItem: distributor.searchedItem,
    searchingItemInLocation: distributor.searchingItemInLocation

});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDispatchItemList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchedListItems);
