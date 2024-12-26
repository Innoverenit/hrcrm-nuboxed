import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {
//     getMaterialBestBefore,
//     // handleMaterialReceived,
//     // handlegrnlistmodal
// } from "../Inventory/InventoryAction";
import {
    getSuppliesLocationItem,
   
} from "./SuppliesAction";
import dayjs from "dayjs";


import { MultiAvatar } from "../../../Components/UI/Elements";
// import ReceivedDetailModal from "./ReceivedDetailModal";
// import GrnListOfPOModal from "./GrnListOfPOModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button } from "antd";
//import { getRoomRackByLocId, getRackList } from "../../../../Inventory/InventoryAction";

const { Option } = Select;

const SuppliesLocationItem = (props) => {
    console.log(props.currentLocationId)
    useEffect(() => {
        props.getSuppliesLocationItem(props.currentLocationId.locationDetailsId);
        
    }, [])
   


   
    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=""></div>
         
                        <div className=" w-[13.52rem]">
                         Item Name
                        </div>
                        <div className=" w-[11.122rem]">       
                    Balance

                        </div>
                      

                     
                   

                        <div className=" w-[11.322rem]"></div>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    > */}
                     {props.suppliesLocationItem.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                      
                                    
                                        <div className=" flex  w-[8.32rem] max-sm:flex-row  max-sm:justify-between  ">

                                            {item.suppliesFullName}

                                        </div>
                                        <div className=" flex   w-[10.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {item.balanced}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          
                                        </div>
                                       
                                    </div>

                                </div>
                            );
                        })} 
                    {/* </InfiniteScroll> */}
                </div>
            </div>
           
        </>
    );
}


const mapStateToProps = ({ inventory,supplies, auth }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    suppliesLocationItem:supplies.suppliesLocationItem,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    materialBestBefore:inventory.materialBestBefore,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesLocationItem
            //getMaterialBestBefore
            // getMaterialReceiveData,
            // handleMaterialReceived,
            // handlegrnlistmodal,
            // getRackList,
            // getRoomRackByLocId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesLocationItem)

