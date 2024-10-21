import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialReceiveData,
    handleMaterialReceived,
    handlegrnlistmodal,
    getRoomRackByLocId, getRackList
} from "./InventoryAction";
//import {handleTermsnConditionModal} from "../Suppliers/SuppliersAction"
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { TerminalSharp } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button } from "antd";
// import ReceivedDetailModal from "./Child/InventoryDetails/InventoryMaterialTab/ReceivedDetailModal";
// import GrnListOfPOModal from "./Child/InventoryDetails/InventoryMaterialTab/GrnListOfPOModal";
// import ReceivedDetailModalOut from "./ReceivedDetailModalOut";
// import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal";

const { Option } = Select;

const MaterialIntransitList = (props) => {
    useEffect(() => {
        props.getMaterialReceiveData(props.locationDetailsId);
        props.getRoomRackByLocId(props.locationId, props.orgId);
    }, [])
    const [clickStore, setclickStore] = useState(false)
    const [selectedChamberId, setSelectedChamberId] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");


    const [row, setRow] = useState({})
    const handleRow = (item) => {
        setRow(item)
    }
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
  

    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=""></div>
                        <div className=" w-[15.5rem]">
                            Po Id
                            </div>
                        <div className=" w-[13.52rem]">
                          Supplies
                          
                        </div>
                       

                        <div className=" w-[11.322rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"73vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {props.materialReceiveData.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white  items-center p-1 ">
                                        <div class="flex">

                                            <div className=" flex  w-[16.1rem]  border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs font-bold  font-poppins cursor-pointer underline text-blue-600">
                                                    <div
                                                        onClick={() => {
                                                            handleRow(item);
                                                            props.handleMaterialReceived(true);
                                                        }}
                                                    >{item.newPoNumber}</div>
                                                    
                                                </div>
                                                {date === currentdate ? (
                                                        <div class="text-xs font-poppins font-bold text-[tomato] ml-1">
                                                          {props.translatedMenuItems[4]}  
                                                         
                                                        </div>
                                                    ) : null}
                                            </div>
                                        </div>
                                       
                                       
                                        <div className=" flex   w-[10.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {item.supplierName}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          
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


const mapStateToProps = ({ inventory, auth,suppliers }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    addTermsnCondition: suppliers.addTermsnCondition,
    // locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    materialReceiveData: inventory.materialReceiveData,
    addMaterialReceived: inventory.addMaterialReceived,
    showGrnListOfPo: inventory.showGrnListOfPo,
    fetchingMaterialReceiveData: inventory.fetchingMaterialReceiveData,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceiveData,
            handleMaterialReceived,
            handlegrnlistmodal,
            getRackList,
            getRoomRackByLocId,
            //handleTermsnConditionModal
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialIntransitList)
);
