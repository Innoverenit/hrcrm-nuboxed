import React, { useEffect, lazy, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDispatchUpdateList } from "../Inventory/InventoryAction"
import { SubTitle } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import { Button,Input } from "antd"
import {
    searchimeiName,
    ClearReducerDataOfrefurbish
} from "./RefurbishAction";
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import { AudioOutlined } from '@ant-design/icons';
import ReceivedSpareList from "./ProductionTab/ReceivedSpareList";
import { BundleLoader } from "../../../Components/Placeholder";
const QRCodeModal = lazy(() => import("../../../Components/UI/Elements/QRCodeModal"));

function InspectedPhoneByOrder(props) {

    const componentRefs = useRef([]);
    useEffect(() => {
        props.getDispatchUpdateList(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

    const handlePrint = () => {
        window.print();
    };

    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const handleShow = () => {
        setShow(!show)
    }
    const handleParticularRow = (item) => {
        setData(item)
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
            {props.fetchingUpdateDispatchList ?
                <BundleLoader />
                : <div className='flex justify-end sticky ticky top-0 z-10 '>
                    <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
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
                        <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[7.12rem]"><FormattedMessage
                                id="app.oem"
                                defaultMessage="OEM"
                            /></div>
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
                            <div className="md:w-[7.2rem]"></div>
                        </div>
                        <div class="overflow-y-auto h-[70vh]">
                            {props.updateDispatchList.map((item, index) => {
                                return (
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                            <div class="flex">
                                                <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                                    {item.company}
                                                </div>

                                                <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                                    <div class=" text-sm text-cardBody font-poppins">

                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">



                                                    <div class=" text-sm text-cardBody font-poppins">

                                                        Issue
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  md:w-[10.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">

                                                    {item.os} {item.gb} {item.color}


                                                </div>
                                            </div>


                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.conditions}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    <SubTitle>
                                                        {item.qrCodeId ? (
                                                            <QRCodeModal
                                                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                                imgHeight={"2.8rem"}
                                                                imgWidth={"2.8rem"}
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
                                            <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.cannotRepairInd ? "Can't Repair" : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
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
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    <ReactToPrint
                                                        trigger={() => <Button
                                                            onClick={handlePrint}
                                                        >
                                                            Print</Button>
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


                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>}
            {show && <ReceivedSpareList data={data} />}
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
            searchimeiName,
    ClearReducerDataOfrefurbish
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);

