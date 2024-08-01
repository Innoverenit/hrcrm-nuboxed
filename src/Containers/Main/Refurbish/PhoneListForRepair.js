

import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getRepairPhoneByUser,
    updaterepairStatus,
    getCatalogueByUser,
    handleRepairPhoneNotesOrderModal,
    handleProcessExpand,
    handlePhoneDetails, 
    handleInTagDrawer,
    updatePauseStatus,
    searchimeiNamerapir,
    ClearReducerDataOfrepair,
    handleSpareProcess
} from "./RefurbishAction";
import { Button, Tooltip,  Progress,Input } from "antd";
import {  RollbackOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {  PauseCircleFilled,  PlayCircleFilledSharp } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import AddSpareInRepair from "./AddSpareInRepair";
import { AudioOutlined } from '@ant-design/icons';
import ReactToPrint from "react-to-print";
import PhoneDetailsModal from "./ProductionTab/PhoneDetailsModal";
import { BundleLoader } from "../../../Components/Placeholder";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { FormattedMessage } from "react-intl";
import QrCodeIcon from '@mui/icons-material/QrCode';
import ProcessExpandDrawer from "./ProcessExpandDrawer";
import ProcessSpareDrawer from "./ProcessSpareDrawer";
const RepairPhoneNotesOrderModal = lazy(() => import('./RepairPhoneNotesOrderModal'));
const RepairTaskList = lazy(() => import('./RepairTaskList'));


function PhoneListForRepair(props) {
    const [page, setPage] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const componentRefs = useRef([]);
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); //Code for Search
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };
    useEffect(() => {
        setPage(page + 1);
        props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
    }, [])

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
    // const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPage(page + 1);
    //     props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
    // };

    const handleChange = (e) => {
        setCurrentData(e.target.value);
    
        if (searchOnEnter&&e.target.value.trim() === "") {
            setPage(page + 1);
            props.getRepairPhoneByUser(props.rowData.orderPhoneId, props.userId);
            props.ClearReducerDataOfrepair()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchimeiNamerapir(currentData,props.rowData.orderPhoneId);
          setSearchOnEnter(true);  //Code for Search
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };
      const handleStartListening = () => {
        setStartTime(Date.now());
        setIsRecording(true);
        SpeechRecognition.startListening();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          setIsRecording(false);
        }, minRecordingTime);
      };
      const suffix = (
        <AudioOutlined
          onClick={handleStartListening}
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
    
        />
      );
      const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setIsRecording(false);
        if (transcript.trim() !== "") {
          setCurrentData(transcript);
          props.searchimeiNamerapir(transcript,props.rowData.orderPhoneId);
          setSearchOnEnter(true);
        }
      };
      useEffect(() => {
        if (!listening && isRecording) {
          handleStopListening();
        }
      }, [listening]);
      useEffect(() => {
        if (isRecording && !listening) {
          // If recording was stopped but less than 5 seconds have passed, restart listening
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < minRecordingTime) {
            SpeechRecognition.startListening();
          } else {
            setIsRecording(false);
          }
        }
      }, [listening, isRecording, startTime]);

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
                    <i className={`fas ${iconType}`} style={{ fontSize: "1rem",color:"orange" }}></i>
                </Button>
            </Tooltip>
        );
    }

    function StatusIcon1({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
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
                    <i className={`fas ${iconType}`} style={{ fontSize: "1rem",color:"green" }}></i>
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
        props.updaterepairStatus(data,props.rowData.orderPhoneId, item.phoneId, props.userId)
        if (type === "Complete") {
            setBackComplete(false)
        }
    }
    return (
        <>
            {props.fetchingRepairPhoneByUser ? <BundleLoader /> : 
            <div className=' flex  sticky z-auto overflow-x-auto '>
             <div class=" rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div class="flex items-center">
                <div class=" w-72 ml-1 max-sm:w-28">
          <Input
            placeholder="Search by Imei"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
        
          />
        </div>
        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                    <div className=" flex  w-[99%] max-sm:hidden p-1 bg-transparent font-bold sticky z-10">
                        <div className=" w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Brand</div>
                        <div className=" w-[7.31rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.model"
                            defaultMessage="model"
                        /></div>
                        <div className=" w-[10.04rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage
                            id="app.iMEI"
                            defaultMessage="IMEI"
                        /></div>
                        <div className="w-[4.01rem]">Issue</div>
                        <div className="w-[8.31rem]"></div>
                        <div className="w-[8.58rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            Estimate (hours)
                        </div>
                        <div className="w-[6.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.start"
                            defaultMessage="Start"
                        /></div>
                        <div className="w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.end"
                            defaultMessage="End"
                        /></div>

                        <div className="w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.tat"
                            defaultMessage="TAT"
                        /></div>

                        <div className="w-[10.81rem]">Spare</div>
                        <div className="w-[10.43rem]">Task</div>
                        <div className="w-[2.03rem]"></div>
                        <div className="w-[2rem]"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.repairPhone.length}

                        loader={props.fetchingRepairPhoneByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"72vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {props.repairPhone.map((item, index) => {
                            
                             const percentage = isNaN(Math.floor((item.checkedSpare / item.totalSpare) * 100)) ? 0 : Math.floor((item.checkedSpare / item.totalSpare) * 100)
                             const acivedPercentage = isNaN(Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)) ? 0 : Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)
                             const getGradientStrokeColor = (percent) => {
                                if (percent === 0) return '#d3d3d3'; // Grey for 0%
                                if (percent === 100) return '#00FF00'; // Green for 100%
                                return {
                                  '0%': '#d3d3d3', // Grey at start
                                  [`${percent}%`]: '#0000FF', // Blue at current percentage
                                  '100%': '#00FF00', // Green at end
                                };
                              };
                             const isacivedPercentage = !isNaN(acivedPercentage) && isFinite(acivedPercentage);
                             const isValidPercentage = !isNaN(percentage) && isFinite(percentage);
                            let x = item.repairStatus === "In Progress"
                            let y = item.pauseInd
                            console.log(x)
                            console.log(y)
                            const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                            return (
                                <div>
                                    <div className="flex rounded  w-full   bg-white h-8 items-center p-1 max-sm:h-[8rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "

                                    >
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex  w-[5.99rem] max-sm:w-auto max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs  ">
                                                {item.company}
                                            </div>

                                            <div className=" flex   w-[5.07rem] max-sm:flex-row  max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.model}
                                                </div>

                                            </div>
                                            <div className=" flex  w-[8.08rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.imei}
                                                </div>
                                            </div>
                                            <div className=" flex  w-[7.98rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                {/* <span title={item.issue}>{item.issue.substring(0, 10)}{item.issue.length > 20 && '...'}</span> */}
                                                <div class="truncate max-w-[100px] " title={item.issue}>{item.issue}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            {/* <div className=" flex w-[3.06rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                                            </div> */}

                                            <div className=" flex  w-[5.3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                {props.rowData.repairInspectionInd !== 0 &&
                                                <div class=" text-xs  flex w-[3.5rem] font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                                                    {props.updatingRepairStatus && <span>Loading...</span>}
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

                                                    {item.repairStatus === "In Progress" && item.pauseInd === false && <StatusIcon1
                                                        type="Complete"
                                                        iconType="fa-hourglass"
                                                        tooltip="Complete"
                                                        indStatus={item.repairStatus}
                                                        status={active}
                                                        id={item.phoneId}
                                                        phoneId={RowData.phoneId}
                                                        disabled={ item.totalTaskCount !== item.totalCompleteTaskCount }
                                                        onClick={() => {
                                                            handleQCRepairStatus("Complete", item);
                                                        }}
                                                    />}
                                                    {item.repairStatus === "Complete" &&
                                                        <RollbackOutlined />}
                                                    {/* </ButtonGroup> */}

                                                </div>
                                               }
                                            </div>
                                            <div className=" flex  w-[5.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.totalhours}

                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex  w-[5.4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.repairStartTime === null ? "" : dayjs(item.repairStartTime).format('HH:mm:ss')}

                                                </div>
                                            </div>

                                            <div className=" flex  w-[5.27rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <>{item.repairEndTime === null ? "" : dayjs(item.repairEndTime).format('HH:mm:ss')}</>

                                                </div>
                                            </div>
                                            <div className=" flex w-[5.812rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.totalTimeTakenInHours}H:{Math.floor(item.totalTimeTakenInMinutes)}M

                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        {props.rowData.repairInspectionInd !== 0 &&
                                            <div className=" flex w-[8.79rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center mr-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                                                  
                                                     <Tooltip title="Spare">
                                                              <Progress 
                                                               percent={percentage}
                                                               success={{percentage}}
                                                               format={() => `${percentage}%`} 
                                                                style={{width:"8rem",cursor:"pointer"}} 
                                                               onClick={() => {
                                                                    handleSetRowData(item);
                                                                   // hanldeSpare();
                                                                   props.handleSpareProcess(true);
                                                                }} />
                                                                                                   
                                                    </Tooltip>
                                                
                                                </div>
                                            </div>
                        }
                         {props.rowData.repairInspectionInd !== 0 &&
                                            <div className=" flex  w-[9.019rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                                                     {/* <Tooltip title="Task">
                                                     <Progress
                                                     type="circle"
                                                      style={{ cursor: "pointer",color:"red" }}
                                                       percent={acivedPercentage}

                                                      width={30}
                                                        strokeColor={"#005075"}
                                                        onClick={() => {
                                                            handleSetRowData(item);
                                                            //handleExpand(item.phoneId);
                                                            props.handleProcessExpand(true);
                                                        }}
                                                          />                                                       
                                                    </Tooltip> */}
                                                  
                                                  <Tooltip title="Task">
                                                     <Progress
                                                    percent={acivedPercentage}
                                                    success={{acivedPercentage}}
                                                   // strokeColor={getGradientStrokeColor(acivedPercentage)}
                                                    format={() => `${acivedPercentage}%`} 
                                                     style={{width:"8rem",cursor:"pointer"}} 
                                                        onClick={() => {
                                                            handleSetRowData(item);
                                                            //handleExpand(item.phoneId);
                                                            props.handleProcessExpand(true);
                                                        }}
                                                          />                                                       
                                                    </Tooltip>
               
                                                </div>
                                            </div>
                        }
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex  w-[1.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title="Notes">
                                                    <NoteAltIcon className="!text-icon mr-1 cursor-pointer text-[green]" 
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                props.handleRepairPhoneNotesOrderModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>

                                                </div>
                                            </div>

                                            <div className=" flex ml-1   w-[4.023rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title={<FormattedMessage
                                                        id="app.Print"
                                                        defaultMessage="Print"
                                                    />}>

                                                        <ReactToPrint
                                                           trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>Print <QrCodeIcon className="!text-icon"/></Button>}
                                                            content={() => componentRefs.current[index]}
                                                        />
                                                    </Tooltip>

                                                </div>
                                            </div>

                                            {/* <div className=" flex    max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title={<FormattedMessage
                                                        id="app.scan"
                                                        defaultMessage="scan"
                                                    />}>

                                                        <Button
                                                            onClick={() => {
                                                                props.handleInTagDrawer(true)
                                                                handleSetRowData(item)
                                                            }}
                                                            class=" bg-green-600 cursor-pointer text-gray-50"
                                                        >
                                                            Scan </Button>

                                                    </Tooltip>

                                                </div>
                                            </div> */}
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
                
                <ProcessExpandDrawer
                   phoneId={phoneId}
                   RowData={RowData}
                    processExpandModal={props.processExpandModal}
                    handleProcessExpand={props.handleProcessExpand}
                />

<ProcessSpareDrawer
                  phoneId={phoneId}
                  RowData={RowData}
                  rowData={props.rowData}
                  //orderPhoneId={props.rowData.orderPhoneId}
                  processSpareModal={props.processSpareModal}
                    handleSpareProcess={props.handleSpareProcess}
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
    updatingRepairStatus:refurbish.updatingRepairStatus,
    processExpandModal:refurbish.processExpandModal,
    processSpareModal: refurbish.processSpareModal
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
            updatePauseStatus,
            searchimeiNamerapir,
            ClearReducerDataOfrepair,
            handleProcessExpand,
            handleSpareProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListForRepair);
