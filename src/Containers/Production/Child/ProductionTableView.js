import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Popconfirm, Switch, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import OnboardingProduction from "../Child/OnboardingProduction.js"
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

import ButtonGroup from "antd/lib/button/button-group";
import {updateProStatus} from "../ProductionAction"
// import { getProductionsbyLocId, updateProStatus, handleBuilderProduction, handleProductionIDrawer, updateRoomRackProduction } from "../ProductionAction"
import { DeleteOutlined } from "@ant-design/icons";
import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
import { BorderColorOutlined, PauseCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
import { MultiAvatar } from "../../../Components/UI/Elements";
import InpectProductionToggle from "./InpectProductionToggle.js";
import MoveToggleProduction from "../Child/MoveToggleProduction.js"
// import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
// import { getRoomRackByLocId, getRackList } from "../../Main/Inventory/InventoryAction";
// import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
// import InpectProductionToggle from "./InpectProductionToggle";
// import { MultiAvatar } from "../../../Components/UI/Elements";
// const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
// const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

const { Option } = Select;

function ProductionTableView(props) {

  
    // useEffect(() => {
    //     props.getProductionTable(props.userId);
    //     // setPage(page + 1);
    //     // props.getRoomRackByLocId(props.locationId, props.orgId);
    // }, []);

    function StatusIcon({ type, role, iconType, tooltip, size, status, id, onClick, productId, indStatus }) {

        if (role === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    className="p-[6px] border-transparent"
                    ghost={role !== type}
                    style={{
                        color: role === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

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
                        <div className="md:w-[2rem]"></div>
                        <div className=" md:w-[6rem]">Item</div>
                        <div className="md:w-[5rem]">Category</div>
                        <div className="md:w-[5rem]">Attribute</div>
                        <div className=" md:w-[5rem] ">Status</div>
   
 
                        <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div>
                    </div>
                 {/* {productionByLocsId.length ?
                            <> */}
                                {props.productionTableData.map((item, index) => {
                                    // const currentdate = dayjs().format("DD/MM/YYYY");
                                    // const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                            
                                        <div key={item.productId} >
                                            <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium flex-col  md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" underline text-[#1890ff] cursor-pointer w-[8rem] flex text-xs  font-poppins"
                                                            // onClick={() => {
                                                            //     handleParticularRowData(item);
                                                            //     props.handleProductionIDrawer(true)
                                                            // }}
                                                        >
                                                            {item.manufactureId}
                                                            &nbsp;&nbsp;
                                                            {/* {date === currentdate ? (
                                                                <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
                                                                >
                                                                    New
                                                                </div>
                                                            ) : null} */}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {/* {props.productionTableData.createdBy} */}
                                                            <MultiAvatar
                  primaryTitle={item.createdBy}
                  // imageId={item.ownerImageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
                                                        </div>

                                                    </div>

                                                    <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">

<div class=" text-xs text-cardBody font-poppins">
    {/* {props.productionTableData.createdBy} */}
    {`  ${moment.utc(item.creationDate).format("DD-MM-YYYY")}`}
</div>

</div>
                                                    <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.categoryName} 
                                                    </div>
                                                </div>
                                                


                                                
                                                
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}
                                                    </div>
                                                </div>
                                              

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.type === "In Progress" && item.pauseInd === true &&

                                                            <PlayCircleFilledSharp
                                                                // class=" cursor-pointer"
                                                                onClick={() => {
                                                                    let data = {
                                                                        userId: item.userId,
                                                                        phoneId: item.productionTableData.manufactureId,
                                                                        pauseInd: false
                                                                    }
                                                                    props.updatePauseStatus(data)
                                                                }} />
                                                        }
                                                        {item.type === "In Progress" && item.pauseInd === false &&

                                                            <PauseCircleFilled
                                                                class=" cursor-pointer text-orange-400"
                                                                onClick={() => {
                                                                    let data = {
                                                                        userId: props.userId,
                                                                        phoneId:item.manufactureId,
                                                                        pauseInd: true
                                                                    }
                                                                    props.updatePauseStatus(data)
                                                                }}
                                                            />
                                                        }
                                                        <ButtonGroup>
                                                            {item.type === "null" && (
                                                                <StatusIcon
                                                                    type="In Progress"
                                                                    iconType="fa-hourglass-half"
                                                                    tooltip="In Progress"
                                                                    role={item.type}
                                                                    onClick={() => {
                                                                        props.updateProStatus({
                                                                            type: "In Progress",
                                                                        }, item.productionProductId);
                                                                    }}
                                                                />)}

                                                            {item.type === "In Progress" ?
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    iconType="fa-hourglass"
                                                                    tooltip="Complete"
                                                                    role={item.type}
                                                                    onClick={() => {
                                                                        props.updateProStatus({
                                                                            type: "Complete",
                                                                        }, item.productionProductId);
                                                                    }}
                                                                /> : null}
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                               
                                               
                                               
                                            </div>
                                            
                                        </div>
                                        
                                    );
                                })}
                                    
                                    
                            
                           
                </div>
            </div>


            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[9rem]">Workflow</div>
                        <div className=" md:w-[6rem]">Stage</div>
                        <div className="md:w-[2rem]"></div>
                        <div className=" md:w-[6rem]">Store</div>
                        <div className="md:w-[5rem]">Inspected</div>
                        <div className="md:w-[5rem]">Dispatch</div>
                        {/* <div className=" md:w-[5rem] ">Status</div> */}
   
 
                        {/* <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div> */}
                    </div>

                  {props.productionTableData.map((item, index) => {
                                    // const currentdate = dayjs().format("DD/MM/YYYY");
                                    // const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                    <div key={item.productId} >
                                           
                    <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                

                                                
                                                


                                                
                                                
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins" >
                                                        {/* {stage} */}
                                                        {item.workflowName}
                                                    </div>
                                                </div>
                                              

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}

                                                        {item.stage}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {stage} */}

                                                        <InpectProductionToggle item={item} /> &nbsp;&nbsp;
                                                            {item.inspectedInd ?
                                                                <MultiAvatar
                                                                    primaryTitle={item.inspectedUserName}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                /> : null}
                                                    </div>
                                                </div>



                                                <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {/* {props.productionTableData.inspectedInd &&  */}
                                                        <MoveToggleProduction item={item} />
                                                        {/* } */}
                                                    </div>
                                                </div>
                                               
                                               
                                               
                                               
                                            </div>          
                                        </div>
                                                 
                                    );
                                })}
                                      
                                    
                            
                           
                </div>
 
            </div>


           
            <OnboardingProduction
            productionTableData={props.productionTableData}
            />

       
        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    // productionByLocsId: production.productionByLocsId,
    // fetchingProductionLocId: production.fetchingProductionLocId,
    // locationId: auth.userDetails.locationId,
    // orgId: auth.userDetails.organizationId,
    // user: auth.userDetails,
    //productionTableData:production.productionTableData,
    // openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    // clickedProductionIdrwr: production.clickedProductionIdrwr,
    // organizationId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    // roomRackbyLoc: inventory.roomRackbyLoc,
    // rackList: inventory.rackList,
    // orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateProStatus,
            updatePauseStatus
            //getProductionTable,
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