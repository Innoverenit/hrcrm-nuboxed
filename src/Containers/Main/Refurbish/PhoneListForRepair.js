

import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getRepairPhoneByUser,
    updaterepairStatus,
    getCatalogueByUser,
    handleRepairPhoneNotesOrderModal,
    handlePhoneDetails, 
    handleInTagDrawer,
    updatePauseStatus
} from "./RefurbishAction";
import { Button, Tooltip, Badge, Slider, Progress } from "antd";
import { FileDoneOutlined, RollbackOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import ButtonGroup from "antd/lib/button/button-group";
import QRCode from "qrcode.react";
import dayjs from "dayjs";
import CategoryIcon from '@mui/icons-material/Category'
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { NoteAddOutlined, PauseCircleFilled, PlayCircleFilled, PlayCircleFilledSharp } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubTitle } from "../../../Components/UI/Elements";
import AddSpareInRepair from "./AddSpareInRepair";
import ReactToPrint from "react-to-print";
import PhoneDetailsModal from "./ProductionTab/PhoneDetailsModal";
import TagInDrawer from "./ProductionTab/TagInDrawer";
import { base_url2 } from "../../../Config/Auth";
import { BundleLoader } from "../../../Components/Placeholder";
const RepairPhoneNotesOrderModal = lazy(() => import('./RepairPhoneNotesOrderModal'));
const RepairTaskList = lazy(() => import('./RepairTaskList'));


