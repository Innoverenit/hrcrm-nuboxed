import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip, Button, Select } from "antd";
import { getRoomRackByLocId, getRackList } from "../../../InventoryAction";
import { getMaterialUnitsData, handleSTockItemModal, handleStockUsedDrawer, trnasferGrnItemToStock } from "../../../InventoryAction"
import StockItemClickModal from "./StockItemClickModal";
import InfiniteScroll from "react-infinite-scroll-component";
import TheStockUsedDrawer from "./TheStockUsedDrawer";
import { PlusOutlined } from "@ant-design/icons";
import ItemHistoryInStock from "./ItemHistoryInStock";

const { Option } = Select;

const GrnListOfPO = (props) => {
    useEffect(() => {
        props.getRoomRackByLocId(props.locationId, props.orgId);
        props.getMaterialUnitsData(props.locationDetailsId);
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
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className="w-[2.5rem]"></div>
                        {/* <div className=" md:w-[4.5rem]"><FormattedMessage id="app.po" defaultMessage="PO #" /></div> */}
                        <div className=" md:w-[9.21rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" md:w-[3.82rem]"><FormattedMessage id="app.category" defaultMessage="Category" /></div>
                        {/* <div className=" md:w-[6.82rem]"><FormattedMessage id="app.price" defaultMessage="Price" /></div> */}
                        <div className=" md:w-[4.25rem]"><FormattedMessage id="app.attribute" defaultMessage="Attribute" /></div>
                        <div className=" md:w-[6.10rem]"><FormattedMessage id="app.hsn" defaultMessage="HSN" /></div>
                        <div className=" md:w-[6.10rem]"><FormattedMessage id="app.instock" defaultMessage="In Stock" /></div>
                       
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialUnitsData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialUnitsData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.materialUnitsData.map((item, index) => {
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
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold font-poppins cursor-pointer underline text-blue-600">
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
                                        </div> */}

                                        <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.suppliesFullName}
                                            </div>
                                        </div>
                                        {/* <div className=" flex font-medium flex-col  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.price}
                                            </div>
                                        </div> */}
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.hsn}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.balanced}
                                            </div>
                                        </div>
                                        {/* <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remark}
                                            </div>
                                        </div> */}
                                        {/* <div className=" flex font-medium flex-col  md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
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
                                                    <div className="font-normal text-sm text-cardBody font-poppins">
                                                        <div> {item.zone}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                        {/* <div className=" flex font-medium flex-col  md:w-[8.6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
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
                                                    <div className="font-normal text-sm text-cardBody font-poppins">
                                                        <div> {item.chamber}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}
                                        {/* <div class="flex flex-col w-6 items-center max-sm:flex-row max-sm:w-[10%]">

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
                                                            Save
                                                        </Button>
                                                        <Button
                                                        // type="primary"
                                                        // onClick={handleCancelZone()}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>

                                                ) : (
                                                    <BorderColorIcon
                                                        className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"

                                                        onClick={() => {
                                                            handleItemClick(item)
                                                            handleSelectZone()
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div></div>
                                        </div> */}

                                    </div>
                                    {/* <div>
                                        {itemHistory && (row.poSupplierSuppliesId === item.poSupplierSuppliesId)
                                            && <ItemHistoryInStock row={row} />}
                                    </div> */}
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
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

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    poGrnList: inventory.poGrnList,
    locationId: auth.userDetails.locationId,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList,
    orgId: auth.userDetails.organizationId,
    showStockItem: inventory.showStockItem,
    fetchingGrnListOfAPo: inventory.fetchingGrnListOfAPo,
    stockUseDrwr: inventory.stockUseDrwr,
    materialUnitsData:inventory.materialUnitsData,
    fetchingMaterialUnitsData:inventory.fetchingMaterialUnitsData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getGrnListOfaPoInStock,
            handleSTockItemModal,
            handleStockUsedDrawer,
            getRackList,
            getRoomRackByLocId,
            trnasferGrnItemToStock,
            getMaterialUnitsData
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GrnListOfPO)
);
