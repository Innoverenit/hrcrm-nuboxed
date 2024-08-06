import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';
import { getPhonelistById, handlePhoneNotesOrderModal } from "../../AccountAction";
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { BundleLoader } from "../../../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import QrCodeIcon from '@mui/icons-material/QrCode';
import NodataFoundPageRefubish from "../../../Refurbish/NodataFoundPageRefubish";
import NodataFoundPageAccount from "./NodataFoundPageAccount";
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
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    
            'Brand', 
            ' Model', 
            'Unique ID', 
            'Info', 
            'Condition', 
            'Quoted',
            'Total Hours',
            "Total Cost",
            "Final Price",
            "QC",
            "Issue",

          ];
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getPhonelistById(props.particularRowData.orderId, page)
    }, [])

    const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPage(page + 1);
    //     props.getPhonelistById(props.particularRowData.orderId, page)
    // };

    const handleLoadMore = () => {
        const callPageMapd = props.phoneListById && props.phoneListById.length &&props.phoneListById[0].pageCount
        setTimeout(() => {
          const {
            getPhonelistById,
          } = props;
          if  (props.phoneListById)
          {
            if (page < callPageMapd) {
              setPage(page + 1);
              getPhonelistById(props.particularRowData.orderId, page)
          }
          if (page === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
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
                        <div className=' flex  sticky flex-col z-auto'>
                            <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                                <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                                    <div className=" md:w-[4.2rem]">
                                    {translatedMenuItems[0]}</div>
                                    <div className=" md:w-[4.5rem]">{translatedMenuItems[1]}</div>
                                    <div className="md:w-[6.2rem]">{translatedMenuItems[2]}</div>
                                    <div className=" md:w-[9.2rem]">{translatedMenuItems[3]}</div>

                                    <div className=" md:w-[7.5rem]">{translatedMenuItems[4]}</div>
                                    <div className=" md:w-[6.8rem]">{translatedMenuItems[5]}</div>
                                    <div className=" md:w-[6.5rem]">{translatedMenuItems[6]}</div>
                                    <div className=" md:w-[6.31rem]">{translatedMenuItems[7]}</div>
                                    <div className=" md:w-[6.3rem]">{translatedMenuItems[8]}</div>
                                    <div className=" md:w-[7rem]">{translatedMenuItems[9]}</div>
                                    <div className=" md:w-[6rem]">{translatedMenuItems[10]}</div>
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
                                        style={{scrollbarWidth: "thin"}}
                                        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                                    >
                                          {props.phoneListById.length === 0 ? <NodataFoundPageAccount /> :props.phoneListById.map((item, index) => { 
                                            return (
                                                <div>
                                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] " >
                                                        <div class="flex">
                                                            <div className=" flex   items-center   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.company}
                                                                </div>
                                                            </div>

                                                            <div className=" flex    items-center   md:w-[4.51rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.model}
                                                                </div>

                                                            </div>
                                                            <div className=" flex   items-center    md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.imei}
                                                                </div>
                                                            </div>
                                                            <div className=" flex    items-center   md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.os} {item.gb} {item.color}
                                                                </div>
                                                            </div>
                                                            {/* <div className=" flex     md:w-[4.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.gb}
                                                                </div>
                                                            </div>
                                                            <div className=" flex     md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.color}
                                                                </div>
                                                            </div> */}
                                                            <div className=" flex    items-center   md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.condition}
                                                                </div>
                                                            </div>
                                                            <div className=" flex    items-center   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.expectedPrice}
                                                                </div>
                                                            </div>
                                                            <div className=" flex    items-center   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.totalhours}
                                                                </div>
                                                            </div>
                                                            <div className=" flex    items-center   md:w-[6.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.totalExtraCost}
                                                                </div>
                                                            </div>
                                                            <div className=" flex    items-center   md:w-[8.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.totalPrice}
                                                                </div>
                                                            </div>
                                                            <div className=" flex   items-center    md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
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
                                                                            className="!text-icon"

                                                                        />
                                                                        <StatusIcon
                                                                            type="In Progress"
                                                                            iconType="fa-hourglass-half"
                                                                            tooltip="In Progress"
                                                                            id={item.phoneId}
                                                                            indStatus={item.qcStatus}
                                                                            phoneId={RowData.phoneId}
                                                                            status={active}
                                                                            className="!text-icon"
                                                                        />
                                                                        <StatusIcon
                                                                            type="Complete"
                                                                            iconType="fa-hourglass"
                                                                            tooltip="Complete"
                                                                            status={active}
                                                                            id={item.phoneId}
                                                                            indStatus={item.qcStatus}
                                                                            phoneId={RowData.phoneId}
                                                                             className="!text-icon"
                                                                        />
                                                                    </ButtonGroup>
                                                                </div>
                                                            </div>
                                                            <div className=" flex   items-center   md:w-[8.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    {item.issue}
                                                                </div>
                                                            </div>
                                                            <div class="flex items-center">
                                                            <div className=" flex   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.spare"
                                                                        defaultMessage="Spare"
                                                                    />}>
                                                                        <PrecisionManufacturingIcon
                                                                            style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}
                                                                            className="!text-icon cursor-pointer"
                                                                            onClick={() => {
                                                                                handleSetRowData(item);
                                                                                hanldeSpare();
                                                                            }}
                                                                        />

                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                            <div className=" flex    md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.task"
                                                                        defaultMessage="Task"
                                                                    />}>
                                                                        <FormatListBulletedIcon
                                                                            className="!text-icon cursor-pointer"
                                                                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
                                                                            onClick={() => {
                                                                                handleSetRowData(item);
                                                                                handleExpand(item.phoneId);
                                                                            }}
                                                                        />
                                                                    </Tooltip>

                                                                </div>
                                                            </div>
                                                            <div className=" flex   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs text-green-600   font-poppins">
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.Notes"
                                                                        defaultMessage="Notes"
                                                                    />}>
                                                                        <NoteAltIcon
                                                                            className="!text-icon cursor-pointer"
                                                                            onClick={() => {
                                                                                handleSetRowData(item);
                                                                                props.handlePhoneNotesOrderModal(true);
                                                                            }}
                                                                        />
                                                                    </Tooltip>

                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className=" flex  items-center  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                                <div class=" text-xs  font-poppins">
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.Print"
                                                                        defaultMessage="Print"
                                                                        
                                                                    />}>
                                                                         {/* <div class="ml-1"><QrCodeIcon/></div> */}
                                                                        {/* <PrintOutlined
                                                                            // onClick={handlePrint}
                                                                            className="!text-base cursor-pointer"
                                                                        /> */}
                                                                        <ReactToPrint
                                                                            trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>Print <QrCodeIcon className=" !text-icon"/></Button>}
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
                        <div class="flex justify-end mr-4">
                            <div class=" w-10">
                            <Button
                                type="primary"
                                onClick={handlePrint}>
                                Print</Button>
                        </div>
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



