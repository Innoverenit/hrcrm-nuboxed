import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { getPartNoByItem } from "../../../InventoryAction"
import InfiniteScroll from "react-infinite-scroll-component";

const PartNoListItemWise = (props) => {
    useEffect(() => {
        props.getPartNoByItem(props.poSupplierSuppliesId)
    }, [])

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex sticky z-auto'>
                <div class="rounded m-1 p-1 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[95%] p-1 bg-transparent font-bold sticky text-xs font-poppins z-10">
                        <div className=""></div>

                        <div className=" md:w-[22.12rem]">"System ID</div>
                        <div className=" md:w-[15.5rem]">Part #</div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.partNoByitem.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingPartNoByItem ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >

                        {props.partNoByitem.map((item) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                        <div className=" flex font-medium flex-col md:w-[36.1rem] max-sm:w-full  ">
                                            <div class="flex justify-between text-xs  font-semibold  font-poppins ">
                                                {item.supplierSuppliesUniqueNumberId}
                                            </div>
                                        </div>
                                        {/* <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs  font-semibold  font-poppins ">
                                                    {item.suppliesFullName}
                                                </div>
                                            </div>
                                        </div> */}


                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem]  font-poppins">
                                                {item.partNumber}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    partNoByitem: inventory.partNoByitem,
    fetchingPartNoByItem: inventory.fetchingPartNoByItem
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPartNoByItem,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PartNoListItemWise)