function PhoneListForRepair(props) {
    const [page, setPage] = useState(0);

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    useEffect(() => {
        setPage(page + 1);
        props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
    }, [])
    // const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPage(page + 1);
    //     props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
    // };

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
    const [expand, setExpand] = useState(false);
    const [spares, setspares] = useState(false);
    const [phoneId, setphoneId] = useState("");

    function handleExpand(phoneId) {
        setExpand(!expand);
        setspares(false)
        setphoneId(phoneId);
    }
    function hanldeSpare(phoneId) {
        setspares(!spares);
        setExpand(false)
        setphoneId(phoneId);
    }

    function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button

                    ghost={status !== type}
                    style={{
                        padding: "6px",
                        borderColor: "transparent",
                        color: indStatus === type ? "orange" : "grey",
                        // color: status === type && id === phoneId ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "1rem" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")
    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    const [backToComplete, setBackComplete] = useState(false)

    const handleChangeBack = () => {
        setBackComplete(true)
    }


    function handleQCRepairStatus(type, item) {
        setActive(type)

        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            orderPhoneId: props.rowData.orderPhoneId,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updaterepairStatus(data, item.phoneId, props.userId)
        if (type === "Complete") {
            setBackComplete(false)
        }
    }

    return (
        <>
            {props.fetchingRepairPhoneByUser ? <BundleLoader /> : <div className=' flex justify-end sticky flex-col z-auto overflow-x-auto '>
                <div class=" rounded-lg m-1 max-sm:m-1 p-2 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[98.5%] max-sm:hidden p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.oem"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" w-[5.04rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className="w-[4.01rem]">Issue</div>
                        <div className="w-[11.31rem]"></div>
                        <div className="w-[8.58rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            Estimate (hours)
                        </div>
                        <div className="w-[5.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.start"
                            defaultMessage="Start"
                        /></div>
                        <div className="w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.end"
                            defaultMessage="End"
                        /></div>

                        <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.tat"
                            defaultMessage="TAT"
                        /></div>

                        <div className="w-[7.81rem]">Spare</div>
                        <div className="w-[5.02rem]">Task</div>
                        <div className="w-[5.03rem]"></div>
                        <div className="w-[2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.repairPhone.length}

                        loader={props.fetchingRepairPhoneByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"74vh"}
                    >
                        {props.repairPhone.map((item, index) => {
                             const percentage = Math.floor((item.checkedSpare / item.totalSpare) * 100)
                             const acivedPercentage= Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100) 
                             const isValidPercentage = !isNaN(percentage) && isFinite(percentage);
                            let x = item.repairStatus === "In Progress"
                            let y = item.pauseInd
                            console.log(x)
                            console.log(y)
                            const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            return (
                                <div>
                                    <div className="flex rounded-xl  w-full  mt-4 bg-white h-[2.75rem] items-center p-3 max-sm:h-[8rem] max-sm:flex-col "

                                    >
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[5.81rem] max-sm:w-auto max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs  ">
                                                {item.company}
                                            </div>

                                            <div className=" flex font-medium   w-[5.07rem] max-sm:flex-row  max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.model}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium  w-[6.08rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.imei}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[6.68rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium w-[3.06rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <SubTitle>
                                                        {item.qrCodeId ? (
                                                            <span onClick={() => {
                                                                props.handlePhoneDetails(true)
                                                                handleSetRowData(item);
                                                            }}>
                                                                <QRCodeModal
                                                                    qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                                    imgHeight={"2.8em"}
                                                                    imgWidth={"2.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            </span>

                                                        ) : (
                                                            <span class="text-[0.6rem] font-bold">
                                                                No QR
                                                            </span>
                                                        )}
                                                    </SubTitle>
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  w-[6.3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody flex w-[3.5rem] font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {(x === true && y === true) &&
                                                        <Tooltip title="Pause">
                                                            <PlayCircleFilledSharp className="!text-lg"
                                                                // class=" cursor-pointer"
                                                                onClick={() => {
                                                                    let data = {
                                                                        userId: props.userId,
                                                                        phoneId: item.phoneId,
                                                                        pauseInd: false
                                                                    }
                                                                    props.updatePauseStatus(data)
                                                                }} />
                                                        </Tooltip>
                                                    }
                                                    {item.repairStatus === "To Start" && <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        id={item.phoneId}
                                                        indStatus={item.repairStatus}
                                                        phoneId={RowData.phoneId}
                                                        status={active}
                                                        onClick={() => {
                                                            handleQCRepairStatus("In Progress", item)

                                                        }}
                                                    />}
                                                    {item.repairStatus === "In Progress" && item.pauseInd === false &&
                                                        <Tooltip title="Resume">
                                                            <PauseCircleFilled
                                                                class=" cursor-pointer text-orange-400"
                                                                onClick={() => {
                                                                    let data = {
                                                                        userId: props.userId,
                                                                        phoneId: item.phoneId,
                                                                        pauseInd: true
                                                                    }
                                                                    props.updatePauseStatus(data)
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    }

                                                    {item.repairStatus === "In Progress" && item.pauseInd === false && <StatusIcon
                                                        type="Complete"
                                                        iconType="fa-hourglass"
                                                        tooltip="Complete"
                                                        indStatus={item.repairStatus}
                                                        status={active}
                                                        id={item.phoneId}
                                                        phoneId={RowData.phoneId}
                                                        onClick={() => {
                                                            handleQCRepairStatus("Complete", item);
                                                        }}
                                                    />}
                                                    {item.repairStatus === "Complete" &&
                                                        <RollbackOutlined />}
                                                    {/* </ButtonGroup> */}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[5.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.totalhours}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[5.4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.repairStartTime === null ? "" : dayjs(item.repairStartTime).format('HH:mm:ss')}

                                                </div>
                                            </div>

                                            <div className=" flex font-medium  w-[5.27rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <>{item.repairEndTime === null ? "" : dayjs(item.repairEndTime).format('HH:mm:ss')}</>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium w-[4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.totalTimeTakenInHours}H:{Math.floor(item.totalTimeTakenInMinutes)}M

                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                                            <div className=" flex font-medium w-[9.79rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center mr-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {/* <Tooltip title="Spare">
                                                        <Badge size="small" count={` ${item.checkedSpare}/${item.totalSpare}`} overflowCount={5000}>
                                                            <Button
                                                                type="primary"
                                                                style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "white" }}

                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    hanldeSpare();
                                                                }}>
                                                                <CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Spares
                                                            </Button>
                                                        </Badge> 
                                                    </Tooltip> */}
                                                    { isValidPercentage ? (
                                                     <Tooltip title="Spare">
                                                              <Progress 
                                                               percent={percentage}
                                                               success={{ percent: 30 }}
                                                               format={() => `${percentage}%`} 
                                                                style={{width:"8rem",cursor:"pointer"}} 
                                                               onClick={() => {
                                                                    handleSetRowData(item);
                                                                    hanldeSpare();
                                                                }} />
                                                                                                   
                                                    </Tooltip>
                                                 ) : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.019rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {/* <Tooltip title="Task">
                                                        <Badge size="small" count={`${item.totalCompleteTaskCount} / ${item.totalTaskCount}`} overflowCount={5000}>
                                                            <Button
                                                                style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                                type="primary"
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    handleExpand(item.phoneId);
                                                                }}
                                                            ><FileDoneOutlined style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Tasks</Button>
                                                        </Badge>
                                                    </Tooltip> */}
                                                     <Tooltip title="Task">
                                                     <Progress
                                                     type="circle"
                                                      style={{ cursor: "pointer",color:"red" }}
                                                       percent={acivedPercentage}

                                                      width={30}
                                                        strokeColor={"#005075"}
                                                        onClick={() => {
                                                            handleSetRowData(item);
                                                            handleExpand(item.phoneId);
                                                        }}
                                                          />                                                       
                                                    </Tooltip>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[1.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title="Notes">
                                                    <NoteAltIcon className="!text-xl mr-1 cursor-pointer text-[green]" 
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                props.handleRepairPhoneNotesOrderModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>

                                                </div>
                                            </div>

                                            <div className=" flex font-medium ml-1   w-[4.023rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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

                                            <div className=" flex font-medium   w-[4.32rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title={<FormattedMessage
                                                        id="app.scan"
                                                        defaultMessage="scan"
                                                    />}>

                                                        <Button
                                                            // onClick={() => {
                                                            //     props.handleInTagDrawer(true)
                                                            //     handleSetRowData(item)
                                                            // }}
                                                            class=" bg-green-600 cursor-pointer text-gray-50"
                                                        >
                                                            Scan </Button>

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
                                                <div style={{ fontSize: "5rem" }}>
                                                    <QRCode
                                                        size={150}
                                                        value={item.phoneId} />
                                                </div>
                                                <div style={{ fontSize: "1.5rem" }}> {item.imei}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </div>
                {/* <div class="flex justify-end">
                    <Button
                        type="primary"
                        onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}</Button>
                </div> */}
                {spares && (
                    <AddSpareInRepair
                        phoneId={phoneId}
                        RowData={RowData}
                        orderPhoneId={props.rowData.orderPhoneId}
                    />

                )}
                {expand && (
                    <RepairTaskList
                        phoneId={phoneId}
                        RowData={RowData} />
                )}

                <RepairPhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesRepairOrderModal={props.phoNotesRepairOrderModal}
                    handleRepairPhoneNotesOrderModal={props.handleRepairPhoneNotesOrderModal}
                />
                <PhoneDetailsModal
                    handlePhoneDetails={props.handlePhoneDetails}
                    showPhoneData={props.showPhoneData}
                    phoneId={RowData.phoneId}
                />
                {/* <TagInDrawer
                    RowData={RowData}
                    clickTagInDrawr={props.clickTagInDrawr}
                    handleInTagDrawer={props.handleInTagDrawer}
                /> */}
            </div>}
        </>
    )

}

const mapStateToProps = ({ refurbish, auth }) => ({
    repairPhone: refurbish.repairPhone,
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    phoNotesRepairOrderModal: refurbish.phoNotesRepairOrderModal,
    itemTaskcount: refurbish.itemTaskcount,
    fetchingRepairPhoneByUser: refurbish.fetchingRepairPhoneByUser,
    showPhoneData: refurbish.showPhoneData,
    clickTagInDrawr: refurbish.clickTagInDrawr,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairPhoneByUser,
            updaterepairStatus,
            handleInTagDrawer,
            getCatalogueByUser,
            handleRepairPhoneNotesOrderModal,
            handlePhoneDetails,
            updatePauseStatus
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListForRepair);
