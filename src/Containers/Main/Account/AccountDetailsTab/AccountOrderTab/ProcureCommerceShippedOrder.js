import React, { useEffect, useState, lazy, useRef, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, Select } from "antd";
import dayjs from "dayjs";
import {
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  handleStatuShowDrawer,
  searchCustomerOrderNoData,
  ClearReducerData,
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
const { Option } = Select;
const { Search } = Input;

function ProcureCommerceShippedOrder(props) {
  const [page, setPage] = useState(0);
  const [openInvoiceModal, setopenInvoiceModal] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [date, setDate] = useState("");

  const fetchShippedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${base_url2}/phoneOrder/all-procure-dispatch/${props.orgId}/${page}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      );
      if (response.data.length === 0) {
        setHasMore(false);
      }
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    props.getProcureRecords(props.distributorId, "procure");
    fetchShippedData();
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);}
  const handleInfiniteScroll = () => {
    setPage((prevPageNo) => prevPageNo + 1);};
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
      fetchShippedData(props.orgId, page);
      props.ClearReducerData();
      setSearchOnEnter(false);
      setData([]);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchCustomerOrderNoData(currentData);
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
      props.searchCustomerOrderNoData(transcript);
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

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((item) =>
      item.orderId === key ? { ...item, [dataIndex]: value } : item
    );
    setData(updatedData);
  };

  const handleDateChange = (e, item) => {
    const selectedDate = new Date(e.target.value);
    const deliveryDate = new Date(item.deliveryDate);
    setDate(e.target.value);
  };

  const handleEditClick = (orderId) => {
    setEditsuppliesId(orderId);
  };
  const handleCancelClick = (orderId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [orderId]: undefined }));
    setEditsuppliesId(null);
  };

  const handlePostChange = async (item) => {
    let updatedItem = {
      packingDate: new Date(date).toISOString(),
      orderId: item.orderId,
    };
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`, 
      };
      const response = await axios.put(
        `${base_url2}/phoneOrder/procureDispatch/${item.orderId}`,
        updatedItem,
        { headers }
      );
      console.log("API Response:", response.data);
      setData((prevData) =>
        prevData.map((cat) =>
          cat.orderId === item.orderId ? response.data : cat
        )
      );
      setEditsuppliesId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      setEditsuppliesId(null);
    }
  };
  return (
    <>
      <div class=" flex justify-between">
        <div class="w-48 mb-3">
          <div>
            <div>
              <Input
                placeholder="Search by Name "
                width={"100%"}
                suffix={suffix}
                onPressEnter={handleSearch}
                onChange={handleChange}
                value={currentData}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-[92%%] p-1 bg-transparent font-bold sticky text-xs font-poppins  z-10">
          <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[#e100ff]">
            {props.translatedMenuItems[38]} {/* Shipped */}
          </div>
          <div className=" md:w-[5.4rem] ml-2">
            {props.translatedMenuItems[19]} ID{/* Order ID"/> */}
          </div>
          <div className=" md:w-[2rem]">{props.translatedMenuItems[26]}</div>
          <div className=" md:w-[4.1rem]">
            {props.translatedMenuItems[20]} {/* Delivery"/> */}
          </div>
          <div className=" md:w-[11.8rem] ">
            {props.translatedMenuItems[21]} {/*Location"/> */}
          </div>
          <div className=" md:w-[4.1rem]">
            {props.translatedMenuItems[34]} {/*  Items */}
          </div>
          <div className="md:w-[1.8rem]">
            {props.translatedMenuItems[9]} {/* Contact"/> */}
          </div>
          <div className="md:w-[1.8rem]">
            {props.translatedMenuItems[23]}
            {/* Payment"/> */}
          </div>
          <div className="md:w-[1.8rem]">
            {props.translatedMenuItems[24]} {/* Status"/> */}
          </div>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={handleInfiniteScroll}
          hasMore={hasMore}
          loader={
            loading ? (
              <div style={{ textAlign: "center" }}>Loading...</div>
            ) : null
          }
          height={"33vh"}
          style={{ scrollbarWidth: "thin" }}
        >
          {data.length ? (
            <>
              {data.map((item) => {
                const currentDate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                return (
                  <div>
                    <div className="flex rounded  mt-1 bg-white h-8 items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                      <div class="flex">
                        <div className=" flex  w-wk items-center   max-sm:w-full">
                          <div className="flex items-center max-sm:w-full">
                            <div className=" flex  items-center  md:w-[7.56rem] max-sm:w-full  ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                  <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">
                                    {item.priority === "High" && (
                                      <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                    )}

                                    {item.priority === "Low" && (
                                      <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>
                                    )}
                                  </div>
                                </div>
                              </Tooltip>
                            </div>

                            <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                              <Tooltip>
                                <div class="max-sm:w-full  justify-between flex md:flex flex-row text-xs">
                                  <span
                                    class="underline font-bold cursor-pointer text-[#1890ff]"
                                    onClick={() => {
                                      props.handleProcureDetailsModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  >
                                    {item.newOrderNo}
                                  </span>
                                  <span>
                                    {" "}
                                    {currentDate ===
                                    dayjs(item.creationDate).format(
                                      "DD/MM/YYYY"
                                    ) ? (
                                      <span className="text-[0.65rem] text-[tomato] font-bold">
                                        {/* New */}
                                      </span>
                                    ) : null}{" "}
                                  </span>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          <div className=" flex ml-2 md:w-[4.31rem] text-xs  max-sm:flex-row w-full max-sm:justify-between ">
                            {date}
                          </div>
                        </div>

                        <div class="flex flex-row text-xs items-center md:w-[11rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div class="max-sm:w-full justify-between flex md:text-xs">
                            {` ${dayjs(item.deliveryDate).format(
                              "DD/MM/YYYY"
                            )}`}
                          </div>
                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex   md:w-[18.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" font-poppins text-xs">
                            {`${
                              (item.loadingAddress &&
                                item.loadingAddress.length &&
                                item.loadingAddress[0].city) ||
                              ""
                            }, ${
                              (item.loadingAddress &&
                                item.loadingAddress.length &&
                                item.loadingAddress[0].country) ||
                              ""
                            }
                               
                              `}
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs">
                          <MultiAvatar
                            primaryTitle={item.contactPersonName}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        </div>
                      </div>
                      <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs">
                          {item.paymentInTerms}
                        </div>
                      </div>
                      <div class="flex flex-row items-center md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs">{item.status}</div>
                      </div>
                      <div className=" flex  w-[7.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                          {editsuppliesId === item.orderId ? (
                            <input
                              type="date"
                              value={dayjs(item.packingDate).format(
                                "YYYY-MM-DD"
                              )}
                              onChange={(e) => handleDateChange(e, item)}
                              class="border border-black rounded"
                            />
                          ) : (
                            <div className="font-normal text-sm  font-poppins">
                              {item.packingDate === null ? (
                                ""
                              ) : (
                                <div>
                                  {dayjs(item.packingDate).format("YYYY/MM/DD")}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="flex flex-row items-center md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between">
                        <Button
                          type="primary"
                          onClick={() => {
                            setopenInvoiceModal(true);
                            handleSetParticularOrderData(item);
                          }}
                        >
                          {props.translatedMenuItems[10]}
                        </Button>
                      </div>
                      <div
                        style={{
                          filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))",
                        }}
                        class="rounded-full bg-white md:w-5 h-5 cursor-pointer"
                      >
                        <Tooltip title={props.translatedMenuItems[24]}>
                          <EventRepeatIcon
                            className="!text-base cursor-pointer"
                            onClick={() => {
                              props.handleStatuShowDrawer(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex w-20  md:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          {editsuppliesId === item.orderId ? (
                            <>
                              <Button
                                type="primary"
                                onClick={() => handlePostChange(item)}
                              >
                                Save
                              </Button>
                              <Button
                                type="primary"
                                onClick={() => handleCancelClick(item.orderId)}
                                className="ml-[0.5rem]"
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="primary"
                                onClick={() => handleEditClick(item.orderId)}
                              >
                                Pack
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : !data.length && !props.fetchingDistributorOfHigh ? (
            <NodataFoundPage />
          ) : null}
        </InfiniteScroll>
      </div>
    </>
  );
}

const mapStateToProps = ({ distributor, auth }) => ({
  addProcureDetailsModal: distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal: distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData: distributor.procureRecordData,
  highDistributorOrder: distributor.highDistributorOrder,
  fetchingDistributorOfHigh: distributor.fetchingDistributorOfHigh,
  mediumDistributorOrder: distributor.mediumDistributorOrder,
  fetchingDistributorOfMedium: distributor.fetchingDistributorOfMedium,
  lowDistributorOrder: distributor.lowDistributorOrder,
  fetchingDistributorOfLow: distributor.fetchingDistributorOfLow,
  showStatusDrwr: distributor.showStatusDrwr,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      handleStatuShowDrawer,
      ClearReducerData,
      searchCustomerOrderNoData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcureCommerceShippedOrder);
