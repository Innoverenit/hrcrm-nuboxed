import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneOrderIdByUser, handleQCPhoneNotesOrderModal, getOrderByUser } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import { updateQCStatus } from "../Account/AccountAction"
import dayjs from "dayjs";
import CategoryIcon from '@mui/icons-material/Category'
import { NoteAddOutlined } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
const AddingQCSpareList = lazy(() => import('./AddingQCSpareList'));
const QCPhoneNotesOrderModal = lazy(() => import('./QCPhoneNotesOrderModal'));
const DistributorPhoneTaskTable = lazy(() => import('./DistributorPhoneTaskTable'));

function OrderPhoneListById(props) {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
    }, [props.rowData.orderPhoneId, props.userId])

    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
    };

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
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")

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
        props.updateQCStatus(data, item.phoneId, props.rowData.orderPhoneId, handleCallBack)
    }
    const handleCallBack = () => {
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
        props.getOrderByUser(props.locationId, props.userId)
    }
    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    return (
        <>
            <div className=' flex justify-end sticky flex-col z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[5.5rem]"><FormattedMessage
                            id="app.oem"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" md:w-[5.2rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" md:w-[6.8rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="iMEI"
                        /></div>
                        <div className="md:w-[5.4rem]"></div>
                        <div className="md:w-[4.6rem]"></div>
                        <div className="md:w-[7.5rem]"><FormattedMessage
                            id="app.estimate"
                            defaultMessage="Estimate"
                        /></div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                            id="app.starttime"
                            defaultMessage="starttime"
                        /></div>
                        <div className="md:w-[6.3rem]"><FormattedMessage
                            id="app.endtime"
                            defaultMessage="endtime"
                        /></div>
                        <div className="md:w-[6.2rem]"><FormattedMessage
                            id="app.actualeffort"
                            defaultMessage="actualeffort"
                        /></div>

                        <div className="md:w-[6.9rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.orderPhoneList.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingOrderIdByUserId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.orderPhoneList.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            const starttimme = dayjs(item.qcStartTime).add(5, 'hours').add(30, 'minutes');
                            //  const endtimme = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            const endtimme = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Using ISO 8601 format
                            return (
                                <div>
                                    <div className="flex rounded-xl   mt-4 bg-white h-12 items-center p-3 "

                                    >
                                        <div class="flex">
                                            <div className=" flex font-medium  md:w-[5.6rem] max-sm:w-full  ">
                                                {item.company}
                                            </div>

                                            <div className=" flex font-medium   md:w-[4.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.model}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                                <div class=" text-sm text-cardBody font-poppins">
                                                    {item.imei}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[2.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <SubTitle>
                                                    {item.qrCodeId ? (
                                                        <QRCodeModal
                                                            qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                            imgHeight={"2.8em"}
                                                            imgWidth={"2.8em"}
                                                            imgRadius={20}
                                                        />
                                                    ) : (
                                                        <span class="text-[0.6rem] font-bold">
                                                            No QR
                                                        </span>
                                                    )}
                                                </SubTitle>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {props.rowData.qcInspectionInd === 1 && <ButtonGroup>
                                                    <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        id={item.phoneId}
                                                        indStatus={item.qcStatus}
                                                        phoneId={RowData.phoneId}
                                                        status={active}
                                                        onClick={() => {
                                                            handleQCStatus("In Progress", item);
                                                        }}
                                                    />
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
                                                </ButtonGroup>}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[8.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.totalhours} minutes

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[5.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.qcStartTime === null ? "" : dayjs(item.qcStartTime).format('LT')}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium  md:w-[6.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <>{item.qcEndTime === null ? "" : dayjs(item.qcEndTime).format('LT')}</>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[8.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.estimateQcTimeHours || "0"}H:{item.estimateQcTimeMinutes || "0"}M:{item.estimateQcTimeSeconds || "0"}S

                                            </div>
                                        </div>

                                        <div className=" flex font-medium  max-sm:flex-row  max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center mr-2">
                                                <Tooltip title="Spare">

                                                    <span style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "white", fontSize: "1rem" }} >
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                hanldeSpare();
                                                            }}>
                                                            <CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} /> Spares </Button>
                                                    </span>

                                                </Tooltip>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Tooltip title="Task">
                                                    <Button
                                                        type="primary"
                                                        style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                        //type="file-done"
                                                        onClick={() => {
                                                            handleSetRowData(item);
                                                            handleExpand(item.phoneId);
                                                        }}
                                                    ><FileDoneOutlined style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Tasks</Button>

                                                </Tooltip>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[1.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
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



                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
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
            </div>
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
