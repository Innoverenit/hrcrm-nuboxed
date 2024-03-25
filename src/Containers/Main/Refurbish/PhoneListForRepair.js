

import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRepairPhoneByUser, updaterepairStatus, getCatalogueByUser, handleRepairPhoneNotesOrderModal } from "./RefurbishAction";
import { Button, Tooltip, Badge } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import CategoryIcon from '@mui/icons-material/Category'
import { NoteAddOutlined } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { SubTitle } from "../../../Components/UI/Elements";
import RepairSpareListTable from "./RepairSpareListTable";
const RepairPhoneNotesOrderModal = lazy(() => import('./RepairPhoneNotesOrderModal'));
const RepairTaskTable = lazy(() => import('./RepairTaskTable'));


function PhoneListForRepair(props) {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
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


    function handleQCRepairStatus(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            orderPhoneId: props.rowData.orderId,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updaterepairStatus(data, item.phoneId, props.rowData.orderPhoneId, props.locationId, props.userId)
    }

    return (
        <>
            <div className=' flex justify-end sticky flex-col z-auto overflow-x-auto '>
                <div class=" h-[75vh] rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[98.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[4.2rem]"><FormattedMessage
                            id="app.oem"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" md:w-[4rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" md:w-[5rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className="md:w-[4rem]"></div>
                        <div className="md:w-[5.3rem]"></div>
                        <div className="md:w-[5.2rem]">
                            <FormattedMessage
                                id="app.totalhr"
                                defaultMessage="Total Hours"
                            />
                        </div>
                        <div className="md:w-[4.5rem]"><FormattedMessage
                            id="app.start"
                            defaultMessage="Start"
                        /></div>
                        <div className="md:w-[4.5rem]"><FormattedMessage
                            id="app.end"
                            defaultMessage="End"
                        /></div>

                        <div className="md:w-[6rem]"><FormattedMessage
                            id="app.actualeffort"
                            defaultMessage="actualeffort"
                        /></div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[5rem]"></div>
                        <div className="md:w-[2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.repairPhone.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingRepairPhoneByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.repairPhone.map((item) => {

                            const starttimme = dayjs(item.qcStartTime).add(5, 'hours').add(30, 'minutes');
                            //  const endtimme = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            const endtimme = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Using ISO 8601 format
                            return (
                                <div>
                                    <div className="flex rounded-xl  w-full  mt-4 bg-white h-12 items-center p-3 "

                                    >
                                        <div class="flex">
                                            <div className=" flex font-medium  md:w-[4.2rem] max-sm:w-full  ">
                                                {item.company}
                                            </div>

                                            <div className=" flex font-medium   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.model}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-sm text-cardBody font-poppins">
                                                    {item.imei}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
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

                                        <div className=" flex font-medium  md:w-[5.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {props.rowData.repairInspectionInd === 1 && <ButtonGroup>
                                                    <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        id={item.phoneId}
                                                        indStatus={item.repairStatus}
                                                        phoneId={RowData.phoneId}
                                                        status={active}
                                                        onClick={() => {
                                                            handleQCRepairStatus("In Progress", item);
                                                            handleSetRowData(item)
                                                        }}
                                                    />
                                                    <StatusIcon
                                                        type="Complete"
                                                        iconType="fa-hourglass"
                                                        tooltip="Complete"
                                                        status={active}
                                                        id={item.phoneId}
                                                        indStatus={item.repairStatus}
                                                        phoneId={RowData.phoneId}
                                                        onClick={() => {
                                                            handleQCRepairStatus("Complete", item);
                                                            handleSetRowData(item)
                                                        }}
                                                    />
                                                </ButtonGroup>}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.totalhours}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.repairStartTime === null ? "" : dayjs(item.repairStartTime).format('HH:mm:ss')}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium  md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <>{item.repairEndTime === null ? "" : dayjs(item.repairEndTime).format('HH:mm:ss')}</>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.estimateRepairTimeHours || "0"}H:{item.estimateRepairTimeMinutes || "0"}M:{item.estimateRepairTimeSeconds || "0"}S

                                            </div>
                                        </div>

                                        <div className=" flex font-medium md:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center mr-2">
                                                <Tooltip title="Spare">
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
                                                </Tooltip>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Tooltip title="Task">
                                                    <Badge size="small" count={`${item.taskCount} / ${item.totalTaskCount}`} overflowCount={5000}>
                                                        <Button
                                                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                            type="primary"
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                handleExpand(item.phoneId);
                                                            }}
                                                        ><FileDoneOutlined style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Tasks</Button>
                                                    </Badge>
                                                </Tooltip>

                                            </div>
                                        </div>

                                        <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Tooltip title="Notes">
                                                    <NoteAddOutlined
                                                        style={{ cursor: "pointer", fontSize: "1rem" }}
                                                        onClick={() => {
                                                            handleSetRowData(item);
                                                            props.handleRepairPhoneNotesOrderModal(true);
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
                    <Button
                        type="primary"
                        onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}</Button>
                </div>
                {spares && (
                    <RepairSpareListTable
                        phoneId={phoneId}
                        RowData={RowData}
                    />

                )}
                {expand && (
                    <RepairTaskTable
                        phoneId={phoneId}
                        RowData={RowData} />
                )}

                <RepairPhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesRepairOrderModal={props.phoNotesRepairOrderModal}
                    handleRepairPhoneNotesOrderModal={props.handleRepairPhoneNotesOrderModal}
                />
            </div>
        </>
    )

}

const mapStateToProps = ({ refurbish, auth }) => ({
    repairPhone: refurbish.repairPhone,
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
    phoNotesRepairOrderModal: refurbish.phoNotesRepairOrderModal,
    itemTaskcount: refurbish.itemTaskcount,
    fetchingRepairPhoneByUser: refurbish.fetchingRepairPhoneByUser
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRepairPhoneByUser,
            updaterepairStatus,
            getCatalogueByUser,
            handleRepairPhoneNotesOrderModal,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListForRepair);
