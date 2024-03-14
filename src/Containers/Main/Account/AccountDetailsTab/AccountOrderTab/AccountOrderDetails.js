import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';
import { getPhonelistById, handlePhoneNotesOrderModal } from "../../AccountAction";
import { Button, Tooltip } from "antd";
import { SubTitle } from "../../../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { BundleLoader } from "../../../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
const PhoneNotesOrderModal = lazy(() => import("./PhoneNotesOrderModal"));
const AccountPhoneTaskTable = lazy(() => import("./AccountPhoneTaskTable"));
const AddingSpareList = lazy(() => import("./AddingSpareList"));
const QRCodeModal = lazy(() => import("../../../../../Components/UI/Elements/QRCodeModal"));

function DistributorPauseForm(props) {

    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getPhonelistById(props.particularRowData.orderId)
    }, [])

    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getPhonelistById(props.particularRowData.orderId)
    };

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
    const [expand, setExpand] = useState(false);
    const [spares, setspares] = useState(false);
    const [phoneId, setphoneId] = useState("");
    const [active, setActive] = useState("To Start");

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

    function StatusIcon({ type, size, indStatus, iconType, tooltip, status, id, onClick, phoneId }) {
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
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "1rem" }}></i>
                </Button>
            </Tooltip>
        );
    }
    return (
        <>
            <div className=' flex justify-end sticky flex-col z-auto'>
                <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[4.1rem]"><FormattedMessage
                            id="app.OEM"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" md:w-[4.9rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="Model"
                        /></div>
                        <div className="md:w-[6rem]"><FormattedMessage
                            id="app.IMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className=" md:w-[5rem]"><FormattedMessage
                            id="app.os"
                            defaultMessage="OS"
                        /></div>
                        <div className=" md:w-[3.1rem]"><FormattedMessage
                            id="app.gb"
                            defaultMessage="GB"
                        /></div>
                        <div className=" md:w-[3.1rem]"><FormattedMessage
                            id="app.color"
                            defaultMessage="Color"
                        /></div>
                        <div className=" md:w-[5.1rem]"><FormattedMessage
                            id="app.condition"
                            defaultMessage="Condition"
                        /></div>
                        <div className=" md:w-[6.7rem]"><FormattedMessage
                            id="app.expectedprice"
                            defaultMessage="Expected Price"
                        /></div>
                        <div className=" md:w-[5.8rem]"><FormattedMessage
                            id="app.totalhours"
                            defaultMessage="Total Hours"
                        /></div>
                        <div className=" md:w-[5.8rem]"><FormattedMessage
                            id="app.totalcost"
                            defaultMessage="Total Cost"
                        /></div>
                        <div className=" md:w-[5.8rem]"><FormattedMessage
                            id="app.finalprice"
                            defaultMessage="Final Price"
                        /></div>
                        <div className=" md:w-[5rem]"><FormattedMessage
                            id="app.qc"
                            defaultMessage="QC"
                        /></div>
                        <div className=" md:w-[2rem]"></div>
                        <div className=" md:w-[1rem]"></div>
                        <div className=" md:w-[1rem]"></div>
                        <div className=" md:w-[1rem]"></div>
                    </div>
                    <div class="overflow-y-auto h-[65vh]">
                        <InfiniteScroll
                            dataLength={props.phoneListById.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingPhoneListById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"65vh"}
                        >
                            {props.phoneListById.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                            <div class="flex">
                                                <div className=" flex font-medium   md:w-[4.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.company}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium   md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium   md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.os}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[3.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.gb}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[3.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.color}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.condition}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[6.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.expectedPrice}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.totalhours}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.totalExtraCost}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.totalPrice}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <ButtonGroup>
                                                            <StatusIcon
                                                                color="blue"
                                                                type="To Start"
                                                                iconType="fa-hourglass-start"
                                                                tooltip="To Start"
                                                                status={active}
                                                                id={item.phoneId}
                                                                indStatus={item.qcStatus}
                                                                phoneId={RowData.phoneId}

                                                            />
                                                            <StatusIcon
                                                                type="In Progress"
                                                                iconType="fa-hourglass-half"
                                                                tooltip="In Progress"
                                                                id={item.phoneId}
                                                                indStatus={item.qcStatus}
                                                                phoneId={RowData.phoneId}
                                                                status={active}

                                                            />
                                                            <StatusIcon
                                                                type="Complete"
                                                                iconType="fa-hourglass"
                                                                tooltip="Complete"
                                                                status={active}
                                                                id={item.phoneId}
                                                                indStatus={item.qcStatus}
                                                                phoneId={RowData.phoneId}

                                                            />
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <SubTitle>
                                                            {item.qrCodeId ? (
                                                                <QRCodeModal
                                                                    qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                                    imgHeight={"2.8em"}
                                                                    imgWidth={"2.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            ) : (
                                                                <span class="text-xs font-bold">
                                                                    No QR
                                                                </span>
                                                            )}
                                                        </SubTitle>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.spare"
                                                            defaultMessage="Spare"
                                                        />}>
                                                            <PrecisionManufacturingIcon
                                                                style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}
                                                                className="!text-base cursor-pointer"
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    hanldeSpare();
                                                                }}
                                                            />

                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.task"
                                                            defaultMessage="Task"
                                                        />}>
                                                            <FormatListBulletedIcon
                                                                className="!text-base cursor-pointer"
                                                                style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    handleExpand(item.phoneId);
                                                                }}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.Notes"
                                                            defaultMessage="Notes"
                                                        />}>
                                                            <NoteAltIcon
                                                                className="!text-base cursor-pointer"
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    props.handlePhoneNotesOrderModal(true);
                                                                }}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>

            </div>
            <Suspense fallback={<BundleLoader />}>
                {expand && (
                    <AccountPhoneTaskTable
                        phoneId={phoneId}
                        RowData={RowData} />
                )}
                <PhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesOrderModal={props.phoNotesOrderModal}
                    handlePhoneNotesOrderModal={props.handlePhoneNotesOrderModal}
                />
                {spares && (
                    <AddingSpareList
                        phoneId={phoneId}
                        RowData={RowData}
                    />
                )}
            </Suspense>
        </>
    )
}


const mapStateToProps = ({ distributor }) => ({
    phoneListById: distributor.phoneListById,
    phoNotesOrderModal: distributor.phoNotesOrderModal,
    fetchingPhoneListById: distributor.fetchingPhoneListById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhonelistById,
            handlePhoneNotesOrderModal,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorPauseForm);



