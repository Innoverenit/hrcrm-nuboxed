import React, { useEffect, lazy, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { MultiAvatar } from "../../../Components/UI/Elements";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import Barcode from 'react-barcode';
import { Button,Input,Tooltip,Progress } from "antd"
import InfoIcon from '@mui/icons-material/Info';
import {
    searchimeiNamePhone,
    ClearPhoneDataOfrefurbish,
    getDispatchUpdateList,
    handleAllTaskModal,
    handleRepairPhoneNotesOrderModal
} from "./RefurbishAction";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import ContactsIcon from '@mui/icons-material/Contacts';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MicIcon from '@mui/icons-material/Mic';
import ReceivedSpareList from "./ProductionTab/ReceivedSpareList";
import { BundleLoader } from "../../../Components/Placeholder";
import PhoneListOrderTaskTable from "./PhoneListOrderTaskTable";
import QrCodeIcon from '@mui/icons-material/QrCode';
import NodataFoundPageRefubish from "./NodataFoundPageRefubish";
import ProcessTaskAllDrawer from "./ProcessTaskAllDrawer";
import RepairPhoneNotesOrderModal from "./RepairPhoneNotesOrderModal";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RuleIcon from '@mui/icons-material/Rule';


const QRCodeModal = lazy(() => import("../../../Components/UI/Elements/QRCodeModal"));

function InspectedPhoneByOrder(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentBarRefs = useRef([]);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "264", //  Brand,//0
              "265",  // "model",//1
              "316" ,// Notes  2           
              "76", // "Assigned ",//3
              "1222" , // Issue //4
              "113",    //Info5
              "1217" , // "conditions",//6
              "1281",      //Technician7
              "1252",// Print8
               "661",    //Repair 9
                "119" ,//    Task10
               "1282", // Receive Spare11
                
                "277",// Company12
               
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

    const componentRefs = useRef([]);
    useEffect(() => {
        props.getDispatchUpdateList(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

    const handlePrint = () => {
        window.print();
    };
    const handlePrintBr=()=>{
        window.print();
    }
    const [showTask, setshowTask] = React.useState(false);
    const [expand, setExpand] = useState(false);
    const [phoneId, setphoneId] = useState("");
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const [RowData, setRowData] = useState({});
  function handleSetRowData(item) {
      setRowData(item);
  }
    const handleShow = () => {
        setShow(!show)
    }
    const handleParticularRow = (item) => {
        setData(item)
    }

    function handleExpand(phoneId) {
        setExpand(!expand);
        setphoneId(phoneId);
    }
    function handlePhoneListOrderTask(){
        setshowTask(!showTask)
    }

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
        const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {
                //setPageNo(pageNo + 1);
                props.getDispatchUpdateList(props.rowData.orderPhoneId)
                props.ClearPhoneDataOfrefurbish()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              // Perform the search
              props.searchimeiNamePhone(currentData,props.rowData.orderPhoneId);
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
              props.searchimeiNamePhone(transcript,props.rowData.orderPhoneId);
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
    return (
        <>
            {props.fetchingUpdateDispatchList ?
                <BundleLoader />
                : <div className='flex sticky ticky  z-10 '>
                    <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
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
                        <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end max-sm:hidden z-10">
                            <div className="text-[#00A2E8] text-sm w-[6.6rem] max-md:w-[7.12rem] ">
                            <BrandingWatermarkIcon className=" text-[#3F37C9] !text-icon" /> {translatedMenuItems[0]} {/* Brand */}
                                </div>
                            <div className=" max-md:w-[7.1rem] w-[7.1rem]">
                            <ModelTrainingIcon className=" !text-icon text-[#92dce5]" /> {translatedMenuItems[1]}  
                             {/*model" */}
                            </div>
                            <div className=" max-md:w-[5.8rem] w-[5.8rem]">
                            IMEI
                                {/* imei"*/}
                            </div>
                            <div className="max-md:w-[7.6rem] w-[7.6rem]">
                            <ConfirmationNumberIcon className=" !text-icon text-[#84a59d]" />       {translatedMenuItems[4]} {/* Issue  */}
                                </div>

                            <div className="max-md:w-[6.7rem] w-[6.7rem]">
                               <InfoIcon className='!text-icon  text-[#d64933]' />  {translatedMenuItems[5]} {/* Info */}
                                </div>
                            <div className="max-md:w-[3.9rem]">
                            {translatedMenuItems[6]}  {/* conditions" */}
                            </div>
                            <div className="max-md:w-[6rem] w-[6rem]">
                            <ContactsIcon className='!text-icon  text-[#52a13d]' />   {translatedMenuItems[7]}  {/* Technician */}
                                </div> 
                            <div className="max-md:w-[4rem] w-[4rem]">
                             < RuleIcon className=" !text-icon text-[#B23A48]" />   QC  
                                </div>
                            <div className="max-md:w-[16rem] w-[16rem]">
                            {translatedMenuItems[9]}  {/* Repair */}
                                </div>
                            {/* <div className="md:w-[5rem]">Qa</div> */}
                            <div className="max-md:w-[11.2rem] w-[11.2rem]">
                            <FactCheckIcon className='!text-base  text-[#a1a622]'/>  {translatedMenuItems[10]}  {/* Task */}
                                </div>
                        </div>
                        <div class="overflow-y-auto h-[82vh]"  style={{ scrollbarWidth:"thin"}}>
                            {props.updateDispatchList.length === 0 ? <NodataFoundPageRefubish /> :props.updateDispatchList.map((item, index) => {
                                const acivedPercentage = isNaN(Math.floor((item.totalExtraCost / item.totalPrice) * 100)) ? 0 : Math.floor((item.totalExtraCost / item.totalPrice) * 100)
                                return (
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white  items-center py-ygap-1  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                            <div class="flex">
                                                <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] md:w-[4.6rem] max-sm:w-full  ">
                                                <div class=" text-xs ml-gap font-poppins">  {item.company}
                                                    </div>
                                                </div>

                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8  md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs ml-gap font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                              <div class=" text-xs ml-gap font-poppins">

                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8 md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs ml-gap font-poppins">

                                                        {item.issue}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" flex items-center justify-start ml-gap bg-[#eef2f9] h-8 md:w-[10.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.os} {item.gb} {item.color}
                                                </div>
                                            </div>


                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[5.04rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.conditions}
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.repairTechnicianName && <MultiAvatar
                                                        primaryTitle={item.repairTechnicianName}
                                                        imgWidth={"1.8rem"}
                                                        imgHeight={"1.8rem"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[5.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.qcStatus}
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[5.26rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.repairStatus}
                                                </div>
                                            </div>
                                            {/* <div className=" flex  md:w-[5.25rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                
                                                </div>
                                            </div> */}
                                           
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.cannotRepairInd ? "Can't Repair" : null}
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    <Button
                                                    className="w-[8rem]"
                                                        type="primary"
                                                        style={{ color: show && item.phoneId === data.phoneId ? "black" : "white" }}
                                                        onClick={() => {
                                                            handleShow()
                                                            handleParticularRow(item)
                                                        }}
                                                    >
                                                      {translatedMenuItems[11]}  {/* Receive Spare */}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div class='w-[7.011rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 '>
                                                                    <Tooltip title={translatedMenuItems[4]}>                                                              
                                                                        <Progress className="w-[6.5rem] cursor-pointer"
                                                                   percent={acivedPercentage}
                                                                    success={{acivedPercentage}}
                                                                    format={() => `${acivedPercentage}%`}                     
                                                                    onClick={() => {
                                                                        handlePhoneListOrderTask();
                                                                     handleParticularRow(item);
                                                                     props.handleAllTaskModal(true);
                                                                    //  handleExpand(item.phoneId);
                                                                    }}/>
                                                                    </Tooltip>

                                                                </div>
                                                             

                                            <div className=" flex items-center justify-around ml-gap bg-[#eef2f9] h-8  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    <ReactToPrint
                                                        trigger={() => <Button
                                                            onClick={handlePrint}
                                                        >
                                                             {translatedMenuItems[8]}  {/* Print */}
                                                            <QrCodeIcon className="!text-icon"/></Button>
                                                        }
                                                        content={() => componentRefs.current[index]
                                                        }
                                                    />
                                                    <div style={{ display: "none", textAlign: "center" }}>

                                                        <div
                                                            ref={(el) => (componentRefs.current[index] = el)}
                                                            style={{
                                                                fontSize: "16px",
                                                                marginBottom: "20px",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                  height:"-webkit-fill-available",
                                                    justifyContent:"center"
                                                            }}
                                                        >
                                                            <div style={{ marginBottom: "10px", fontWeight: "bold" }}> {translatedMenuItems[12]}: {item.company}</div>
                                                            <div style={{ marginBottom: "10px" }}> {translatedMenuItems[1]}: {item.model}</div>
                                                            <div style={{ marginBottom: "10px" }}> {translatedMenuItems[2]}: {item.imei}</div>
                                                            <div style={{ marginBottom: "10px" }}>
                                                                <QRCode value={item.phoneId} className="!text-icon" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  w-[7.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={translatedMenuItems[11]}
                                                       
                                                        >
                                                           
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} 
                                                              onClick={handlePrintBr}>
                                                            
                                                                Print Br
                                                                <QrCodeScannerIcon className="!text-icon"/></Button>}
                                                                content={() => componentBarRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                    <div style={{ display: "none", textAlign: "center" }}>

                                                <div className=" flex flex-col mt-5 text-sm items-center"
                                                    ref={(el) => (componentBarRefs.current[index] = el)}>
                                                   
                                                    <div   className=" text-5xl mt-8">
                                                    <Barcode value={item.phoneId } displayValue={false}/>
                                                       
                                                    </div>
                                                    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>IMEI:</span> {item.imei}</div>
                                                </div>
                                            </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  w-[1.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title= {translatedMenuItems[2]}>
                                                    <NoteAltIcon className="!text-icon mr-1 cursor-pointer text-[green]" 
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
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>}
            {show && <ReceivedSpareList data={data}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage} />}
            {showTask &&(
<PhoneListOrderTaskTable data={data}
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}/>
                )}

<ProcessTaskAllDrawer
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
                   data={data}
                   allTaskModal={props.allTaskModal}
                  handleAllTaskModal={props.handleAllTaskModal}
                />
                 <RepairPhoneNotesOrderModal
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                    RowData={RowData}
                    phoNotesRepairOrderModal={props.phoNotesRepairOrderModal}
                    handleRepairPhoneNotesOrderModal={props.handleRepairPhoneNotesOrderModal}
                />
        </>
    )
}

const mapStateToProps = ({ inventory,refurbish }) => ({
    updateDispatchList: refurbish.updateDispatchList,
    allTaskModal:refurbish.allTaskModal,
    phoNotesRepairOrderModal: refurbish.phoNotesRepairOrderModal,
    fetchingUpdateDispatchList: refurbish.fetchingUpdateDispatchList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchUpdateList,
            searchimeiNamePhone,
    ClearPhoneDataOfrefurbish,
    handleAllTaskModal,
    handleRepairPhoneNotesOrderModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);

