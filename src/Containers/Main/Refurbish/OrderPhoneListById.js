import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneOrderIdByUser, handleQCPhoneNotesOrderModal, getOrderByUser, updateQCStatus } from "./RefurbishAction";
import { Button, Tooltip, Progress } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import QRCode from "qrcode.react";
import CategoryIcon from '@mui/icons-material/Category'
import { NoteAddOutlined } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import { BundleLoader } from "../../../Components/Placeholder";
const AddingQCSpareList = lazy(() => import('./AddingQCSpareList'));
const QCPhoneNotesOrderModal = lazy(() => import('./QCPhoneNotesOrderModal'));
const DistributorPhoneTaskTable = lazy(() => import('./DistributorPhoneTaskTable'));

function OrderPhoneListById(props) {
    const [page, setPage] = useState(0);

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        setPage(page + 1);
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
    }, [props.rowData.orderPhoneId, props.userId])

    // const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPage(page + 1);
    //     props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
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
    function StatusIcon({ type, size, iconType, tooltip, status, id, onClick, phoneId, indStatus }) {
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
                    className="p-[6px] border-transparent"
                    ghost={status !== type}
                    style={{
                        color: indStatus === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip >
        );
    }

    const [active, setActive] = useState("To Start")
    const [backToComplete, setBackComplete] = useState(false)

    const handleChangeBack = () => {
        setBackComplete(true)
    }

    function handleQCStatus(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            qcStatus: type,
            orderPhoneId: props.rowData.orderId,
            phoneId: item.phoneId,
            qcTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateQCStatus(data, item.phoneId, props.locationId, props.userId)
        if (type === "Complete") {
            setBackComplete(false)
        }
    }
    // const handleCallBack = () => {
    //     props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
    //     props.getOrderByUser(props.locationId, props.userId)
    // }
    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    return (
        <>
            {props.fetchingOrderIdByUserId ? <BundleLoader /> : <div className=' flex justify-end sticky flex-col z-auto'>
                <div class="rounded-lg m-5  max-sm:m-1 p-2 w-full shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex max-sm:hidden  w-[98.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[5.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.oem"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" w-[4.012rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" w-[5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className="w-[3.001rem]">Issue</div>
                        <div className="w-[8.3rem]"></div>
                        <div className="w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            Estimate (hours)
                        </div>
                        <div className="w-[4.510rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.start"
                            defaultMessage="Start"
                        /></div>
                        <div className="w-[6.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.end"
                            defaultMessage="End"
                        /></div>

                        <div className="w-[5.02rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">TAT</div>

                        <div className="w-[6.012rem]">Spare</div>
                        <div className="w-[5.523rem]">Task</div>
                        <div className="w-[2rem]"></div>
                    </div>
                    <div class=" ">

                        <InfiniteScroll
                            dataLength={props.orderPhoneList.length}
                            // next={handleLoadMore}
                            // hasMore={hasMore}
                            loader={props.fetchingOrderIdByUserId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.orderPhoneList.map((item, index) => {
                                const percentage = Math.floor((item.checkedSpare / item.totalSpare) * 100)
                                const acivedPercentage = Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)
                                const isValidPercentage = !isNaN(percentage) && isFinite(percentage);
                                const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                                const endtimme = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Using ISO 8601 format
                                return (
                                    <div>
                                        <div className="flex rounded-xl justify-between  mt-4 bg-white h-12 items-center p-3 max-sm:h-[8rem] max-sm:flex-col ">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  w-[7.2rem] max-xl:w-[4.21rem] max-lg:w-[3.1rem] max-sm:w-auto max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                                    {item.company}
                                                </div>

                                                <div className=" flex font-medium   w-[4.35rem] max-xl:w-[2.5rem] max-lg:w-[2.5rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  w-[7.12rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[5.13rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        Issue
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium w-[4rem] max-xl:w-[4rem] max-lg:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <SubTitle>
                                                            {item.qrCodeId ? (
                                                                <QRCodeModal
                                                                    qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                                    imgHeight={"2.8em"}
                                                                    imgWidth={"2.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            ) : (
                                                                <span class="text-[0.6rem] font-bold max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                                    No QR
                                                                </span>
                                                            )}
                                                        </SubTitle>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[7.32rem] max-xl:w-[3.32rem] max-lg:w-[3.32rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" >
                                                        <div>
                                                            {props.rowData.qcInspectionInd === 1 ?
                                                                <ButtonGroup>
                                                                    {item.qcStatus === "To Start" && backToComplete === false && <StatusIcon
                                                                        type="In Progress"
                                                                        iconType="fa-hourglass-half"
                                                                        tooltip="In Progress"
                                                                        id={item.phoneId}
                                                                        indStatus={item.qcStatus}
                                                                        phoneId={RowData.phoneId}
                                                                        status={active}
                                                                        onClick={() => {
                                                                            handleQCStatus("In Progress", item)

                                                                        }}
                                                                    />}
                                                                    {item.qcStatus === "In Progress" && backToComplete === false && <StatusIcon
                                                                        type="Complete"
                                                                        iconType="fa-hourglass"
                                                                        tooltip="Complete"
                                                                        indStatus={item.qcStatus}
                                                                        status={active}
                                                                        id={item.phoneId}
                                                                        phoneId={RowData.phoneId}
                                                                        onClick={() => {
                                                                            handleQCStatus("Complete", item);
                                                                        }}
                                                                    />}
                                                                </ButtonGroup> :
                                                                (item.qcStatus === "Complete" && backToComplete === false)
                                                                    ?
                                                                    <div>
                                                                        <Tooltip title="Back To Process">
                                                                            <RollbackOutlined
                                                                                onClick={handleChangeBack}
                                                                                style={{ marginRight: "0.3rem", color: "#1890ff" }} />
                                                                        </Tooltip>
                                                                    </div>
                                                                    : null}

                                                            {backToComplete && props.RowData.phoneId === item.phoneId &&
                                                                <StatusIcon
                                                                    type="Complete"
                                                                    iconType="fa-hourglass"
                                                                    tooltip="Complete"
                                                                    indStatus={item.qcStatus}
                                                                    status={active}
                                                                    id={item.phoneId}
                                                                    phoneId={RowData.phoneId}
                                                                    onClick={() => {
                                                                        handleQCStatus("Complete", item);
                                                                    }}
                                                                />
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[7.2rem] max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.totalhours}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  w-[6.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcStartTime === null ? "" : dayjs(item.qcStartTime).format('HH:mm:ss')}

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  w-[7.51rem] max-xl:w-[5.11rem] max-lg:w-[3.51rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <>{item.qcEndTime === null ? "" : dayjs(item.qcEndTime).format('HH:mm:ss')}</>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium w-[7rem] max-xl:w-[6rem] max-lg:w-[3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.estimateQcTimeHours || "0"}H:{item.estimateQcTimeMinutes || "0"}M:{item.estimateQcTimeSeconds || "0"}S

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium w-[8.1rem] max-xl:w-[5.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center mr-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {/* <Tooltip title="Spare">


                                                        <Button
                                                            type="primary"
                                                            style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                hanldeSpare();
                                                            }}>
                                                            <CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} /> Spares </Button>

                                                    </Tooltip> */}
                                                        {isValidPercentage ? (
                                                            <Tooltip title="Spare">
                                                                <Progress
                                                                    percent={percentage}
                                                                    success={{ percent: 30 }}
                                                                    format={() => `${percentage}%`}
                                                                    style={{ width: "8rem", cursor: "pointer" }}
                                                                    onClick={() => {
                                                                        handleSetRowData(item);
                                                                        hanldeSpare();
                                                                    }} />

                                                            </Tooltip>
                                                        ) : null}


                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[4.01rem] max-xl:w-[5.01rem] max-lg:w-[4.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {/* <Tooltip title="Task">
                                                        <Button
                                                            type="primary"
                                                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                handleExpand(item.phoneId);
                                                            }}
                                                        ><FileDoneOutlined style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Tasks</Button>

                                                    </Tooltip> */}
                                                        <Tooltip title="Task">
                                                            <Progress
                                                                type="circle"
                                                                style={{ cursor: "pointer", color: "red" }}
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
                                                <div className=" flex font-medium  w-[2rem] max-xl:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title="Notes">
                                                            <NoteAddOutlined

                                                                style={{ cursor: "pointer", fontSize: "1rem" }}
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    props.handleQCPhoneNotesOrderModal(true);
                                                                }}
                                                            />

                                                        </Tooltip>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   w-[4.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.Print"
                                                            defaultMessage="Print"
                                                        />}>
                                                            {/* <PrintOutlined
                                                                            // onClick={handlePrint}
                                                                            className="!text-base cursor-pointer"
                                                                        /> */}
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
                                                    <div style={{ fontSize: "5rem", marginTop: "2rem" }}>
                                                        <QRCode size={150} value={item.imei} />
                                                    </div>
                                                    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>IMEI:</span> {item.imei}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
                <div class="flex justify-end">
                    {props.rowData.qcInspectionInd === 1 ? <Button
                        type="primary"
                        onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}
                    </Button> : null}
                </div>
                {spares && (
                    <AddingQCSpareList
                        phoneId={phoneId}
                        RowData={RowData}
                    />
                )}
                {expand && (
                    <DistributorPhoneTaskTable
                        phoneId={phoneId}
                        RowData={RowData} />
                )}

                <QCPhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesQCOrderModal={props.phoNotesQCOrderModal}
                    handleQCPhoneNotesOrderModal={props.handleQCPhoneNotesOrderModal}
                />
            </div>}
        </>
    )



}

const mapStateToProps = ({ refurbish, auth }) => ({
    orderPhoneList: refurbish.orderPhoneList,
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    fetchingOrderIdByUserId: refurbish.fetchingOrderIdByUserId,
    phoNotesQCOrderModal: refurbish.phoNotesQCOrderModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneOrderIdByUser,
            updateQCStatus,
            handleQCPhoneNotesOrderModal,
            getOrderByUser
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneListById);