import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPhonelistById,
  handlePhoneNotesOrderModal,
  searchimeiNamePhone,
  ClearPhoneDataOfrefurbish,
} from "../../AccountAction";
import { Button, Tooltip, Input } from "antd";
import QRCode from "qrcode.react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { BundleLoader } from "../../../../../Components/Placeholder";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToPrint from "react-to-print";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import NodataFoundPageAccount from "./NodataFoundPageAccount";
const PhoneNotesOrderModal = lazy(() => import("./PhoneNotesOrderModal"));
const AccountPhoneTaskTable = lazy(() => import("./AccountPhoneTaskTable"));
const AddingSpareList = lazy(() => import("./AddingSpareList"));
const QRCodeModal = lazy(() => import("../../../../../Components/UI/Elements/QRCodeModal"));
function DistributorPauseForm(props) {
  const [dimensions, setDimensions] = React.useState({
    width: 500,
    height: 500,
  });

  const componentRefs = useRef([]);
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getPhonelistById(props.particularRowData.orderId, page);
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
  }, [transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {
      setPage(0);
      props.getPhonelistById(props.particularRowData.orderId, 0);
      props.ClearPhoneDataOfrefurbish();
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchimeiNamePhone(currentData, props.particularRowData.orderId);
      setSearchOnEnter(true);
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
        color: "#1890ff",
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
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minRecordingTime) {
        SpeechRecognition.startListening();
      } else {
        setIsRecording(false);
      }
    }
  }, [listening, isRecording, startTime]);

  const handleLoadMore = () => {
    const callPageMapd =
      props.phoneListById &&
      props.phoneListById.length &&
      props.phoneListById[0].pageCount;
    setTimeout(() => {
      const { getPhonelistById } = props;
      if (props.phoneListById) {
        if (page < callPageMapd) {
          setPage(page + 1);
          getPhonelistById(props.particularRowData.orderId, page);
        }
        if (page === callPageMapd) {
          setHasMore(false);
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
    setspares(false);
    setphoneId(phoneId);
  }
  function hanldeSpare(phoneId) {
    setspares(!spares);
    setExpand(false);
    setphoneId(phoneId);
  }

  function StatusIcon({
    type,
    size,
    indStatus,
    iconType,
    tooltip,
    status,
    id,
    onClick,
    phoneId,
  }) {
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
        <>
          <div className=" flex  sticky flex-col z-auto">
            <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
              <div class="w-72 ml-4 mb-2 mt-2 items- max-sm:w-28">
                <Input
                  placeholder="Search by Imei"
                  width={"100%"}
                  suffix={suffix}
                  onPressEnter={handleSearch}
                  onChange={handleChange}
                  value={currentData}
                />
              </div>
              <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky  z-10">
                <div className="w-[4.9rem] text-sm text-[#00A2E8] truncate max-md:w-[4.2rem]">
                  <BrandingWatermarkIcon className="!text-icon" />{" "}
                  {props.translatedMenuItems[69]}
                </div>
                <div className=" md:w-[6.5rem]">
                  <ModelTrainingIcon className=" !text-icon" />{" "}
                  {props.translatedMenuItems[70]}
                </div>
                <div className="w-[9.4rem] truncate max-md:w-[11.2rem]">
                  <LightbulbIcon className="!text-base  text-[#e4eb2f]" />
                  {props.translatedMenuItems[71]}
                </div>
                <div className="w-[8.1rem] truncate max-md:w-[9.2rem]">
                  {props.translatedMenuItems[72]}
                </div>
                <div className="w-[4.5rem] truncate max-md:w-[7.5rem]">
                  {props.translatedMenuItems[73]}
                </div>
                <div className="w-[7.7rem] truncate max-md:w-[5.8rem]">
                  {props.translatedMenuItems[41]}
                </div>
                <div className="w-[6.5rem] truncate max-md:w-[6.5rem]">
                  {props.translatedMenuItems[74]}
                </div>
                <div className="w-[6.31rem] truncate max-md:w-[5.31rem]">
                  <CurrencyExchangeIcon className="!text-icon  mr-1   text-[#84a59d]" />{" "}
                  {props.translatedMenuItems[75]}
                </div>
                <div className="w-[9.3rem] truncate max-md:w-[6.3rem]">
                  <CurrencyExchangeIcon className="!text-icon  mr-1   text-[#84a59d]" />{" "}
                  {props.translatedMenuItems[76]}
                </div>
                <div className="w-[6rem] truncate max-md:w-[4rem]">QC</div>
                <div className="w-[7rem] truncate max-md:w-[6rem]">
                  {props.translatedMenuItems[77]}
                </div>
                <div className="w-[7rem] truncate max-md:w-[2rem]"></div>
              </div>
              <div>
                <InfiniteScroll
                  dataLength={props.phoneListById.length}
                  next={handleLoadMore}
                  hasMore={hasMore}
                  loader={
                    props.fetchingPhoneListById ? (
                      <div style={{ textAlign: "center" }}>
                        <BundleLoader />
                      </div>
                    ) : null
                  }
                  height={"79vh"}
                  style={{ scrollbarWidth: "thin" }}
                  endMessage={
                    <p class="flex text-center font-bold text-xs text-red-500">
                      {props.translatedMenuItems[78]}.{" "}
                    </p>
                  }
                >
                  {props.phoneListById.length === 0 ? (
                    <NodataFoundPageAccount />
                  ) : (
                    props.phoneListById.map((item, index) => {
                      return (
                        <div>
                          <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                            <div class="flex">
                              <div className=" flex   border-l-2 border-green-500 bg-[#eef2f9]  items-center   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs ml-gap font-poppins">
                                  {item.company}
                                </div>
                              </div>

                              <div className=" flex     items-center justify-start h-8 ml-gap bg-[#eef2f9]  md:w-[6.51rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs   ml-gap font-poppins">
                                  {item.model}
                                </div>
                              </div>
                              <div className=" flex    items-center justify-start h-8 ml-gap bg-[#eef2f9] h-8 ml-gap bg-[#eef2f9]   md:w-[9.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap font-poppins">
                                  {item.imei}
                                </div>
                              </div>
                              <div className=" flex      items-center justify-center h-8 ml-gap bg-[#eef2f9] h-8 ml-gap bg-[#eef2f9]   md:w-[7.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap  font-poppins">
                                  {item.os} {item.gb} {item.color}
                                </div>
                              </div>
                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]   md:w-[4.60rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap font-poppins">
                                  {item.condition}
                                </div>
                              </div>
                              <div className=" flex      items-center justify-center h-8 ml-gap bg-[#eef2f9]   md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap  font-poppins">
                                  {item.expectedPrice}
                                </div>
                              </div>
                              <div className=" flex     items-center justify-center h-8 ml-gap bg-[#eef2f9]   md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs   ml-gap font-poppins">
                                  {item.totalhours}
                                </div>
                              </div>
                              <div className=" flex     items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[6.50rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs   ml-gap font-poppins">
                                  {item.totalExtraCost}
                                </div>
                              </div>
                              <div className=" flex      items-center justify-center h-8 ml-gap bg-[#eef2f9]   md:w-[8.8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap font-poppins">
                                  {item.totalPrice}
                                </div>
                              </div>
                              <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9]    md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  ml-gap font-poppins">
                                  <ButtonGroup className="w-[4rem]">
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
                              <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9]   md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  {item.issue}
                                </div>
                              </div>
                              <div class="flex   items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                <div className=" flex   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                  <div class=" text-xs  font-poppins">
                                    <Tooltip
                                      title={props.translatedMenuItems[79]}
                                    >
                                      <PrecisionManufacturingIcon
                                        style={{
                                          color:
                                            spares &&
                                            item.phoneId === RowData.phoneId
                                              ? "red"
                                              : "black",
                                        }}
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
                                    <Tooltip
                                      title={props.translatedMenuItems[80]}
                                    >
                                      <FormatListBulletedIcon
                                        className="!text-icon cursor-pointer"
                                        style={{
                                          color:
                                            expand &&
                                            item.phoneId === RowData.phoneId
                                              ? "red"
                                              : "black",
                                        }}
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
                                    <Tooltip
                                      title={props.translatedMenuItems[5]}
                                    >
                                      <NoteAltIcon
                                        className="!text-icon cursor-pointer"
                                        onClick={() => {
                                          handleSetRowData(item);
                                          props.handlePhoneNotesOrderModal(
                                            true
                                          );
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                              <div className=" flex  items-center  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div class=" text-xs  font-poppins">
                                  <Tooltip
                                    title={props.translatedMenuItems[81]}
                                  >
                                    <ReactToPrint
                                      trigger={() => (
                                        <Button
                                          style={{
                                            cursor: "pointer",
                                            width: "-webkit-fill-available",
                                          }}
                                          onClick={handlePrint}
                                        >
                                          Print{" "}
                                          <QrCodeIcon className=" !text-icon" />
                                        </Button>
                                      )}
                                      content={() =>
                                        componentRefs.current[index]
                                      }
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
                                height: "-webkit-fill-available",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{ fontSize: "5rem", marginTop: "2rem" }}
                              >
                                <QRCode size={150} value={item.phoneId} />
                              </div>
                              <div style={{ fontSize: "1.5rem" }}>
                                <span style={{ fontWeight: "bold" }}>
                                  IMEI:
                                </span>{" "}
                                {item.imei}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </InfiniteScroll>
                <div class="flex justify-end mr-4 mb-2">
                  <div class=" w-10">
                    <Button type="primary" onClick={handlePrint}>
                      {props.translatedMenuItems[81]}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <Suspense fallback={<BundleLoader />}>
        {expand && (
          <AccountPhoneTaskTable phoneId={phoneId} RowData={RowData} />
        )}
        <PhoneNotesOrderModal
          RowData={RowData}
          phoNotesOrderModal={props.phoNotesOrderModal}
          handlePhoneNotesOrderModal={props.handlePhoneNotesOrderModal}
        />
        {spares && <AddingSpareList phoneId={phoneId} RowData={RowData} />}
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ distributor }) => ({
  phoneListById: distributor.phoneListById,
  phoNotesOrderModal: distributor.phoNotesOrderModal,
  fetchingPhoneListById: distributor.fetchingPhoneListById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhonelistById,
      handlePhoneNotesOrderModal,
      searchimeiNamePhone,
      ClearPhoneDataOfrefurbish,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorPauseForm);
