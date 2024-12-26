import React, { useState, useEffect, lazy, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import UpdateIcon from '@mui/icons-material/Update';
import {
    getPhoneOrderIdByUser,
    handleQCPhoneNotesOrderModal,
    handleSpareList,
    getOrderByUser,
    updateCantRepairQC,
    updateQCStatus,
    searchimeiName,
    ClearReducerDataOfrefurbish,
    handleQcexpand,
    handleRefurbishLevelModal
} from "./RefurbishAction";

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MicIcon from '@mui/icons-material/Mic';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip, Progress,Input,Badge } from "antd";
import dayjs from "dayjs";
import QRCode from "qrcode.react";import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QCSpareListModal from "./QCSpareListModal";
import QCExpandListModal from "./QCExpandListModal";
import RefurbishLevelModal from "./RefurbishLevelModal"
import Barcode from 'react-barcode';
import { BundleLoader } from "../../../Components/Placeholder";
const AddingQCSpareList = lazy(() => import('./AddingQCSpareList'));
const QCPhoneNotesOrderModal = lazy(() => import('./QCPhoneNotesOrderModal'));
const DistributorPhoneTaskTable = lazy(() => import('./DistributorPhoneTaskTable'));
const ButtonGroup = Button.Group;
function OrderPhoneListById(props) {
    const [pageNo, setPageNo] = useState(0);
    const [currentLevel, setCurrentLevel] = useState("");
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
    const componentRefs = useRef([]);

    const componentBarRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };


    const handlePrintBr=()=>{
        window.print();
    }
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "1318", // Search by device ID",//0
              "1320",  //"scan",//1
           "264", //   Brand 2
           "265", //   "model"3
           "1222", //   Issue4
           "1321", //   Estimate (hours) 5 
           "158", //  "Start"6
           "111", //     "End"7
           "199", //     Task8
            "1322",// "Resume"9
           "316", // "Notes"10
           "1252", // "Print"11
          
           "144"  ,// In Progress12
            "268",//Complete13
           "1308" ,// Spare14
                "142",//  "Status"15
              "1330",  // Can't Repair 16
           "1250", //   Change Status17
       "661" //    Reapir18

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
        function handleSetCurrentlevel(level) {
            setCurrentLevel(level);
            // console.log("opp",item);
          }
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
            //setPageNo(pageNo + 1);
            setPageNo(0);
            props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId,0)
            props.ClearReducerDataOfrefurbish()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchimeiName(currentData,props.rowData.orderPhoneId);
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
        <MicIcon
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
          props.searchimeiName(transcript,props.rowData.orderPhoneId);
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
    
    return (
        <>
            {/* {props.fetchingOrderIdByUserId ? <BundleLoader /> : */}
             <div className=' flex  sticky z-auto'>
                <div class="rounded m-1  max-sm:m-1 p-1 w-full shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div class="flex items-center">
                <div class=" w-72 ml-1 max-sm:w-28">
          <Input
            placeholder= {translatedMenuItems[1]}
            // "Search by Imei"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
             value={currentData}
        
          />
        </div>
        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title= {translatedMenuItems[1]}>
                                                   
                                                        <Button
                                                            // onClick={() => {
                                                            //     props.handleInTagDrawer(true)
                                                            //     handleSetRowData(item)
                                                            // }}
                                                            class=" bg-green-600 cursor-pointer text-gray-50"
                                                        > {translatedMenuItems[1]}
                                                            {/* Scan  */}
                                                            </Button>

                                                    </Tooltip>

                                                </div>
                                                </div>
                    <div className=" flex max-sm:hidden  w-[90%] font-poppins text-xs  justify-between p-1 items-end bg-transparent font-bold sticky z-10">
                   
                        <div className="text-[#00A2E8] text-base w-[4.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        <BrandingWatermarkIcon className="!text-icon" /> {translatedMenuItems[2]} {/* Brand */}
                            </div>
                        <div className=" w-[6.012rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        <ModelTrainingIcon className=" !text-icon" />  {translatedMenuItems[3]}  {/* model"*/}
                        </div>
                        <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                        IMEI {/* iMEI" */}
                        </div>
                        <div className="w-[10.001rem]">
                        {translatedMenuItems[4]}    {/* Issue */}
                        </div>
                        <div className="w-[6.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {translatedMenuItems[5]}  {/* Estimate (hours) */}
                        </div>
                        <div className="w-[3.510rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {translatedMenuItems[6]}   {/* "Start" /> */}
                        </div>
                        <div className="w-[4.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {translatedMenuItems[7]}   {/* End" /> */}
                        </div>

                        <div className="w-[6.02rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">TAT</div>

                        <div className="w-[5.02rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        <UpdateIcon className='!text-icon text-[#ff66b3]' /> {translatedMenuItems[15]}    {/* Status"/> */}
                        </div>

                        <div className="w-[5.212rem]">
                        {translatedMenuItems[14]}  {/* Spare */}
                            </div>
                        <div className="w-[13.523rem]">
                        <FactCheckIcon className='!text-base  text-[#e4eb2f]'/> {translatedMenuItems[8]}  {/* Task */}
                            </div>
                        
                    </div>
                    <div class=" ">

                        <InfiniteScroll
                            dataLength={props.orderPhoneList.length}
                             next={handleLoadMore}
                             hasMore={hasMore}
                            loader={props.fetchingOrderIdByUserId ? <div><BundleLoader/></div> : null}
                            height={"82vh"}
                            style={{ scrollbarWidth:"thin"}}
                            endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                        >
                            {props.orderPhoneList.map((item, index) => {
                                const percentage = Math.floor((item.checkedSpare / item.totalSpare) * 100)
                                const acivedPercentage = isNaN(Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)) ? 0 : Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)


                                //  const acivedPercentage = Math.floor((item.totalCompleteTaskCount / item.totalTaskCount) * 100)
                                const isValidPercentage = !isNaN(percentage) && isFinite(percentage);
                                const isAcivedPercentage = !isNaN(acivedPercentage) && isFinite(acivedPercentage);
                                const time = dayjs(item.qcEndTime).add(5, 'hours').add(30, 'minutes');
                                const getGradientStrokeColor = (percent) => {
                                    if (percent === 0) return '#d3d3d3'; // Grey for 0%
                                    if (percent === 100) return '#00FF00'; // Green for 100%
                                    return {
                                      '0%': '#d3d3d3', // Grey at start
                                      [`${percent}%`]: '#0000FF', // Blue at current percentage
                                      '100%': '#00FF00', // Green at end
                                    };
                                  };
                                const endtimme = time.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Using ISO 8601 format
                                console.log(acivedPercentage)
                                return (
                                    <div>
                                        <div className="flex rounded justify-between  mt-1 bg-white  items-center py-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-24 max-sm:flex-col max-sm:justify-between  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] h-8 w-[3.60rem] max-xl:w-[4.21rem] max-lg:w-[3.1rem] max-sm:w-auto max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs ">
                                                <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.company}
                                                    </div>
                                                </div>

                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8  w-[3.35rem] max-xl:w-[2.5rem] max-lg:w-[2.5rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.model}
                                                    </div>

                                                </div>
                                             
                                                </div>
                                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                    
                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8  w-[7.2rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8 w-[7.03rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs ml-gap truncate max-w-[100px]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" title={item.issue}>
                                                    {item.issue}
                                                    </div>
                                                </div>

                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[4.53rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.levelCount&&item.levelCount.map((level)=>{
                                                            return(
                                                                <span 
                                                                style={{marginLeft:"9px",cursor:"pointer"}}
                                                                onClick={() => {
                                                                   props.handleRefurbishLevelModal(true);
                                                                   handleSetCurrentlevel(level);
                                                                 }}
                                                               title={level.level}
                                                               >
                                                                <Badge size="small" count={level.levelCount}>
                                                                    <div class="text-base">
                                                                {level.level}
                                                                </div>
                                                                </Badge>
                                                                   {/* {level.levelCount} */}
                                                                   {/* {item.issue.substring(0, 10)}{item.issue.length > 20 && '...'} */}
                                                               </span>
                                                            )
                                                        })}

                                                    </div>
                                                </div>
                                            
                                           
                                                
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[2.32rem] max-xl:w-[3.32rem] max-lg:w-[3.32rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs" >
                                                        <div>
                                                        {props.updatingQCStatus && <span>Loading...</span>}
                                                            {props.rowData.qcInspectionInd === 1 ?
                                                                <ButtonGroup>
                                                                    {item.qcStatus === "To Start" && <HourglassEmptyIcon
                                                                        type= "In Progress"
                                                                        iconType="fa fa-hourglass-half"
                                                                        tooltip= {translatedMenuItems[12]}
                                                                        id={item.phoneId}
                                                                        indStatus={item.qcStatus}
                                                                        phoneId={RowData.phoneId}
                                                                        status={active}
                                                                        onClick={() => {
                                                                            handleQCStatus("In Progress", item)

                                                                        }}
                                                                    />}
                                                                    {item.qcStatus === "In Progress" && <HourglassTopIcon
                                                                        type= "Complete"
                                                                        iconType="fa fa-hourglass"
                                                                        tooltip= {translatedMenuItems[13]}
                                                                        indStatus={item.qcStatus}
                                                                        status={active}
                                                                        id={item.phoneId}
                                                                        phoneId={RowData.phoneId}
                                                                        onClick={() => {
                                                                            handleQCStatus("Complete", item);
                                                                        }}
                                                                    />}
                                                                     {item.qcStatus === "Complete" && <HourglassBottomIcon
                                                                        type= "Complete"
                                                                        iconType="fa fa-hourglass"
                                                                        tooltip= {translatedMenuItems[13]}
                                                                        indStatus={item.qcStatus}
                                                                        status={active}
                                                                        id={item.phoneId}
                                                                        phoneId={RowData.phoneId}
                                                                        // onClick={() => {
                                                                        //     handleQCStatus("Complete", item);
                                                                        // }}
                                                                    />}
                                                                </ButtonGroup>
                                                                : <HourglassBottomIcon/>}

                                                        </div>

                                                    </div>
                                                </div>
                                                
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[4.2rem] max-xl:w-[3.52rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.totalhours}

                                                    </div>
                                                </div>
                                           
                                           
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  w-[4.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.qcStartTime === null ? "" : dayjs(item.qcStartTime).format('HH:mm:ss')}

                                                    </div>
                                                </div>

                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[3.81rem] max-xl:w-[5.11rem] max-lg:w-[3.51rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <>{item.qcEndTime === null ? "" : dayjs(item.qcEndTime).format('HH:mm:ss')}</>

                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[3.82rem] max-xl:w-[6rem] max-lg:w-[3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.estimateQcTimeHours || "0"}H:{item.estimateQcTimeMinutes || "0"}M:{item.estimateQcTimeSeconds || "0"}S

                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[4.08rem] md:w-[4.08rem] max-sm:flex-row  max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
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
                                                                    {translatedMenuItems[16]} {/* Can't Repair */}
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
                                                                 Reparable  {/* Change Status */}
                                                                </Button>
                                                                //   <Tooltip title="Can't Repair">
                                                                //   <MotionPhotosOffIcon className=" !text-base cursor-pointer text-[tomato]" />
                                                                // </Tooltip>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] w-[5.64rem] h-8  md:w-[4.64rem] max-sm:flex-row  max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins">
                                                    {item.cannotRepairInd ? translatedMenuItems[18]:translatedMenuItems[20]}
                                                </div>
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[4.51rem] max-xl:w-[5.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center mr-2 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={translatedMenuItems[15]}>
                                                            <Button
                                                                type="primary"
                                                                style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    //hanldeSpare();
                                                                    props.handleSpareList(true);
                                                                }}>
                                                                {/* <CategoryIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} /> */}
                                                                {/* Spares  */}
                                                                {translatedMenuItems[14]} </Button>

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
                                                <div className=" flex  w-[9.51rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-xl:w-[5.01rem] max-lg:w-[4.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {/* <Tooltip title="Task">
                                                        <Button
                                                            type="primary"
                                                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "white" }}
                                                            onClick={() => {
                                                                handleSetRowData(item);
                                                                handleExpand(item.phoneId);
                                                            }}
                                                        ><TaskIcon style={{ color: "white", height: "0.75rem", fontSize: "0.75rem" }} />Tasks</Button>

                                                    </Tooltip> */}
                                                        {/* <Tooltip title="Task">
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
                                                        </Tooltip> */}
                                                           {/* {isAcivedPercentage ? ( */}
                                                            <Tooltip title={translatedMenuItems[8]}>
                                                            <DataSaverOnIcon className="!text-icon"/>
                                                                <Progress
                                                                   percent={acivedPercentage}
                                                                    success={{acivedPercentage}}
                                                                    format={() => `${acivedPercentage}%`}
                                                                   // strokeColor={getGradientStrokeColor(acivedPercentage)}
                                                                    style={{ width: "8rem", cursor: "pointer" }}
                                                                    onClick={() => {
                                                                        handleSetRowData(item);
                                                                       // handleExpand(item.phoneId);
                                                                       props.handleQcexpand(true);
                                                                    }}/>

                                                            </Tooltip>
                                                       {/* ) : null}   */}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[1rem] max-xl:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={translatedMenuItems[10]}>
                                                        <NoteAltIcon className="!text-icon mr-1 cursor-pointer text-[green]" 

                                                              
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    props.handleQCPhoneNotesOrderModal(true);
                                                                }}
                                                            />

                                                        </Tooltip>

                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 w-[7.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {props.user.repairCode === "qrcode" &&
                                                        <Tooltip title={translatedMenuItems[11]}
                                                     
                                                        >
                                                           
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>
                                                                {translatedMenuItems[11]} QR{/* Print  */}
                                                                <QrCodeIcon className="!text-icon"/></Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>
                                                        }
                                                    </div>
                                                </div>


                                            </div>
                                            <div style={{ display: "none", textAlign: "center" }}>

                                                <div className=" flex flex-col mt-5 text-sm items-center"
                                                    ref={(el) => (componentRefs.current[index] = el)}>
                                                   
                                                    <div   className=" text-5xl mt-8">
                                                        <QRCode size={150} value={item.phoneId} />
                                                    </div>
                                                    <div className="text-2xl font-bold">IMEI:{item.imei}</div>
                                                </div>
                                            </div>

                                            <div className=" flex  items-center justify-center ml-gap bg-[#eef2f9] h-8   w-[7.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {props.user.repairCode === "barcode" &&
                                                        <Tooltip title={translatedMenuItems[11]}
                                                       
                                                        >
                                                           
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} 
                                                              onClick={handlePrintBr}>
                                                            
                                                                Print Bar
                                                                <QrCodeScannerIcon className="!text-icon"/></Button>}
                                                                content={() => componentBarRefs.current[index]}
                                                            />
                                                        </Tooltip>
                            }
                                                    </div>
                                                    <div style={{ display: "none", textAlign: "center" }}>

                                                <div className=" flex flex-col mt-5 text-sm items-center"
                                                    ref={(el) => (componentBarRefs.current[index] = el)}>
                                                   
                                                    <div   className=" text-5xl mt-8">
                                                    <Barcode value={item.phoneId} displayValue={false}/>
                                                       
                                                    </div>
                                                    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>IMEI:</span> {item.imei}</div>
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
                <div class="flex justify-end">
                    {props.rowData.qcInspectionInd === 1 ? <Button
                        type="primary"
                        onClick={handlePuaseButton}>{hide ? translatedMenuItems[9]: translatedMenuItems[12]}
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
                <QCSpareListModal
                  phoneId={phoneId}
                    RowData={RowData}
                    qcSpareList={props.qcSpareList}
                    handleSpareList={props.handleSpareList}
                />
                <QCExpandListModal
                  phoneId={phoneId}
                    RowData={RowData}
                    qcExpandList={props.qcExpandList}
                    handleQcexpand={props.handleQcexpand}
                />
                 <RefurbishLevelModal
                 addRefurbishLevelModal={props.addRefurbishLevelModal}
                //   phoneId={phoneId}
                //     RowData={RowData}
                currentLevel={currentLevel}
                handleRefurbishLevelModal={props.handleRefurbishLevelModal}
                    
                />
            </div>
            {/* } */}
        </>
    )



}

const mapStateToProps = ({ refurbish, auth, inventory }) => ({
    orderPhoneList: refurbish.orderPhoneList,
    locationId: auth.userDetails.locationId,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    updatingCantRepairQc: refurbish.updatingCantRepairQc,
    fetchingOrderIdByUserId: refurbish.fetchingOrderIdByUserId,
    phoNotesQCOrderModal: refurbish.phoNotesQCOrderModal,
    updatingQCStatus:refurbish.updatingQCStatus,
    qcSpareList:refurbish.qcSpareList,
    qcExpandList: refurbish.qcExpandList,
    addRefurbishLevelModal:refurbish.addRefurbishLevelModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneOrderIdByUser,
            updateQCStatus,
            handleQCPhoneNotesOrderModal,
            getOrderByUser,
            updateCantRepairQC,
            handleRefurbishLevelModal,
            searchimeiName,
            ClearReducerDataOfrefurbish,
            handleSpareList,
            handleQcexpand
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneListById);

