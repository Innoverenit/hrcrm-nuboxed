import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip, Button, Select } from "antd";
import { getRoomRackByLocId, getRackList } from "./InventoryAction";
import { getGrnListOfaPoInStock, handleSTockItemModal, handleStockUsedDrawer, trnasferGrnItemToStock } from "./InventoryAction"
import InfiniteScroll from "react-infinite-scroll-component";
import AddBoxIcon from '@mui/icons-material/AddBox';

const ItemHistoryInStock = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/ItemHistoryInStock") );
const StockItemClickModal = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/StockItemClickModal") );
const TheStockUsedDrawer = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/TheStockUsedDrawer") );
const EmptyPage = lazy(() =>import("../EmptyPage") );
const { Option } = Select;

const MaterialUnitsDataOut = (props) => {
    useEffect(() => {
        props.getRoomRackByLocId(props.locationId, props.orgId);
        props.getGrnListOfaPoInStock(props.locationDetailsId);

    }, [])


    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const [row, setRow] = useState({})

    const handleItemClick = (item) => {
        setRow(item)
    }
    let chamberId = row.roomRackChamberLinkId === null ? "" : row.roomRackChamberLinkId
    let roomId = row.roomRackId === null ? "" : row.roomRackId

    const [selectedChamberId, setSelectedChamberId] = useState(chamberId);
    const [selectedRoomId, setSelectedRoomId] = useState(roomId);
    const [selectZone, setSelectZone] = useState(false);

    const handleSelectZone = () => {
        setSelectZone(true)
    }

    const [itemHistory, setItemHistory] = useState(false);

    const handleItemHistory = () => {
        setItemHistory(!itemHistory)
    }

    const handleCancelZone = () => {
        setSelectZone(false)
    }
    const handleChangeRoomRack = (value) => {
        setSelectedRoomId(value)
        props.getRackList(value)
    }

    const handleChangeChamber = (value) => {
        setSelectedChamberId(value)
    }
    const handleUpdateSupplies = (
    ) => {
        const data = {
            grnReceivedInd: true,
            grnStockInd: true,
            roomRackId: selectedRoomId,
            roomRackChamberLinkId: selectedChamberId,
            allowGrnInd: row.allowGrnInd,
            poSupplierSuppliesId: row.poSupplierSuppliesId
        };
        props.trnasferGrnItemToStock(data, row.poSupplierSuppliesId, handlecallback()
        )

    };
    const handlecallback = () => {
        setSelectZone(false)
    }
    console.log(selectZone)
    console.log(row.poSupplierSuppliesId)

    return (
        <>
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between  w-[100%]  p-1 bg-transparent  sticky items-end font-poppins font-bold  z-10">
                        <div className="w-[2.5rem]"></div>
                        <div className=" md:w-[4.5rem]">PO ID</div>
                        <div className=" md:w-[9.21rem]">
                            {props.translatedMenuItems[0]}
                            </div>       
                        <div className=" md:w-[4.25rem]">
                            {/* Ordered" /> */}  {props.translatedMenuItems[30]}

                            </div>
                        <div className=" md:w-[6.10rem]">
                            {/* Receive" /> */}  {props.translatedMenuItems[17]}

                            </div>
                        <div className=" md:w-[4.42rem]">
                            {/* "Damaged" /> */}  {props.translatedMenuItems[27]}
                        </div>
                        <div className=" md:w-[5.01rem]">
                            {/* Balance" /> */}  {props.translatedMenuItems[31]}
                        </div>
                        <div className=" md:w-[5.01rem]">
                            {/* "Remark" /> */}  {props.translatedMenuItems[28]}
                            </div>
                        <div className=" md:w-[4.51rem]">
                            {/*Zone" /> */}  {props.translatedMenuItems[32]}
                        </div>
                        <div className=" md:w-[6.01rem]">
                            {/* "#Rack" /> */} #{props.translatedMenuItems[33]}
                        </div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.poGrnList.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingGrnListOfAPo ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"73vh"}
                    >
                        {!props.fetchingGrnListOfAPo && props.poGrnList.length===  0 ? <EmptyPage/>: props.poGrnList.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white  items-center p-1 ">
                                        <div class="flex">
                                            <div className=" flex   border-l-2 border-green-500 h-8 bg-[#eef2f9] md:w-[2.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs font-bold  font-poppins ">
                                <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                                                        onClick={() => {
                                                            handleItemHistory()
                                                            handleItemClick(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex">
                                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between ml-gap text-xs font-semibold  font-poppins ">
                                                    {item.newPoNumber}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex">
                                            <div className=" flex  md:w-[11.12rem] items-center  h-8 ml-gap bg-[#eef2f9] max-sm:w-full  ">
                                                <div class="flex justify-between ml-gap text-xs font-semibold font-poppins cursor-pointer underline text-blue-600">
                                                    <span
                                                        onClick={() => {
                                                            props.handleSTockItemModal(true)
                                                            handleItemClick(item)
                                                        }}
                                                    >
                                                        {item.suppliesFullName.substring(0, 20)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className=" flex   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div> */}
                                        {/* <div className=" flex   md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.price}
                                            </div>
                                        </div> */}
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {selectZone && row.poSupplierSuppliesId === item.poSupplierSuppliesId ? (

                                                    <Select
                                                        classNames="w-32"
                                                        value={selectedRoomId}
                                                        onChange={(value) => { handleChangeRoomRack(value) }}
                                                    >
                                                        {props.roomRackbyLoc.filter((type) => type.zoneType === "entry")
                                                            .map((s) => (
                                                                <Option value={s.roomRackId}>
                                                                    {s.zone}
                                                                </Option>
                                                            ))}
                                                    </Select>
                                                ) : (
                                                    <div className="text-xs font-poppins">
                                                        <div> {item.zone}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {selectZone && row.poSupplierSuppliesId === item.poSupplierSuppliesId ? (
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

                                                ) : (
                                                    <div className="font-normal ml-gap text-xs font-poppins">
                                                        <div> {item.chamber}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="flex justify-end  h-8 ml-gap bg-[#eef2f9] w-8 items-center max-sm:flex-row max-sm:w-[10%]">

                                            <div>
                                                <Tooltip title="">
                                                    <i class="far fa-share-square"
                                                        //    className="!text-base cursor-pointer text-[tomato]"
                                                        onClick={() => {
                                                            handleItemClick(item)
                                                            props.handleStockUsedDrawer(true);
                                                        }}
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                </Tooltip>
                                            </div>
                                            <div>
                                                {selectZone && row.poSupplierSuppliesId === item.poSupplierSuppliesId ? (
                                                    <>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => handleUpdateSupplies()}
                                                        >
                                                            {/* Save */} {props.translatedMenuItems[34]}
                                                        </Button>
                                                        <Button
                                                        // type="primary"
                                                        // onClick={handleCancelZone()}
                                                        >
                                                            {/* Cancel */} {props.translatedMenuItems[24]}
                                                        </Button>
                                                    </>

                                                ) : (
                                                    <BorderColorIcon
                                                        className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"

                                                        onClick={() => {
                                                            handleItemClick(item)
                                                            handleSelectZone()
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div></div>
                                        </div>

                                    </div>
                                    <div>
                                        {itemHistory && (row.poSupplierSuppliesId === item.poSupplierSuppliesId)
                                            && <ItemHistoryInStock row={row} />}
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
            <Suspense>
            <StockItemClickModal
                row={row}
                handleSTockItemModal={props.handleSTockItemModal}
                showStockItem={props.showStockItem}
            />
            <TheStockUsedDrawer
             inventory={props.inventory}
                row={row}
                stockUseDrwr={props.stockUseDrwr}
                handleStockUsedDrawer={props.handleStockUsedDrawer}
            />
            </Suspense>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    // locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    poGrnList: inventory.poGrnList,
    locationId: auth.userDetails.locationId,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList,
    orgId: auth.userDetails.organizationId,
    showStockItem: inventory.showStockItem,
    fetchingGrnListOfAPo: inventory.fetchingGrnListOfAPo,
    stockUseDrwr: inventory.stockUseDrwr
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getGrnListOfaPoInStock,
            handleSTockItemModal,
            handleStockUsedDrawer,
            getRackList,
            getRoomRackByLocId,
            trnasferGrnItemToStock
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialUnitsDataOut)
);
