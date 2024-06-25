import React, { useEffect, lazy, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import { Button,Input,Tooltip } from "antd"
import {
    searchimeiNamePhone,
    ClearPhoneDataOfrefurbish,
    getDispatchUpdateList
} from "./RefurbishAction";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { AudioOutlined } from '@ant-design/icons';
import ReceivedSpareList from "./ProductionTab/ReceivedSpareList";
import { BundleLoader } from "../../../Components/Placeholder";
import PhoneListOrderTaskTable from "./PhoneListOrderTaskTable";
import QrCodeIcon from '@mui/icons-material/QrCode';
const QRCodeModal = lazy(() => import("../../../Components/UI/Elements/QRCodeModal"));

function InspectedPhoneByOrder(props) {

    const componentRefs = useRef([]);
    useEffect(() => {
        props.getDispatchUpdateList(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

    const handlePrint = () => {
        window.print();
    };
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
              props.searchimeiNamePhone(transcript);
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
                    <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
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
                        <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                            <div className=" md:w-[7.12rem]">Brand</div>
                            <div className=" md:w-[7.1rem]"><FormattedMessage
                                id="app.model"
                                defaultMessage="model"
                            /></div>
                            <div className=" md:w-[6.8rem] "><FormattedMessage
                                id="app.imei"
                                defaultMessage="imei"
                            /></div>
                            <div className="md:w-[8.6rem]">Issue </div>

                            <div className="md:w-[4.7rem]">Info</div>
                            <div className="md:w-[5.9rem]"><FormattedMessage
                                id="app.conditions"
                                defaultMessage="conditions"
                            /></div>
                            <div className="md:w-[7rem]">Technician</div>
                            <div className="md:w-[6rem]">QC</div>
                            <div className="md:w-[4rem]">Repair</div>
                            {/* <div className="md:w-[5rem]">Qa</div> */}
                            <div className="md:w-[7.2rem]"></div>
                        </div>
                        <div class="overflow-y-auto h-[72vh]">
                            {props.updateDispatchList.map((item, index) => {
                                return (
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                            <div class="flex">
                                                <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                                    {item.company}
                                                </div>

                                                <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                                    <div class=" text-sm  font-poppins">

                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">



                                                    <div class=" text-sm  font-poppins">

                                                        Issue
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  md:w-[10.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">

                                                    {item.os} {item.gb} {item.color}


                                                </div>
                                            </div>


                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.conditions}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.repairTechnicianName && <MultiAvatar
                                                        primaryTitle={item.repairTechnicianName}
                                                        imgWidth={"2.1rem"}
                                                        imgHeight={"2.1rem"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[5.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.qcStatus}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[5.26rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.repairStatus}
                                                </div>
                                            </div>
                                            {/* <div className=" flex font-medium  md:w-[5.25rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                
                                                </div>
                                            </div> */}
                                           
                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.cannotRepairInd ? "Can't Repair" : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    <Button
                                                        type="primary"
                                                        style={{ color: show && item.phoneId === data.phoneId ? "black" : "white" }}
                                                        onClick={() => {
                                                            handleShow()
                                                            handleParticularRow(item)
                                                        }}
                                                    >
                                                        Receive Spare
                                                    </Button>
                                                </div>
                                            </div>


                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    <ReactToPrint
                                                        trigger={() => <Button
                                                            onClick={handlePrint}
                                                        >
                                                            Print<QrCodeIcon/></Button>
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
                                                            }}
                                                        >
                                                            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Company: {item.company}</div>
                                                            <div style={{ marginBottom: "10px" }}>Model: {item.model}</div>
                                                            <div style={{ marginBottom: "10px" }}>IMEI: {item.imei}</div>
                                                            <div style={{ marginBottom: "10px" }}>
                                                                <QRCode value={item.imei} size={128} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                                    <Tooltip title={<FormattedMessage
                                                                        id="app.task"
                                                                        defaultMessage="Task"
                                                                    />}>
                                                                        <FormatListBulletedIcon
                                                                            className="!text-base cursor-pointer"
                                                                            style={{ color: expand && item.phoneId === data.phoneId ? "red" : "black" }}
                                                                            onClick={() => {
                                                                                handlePhoneListOrderTask();
                                                                                handleParticularRow(item);
                                                                                handleExpand(item.phoneId);
                                                                            }}
                                                                        />
                                                                    </Tooltip>

                                                                </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>}
            {show && <ReceivedSpareList data={data} />}
            {showTask &&(
<PhoneListOrderTaskTable data={data}/>
                )}
        </>
    )
}

const mapStateToProps = ({ inventory }) => ({
    updateDispatchList: inventory.updateDispatchList,
    fetchingUpdateDispatchList: inventory.fetchingUpdateDispatchList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchUpdateList,
            searchimeiNamePhone,
    ClearPhoneDataOfrefurbish
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);

