import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getItemHistoryInstock } from "../../../InventoryAction"
import InfiniteScroll from "react-infinite-scroll-component";


const ItemHistoryInStock = (props) => {
    useEffect(() => {
        props.getItemHistoryInstock(props.row.poSupplierSuppliesId);
    }, [])

    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%] p-1 bg-transparent font-bold sticky text-xs font-poppinsz-10">
                    <div className=" md:w-[23.51rem]">Name</div>
                        <div className=" md:w-[15.52rem]">GRN #</div>
                        <div className=" md:w-[22.12rem]">Price</div>
                        <div className=" md:w-[15.25rem]">Unit</div>
                        <div className=" md:w-[22.01rem]">Wasted</div>
                        <div className=" md:w-[22.01rem]">Cell</div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.itemHistoryInStock.length}
                        loader={props.fetchingItemHistoryInStock ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.itemHistoryInStock.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded m-1 bg-white h-8 items-center p-1 ">

                                        <div class="flex">
                                            <div className=" flex  md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs  font-semibold font-poppins cursor-pointer underline text-blue-600">
                                                    <span >
                                                        {item.suppliesFullName.substring(0, 20)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" flex   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div>
                                        <div className=" flex   md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className=" flex   md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitUsed}
                                            </div>
                                        </div>
                                        <div className=" flex   md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitWasted}
                                            </div>
                                        </div>
                                        <div className=" flex   md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.cell}
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
    fetchingItemHistoryInStock: inventory.fetchingItemHistoryInStock,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    itemHistoryInStock: inventory.itemHistoryInStock
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getItemHistoryInstock
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ItemHistoryInStock)

