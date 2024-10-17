import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCreateManufactureModal from "../../../../../Production/Child/AddCreateManufactureModal"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Tooltip, Button, Select } from "antd";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import { BorderColorOutlined, } from "@mui/icons-material";
import MoveToggleProduction from "../../../../../Production/Child/MoveToggleProduction";
import { getProductionsbyLocId,addCreateManufactureCardModal, updateRoomRackWip } from "../../../../../Production/ProductionAction"
import QRCode from "qrcode.react";
import { getRoomRackByLocId, getRackList } from "../../../InventoryAction";

const { Option } = Select;

function ProductionCreateCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedChamberId, setSelectedChamberId] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [store, setStore] = useState(false);

    function handleStore() {
        setStore(true)
    }
    function handleCancelStore() {
        setStore(false)
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
            manufactureId: id,
            roomRackChamberLinkId: selectedChamberId,
            locationDetailsId: props.locationId,
            roomEntryDate: dayjs()
        };
        props.updateRoomRackWip(dataToSend, handleCallback())
    }
    function handleCallback() {
        setSelectedChamberId("")
        setSelectedRoomId("")
        setStore(false)
    }

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    useEffect(() => {
   
        props.getProductionsbyLocId(props.inventory.locationDetailsId, page);
        setPage(page + 1);
        props.getRoomRackByLocId(props.locationId, props.orgId);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.productionByLocsId && props.productionByLocsId.length && props.productionByLocsId[0].pageCount
        setTimeout(() => {
            if (props.productionByLocsId) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getProductionsbyLocId(props.inventory.locationDetailsId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    const {
        fetchingProductionLocId,
        productionByLocsId,

    } = props;
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className="w-[7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11rem] ">
                            {/* Manufacture ID */}
                            {props.translatedMenuItems[35]}
                            </div>
                        <div className=" w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.01rem]">
                            {/* Name */}  {props.translatedMenuItems[15]}
                            </div>
                        <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem]">
                            {/* Category */} {props.translatedMenuItems[16]}
                            </div>
                        <div className=" w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.2rem] ">
                            {/* Attribute */} {props.translatedMenuItems[17]}
                            </div>
                        <div className=" w-[12.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.21rem] ">
                            {/* To Dispatch */} {props.translatedMenuItems[36]}
                            </div>
                        <div className="md:w-[10rem]">
                            {/* Store */}  {props.translatedMenuItems[37]}
                            </div>
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={productionByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingProductionLocId ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="flex text-center font-bold text-xs text-red-500">{props.translatedMenuItems[38]}. </div>}
                    >
                        {productionByLocsId.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[6rem] max-sm:flex-col ">
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium flex-col  w-[13.5rem] max-xl:w-[11.5rem] max-lg:w-[9.5rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                                                <div 
                                                class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                                onClick={() => {
                                                    props.addCreateManufactureCardModal(true);
                                                    handleParticularRowData(item)
                                                    //handleRowData(item);
                                                    //handleProductivityClick(date.isoDate,user.userId)
                                                               
                                                             
                                                             
                                                   }}
                                                >
                                                    {item.manufactureId}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium flex-col  w-[7.1rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    {item.productName}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                                            <div className=" flex font-medium flex-col w-[13.51rem] max-xl:w-[7.51rem] max-lg:w-[5.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                                                    {item.categoryName}  {item.subCategoryName}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[15.2rem] max-xl:w-[11.2rem] max-lg:w-[8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                                                <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    {item.attributeName}  {item.subAttributeName}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-semibold  font-poppins">
                                                    {store && particularDiscountData.manufactureId === item.manufactureId ?
                                                        <>
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
                                                                    handleSubmitRoomRack(item.manufactureId)
                                                                }} >
                                                                {/* <FormattedMessage
                                                                    id="app.save"
                                                                    defaultMessage="Save"
                                                                /> */}  {props.translatedMenuItems[34]}
                                                            </Button>
                                                            <Button onClick={() => handleCancelStore()}>
                                                                {/* <FormattedMessage
                                                                id="app.cancel"
                                                                defaultMessage="Cancel"
                                                            /> */} {props.translatedMenuItems[24]}
                                                            </Button>
                                                        </>
                                                        :
                                                        <>
                                                            {`${item.zone || ""} - ${item.chamber || ""}`}

                                                        </>
                                                    }

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-semibold  font-poppins">
                                                    {item.zone ? <BorderColorOutlined
                                                        onClick={() => {
                                                            handleStore()
                                                            handleParticularRowData(item)
                                                        }}
                                                    /> : <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            handleStore()
                                                            handleParticularRowData(item)
                                                        }}>
                                                            {/* Send To Store */} {props.translatedMenuItems[39]}

                                                            </Button>}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[7.2rem] max-xl:w-[7.21rem] max-lg:w-[5.21rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">

                                                <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    <MoveToggleProduction item={item} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium flex-col w-[2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins">
                                                    <Tooltip title={props.translatedMenuItems[40]}>
                                                        <BorderColorIcon
                                                            className="!text-xl cursor-pointer text-[tomato]"
                                                        // onClick={() => {
                                                        //     props.setEditProducts(item);
                                                        //     handleUpdateProductModal(true);
                                                        // }}
                                                        />
                                                    </Tooltip>
                                                </div>


                                            </div>
                                            <div className=" flex font-medium   w-[6rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                    <Tooltip title={props.translatedMenuItems[41]}>

                                                        <ReactToPrint
                                                            trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print QR </Button>}
                                                            content={() => componentRefs.current[index]}
                                                        />
                                                    </Tooltip>

                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "none", textAlign: "center" }}>

                                            <div
                                                ref={(el) => (componentRefs.current[index] = el)}
                                                style={{
                                                    fontSize: "16px",
                                                    marginBottom: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div class=" mt-8"><QRCode size={130} value={item.manufactureId} /></div>
                                                <div style={{ fontSize: "2rem" }}>{item.manufactureId}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>

<AddCreateManufactureModal
productionProductId={particularDiscountData.productionProductId}
addCreateManufactureCard={props.addCreateManufactureCard}
addCreateManufactureCardModal={props.addCreateManufactureCardModal}
/>

        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    productionByLocsId: production.productionByLocsId,
    fetchingProductionLocId: production.fetchingProductionLocId,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList: inventory.rackList,
    addCreateManufactureCard:production.addCreateManufactureCard,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionsbyLocId,
            getRoomRackByLocId,
            updateRoomRackWip,
            getRackList,
            addCreateManufactureCardModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionCreateCard);
