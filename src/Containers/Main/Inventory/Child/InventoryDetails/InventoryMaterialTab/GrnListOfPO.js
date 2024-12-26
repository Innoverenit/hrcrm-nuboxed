import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { getMaterialReceivedDetailData, handleReceivedUnit } from "../../../InventoryAction"
import TransferToStock from "./TransferToStock";
import { Select, Button } from "antd";
import { ListAltRounded } from "@mui/icons-material";
import ItemWiseReceivedModal from "./ItemWiseReceivedModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRoomRackByLocId, getRackList } from "../../../InventoryAction";

const { Option } = Select;

const GrnListOfPO = (props) => {
    useEffect(() => {
        props.getRoomRackByLocId(props.locationId, props.orgId);
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    }, [])

    const [row, setRow] = useState({})
    const handleRow = (item) => {
        setRow(item)
    }
    let chamberId = props.row.roomRackChamberLinkId === null ? "" : props.row.roomRackChamberLinkId
    let roomId = props.row.roomRackId === null ? "" : props.row.roomRackId

    const [selectedChamberId, setSelectedChamberId] = useState(chamberId);
    const [selectedRoomId, setSelectedRoomId] = useState(roomId);
    const [selectZone, setSelectZone] = useState(false);

    const handleSelectZone = () => {
        setSelectZone(true)
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
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>                           
            <div className=' flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
                        <div className=""></div>
                        <div className=" w-[15rem]"> {props.translatedMenuItems[15]}
                            </div>
                        <div className=" w-[7.12rem]">{props.translatedMenuItems[44]}
                            </div>
                        <div className=" w-[8.1rem]">{props.translatedMenuItems[18]}
                            </div>
                        <div className=" w-[8.2rem]">{props.translatedMenuItems[5]}
                            </div>
                        <div className=" w-[8.3rem]"> {props.translatedMenuItems[45]}
                            </div>
                        <div className=" w-[8.01rem]">{props.translatedMenuItems[46]}
                            </div>
                        <div className=" w-[5.01rem]"></div>
                        <div className=" w-[10rem]">{props.translatedMenuItems[21]}
                            </div>
                        <div className=" w-[10.04rem]">GRN #</div>
                        <div className=" w-[15rem]"></div>
                        <div className=" w-[5rem]">{props.translatedMenuItems[14]}
                            </div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.receivedDetailData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveDetailData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {props.receivedDetailData.map((item) => {

                            return (
                                <div>
                                    <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center p-1 ">
                                        <div class="flex w-[22rem]">
                                            <div className=" flex w-[12.5rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold  font-poppins ">
                                                    {item.suppliesFullName.substring(0, 20)}
                                                </div>
                                            </div>
                                       
                                        <div className=" flex  w-[6.123rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.price}
                                            </div>

                                        </div>
                                        <div className=" flex   w-[6.023rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        </div>
                                        <div class="flex w-[20rem]">
                                        <div className=" flex    w-[7.033rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex   w-[5.043rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex  w-[3.053rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {`${item.unitReceived - item.unitDamaged}`}
                                            </div>
                                        </div>
                                        <div className=" flex  w-[3.2rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" !text-icon  font-poppins cursor-pointer">
                                                <ListAltRounded
                                                    onClick={() => {
                                                        handleRow(item)
                                                        props.handleReceivedUnit(true)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        </div>
                                        <div class="flex w-[29rem]">
                                        
                                        <div className=" flex    w-[7.24rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                        <div className=" flex    w-[6.123rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div>
                                        {item.grnNumber !== null &&
                                            <div className=" flex   justify-between w-[10.5rem] max-sm:flex-row    ">
                                              

                                                    {selectZone && item.poSupplierSuppliesId === row.poSupplierSuppliesId ?
                                                        <>
                                                            <Select
                                                                style={{ width: "5rem"}}
                                                                 placeholder='Zone'
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
                                                            <Select
                                                                  style={{ width: "5rem"}}
                                                                 placeholder='Room'
                                                                value={selectedChamberId}
                                                                onChange={(val) => handleChangeChamber(val)}
                                                            >
                                                                {props.rackList.map((chamber) => (
                                                                    <Option value={chamber.roomRackChamberLinkId}>
                                                                        {chamber.chamber}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </> :
                                                        item.chamber === null ? <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                handleSelectZone()
                                                                handleRow(item)
                                                            }}
                                                        >
                                                            {/* Select Zone */} {props.translatedMenuItems[47]}
                                                        </Button> :
                                                            <div>
                                                                {item.zone}{item.chamber}
                                                            </div>
                                                    }

                                                </div>
                                           
                                        }
                                        <div className=" flex    w-[3.1rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.grnNumber !== null &&
                                                    <TransferToStock
                                                        roomRackId={selectedRoomId}
                                                        roomRackChamberLinkId={selectedChamberId}
                                                        allowGrnInd={item.allowGrnInd}
                                                        grnStockInd={item.grnStockInd}
                                                        handleCancelZone={handleCancelZone}
                                                        poSupplierSuppliesId={item.poSupplierSuppliesId}
                                                        poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                    />
                                                }
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
            <ItemWiseReceivedModal
                row={row}
                handleReceivedUnit={props.handleReceivedUnit}
                addReceiveUnit={props.addReceiveUnit}
             translatedMenuItems={props.translatedMenuItems}
            />
        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    receivedDetailData: inventory.receivedDetailData,
    addReceiveUnit: inventory.addReceiveUnit,
    locationId: auth.userDetails.locationId,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList,
    orgId: auth.userDetails.organizationId,
    fetchingMaterialReceiveDetailData: inventory.fetchingMaterialReceiveDetailData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceivedDetailData,
            handleReceivedUnit,
            getRackList,
            getRoomRackByLocId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(GrnListOfPO)

