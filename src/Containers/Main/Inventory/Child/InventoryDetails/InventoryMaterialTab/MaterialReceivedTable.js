import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMaterialReceiveData,
    handleMaterialReceived,
    handlegrnlistmodal
} from "../../../InventoryAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import ReceivedDetailModal from "./ReceivedDetailModal";
import GrnListOfPOModal from "./GrnListOfPOModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button } from "antd";
import { getRoomRackByLocId, getRackList } from "../../../../Inventory/InventoryAction";

const { Option } = Select;

const MaterialReceivedTable = (props) => {
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
                <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky z-10">
                        <div className=""></div>
                        <div className=" w-[15.5rem]"><FormattedMessage id="app.po" defaultMessage="PO ID" /></div>
                        <div className=" w-[13.52rem]">
                            {/* <FormattedMessage id="app.created" defaultMessage="Created" /> */}
                            {props.translatedMenuItems[11]}
                        </div>
                        <div className=" w-[11.122rem]">        {props.translatedMenuItems[12]} 
                            {/* Supplier */}

                        </div>

                        <div className=" w-[11.322rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialReceiveData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]} ...</div> : null}
                        height={"71vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {props.materialReceiveData.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                        <div class="flex">

                                            <div className=" flex  w-[16.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs font-semibold  font-poppins cursor-pointer underline text-blue-600">
                                                    <div
                                                        onClick={() => {
                                                            handleRow(item);
                                                            props.handleMaterialReceived(true);
                                                        }}
                                                    >{item.newPoNumber}</div>
                                                    {date === currentdate ? (
                                                        <div class="text-xs font-bold text-[tomato]">
                                                          {props.translatedMenuItems[13]}  
                                                          {/* New */}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex w-[4.12rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                />
                                            </div>

                                        </div>
                                        <div className=" flex  w-[8.32rem] max-sm:flex-row  max-sm:justify-between  ">

                                            {date}

                                        </div>
                                        <div className=" flex   w-[10.22rem] max-sm:flex-row  max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins">
                                                {item.supplierName}
                                            </div>
                                        </div>
                                        {/* <div className=" flex font-medium  w-[10.22rem] max-sm:flex-row  max-sm:justify-between  ">
         
                                       
                                       <Select
                                                                classNames="w-32"
                                                                value={selectedRoomId}
                                                                onChange={(value) => { handleChangeRoomRack(value) }}
                                                            >
                                                                {props.roomRackbyLoc.map((s) => (
                                                                    <Option value={s.roomRackId}>
                                                                        {s.zone}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                            <Select
                                                                classNames="w-32"
                                                                value={selectedChamberId}
                                                                onChange={(val) => handleChangeChamber(val)}
                                                            >
                                                                {props.rackList.map((chamber) => (
                                                                    <Option value={chamber.roomRackChamberLinkId}>
                                                                        {chamber.chamber}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                            <Button
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleSubmitRoomRack(item.poSupplierDetailsId)
                                                                }} >
                                                                <FormattedMessage
                                                                    id="app.save"
                                                                    defaultMessage="Save"
                                                                />
                                                            </Button>
                                                            <Button onClick={() => handleCancelStore()}><FormattedMessage
                                                                id="app.cancel"
                                                                defaultMessage="Cancel"
                                                            /></Button>
                                                        
                                                        <>
                                                           
                                                        </>
                    
</div> */}
                                        <div className=" flex  md:w-[20rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            {/* <div class=" text-xs  font-semibold  font-poppins">
                                                    {item.zone ? <BorderColorOutlined
                                                        onClick={() => {
                                                            handleStore()
                                                            handleRow(item)
                                                        }}
                                                    /> : <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            handleStore()
                                                            handleRow(item)
                                                        }}>Send To Store</Button>}
                                                </div> */}
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
                                                    {/* GRN To Stock */}    GRN {props.translatedMenuItems[14]}  
                                                </Button>
                                                {/* <ListAltOutlined
                                                    onClick={() => {
                                                        handleRow(item);
                                                        props.handlegrnlistmodal(true)
                                                    }}
                                                /> */}
                                                {/* </Tooltip> */}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
            <ReceivedDetailModal
                row={row}
                handleMaterialReceived={props.handleMaterialReceived}
                addMaterialReceived={props.addMaterialReceived}
                translatedMenuItems={props.translatedMenuItems}
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


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    orgId: auth.userDetails.organizationId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
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
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialReceivedTable)
);
