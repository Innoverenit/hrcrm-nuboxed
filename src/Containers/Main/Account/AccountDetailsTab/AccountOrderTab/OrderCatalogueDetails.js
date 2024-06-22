import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductionOrderDetails } from "../../AccountAction";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";

function OrderCatalogueDetails(props) {
    useEffect(() => {
        props.getProductionOrderDetails(props.particularRowData.orderId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[90.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[9.41rem]">
                            <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            />
                        </div>
                        <div className=" md:w-[8.1rem]">
                            <FormattedMessage
                                id="app.category"
                                defaultMessage="Category"
                            />
                        </div>
                        <div className=" md:w-[11.2rem]">
                            <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute"
                            />
                        </div>
                        <div className="md:w-[5.8rem]">
                            <FormattedMessage
                                id="app.units"
                                defaultMessage="Units"
                            />
                        </div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.productionOrderDetail.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionDetailById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.productionOrderDetail.map((item) => {

                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3">
                                        <div class="flex w-3/4">

                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.name}

                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.categoryName} {item.subCategoryName}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.attributeName} {item.subAttributeName}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.quantity}

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

        </>
    )
}

const mapStateToProps = ({ distributor }) => ({
    productionOrderDetail: distributor.productionOrderDetail,
    fetchingProductionDetailById: distributor.fetchingProductionDetailById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderDetails
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderCatalogueDetails);
