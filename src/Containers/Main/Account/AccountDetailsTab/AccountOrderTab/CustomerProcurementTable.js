import React, { useEffect, useState, lazy, useRef, Suspense } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Input, Select, Badge } from "antd";
import dayjs from "dayjs";
import InputIcon from "@mui/icons-material/Input";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  // getOrderProcurement,
  getDistributorOrderOfHigh,
  getDistributorOrderOfMedium,
  getDistributorOrderOfLow,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  handleStatuShowDrawer,
  searchCustomerOrderNoData,
  ClearReducerData,
  addLocationInOrder,
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";
import { base_url2 } from "../../../../../Config/Auth";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "jspdf-autotable";
import relativeTime from "dayjs/plugin/relativeTime";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import UpdateIcon from "@mui/icons-material/Update";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ItemListListDrawer from "./itemListListDrawer";
import BackpackIcon from "@mui/icons-material/Backpack";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
const { Option } = Select;
const { Search } = Input;
const UpdateProcureModal = lazy(() => import("./UpdateProcureModal"));
const AccountProcureDetailsModal = lazy(() =>
  import("../AccountProcureDetailsModal")
);
const ProcureStatusShowDrawer = lazy(() => import("./ProcureStatusShowDrawer"));
const ProcureInvoiceListDrawer = lazy(() =>
  import("./ProcureInvoiceListDrawer")
);
dayjs.extend(relativeTime);
const getRelativeTime = (creationDate) => {
  const now = dayjs();
  const creationDay = dayjs(creationDate);

  if (creationDay.isSame(now, "day")) {
    return "Today";
  } else {
    return creationDay.from(now);
  }
};
function CustomerProcurementTable(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [openInvoiceModal, setopenInvoiceModal] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openStatusDrawer, setOpenStatusDrawer] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [date, setDate] = useState("");
  const [SelectedOrder, setSelectedOrder] = useState("");
  useEffect(() => {
    props.getProcureRecords(props.distributorId, "procure");
    props.getDistributorOrderOfHigh(props.distributorId,page,"procure","High");
    props.getDistributorOrderOfLow(props.distributorId, page, "procure", "Low");
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});
  const [hasMore, setHasMore] = useState(true);

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getDistributorOrderOfHigh(props.distributorId,page,"procure","High");};
  const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getDistributorOrderOfLow(props.distributorId, page, "procure", "Low");};

  const handleSelectedOrderDropDown = async (value, item) => {
    setSelectedOrder(value);
    let payload = {
      orderStatus: value,
      orderId: item.orderId,
    };
    try {
      const response = await axios.put(
        `${base_url2}/phoneOrder/remainsOrder/${item.orderId}`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      if (response.data === "Successfully order created..") {
        const updatedOrderItems = data.filter(
          (itm) => itm.orderId !== item.orderId
        );
        setData(updatedOrderItems);
      } else {
        console.log(response.data);
      }
      setEditsuppliesId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      setEditsuppliesId(null);
    }
  };

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
      //Code for Search
      props.getDistributorOrderOfHigh(
        props.distributorId,
        "0",
        "procure",
        "High"
      );
      props.getDistributorOrderOfLow(
        props.distributorId,
        "0",
        "procure",
        "Low"
      );
      props.ClearReducerData();
      setSearchOnEnter(false);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchCustomerOrderNoData(currentData);
      setSearchOnEnter(true); //Code for Search
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

  useEffect(() => {
    setData(props.highDistributorOrder);
  }, [props.highDistributorOrder]);

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
    const currentDate = new Date().toISOString();
    let updatedItem = {
      dispatchReceivedDate: currentDate,
      // trackId:trackId?trackId:item.trackId,Order Successfully dispatched!!!!
      orderId: item.orderId,
      type: "Order",
    };
    let data = {
      inventoryPickUpDate: currentDate,
      transferInd: 1,
      locationId: "LDS65468903772222023",
      userId: props.userId,
      orderPhoneId: item.orderId,
      orderType: "Procure",
    };
    try {
      const response = await axios.put(
        `${base_url2}/phoneOrder/procureDispatch`,
        updatedItem,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      dispatch(addLocationInOrder(data, props.distributorId));
      if (response.data === "Order Successfully dispatched!!!!") {
        const updatedOrderItems = data.filter(
          (itm) => itm.orderId !== item.orderId
        );
        setData(updatedOrderItems);
      } else {
        console.log(response.data);
      }
      setEditsuppliesId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      setEditsuppliesId(null);
    }
  };

  const viewAnDownloadPdf = async (item) => {
    try {
      const response = await axios.get(
        `${base_url2}/quotation/customer/pdf/${`order`}/${item.orderPhoneId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const filename = "custom-pdf-name.pdf";

      window.open(url, "_blank");
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <>
      <div class=" flex justify-between">
        <div class="w-48 mb-3">
          <div>
            <div>
              <Input
                placeholder="Search by Order ID "
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
        <div className=" flex justify-between w-[97%] p-1 bg-transparent font-bold sticky items-end !text-lm font-poppins  z-10">
          <div className=" max-md:w-[3.54rem] w-[4.2rem] text-[white] truncate flex justify-center bg-[red]">
            {props.translatedMenuItems[33]} {/* Urgent */}
          </div>
          <div className=" text-[#00A2E8] truncate text-sm w-[7rem] max-md:w-[7.4rem]">
            <DynamicFeedIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[19]} ID{/*Order ID"/> */}
          </div>
          <div className="w-[8.4rem] truncate max-md:w-[7rem]">
            <DateRangeIcon className="!text-icon  " />{" "}
            {props.translatedMenuItems[26]}
          </div>
          <div className="w-[8.04rem] truncate max-md:w-[9.1rem]">
            <LocalShippingIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[20]} {/* Delivery"/> */}
          </div>
          <div className="w-[10.3rem] truncate max-md:w-[10.8rem] ">
            <LocationOnIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[21]} {/* Location"/> */}
          </div>
          <div className="w-[7.6rem] truncate max-md:w-[4.4rem]">
            <ContactPageIcon className="!text-icon  " />{" "}
            {props.translatedMenuItems[9]} {/* Contact"/> */}
          </div>
          <div className="w-[5.2rem] truncate max-md:w-[4.1rem]">
            {/* {translatedMenuItems[2]}  */}
            <AddShoppingCartIcon className="!text-icon" />{" "}
            {props.translatedMenuItems[34]}
          </div>
          <div className="w-[5.4rem] truncate max-md:w-[4.4rem]">
            <BackpackIcon className=" !text-icon text-[#ba5624]" />{" "}
            {props.translatedMenuItems[35]} {/* Packing */}
          </div>
          <div className="w-[5.4rem] truncate max-md:w-[4.4rem]">
            <RocketLaunchIcon className=" !text-icon text-[#42bfdd]" />{" "}
            {/* {translatedMenuItems[5]} */} Shipping
          </div>{" "}
          <div className="w-[5.3rem] truncate max-md:w-[4.4rem]">
            <TrackChangesIcon className=" !text-icon text-[#f26df9]" />{" "}
            {/*  Track */} {props.translatedMenuItems[36]}
          </div>
          <div className="w-[7.5rem] truncate max-md:w-[3.8rem]">
            {" "}
            <UpdateIcon className="!text-icon mr-1 text-[#ff66b3]" />
            {props.translatedMenuItems[24]} {/*Status"/> */}
          </div>
          <div className="w-[8.11rem] truncate max-md:w-[4.8rem]">
            <CurrencyExchangeIcon className="!text-icon    text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[23]}
            {/* "Payment"/> */}
          </div>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            props.fetchingDistributorOfHigh ? (
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
                const totalPay = item.totalPayment;
                const outStand = props.distributorData.outstanding;
                const currencyPrice = props.distributorData.currencyPrice;
                const payStand = totalPay + outStand;
                const canPack =
                  payStand < currencyPrice || payStand === currencyPrice;
                const newpack =
                  item.receiveOfferPricePercentage ===
                    item.dispatchPaymentPercentage ||
                  item.receiveOfferPricePercentage >
                    item.dispatchPaymentPercentage;
                console.log(
                  "fox",
                  totalPay,
                  "payStand-",
                  payStand,
                  "outStand-",
                  outStand,
                  "canPack-",
                  canPack
                );

                return (
                  <div>
                    <div
                      key={item.orderId}
                      className="flex rounded  mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                    >
                      <div class="flex">
                        <div className=" flex  items-center   max-sm:w-full">
                          <div className="flex items-center max-sm:w-full">
                            <div className=" flex  items-center  justify-center w-[4rem]  max-md:w-[4rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-sm:w-full  ">
                              {editsuppliesId === item.orderId ? (
                                <>
                                  <Select
                                    classNames="w-32"
                                    value={SelectedOrder}
                                    onChange={(value) => {
                                      handleSelectedOrderDropDown(value, item);
                                    }}
                                  >
                                    <Option value={"closedOrder"}>
                                      Closed Order
                                    </Option>
                                    <Option value={"createRemainingOrder"}>
                                      Create Remaining Order
                                    </Option>
                                  </Select>
                                </>
                              ) : (
                                <Tooltip>
                                  <div
                                    class="flex max-sm:flex-row justify-between w-full md:"
                                    onClick={() =>
                                      handleEditClick(item.orderId)
                                    }
                                  >
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
                              )}
                            </div>

                            <div class="max-sm:w-full flex md:w-[6.60rem]  items-center justify-start h-8 ml-gap  bg-[#eef2f9]">
                              <Tooltip>
                                <div class="max-sm:w-full   flex md:flex flex-row text-xs">
                                  <span
                                    class="flex justify-start ml-gap underline font-bold cursor-pointer text-[#1890ff]"
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
                                        {props.translatedMenuItems[27]}
                                      </span>
                                    ) : null}{" "}
                                  </span>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className=" flex  w-[8rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                            <svg
                              class="w-2.5 h-2.5 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            {getRelativeTime(item.creationDate)}
                          </span>
                        </div>

                        <div class="flex flex-row text-xs  items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div class="max-sm:w-full justify-between flex md:text-xs">
                            {` ${dayjs(item.deliveryDate).format(
                              "DD/MM/YYYY"
                            )}`}
                          </div>
                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex   md:w-[10rem]  items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class="flex font-poppins ml-gap items-center text-xs">
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

                      <div class="flex flex-row  md:w-[10.03rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs">
                          {/* {item.contactPersonName} */}
                          <MultiAvatar
                            primaryTitle={item.contactPersonName}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7.03rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div
                          class=" font-poppins text-xs cursor-pointer text-blue-500"
                          onClick={() => {
                            setOpenDrawer(true);
                            handleSetParticularOrderData(item);
                          }}
                        >
                          {item.itemCount}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.packing}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.shipping}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7.6rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.track}
                        </div>
                      </div>
                      <div class="flex flex-row  md:w-[10.03rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div
                          class=" font-poppins text-xs cursor-pointer font-bold text-[#1890ff]"
                          onClick={() => {
                            handleSetParticularOrderData(item);
                            props.handleStatuShowDrawer(true);
                          }}
                        >
                          {item.status}
                        </div>
                      </div>

                      <div class="flex flex-row  items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[11.03rem] max-sm:flex-row w-full max-sm:justify-between">
                        <Button
                          type="primary"
                          onClick={() => {
                            setopenInvoiceModal(true);
                            handleSetParticularOrderData(item);
                          }}
                        >
                          <DataSaverOnIcon className=" !text-icon" />
                          {props.translatedMenuItems[10]}
                        </Button>
                      </div>

                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        {!props.user.disPackInd && canPack && newpack && (
                          <Button
                            className="w-[5rem]"
                            type="primary"
                            onClick={() => handlePostChange(item)}
                          >
                            {" "}
                            <InputIcon className="!text-icon text-white" />
                            Pack
                          </Button>
                        )}
                        <div class="flex w-7 ml-gap max-sm:flex-row max-sm:w-[10%]">
                          <div class=" flex items-center justify-center h-8   bg-[#eef2f9]">
                            <PictureAsPdfIcon
                              className="!text-icon text-[red] cursor-pointer"
                              onClick={() => viewAnDownloadPdf(item)}
                            />
                          </div>
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

      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-[97%] p-1 bg-transparent font-bold sticky items-end !text-lm font-poppins  z-10">
          <div className=" max-md:w-[3.54rem] w-[4.2rem] text-[white] truncate flex justify-center bg-[teal]">
            {props.translatedMenuItems[37]} {/* normal */}
          </div>
          <div className=" text-[#00A2E8] truncate text-sm w-[7rem] max-md:w-[7.4rem]">
            <DynamicFeedIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[19]} ID{/*Order ID"/> */}
          </div>
          <div className="w-[8.4rem] truncate max-md:w-[7rem]">
            <DateRangeIcon className="!text-icon  " />{" "}
            {props.translatedMenuItems[26]}
          </div>
          <div className="w-[8.04rem] truncate max-md:w-[9.1rem]">
            <LocalShippingIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[20]} {/* Delivery"/> */}
          </div>
          <div className="w-[10.3rem] truncate max-md:w-[10.8rem] ">
            <LocationOnIcon className="!text-icon  text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[21]} {/* Location"/> */}
          </div>
          <div className="w-[7.6rem] truncate max-md:w-[4.4rem]">
            <ContactPageIcon className="!text-icon  " />{" "}
            {props.translatedMenuItems[9]} {/* Contact"/> */}
          </div>
          <div className="w-[5.2rem] truncate max-md:w-[4.1rem]">
            {/* {translatedMenuItems[2]}  */}
            <AddShoppingCartIcon className="!text-icon" />{" "}
            {props.translatedMenuItems[34]}
            {/* Items */}
          </div>
          <div className="w-[5.4rem] truncate max-md:w-[4.4rem]">
            <BackpackIcon className=" !text-icon text-[#ba5624]" />{" "}
            {props.translatedMenuItems[35]}
            {/* Packing */}
          </div>
          <div className="w-[5.4rem] truncate max-md:w-[4.4rem]">
            <RocketLaunchIcon className=" !text-icon text-[#42bfdd]" />{" "}
            {/* {translatedMenuItems[5]} */} Shipping
          </div>{" "}
          <div className="w-[5.3rem] truncate max-md:w-[4.4rem]">
            <TrackChangesIcon className=" !text-icon text-[#f26df9]" />{" "}
            {/*  Track */} {props.translatedMenuItems[36]}
          </div>
          <div className="w-[7.5rem] truncate max-md:w-[3.8rem]">
            {" "}
            <UpdateIcon className="!text-icon mr-1 text-[#ff66b3]" />
            {props.translatedMenuItems[24]} {/*Status"/> */}
          </div>
          <div className="w-[8.11rem] truncate max-md:w-[4.8rem]">
            <CurrencyExchangeIcon className="!text-icon    text-[#e4eb2f]" />{" "}
            {props.translatedMenuItems[23]}
            {/* "Payment"/> */}
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.lowDistributorOrder.length}
          next={handleLoadMoreLow}
          hasMore={hasMore}
          loader={
            props.fetchingDistributorOfLow ? (
              <div style={{ textAlign: "center" }}>Loading...</div>
            ) : null
          }
          height={"33vh"}
          style={{ scrollbarWidth: "thin" }}
        >
          {props.lowDistributorOrder.length ? (
            <>
              {props.lowDistributorOrder.map((item) => {
                const currentDate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                return (
                  <div>
                    <div className="flex rounded  mt-1 bg-white py-ygap items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                      <div class="flex">
                        <div className=" flex  items-center justify-center w-[4rem] max-md:w-[4rem]  border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                          {editsuppliesId === item.orderId ? (
                            <>
                              <Select
                                classNames="w-32"
                                value={SelectedOrder}
                                onChange={(value) => {
                                  handleSelectedOrderDropDown(value, item);
                                }}
                              >
                                <Option value={"closedOrder"}>
                                  Closed Order
                                </Option>
                                <Option value={"createRemainingOrder"}>
                                  Create Remaining Order
                                </Option>
                              </Select>
                            </>
                          ) : (
                            <Tooltip>
                              <div
                                class="flex max-sm:flex-row justify-between w-full max-md:"
                                onClick={() => handleEditClick(item.orderId)}
                              >
                                <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">
                                  {item.priority === "High" && (
                                    <div class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                  )}
                                  {item.priority === "Medium" && (
                                    <div class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>
                                  )}
                                  {item.priority === "Low" && (
                                    <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>
                                  )}
                                </div>
                              </div>
                            </Tooltip>
                          )}
                        </div>

                        <div class="flex max-sm:w-full items-center  md:w-[6.60rem] justify-start h-8 ml-gap  bg-[#eef2f9]">
                          <Tooltip>
                            <div class="max-sm:w-full  flex md:flex flex-row text-xs">
                              <Badge
                                size="small"
                                count={`${item.itemCount}`}
                                overflowCount={5000}
                              >
                                <span
                                  class="flex justify-start ml-gap underline cursor-pointer font-bold text-[#1890ff]"
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.handleProcureDetailsModal(true);
                                  }}
                                >
                                  {item.newOrderNo}
                                </span>
                              </Badge>
                              <span>
                                {currentDate ===
                                dayjs(item.creationDate).format(
                                  "DD/MM/YYYY"
                                ) ? (
                                  <span className="text-[0.65rem] text-[tomato] font-bold">
                                    {props.translatedMenuItems[27]} {/* New */}
                                  </span>
                                ) : null}{" "}
                              </span>
                            </div>
                          </Tooltip>
                        </div>

                        <div className=" flex items-center w-[8rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                            <svg
                              class="w-2.5 h-2.5 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            {getRelativeTime(item.creationDate)}
                          </span>
                        </div>

                        <div class="flex flex-row  md:w-[8rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full text-xs max-sm:justify-between">
                          <div class="max-sm:w-full justify-between flex md:text-xs">
                            {dayjs(item.deliveryDate).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex  md:w-[10rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between text-xs ">
                          <div class=" font-poppins ml-gap items-center text-xs">
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

                      <div class="flex flex-row items-center md:w-[10.03rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs">
                          <MultiAvatar
                            primaryTitle={item.contactPersonName}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        </div>
                      </div>
                      <div class="flex flex-row items-center md:w-[7.03rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div
                          class=" font-poppins text-xs cursor-pointer text-blue-500"
                          onClick={() => {
                            setOpenDrawer(true);
                            handleSetParticularOrderData(item);
                          }}
                        >
                          {item.itemCount}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.packing}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.shipping}
                        </div>
                      </div>
                      <div class="flex flex-row md:w-[7.6rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div class=" font-poppins text-xs cursor-pointer text-black">
                          {item.track}
                        </div>
                      </div>
                      <div class="flex flex-row items-center md:w-[10.03rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <div
                          class=" font-poppins text-xs cursor-pointer font-bold text-[#1890ff]"
                          onClick={() => {
                            handleSetParticularOrderData(item);
                            // (true);
                          }}
                        >
                          {item.status}
                        </div>
                      </div>

                      <div class="flex flex-row items-center md:w-[11.03rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                        <Button
                          type="primary"
                          onClick={() => {
                            setopenInvoiceModal(true);
                            handleSetParticularOrderData(item);
                          }}
                        >
                          <DataSaverOnIcon className=" !text-icon" />
                          {props.translatedMenuItems[10]}
                        </Button>
                      </div>

                      <div class="flex w-7 ml-gap max-sm:flex-row max-sm:w-[10%]">
                        <div class="items-center justify-center h-8 ml-gap  bg-[#eef2f9] flex"></div>
                        <div class="items-center justify-center h-8 ml-gap  bg-[#eef2f9] flex">
                          <PictureAsPdfIcon
                            className="!text-icon text-[red] cursor-pointer"
                            onClick={() => viewAnDownloadPdf(item)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : !props.lowDistributorOrder.length &&
            !props.fetchingDistributorOfLow ? (
            <NodataFoundPage />
          ) : null}
        </InfiniteScroll>
      </div>

      <UpdateProcureModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        distributorId={props.distributorId}
        handleUpdateProcureDetailModal={props.handleUpdateProcureDetailModal}
        updateProcureDetailModal={props.updateProcureDetailModal}
        translatedMenuItems={props.translatedMenuItems}
      />

      <AccountProcureDetailsModal
        particularRowData={particularRowData}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        handleProcureDetailsModal={props.handleProcureDetailsModal}
        addProcureDetailsModal={props.addProcureDetailsModal}
        translatedMenuItems={props.translatedMenuItems}
      />

      <ProcureStatusShowDrawer
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        showStatusDrwr={props.showStatusDrwr}
        handleStatuShowDrawer={props.handleStatuShowDrawer}
        translatedMenuItems={props.translatedMenuItems}
      />

      <ProcureInvoiceListDrawer
        particularRowData={particularRowData}
        openInvoiceModal={openInvoiceModal}
        setopenInvoiceModal={setopenInvoiceModal}
        translatedMenuItems={props.translatedMenuItems}
        distributorId={props.distributorId}
      />
      
      <ItemListListDrawer
        particularRowData={particularRowData}
        openDrawer={openDrawer}
        distributorData={props.distributorData}
        setOpenDrawer={setOpenDrawer}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        distributorId={props.distributorId}
        translatedMenuItems={props.translatedMenuItems}
      />
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
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderOfHigh,
      getDistributorOrderOfMedium,
      getDistributorOrderOfLow,
      // getOrderProcurement,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      handleStatuShowDrawer,
      ClearReducerData,
      searchCustomerOrderNoData,
      addLocationInOrder,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
