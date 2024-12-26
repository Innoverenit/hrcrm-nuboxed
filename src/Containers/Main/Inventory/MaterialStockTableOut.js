import React, { useEffect, useState, lazy,Suspense  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import PinIcon from '@mui/icons-material/Pin';
import { Tooltip, Select } from "antd";
import { getRoomRackByLocId, getRackList } from "./InventoryAction";
import { getMaterialUnitsData, handleSTockItemModal, handleStockUsedDrawer, trnasferGrnItemToStock } from "./InventoryAction"
import InfiniteScroll from "react-infinite-scroll-component";
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RepartitionIcon from '@mui/icons-material/Repartition';
import { BundleLoader } from "../../../Components/Placeholder";
import MaterialStockToggle from "./MaterialStockToggle";
const ItemHistoryInStockData = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/ItemHistoryInStockData") );
const StockItemClickModal = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/StockItemClickModal") );
const TheStockUsedDrawer = lazy(() =>import("./Child/InventoryDetails/InventoryMaterialTab/TheStockUsedDrawer") );
const EmptyPage = lazy(() =>import("../EmptyPage") );
const { Option } = Select;

const MaterialStockTableOut = (props) => {
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
                <div class="rounded m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between  w-[100%]  p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky  z-10">
                        <div className="w-[2.5rem]"></div>
                   {/* po # */}
                        <div className="text-[#00A2E8] w-[8.21rem] truncate text-base max-md:w-[11.21rem]">        {/* name */}          
                                <LocationCityIcon className='!text-icon  '  />  {props.translatedMenuItems[0]}
                            </div>
                         <div className="w-[13.52rem] truncate max-md:w-[9.82rem]">      {/* Category */}                       
                            <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {props.translatedMenuItems[24]}    </div>                    
                        <div className="w-[10.1rem] truncate max-md:w-[9.25rem]">     {/* attribute */}
                            <AttractionsIcon className="  !text-icon" />  {props.translatedMenuItems[25]} </div>
                        <div className="w-[10.11rem] truncate max-md:w-[4.11rem]">< PinIcon className=" !text-icon"/>HSN</div>
                        <div className="w-[8.12rem] truncate max-md:md:w-[4.11rem]">< ShareLocationIcon className=" !text-icon"/>{props.translatedMenuItems[32]}</div>  {/* Zone*/}
                        <div className="w-[10.2rem] truncate max-md:md:w-[4.11rem]">< MeetingRoomIcon className=" !text-icon"/> room</div>
                        <div className="w-[6.6rem] truncate max-md:md:w-[4.11rem]">< RepartitionIcon className=" !text-icon"/>{props.translatedMenuItems[33]}</div> {/* Zone*/}
                        <div className="w-[7.3rem] truncate max-md:md:w-[6.10rem]">
                            {/* in stock  */}
                             {props.translatedMenuItems[29]}
                        </div>
                        <div className="w-[6.9rem] truncate max-md:md:w-[4.51rem]">< MeetingRoomIcon className=" !text-icon"/> Publish</div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.materialUnitsData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialUnitsData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"73vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {!props.fetchingMaterialUnitsData  && props.materialUnitsData.length===  0 ? <EmptyPage/>: props.materialUnitsData.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex">
                                            <div className=" flex md:w-[2.1rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs items-center  font-semibold  font-poppins ">
                                                   
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
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-xs  font-semibold  font-poppins ">
                                                    
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" flex  md:w-[15.2rem] truncate items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.suppliesFullName}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[11.1rem] truncate items-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.categoryName}  {item.subCategoryName}
                                            </div>
                                        </div>
                                        <div className=" flex  md:w-[11.1rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  ml-gap font-poppins">
                                                {item.attributeName}  {item.subAttributeName}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.remainingCorrectUnit}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.hsn}
                                            </div>
                                        </div>
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.balanced}
                                            </div>
                                        </div>
                                        <div class="flex justify-center h-8 ml-gap bg-[#eef2f9] w-6 items-center max-sm:flex-row max-sm:w-[10%]">
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
<MaterialStockToggle
                                      publishInd={item.publishInd}
                                      suppliesId={item.suppliesId}
                                    />
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
            <Suspense fallback={<BundleLoader />}>
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
    connect(mapStateToProps, mapDispatchToProps)(MaterialStockTableOut)
);
