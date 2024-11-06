import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialReceiveData,
    handleMaterialReceived,
    handlegrnlistmodal,
    getRoomRackByLocId, getRackList
} from "./InventoryAction";
import {handleTermsnConditionModal} from "../Suppliers/SuppliersAction"
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { TerminalSharp } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../Components/UI/Elements";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button } from "antd";
import FactoryIcon from '@mui/icons-material/Factory';
import GrnListOfPOModal from "./Child/InventoryDetails/InventoryMaterialTab/GrnListOfPOModal";
import ReceivedDetailModalOut from "./ReceivedDetailModalOut";
import TermsnConditionModal from "../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal";

const { Option } = Select;

const MaterialReceivedTableOut = (props) => {
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

    function handleStore() {
        setclickStore(true)
    }
    function handleCancelStore() {
        setclickStore(false)
    }

    const handleChangeRoomRack = (value) => {
        setSelectedRoomId(value)
        props.getRackList(value)
    }

    const handleChangeChamber = (value) => {
        setSelectedChamberId(value)
    }
    const handleSubmitRoomRack = (id) => {
        const dataToSend = {
            roomRackId: selectedRoomId,
            poSupplierDetailsId: id,
            roomRackChamberLinkId: selectedChamberId,
            locationDetailsId: props.locationId,
            roomEntryDate: dayjs()
        };
        props.updateRoomRackProduction(dataToSend, handleCallback())
    }
    function handleCallback() {
        setSelectedChamberId("")
        setSelectedRoomId("")
        setclickStore(false)
    }

    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%] font-poppins font-bold text-xs  p-1 bg-transparent font-bold sticky items-end z-10">
                       
                        <div className="text-[#00A2E8] text-base w-[19.5rem]"><FormattedMessage id="app.po" defaultMessage="PO ID" /></div>
                        <div className=" w-[15.52rem]">
                            {/* Created" */}
                            {props.translatedMenuItems[21]}
                        </div>
                        <div className=" w-[11.122rem]">       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]'/> {props.translatedMenuItems[22]} 
                            {/* Supplier */}

                        </div>

                       
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
                                    <div className="flex rounded py-1 mt-1 bg-white items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                                        <div class="flex">

                                            <div className=" flex  w-[18.1rem] items-center  h-8 border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                <div class="flex ml-gap text-xs font-bold  font-poppins cursor-pointer underline text-blue-600">
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
                                                          {/* New */}
                                                        </div>
                                                    ) : null}
                                            </div>
                                        </div>
                                        <div className=" flex w-[5.12rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                />
                                            </div>

                                        </div>
                                        <div className=" flex  w-[10.32rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">

                                            {date}

                                        </div>
                                        <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[14.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.supplierName}
                                            </div>
                                        </div>
                                      
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[26rem] max-sm:flex-row w-full max-sm:justify-between ">
                                          
                                        </div>
                                        <div className=" flex  w-[8.121rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins cursor-pointer">
                                                {/* <Tooltip title="GRN "> */}
                                                <Button
                                                    onClick={() => {
                                                        handleRow(item);
                                                        props.handlegrnlistmodal(true)
                                                    }}
                                                    type="primary"
                                                >
                                                    {/* GRN To Stock */}    GRN {props.translatedMenuItems[23]}  
                                                </Button>
                                                {/* <ListAltOutlined
                                                    onClick={() => {
                                                        handleRow(item);
                                                        props.handlegrnlistmodal(true)
                                                    }}
                                                /> */}
                                                {/* </Tooltip> */}
                                                
                                            </div>
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[1.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
                                                            <Tooltip title="Terms and conditions">
                                                                <TerminalSharp className="!text-icon text-[#c3b20b]"
                                                                    onClick={() => {
                                                                        handleRow(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
            <ReceivedDetailModalOut
                row={row}
                handleMaterialReceived={props.handleMaterialReceived}
                addMaterialReceived={props.addMaterialReceived}
                translatedMenuItems={props.translatedMenuItems}
            />
             <TermsnConditionModal
                rowData={row}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            <GrnListOfPOModal
                handlegrnlistmodal={props.handlegrnlistmodal}
                showGrnListOfPo={props.showGrnListOfPo}
                row={row}
                translatedMenuItems={props.translatedMenuItems}
            />
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
            handleTermsnConditionModal
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialReceivedTableOut)
);
