import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getPhoneOrderIdByUser,
    handleQCPhoneNotesOrderModal,
    getOrderByUser,
    updateCantRepairQC,
    updateQCStatus,
    searchimeiName,
    ClearReducerDataOfrefurbish
} from "./RefurbishAction";
import { AudioOutlined } from '@ant-design/icons';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip, Progress,Input } from "antd";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import dayjs from "dayjs";
import QRCode from "qrcode.react";
import { NoteAddOutlined } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { BundleLoader } from "../../../Components/Placeholder";
const AddingQCSpareList = lazy(() => import('./AddingQCSpareList'));
const QCPhoneNotesOrderModal = lazy(() => import('./QCPhoneNotesOrderModal'));
const DistributorPhoneTaskTable = lazy(() => import('./DistributorPhoneTaskTable'));

function OrderPhoneListById(props) {
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 

    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId,pageNo)
    }, [props.rowData.orderPhoneId, props.userId])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      useEffect(() => {
        // props.getCustomerRecords();
        if (transcript) {
          console.log(">>>>>>>", transcript);
          setCurrentData(transcript);
        }
        }, [ transcript]);
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        const callPageMapd = props.orderPhoneList && props.orderPhoneList.length &&props.orderPhoneList[0].pageCount
        setTimeout(() => {
          const {
            getPhoneOrderIdByUser,
           // userDetails: { employeeId },
          } = props;
          if  (props.orderPhoneList)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const handleChange = (e) => {
        setCurrentData(e.target.value);
    
        if (searchOnEnter&&e.target.value.trim() === "") {
            setPageNo(pageNo + 1);
            props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId,pageNo)
            props.ClearReducerDataOfrefurbish()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchimeiName(currentData);
          setSearchOnEnter(true);  //Code for Search
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };

    const handleCallback = () => {
        if (!props.updatingCantRepairQc) {
            props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId,pageNo)
        }

    }
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
                    <i class={iconType} style={{ fontSize: "22px" }}></i>
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
            orderPhoneId: props.rowData.orderPhoneId,
            phoneId: item.phoneId,
            qcTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateQCStatus(data, item.phoneId, props.userId)
        if (type === "Complete") {
            setBackComplete(false)
        }
    }

    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    console.log(props.rowData.qcInspectionInd)
    const suffix = (
        <AudioOutlined
          onClick={SpeechRecognition.startListening}
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
    
        />
      );
    return (
        <>
            {/* {props.fetchingOrderIdByUserId ? <BundleLoader /> : */}
             <div className=' flex justify-end sticky flex-col z-auto'>


             

                <div class="rounded-lg m-5  max-sm:m-1 p-2 w-full shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                <div class="flex items-center">
                <div class=" w-72 ml-4 max-sm:w-28">
          <Input
            placeholder="Search by Imei"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
        
          />
        </div>
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
                    <div className=" flex max-sm:hidden  w-[98.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[5.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.oem"
                            defaultMessage="OEM"
                        /></div>
                        <div className=" w-[8.012rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" w-[8.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className="w-[5.001rem]">Issue</div>
                        <div className="w-[2.3rem]"></div>
                        <div className="w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            Estimate (hours)
                        </div>
                        <div className="w-[4.510rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.start"
                            defaultMessage="Start"
                        /></div>
                        <div className="w-[5.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.end"
                            defaultMessage="End"
                        /></div>

                        <div className="w-[6.02rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">TAT</div>
                        <div className="w-[5.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        </div>

                        <div className="w-[6.02rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> <FormattedMessage
                            id="app.status"
                            defaultMessage="Status"
                        /></div>

                        <div className="w-[4.012rem]">Spare</div>
                        <div className="w-[6.523rem]">Task</div>
                        <div className="w-[2rem]"></div>
                    </div>
                    <div class=" ">

                        <InfiniteScroll
                            dataLength={props.orderPhoneList.length}
                             next={handleLoadMore}
                             hasMore={hasMore}
                            loader={props.fetchingOrderIdByUserId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"65vh"}
                            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
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
                                                <div className=" flex font-medium  w-[5.21rem] max-xl:w-[4.21rem] max-lg:w-[3.1rem] max-sm:w-auto max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                                    {item.company}
                                                </div>

                                                <div className=" flex font-medium   w-[6.35rem] max-xl:w-[2.5rem] max-lg:w-[2.5rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  w-[8.82rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[4.13rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                {/* <div className=" flex font-medium w-[2rem] max-xl:w-[4rem] max-lg:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                                </div> */}
                                                <div className=" flex font-medium  w-[3.32rem] max-xl:w-[3.32rem] max-lg:w-[3.32rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" >
                                                        <div>
                                                            {props.rowData.qcInspectionInd === 1 ?
                                                                <ButtonGroup>
                                                                    {item.qcStatus === "To Start" && <StatusIcon
                                                                        type="In Progress"
                                                                        iconType="fa fa-hourglass-half"
                                                                        tooltip="In Progress"
                                                                        id={item.phoneId}
                                                                        indStatus={item.qcStatus}
                                                                        phoneId={RowData.phoneId}
                                                                        status={active}
                                                                        onClick={() => {
                                                                            handleQCStatus("In Progress", item)

                                                                        }}
                                                                    />}
                                                                    {item.qcStatus === "In Progress" && <StatusIcon
                                                                        type="Complete"
                                                                        iconType="fa fa-hourglass"
                                                                        tooltip="Complete"
                                                                        indStatus={item.qcStatus}
                                                                        status={active}
                                                                        id={item.phoneId}
                                                                        phoneId={RowData.phoneId}
                                                                        onClick={() => {
                                                                            handleQCStatus("Complete", item);
                                                                        }}
                                                                    />}
                                                                </ButtonGroup>
                                                                : null}

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[4.2rem] max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.totalhours}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  w-[4.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcStartTime === null ? "" : dayjs(item.qcStartTime).format('HH:mm:ss')}

                                                    </div>
                                                </div>

                                                <div className=" flex font-medium  w-[4.81rem] max-xl:w-[5.11rem] max-lg:w-[3.51rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <>{item.qcEndTime === null ? "" : dayjs(item.qcEndTime).format('HH:mm:ss')}</>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium w-[4rem] max-xl:w-[6rem] max-lg:w-[3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.estimateQcTimeHours || "0"}H:{item.estimateQcTimeMinutes || "0"}M:{item.estimateQcTimeSeconds || "0"}S

                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[7.08rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.qcStatus === "In Progress" &&
                                                        <>
                                                            {!item.cannotRepairInd ?
                                                                <Button
                                                                    loading={RowData.phoneId === item.phoneId && props.updatingCantRepairQc}
                                                                    onClick={() => {
                                                                        handleSetRowData(item);
                                                                        props.updateCantRepairQC({
                                                                            cannotRepairInd: true,
                                                                            orderPhoneId: props.rowData.orderPhoneId
                                                                        }, item.phoneId)
                                                                    }}
                                                                >
                                                                    Can't Repair
                                                                </Button> :
                                                                <Button
                                                                    loading={RowData.phoneId === item.phoneId && props.updatingCantRepairQc}
                                                                    onClick={() => {
                                                                        handleSetRowData(item);
                                                                        props.updateCantRepairQC({
                                                                            cannotRepairInd: false,
                                                                            orderPhoneId: props.rowData.orderPhoneId
                                                                        }, item.phoneId)
                                                                    }}
                                                                >
                                                                    Change Status
                                                                </Button>
                                                                //   <Tooltip title="Can't Repair">
                                                                //   <MotionPhotosOffIcon className=" !text-base cursor-pointer text-[tomato]" />
                                                                // </Tooltip>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className=" flex font-medium   md:w-[1.64rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.cannotRepairInd && "Can't Repair"}
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium w-[4.51rem] max-xl:w-[5.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center mr-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title="Spare">
                                                            <Button
                                                                type="primary"
                                                                style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    hanldeSpare();
                                                                }}>
                                                                {/* <CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} /> */}
                                                                Spares </Button>

                                                        </Tooltip>
                                                        {/* {isValidPercentage ? (
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
                                                        ) : null} */}


                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[3.51rem] max-xl:w-[5.01rem] max-lg:w-[4.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                                <div className=" flex font-medium  w-[1rem] max-xl:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title="Notes">
                                                        <NoteAltIcon className="!text-xl mr-1 cursor-pointer text-[green]" 

                                                              
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    props.handleQCPhoneNotesOrderModal(true);
                                                                }}
                                                            />

                                                        </Tooltip>

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium ml-1  w-[4.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
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
            </div>
            {/* } */}
        </>
    )



}

const mapStateToProps = ({ refurbish, auth, inventory }) => ({
    orderPhoneList: refurbish.orderPhoneList,
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    updatingCantRepairQc: refurbish.updatingCantRepairQc,
    fetchingOrderIdByUserId: refurbish.fetchingOrderIdByUserId,
    phoNotesQCOrderModal: refurbish.phoNotesQCOrderModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneOrderIdByUser,
            updateQCStatus,
            handleQCPhoneNotesOrderModal,
            getOrderByUser,
            updateCantRepairQC,
            searchimeiName,
            ClearReducerDataOfrefurbish
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneListById);

