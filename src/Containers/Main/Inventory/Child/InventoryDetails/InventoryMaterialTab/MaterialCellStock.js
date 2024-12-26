import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { getItemInCellStock } from "../../../InventoryAction"
import InfiniteScroll from "react-infinite-scroll-component";


const MaterialCellStock = (props) => {
    useEffect(() => {
        props.getItemInCellStock(props.locationDetailsId);
    }, [])

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[30.05rem]">PO #</div>
                        <div className=" md:w-[23.51rem]">Name</div>
                        <div className=" md:w-[15.52rem]">GRN #</div>
                        <div className=" md:w-[22.12rem]">Price</div>
                        <div className=" md:w-[15.25rem]">Unit</div>
                        <div className=" md:w-[22.10rem]">Receive</div>
                        <div className=" md:w-[15.42rem]">Damaged</div>
                        <div className=" md:w-[22.01rem]">Remark</div>
                        <div className=" md:w-[22.01rem]">Cell</div>

                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.cellStock.length}
                        // next={handleLoadMore}
                        // hasMore={hasMore}
                        loader={props.fetchingItemInCellStock ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.cellStock.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold  font-poppins ">
                                                    {item.newPoNumber}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold font-poppins cursor-pointer underline text-blue-600">
                                                    <span
                                                    // onClick={() => {
                                                    //     props.handleSTockItemModal(true)
                                                    //     handleItemClick(item)
                                                    // }}
                                                    >
                                                        {item.suppliesFullName.substring(0, 20)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.totalUnitUsed}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remark}
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
    fetchingItemInCellStock: inventory.fetchingItemInCellStock,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    cellStock: inventory.cellStock
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getItemInCellStock
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCellStock)

