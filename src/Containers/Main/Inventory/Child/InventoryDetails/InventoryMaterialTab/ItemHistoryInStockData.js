import React,{useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { getItemHistoryDataInstock } from "../../../InventoryAction"

function ItemHistoryInStockData(props) {
    useEffect(() => {
        props.getItemHistoryDataInstock(props.inventory.locationDetailsId,props.row.suppliesId);
    }, [])
  return (
    <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[2.5rem]"></div>
                        <div className=" md:w-[4.5rem]"><FormattedMessage id="app.po" defaultMessage="PO #" /></div>
                        <div className=" md:w-[9.21rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        {/* <div className=" md:w-[3.82rem]"><FormattedMessage id="app.grn" defaultMessage="GRN #" /></div> */}
                        {/* <div className=" md:w-[6.82rem]"><FormattedMessage id="app.price" defaultMessage="Price" /></div> */}
                        <div className=" md:w-[4.25rem]"><FormattedMessage id="app.ordered" defaultMessage="Ordered" /></div>
                        <div className=" md:w-[6.10rem]"><FormattedMessage id="app.received" defaultMessage="Receive" /></div>
                        <div className=" md:w-[4.42rem]"><FormattedMessage id="app.damaged" defaultMessage="Damaged" /></div>
                        <div className=" md:w-[5.01rem]"><FormattedMessage id="app.balance" defaultMessage="Balance" /></div>
                        <div className=" md:w-[5.01rem]"><FormattedMessage id="app.remark" defaultMessage="Remark" /></div>
            
                        <div className=""></div>
                    </div>
                   
                        {props.itemHistoryDataInStock.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                        {/* <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[2.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                    <PlusOutlined
                                                        onClick={() => {
                                                            handleItemHistory()
                                                            handleItemClick(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div> */}

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                    {item.newPoNumber}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold font-poppins cursor-pointer underline text-blue-600">
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

                                        {/* <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div> */}
                                        {/* <div className=" flex font-medium flex-col  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.price}
                                            </div>
                                        </div> */}
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                     
                                     
                                      

                                    </div>
                                   
                                </div>
                            );
                        })}
                    {/* </InfiniteScroll> */}
                </div>
            </div>
  )
}


const mapStateToProps = ({ inventory, auth }) => ({
    itemHistoryDataInStock:inventory.itemHistoryDataInStock,
    // fetchingItemHistoryInStock: inventory.fetchingItemHistoryInStock,
    // locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    // itemHistoryInStock: inventory.itemHistoryInStock
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getItemHistoryDataInstock
            // getItemHistoryInstock
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ItemHistoryInStockData)
);


