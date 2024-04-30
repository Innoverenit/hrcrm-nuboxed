import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Popconfirm, Switch, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import MoveToggleProduction from "../Child/MoveToggleProduction";
import ButtonGroup from "antd/lib/button/button-group";
import {getProductionTable} from "../ProductionAction"
// import { getProductionsbyLocId, updateProStatus, handleBuilderProduction, handleProductionIDrawer, updateRoomRackProduction } from "../ProductionAction"
import { DeleteOutlined } from "@ant-design/icons";
import { BorderColorOutlined, PauseCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
// import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
// import { getRoomRackByLocId, getRackList } from "../../Main/Inventory/InventoryAction";
// import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
// import InpectProductionToggle from "./InpectProductionToggle";
// import { MultiAvatar } from "../../../Components/UI/Elements";
// const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
// const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

const { Option } = Select;

function ProductionTableView(props) {

  
    useEffect(() => {
        props.getProductionTable();
        // setPage(page + 1);
        // props.getRoomRackByLocId(props.locationId, props.orgId);
    }, []);



    // const {
    //     fetchingProductionLocId,
    //     productionByLocsId,
    //     user,
    //     openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    // } = props;

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[9rem]">ID</div>
                        <div className=" md:w-[6rem]">Created</div>
                        <div className=" md:w-[6rem]">Item</div>
                        <div className="md:w-[5rem]">Category</div>
                        <div className="md:w-[5rem]">Attribute</div>
                        <div className=" md:w-[5rem] ">Status</div>
   
 
                        <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={productionByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    > */}
                        
                    {/* </InfiniteScroll> */}
                </div>
            </div>

        
        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    // productionByLocsId: production.productionByLocsId,
    // fetchingProductionLocId: production.fetchingProductionLocId,
    // locationId: auth.userDetails.locationId,
    // orgId: auth.userDetails.organizationId,
    // user: auth.userDetails,
    productionTableData:production.productionTableData
    // openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    // clickedProductionIdrwr: production.clickedProductionIdrwr,
    // organizationId: auth.userDetails.organizationId,
    // userId: auth.userDetails.userId,
    // roomRackbyLoc: inventory.roomRackbyLoc,
    // rackList: inventory.rackList,
    // orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionTable,
            // getProductionsbyLocId,
            // handleBuilderProduction,
            // updatePauseStatus,
            // handleProductionIDrawer,
            // updateProStatus,
            // getRoomRackByLocId,
            // updateRoomRackProduction,
            // getRackList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTableView);