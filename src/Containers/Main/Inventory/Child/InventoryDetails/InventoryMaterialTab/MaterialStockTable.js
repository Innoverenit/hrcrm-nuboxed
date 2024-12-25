import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { Tooltip, Select } from "antd";
import ItemHistoryInStockData from "./ItemHistoryInStockData"
import { getRoomRackByLocId, getRackList } from "../../../InventoryAction";
import { getMaterialUnitsData, handleSTockItemModal, handleStockUsedDrawer, trnasferGrnItemToStock } from "../../../InventoryAction"
import StockItemClickModal from "./StockItemClickModal";
import InfiniteScroll from "react-infinite-scroll-component";
import TheStockUsedDrawer from "./TheStockUsedDrawer";
import AddBoxIcon from '@mui/icons-material/AddBox';


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
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
                        <div className="w-[2.5rem]"></div>
                   {/* po # */}
                        <div className=" md:w-[9.21rem]">
                   {/* name */}
                            {props.translatedMenuItems[15]}
                            </div>
                        <div className=" md:w-[3.82rem]">
                            {/* Category */}
                    {props.translatedMenuItems[16]}
                            </div>
                    {/* price */}
                        <div className=" md:w-[4.25rem]">
                            {/* attribute */}
                               {props.translatedMenuItems[17]}
                            </div>
                        <div className=" md:w-[4.25rem]">
                       {/* cell  {props.translatedMenuItems[7]} */}
                        </div>
                        <div className=" md:w-[6.10rem]">HSN</div>
                        <div className=" md:w-[6.10rem]">
                            {/* in stock  */}
                             {props.translatedMenuItems[29]}
                        </div>
                       
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialUnitsData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialUnitsData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"67vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {props.materialUnitsData.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                        <div class="flex">
                                            <div className=" flex md:w-[2.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs  font-semibold  font-poppins ">
                                          
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
                                            <div className=" flex md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs  font-semibold  font-poppins ">
                                                    
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.suppliesFullName}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.categoryName}  {item.subCategoryName}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.attributeName}  {item.subAttributeName}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.hsn}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.balanced}
                                            </div>
                                        </div>


                                        <div class="flex flex-col w-6 items-center max-sm:flex-row max-sm:w-[10%]">

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


<div></div>
</div>
                                      

                                    </div>
                                    <div>
                                        {itemHistory && (row.suppliesId === item.suppliesId)
                                            && <ItemHistoryInStockData 
                                            selectedLanguage={props.selectedLanguage}
                                            translateText={props.translateText}
                                            row={row} 
                                            inventory={props.inventory}
                                          

                                            />}
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GrnListOfPO)

