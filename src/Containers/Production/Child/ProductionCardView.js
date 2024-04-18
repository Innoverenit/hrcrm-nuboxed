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
import { getProductionsbyLocId, updateProStatus, handleBuilderProduction, handleProductionIDrawer, updateRoomRackProduction } from "../ProductionAction"
import { DeleteOutlined } from "@ant-design/icons";
import { PauseCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
import { updatePauseStatus } from "../../Main/Refurbish/RefurbishAction.js"
import { getRoomRackByLocId,getRackList } from "../../Main/Inventory/InventoryAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import InpectProductionToggle from "./InpectProductionToggle";
import { MultiAvatar } from "../../../Components/UI/Elements";
const BuilderProductionDrawer = lazy(() => import("./BuilderProductionDrawer"));
const ProductionIDrawer = lazy(() => import("./ProductionIDrawer"));

const { Option } = Select;

function ProductionCardView(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedChamberId, setSelectedChamberId] = useState(null);
    
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        props.getProductionsbyLocId(props.userId, page);
        setPage(page + 1);
        props.getRoomRackByLocId(props.locationId,props.orgId);
    }, []);

    const [particularDiscountData, setParticularDiscountData] = useState({});


    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }
    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    const handleLoadMore = () => {
        const proPag = props.productionByLocsId && props.productionByLocsId.length && props.productionByLocsId[0].pageCount
        setTimeout(() => {
            if (props.productionByLocsId) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getProductionsbyLocId(props.userId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

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


    const {
        fetchingProductionLocId,
        productionByLocsId,
        user, 
        openbUILDERProductiondrawer, handleBuilderProduction, clickedProductionIdrwr, handleProductionIDrawer
    } = props;

    const handleRoomRackChange = (value) => {
        setSelectedRoomId(value);
        props.getRackList(value);
      }

//   const filteredRacks = props.rackList.filter(
//     (product) => product.roomRackId === selectedRoomId
//   );
    const handleChangeChamber = (selectedRoomRackId, manufactureId) => {
        const selectedRoomRack = props.roomRackbyLoc.find((rack) => rack.roomRackId === selectedRoomRackId);
        const associatedProduction = props.productionByLocsId.find((prod) => prod.manufactureId === manufactureId);
        if (selectedRoomRack && associatedProduction) {
            const { locationDetailsId, creationDate } = selectedRoomRack;
            const { productId, productName, categoryName } = associatedProduction;
            const dataToSend = {
                roomRackId: selectedRoomRackId,
                manufactureId: manufactureId,
                locationDetailsId: locationDetailsId,
                roomEntryDate: creationDate,
                roomRackChamberLinkId:"",
            };
            props.updateRoomRackProduction(dataToSend);
        }
    };
    // const handleChangeRoomRack = (selectedRoomRackId, manufactureId) => {
    //     const selectedRoomRack = props.roomRackbyLoc.find((rack) => rack.roomRackId === selectedRoomRackId);
    //     const associatedProduction = props.productionByLocsId.find((prod) => prod.manufactureId === manufactureId);
    //     if (selectedRoomRack && associatedProduction) {
    //         const { locationDetailsId, creationDate } = selectedRoomRack;
    //         const { productId, productName, categoryName } = associatedProduction;
    //         const dataToSend = {
    //             roomRackId: selectedRoomRackId,
    //             manufactureId: manufactureId,
    //             locationDetailsId: locationDetailsId,
    //             roomEntryDate: creationDate,
    //         };
    //         props.updateRoomRackProduction(dataToSend);
    //     }
    // };
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[10rem]">ID</div>
                        <div className=" md:w-[7rem]">Created</div>
                        <div className=" md:w-[7rem]">Item</div>
                        <div className="md:w-[5rem]">Category</div>
                        <div className="md:w-[5rem]">Attribute</div>
                        <div className=" md:w-[5rem] ">Status</div>
                        <div className="md:w-[5.2rem]">Workflow</div>
                        <div className="md:w-[5.2rem]">Stage</div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[5rem]">Store</div>
                        <div className="md:w-[5rem]">Inspected</div>
                        <div className="md:w-[5rem]"> Dispatch </div>
                        <div className="md:w-[3rem]"></div>
                        <div className="md:w-[2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={productionByLocsId.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {productionByLocsId.length ?
                            <>
                                {productionByLocsId.map((item, index) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <div key={item.productionProductId}>
                                            <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium flex-col  md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" underline text-[#1890ff] cursor-pointer w-[8rem] flex text-xs  font-poppins"
                                                            onClick={() => {
                                                                handleParticularRowData(item);
                                                                props.handleProductionIDrawer(true)
                                                            }}
                                                        >
                                                            {item.manufactureId}
                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
                                                                >
                                                                    New
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {date}
                                                        </div>

                                                    </div>
                                                    <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            {item.productName}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins">

                                                        {item.categoryName}  {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.attributeName}  {item.subAttributeName}
                                                    </div>
                                                </div>

                                               
                                                <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.type === "In Progress" && item.pauseInd === true &&

                                                            <PlayCircleFilledSharp
                                                                // class=" cursor-pointer"
                                                                onClick={() => {
                                                                    let data = {
                                                                        userId: props.userId,
                                                                        phoneId: item.manufactureId,
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
                                                                        phoneId: item.manufactureId,
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
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        {item.workFlow}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                       {/* {stage} */}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    {item.type === "In Progress" ?
                                                        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                            <Button
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleParticularRowData(item);
                                                                    handleBuilderProduction(true);
                                                                }}
                                                            >
                                                                Add Parts
                                                            </Button>
                                                        </div> : null}
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <Select
                                                            classNames="w-32"
                                                            value={item.zone}
                                                            onChange={handleRoomRackChange}
                                                        >
                                                            {/* {props.roomRackbyLoc.map((s) => (
                                                                <Option key={s.roomRackId} value={s.roomRackId}>
                                                                    {s.zone}
                                                                </Option>
                                                            ))} */}
                                                        </Select>
                                                        <Select
        classNames="w-32"
        value={selectedChamberId}
        onChange={(e) => handleChangeChamber(e,item.manufactureId)}
    >
        {/* {props.racklist.map((chamber) => (
            <Select.Option key={chamber.roomRackChamberLinkId} value={chamber.roomRackChamberLinkId}>
                {chamber.chamber}
            </Select.Option>
        ))} */}
    </Select>  
                                                    </div>
                                                </div>
                                                <div className=" flex flex-col font-medium md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <>
                                                        <div class="flex">
                                                            <InpectProductionToggle item={item} /> &nbsp;&nbsp;
                                                            {item.inspectedInd ?
                                                                <MultiAvatar
                                                                    primaryTitle={item.inspectedUserName}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                /> : null
                                                            }</div>

                                                        {item.inspectedInd ?
                                                            <>
                                                                <div>
                                                                    <div>
                                                                        {dayjs(item.creationDate).format("DD/MM/YYYY")}
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : null
                                                        }

                                                    </>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <MoveToggleProduction item={item} />
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.Print"
                                                            defaultMessage="Print"
                                                        />}>

                                                            <ReactToPrint
                                                                trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print QR</Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>

                                                {(user.productionDeleteInd === true || user.role === "ADMIN") && (
                                                    <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <Tooltip title="Delete">
                                                                <Popconfirm
                                                                    title="Do you want to delete?"
                                                                //   onConfirm={() => props.deleteShipperData(item.shipperId)}
                                                                >
                                                                    <DeleteOutlined
                                                                        className=" !text-base cursor-pointer text-[red]"

                                                                    />
                                                                </Popconfirm>
                                                            </Tooltip>
                                                        </div>


                                                    </div>
                                                )}
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
                                                    <div style={{ fontSize: "5rem", marginTop: "2rem" }}>
                                                        <QRCode
                                                            size={150}
                                                            value={item.manufactureId} />
                                                    </div>
                                                    <div style={{ fontSize: "1.5rem" }}> {item.manufactureId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                            : !productionByLocsId.length
                                && !fetchingProductionLocId ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
                </div>
            </div>

            <BuilderProductionDrawer
                particularDiscountData={particularDiscountData}
                openbUILDERProductiondrawer={openbUILDERProductiondrawer}
                handleBuilderProduction={handleBuilderProduction}
            />
            <ProductionIDrawer
                particularDiscountData={particularDiscountData}
                clickedProductionIdrwr={clickedProductionIdrwr}
                handleProductionIDrawer={handleProductionIDrawer}
            />
        </>
    );
}


const mapStateToProps = ({ production, auth, inventory }) => ({
    productionByLocsId: production.productionByLocsId,
    fetchingProductionLocId: production.fetchingProductionLocId,
    locationId: auth.userDetails.locationId,
    orgId:auth.userDetails.organizationId,
    user: auth.userDetails,
    openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    clickedProductionIdrwr: production.clickedProductionIdrwr,
    organizationId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    roomRackbyLoc: inventory.roomRackbyLoc,
    rackList:inventory.rackList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionsbyLocId,
            handleBuilderProduction,
            updatePauseStatus,
            handleProductionIDrawer,
            updateProStatus,
            getRoomRackByLocId,
            updateRoomRackProduction,
            getRackList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionCardView);