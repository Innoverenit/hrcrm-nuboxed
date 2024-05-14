import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';
import { getPhonelistById, handlePhoneNotesOrderModal } from "../../AccountAction";
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import { SubTitle } from "../../../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { BundleLoader } from "../../../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
const PhoneNotesOrderModal = lazy(() => import("./PhoneNotesOrderModal"));
const AccountPhoneTaskTable = lazy(() => import("./AccountPhoneTaskTable"));
const AddingSpareList = lazy(() => import("./AddingSpareList"));
const QRCodeModal = lazy(() => import("../../../../../Components/UI/Elements/QRCodeModal"));

function DistributorPauseForm(props) {
    const [dimensions, setDimensions] = React.useState({ width: 500, height: 500 });

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };

    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getPhonelistById(props.particularRowData.orderId, page)
    }, [])

    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getPhonelistById(props.particularRowData.orderId, page)
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
            <div>
                {props.fetchingPhoneListById ? <BundleLoader /> :
                    <>
                        <div className=' flex justify-end sticky flex-col z-auto'>
                            <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                                <div className=" flex  w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
                                    <div className=" md:w-[4.2rem]"><FormattedMessage
                                        id="app.OEM"
                                        defaultMessage="OEM"
                                    /></div>
                                    <div className=" md:w-[4.5rem]"><FormattedMessage
                                        id="app.model"
                                        defaultMessage="Model"
                                    /></div>
                                    <div className="md:w-[6.2rem]">Unique ID</div>
                                    <div className=" md:w-[9.2rem]">Info</div>

                                    <div className=" md:w-[7.5rem]"><FormattedMessage
                                        id="app.condition"
                                        defaultMessage="Condition"
                                    /></div>
                                    <div className=" md:w-[6.8rem]">Quoted</div>
                                    <div className=" md:w-[6.5rem]"><FormattedMessage
                                        id="app.totalhours"
                                        defaultMessage="Total Hours"
                                    /></div>
                                    <div className=" md:w-[6.31rem]"><FormattedMessage
                                        id="app.totalcost"
                                        defaultMessage="Total Cost"
                                    /></div>
                                    <div className=" md:w-[6.3rem]"><FormattedMessage
                                        id="app.finalprice"
                                        defaultMessage="Final Price"
                                    /></div>
                                    <div className=" md:w-[7rem]"><FormattedMessage
                                        id="app.qc"
                                        defaultMessage="QC"
                                    /></div>
                                    <div className=" md:w-[6rem]"><FormattedMessage
                                        id="app.issue"
                                        defaultMessage="Issue"
                                    /></div>
                                    <div className=" md:w-[2rem]"></div>
                                    <div className=" md:w-[1rem]"></div>
                                    <div className=" md:w-[1rem]"></div>
                                    <div className=" md:w-[1rem]"></div>
                                </div>
                                <div >
                                    <InfiniteScroll
                                        dataLength={props.phoneListById.length}
                                        next={handleLoadMore}
                                        hasMore={hasMore}
                                        loader={props.fetchingPhoneListById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                                        height={"64vh"}
                                    >
                                        {props.phoneListById.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                                        <div class="flex">
                                                            <div className=" flex font-medium items-center   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.company}
                                                                </div>
                                                            </div>

                                                            <div className=" flex font-medium  items-center   md:w-[4.51rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.model}
                                                                </div>

                                                            </div>
                                                            <div className=" flex font-medium items-center    md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.imei}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium  items-center   md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.os} {item.gb} {item.color}
                                                                </div>
                                                            </div>
                                                            {/* <div className=" flex font-medium   md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.gb}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.color}
                                                                </div>
                                                            </div> */}
                                                            <div className=" flex font-medium  items-center   md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.condition}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium  items-center   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.expectedPrice}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium  items-center   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.totalhours}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium  items-center   md:w-[6.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.totalExtraCost}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium  items-center   md:w-[8.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.totalPrice}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium items-center    md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                                                            <div className=" flex font-medium items-center   md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    {item.issue}
                                                                </div>
                                                            </div>
                                                            <div className=" flex font-medium    md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                                                            <div className=" flex font-medium   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-cardBody font-poppins">
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.Print"
                                                                        defaultMessage="Print"
                                                                    />}>
                                                                        {/* <PrintOutlined
                                                                            // onClick={handlePrint}
                                                                            className="!text-base cursor-pointer"
                                                                        /> */}
                                                                        <ReactToPrint
                                                                            trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print </Button>}
                                                                            content={() => componentRefs.current[index]}
                                                                        />
                                                                    </Tooltip>

                                                                </div>
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
                                                            {/* <div style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}><span style={{ fontWeight: "bold" }}>Company:</span> {item.company}</div> */}

                                                            {/* <div style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}><span style={{ fontWeight: "bold" }}>Model:</span> {item.model}</div>
                                                            <div style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}><span style={{ fontWeight: "bold" }}>OS:</span> {item.os}</div>
                                                            <div style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}><span style={{ fontWeight: "bold" }}>GB:</span> {item.gb}</div>
                                                            <div style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}><span style={{ fontWeight: "bold" }}>Color:</span> {item.color}</div> */}
                                                            <div style={{ fontSize: "5rem", marginTop: "2rem" }}>
                                                                <QRCode size={150} value={item.imei} />

                                                            </div>
                                                            <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>IMEI:</span> {item.imei}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </InfiniteScroll>
                                </div>
                            </div>

                        </div>
                        <div class=" flex justify-end">
                            <Button
                                type="primary"
                                onClick={handlePrint}>
                                Print</Button>
                        </div>
                    </>}
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



