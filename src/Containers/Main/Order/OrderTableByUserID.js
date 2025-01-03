import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Select, Popconfirm } from "antd";
import dayjs from "dayjs";
import PaidIcon from "@mui/icons-material/Paid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import InfiniteScroll from "react-infinite-scroll-component";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import relativeTime from "dayjs/plugin/relativeTime";
import "jspdf-autotable";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  handleOrderDetailsModal,
  handleLeadModal,
} from "../Account/AccountAction";
import {
  emptyOrders,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  deleteOrderRepairData,
  getRepairHighOrderList,
  getRepairMediumOrderList,
  getRepairLowOrderList,
} from "./OrderAction";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import { PersonAddAlt1 } from "@mui/icons-material";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import { BundleLoader } from "../../../Components/Placeholder";
const AddNotesOrderDrawer = lazy(() => import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"));
const StatusOfOrderModal = lazy(() =>import("../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal"));
const PaidButtonModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal"));
const AddLeadModal = lazy(() => import("./AddLeadModal")); //2
const OrderSearchedData = lazy(() => import("./OrderSearchedData"));
const { Option } = Select;

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

function OrderTableByUserID(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getRepairHighOrderList(props.userId, page, "High");
    props.getRepairLowOrderList(props.userId, page, "Low");
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  useEffect(() => {
    return () => props.emptyOrders();
  }, []);

  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }
  const handleLoadMore = () => {
    const callPageMap =
      props.repairHighCompleteOrder &&
      props.repairHighCompleteOrder.length &&
      props.repairHighCompleteOrder[0].pageCount;
    setTimeout(() => {
      const { getRepairHighOrderList } = props;
      if (props.repairHighCompleteOrder) {
        if (page < callPageMap) {
          setPage(page + 1);
          getRepairHighOrderList(props.userId, page, "High");
        }
        if (page === callPageMap) {
          setHasMore(false);
        }
      }
    }, 100);
  };

  const handleLoadMoreLow = () => {
    const callPageMap =
      props.repairLowCompleteOrder &&
      props.repairLowCompleteOrder.length &&
      props.repairLowCompleteOrder[0].pageCount;
    setTimeout(() => {
      const { getRepairLowOrderList } = props;
      if (props.repairLowCompleteOrder) {
        if (page < callPageMap) {
          setPage(page + 1);
          getRepairLowOrderList(props.userId, page, "Low");
        }
        if (page === callPageMap) {
          setHasMore(false);
        }
      }
    }, 100);
  };
  const viewAnDownloadPdf = async (item) => {
    try {
      const response = await axios.get(
        `${base_url2}/quotation/customer/pdf/${`order`}/${item.orderId}`,
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
    <div>
      {props.orderSearch.length > 0 ? (
        <OrderSearchedData
          orderSearch={props.orderSearch}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
        />
      ) : (
        <>
          <div className=" flex  sticky  z-auto">
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
              <div className=" flex  w-[100%]   bg-transparent  sticky  items-end  z-10 max-sm:hidden">
                <div class=" flex justify-between  !text-lm font-poppins  font-bold  w-[90%]  ">
                  <div className="w-[4.54rem] text-sm truncate max-md:w-[4.54rem]    bg-[red] text-white">
                    {props.translatedMenuItems[17]}
                  </div>
                  <div className="  w-[9.7rem] text-[#00A2E8] text-sm truncate max-md:w-[6rem] ml-2">
                    <DynamicFeedIcon className="!text-icon mr-1 " />
                    {props.translatedMenuItems[14]} ID
                  </div>
                  <div className="  w-[17.6rem] truncate max-md:w-[3.6rem] ">
                    <ApartmentIcon className="!text-icon mr-0  text-[#902089]" />
                    {props.translatedMenuItems[18]}
                  </div>
                  <div className="  w-[8.051rem] truncate mr-1 max-md:w-[3.051rem] ">
                    <ContactsIcon className="!text-icon mr-1 text-[#12462c]" />
                    {props.translatedMenuItems[19]}
                  </div>
                  <div className=" w-[9.018rem] truncate max-md:w-[10.018rem]">
                    {props.translatedMenuItems[20]}
                  </div>
                  <div className=" w-[9.73rem] truncate max-md:w-[2.73rem]">
                    <AccountCircleIcon className="!text-icon  text-[#f28482]" />
                    {props.translatedMenuItems[21]}
                  </div>
                  <div className=" w-[8.8rem] truncate max-md:w-[2.8rem]">
                    {props.translatedMenuItems[22]}
                  </div>
                  <div className=" w-[9.8rem] truncate max-md:w-[20.8rem]">
                    <GroupsIcon className="!text-icon mr-1  text-[#f29844]" />
                    {props.translatedMenuItems[23]}
                  </div>
                </div>
              </div>
              <InfiniteScroll
                dataLength={props.repairHighCompleteOrder.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={
                  props.fetchingRepairHighOrderList ? (
                    <div>
                      <BundleLoader />
                    </div>
                  ) : null
                }
                style={{ scrollbarWidth: "thin" }}
                height={"40vh"}
                endMessage={
                  <p class="flex text-center font-poppins font-bold text-xs text-red-500">
                    {props.translatedMenuItems[31]}.
                  </p>
                }
              >
                <>
                  {props.repairHighCompleteOrder.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <div>
                        <div
                          className="flex rounded justify-between max-sm:rounded-lg
               max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500
                bg-white mt-1 py-ygap items-center  max-sm:h-24 max-sm:    scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                        >
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                            <div className=" flex items-center w-[4.26rem] max-md:w-[4.26rem] max-sm:w-full border-l-2 border-green-500 bg-[#eef2f9] justify-center  ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-center w-full ">
                                  <div class="  text-blue-500  font-poppins font-bold  cursor-pointer">
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
                            <div className=" flex    max-sm:w-full">
                              <div className="flex items-center max-sm:w-full">
                                <div class="w-[9.43rem] font-semibold items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                                  <Badge size="small" count={item.count}>
                                    <span
                                      class="underline cursor-pointer text-[#1890ff] ml-gap  text-xs "
                                      onClick={() => {
                                        handleSetParticularOrderData(item);
                                        props.handleOrderDetailsModal(true);
                                      }}
                                    >
                                      {`${item.newOrderNo} `}
                                    </span>
                                  </Badge>
                                  {date === currentdate ? (
                                    <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold">
                                      {props.translatedMenuItems[25]}{" "}
                                      {/* New */}
                                    </span>
                                  ) : null}
                                </div>
                                {props.user.accountInfoInd ? (
                                  <div class="max-sm:w-full max-md:w-[11.02rem] w-[11.02rem] text-xs  font-poppins items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                                    <Tooltip>
                                      <div class="max-sm:w-full justify-between ml-gap flex max-md:text-xs">
                                        {item.distributorName}
                                      </div>
                                    </Tooltip>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {props.user.accountInfoInd ? (
                              <div class="flex  items-center max-md:w-[5.71rem]  w-[5.71rem] justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                <div>
                                  <MultiAvatar2
                                    primaryTitle={item.contactPersonName}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </div>
                              </div>
                            ) : null}
                            <div className=" flex items-center  text-xs max-md:w-[5.31rem] w-[7.31rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class=" font-poppins items-center text-xs">
                                {item.noOfPhones}
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                              <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
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
                            <div class="flex    items-center justify-center h-8 ml-gap w-[8.03rem]  bg-[#eef2f9] max-md:w-[6.03rem] max-sm:flex-row max-sm:justify-between">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.userName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                            </div>
                            <div class=" flex">
                              <div class="flex    items-center justify-center h-8 ml-gap w-[9.02rem] bg-[#eef2f9] max-md:w-[6.02rem] max-sm:flex-row max-sm:justify-between">
                                <div>
                                  <MultiAvatar2
                                    primaryTitle={item.supervisorUserName}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </div>
                              </div>
                              <div class="flex   items-center justify-center h-8 ml-gap w-[10.04rem] bg-[#eef2f9] max-md:w-[6.04rem] max-sm:flex-row  max-sm:justify-between">
                                <div>
                                  {item.teamLeadUserName && (
                                    <MultiAvatar2
                                      primaryTitle={item.teamLeadUserName}
                                      imgWidth={"1.8rem"}
                                      imgHeight={"1.8rem"}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className=" flex   max-md:w-[5.05rem] w-[8.05rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs  font-semibold items-center font-poppins">
                                {item.noOfownerPhones}
                              </div>
                            </div>
                            <div class="  max-md:w-[6.06rem]  w-[10.06rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  text-xs  cursor-pointer  flex ">
                              {item.status}
                            </div>
                          </div>
                          <div class="flex  items-center bg-[#eef2f9] ml-gap max-sm:justify-between max-sm:w-wk max-sm:items-center">
                            <div class="  items-center ml-gap flex">
                              <PictureAsPdfIcon
                                className="!text-icon text-[red] cursor-pointer"
                                onClick={() => viewAnDownloadPdf(item)}
                              />
                            </div>
                            <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
                              {item.qcStartInd !== 0 && (
                                <Tooltip title={props.translatedMenuItems[26]}>
                                  <PersonAddAlt1
                                    className="!text-icon  max-sm:!text-2xl cursor-pointer"
                                    style={{
                                      color: item.supervisorUserName
                                        ? "green"
                                        : "red",
                                    }}
                                    onClick={() => {
                                      props.handleLeadModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              )}
                            </div>
                            <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
                              <Tooltip title={props.translatedMenuItems[27]}>
                                <NoteAltIcon
                                  className=" !text-icon cursor-pointer text-green-800 max-sm:!text-2xl"
                                  onClick={() => {
                                    props.handleNotesModalInOrder(true);
                                    handleSetParticularOrderData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
                              <Tooltip title={props.translatedMenuItems[16]}>
                                <EventRepeatIcon
                                  className="!text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                                  onClick={() => {
                                    props.handleStatusOfOrder(true);
                                    handleSetParticularOrderData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
                              <Tooltip title={props.translatedMenuItems[28]}>
                                <PaidIcon
                                  className="!text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                                  onClick={() => {
                                    props.handlePaidModal(true);
                                    handleSetParticularOrderData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
                              <Tooltip title={props.translatedMenuItems[30]}>
                                <Popconfirm
                                  title={props.translatedMenuItems[29]}
                                  onConfirm={() =>
                                    props.deleteOrderRepairData(
                                      item.orderId,
                                      props.userId
                                    )
                                  }
                                >
                                  <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                                </Popconfirm>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              </InfiniteScroll>
            </div>
          </div>

          <div className=" flex  sticky  z-auto">
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              <div className=" flex  w-[100%]   bg-transparent  sticky  items-end  z-10 max-sm:hidden">
                <div class=" flex justify-between  !text-lm font-poppins  font-bold  w-[90%]  ">
                  <div className="w-[4.54rem]  max-md:w-[4.54rem]  text-[white] flex justify-center bg-[teal]">
                    {props.translatedMenuItems[24]}{" "}
                  </div>
                  <div className=" text-[#00A2E8] text-sm w-[9.7rem] max-md:w-[6rem] ml-2">
                    <DynamicFeedIcon className="!text-base mr-1 " />
                    {props.translatedMenuItems[1]} ID
                  </div>
                  <div className=" w-[17.6rem] max-md:w-[3.6rem]">
                    {" "}
                    <ApartmentIcon className="!text-base   text-[#902089]" />
                    {props.translatedMenuItems[18]}
                  </div>
                  <div className=" w-[8.051rem] mr-1 max-md:w-[3.051rem] ">
                    {" "}
                    <ContactsIcon className="!text-base mr-1 text-[#12462c]" />
                    {props.translatedMenuItems[19]}
                  </div>
                  <div className=" w-[9.018rem] max-md:w-[10.018rem]">
                    {props.translatedMenuItems[20]}
                  </div>
                  <div className=" w-[9.73rem] max-md:w-[2.73rem]">
                    <AccountCircleIcon className="!text-icon text-[#f28482]" />
                    {props.translatedMenuItems[21]}
                  </div>
                  <div className=" w-[8.8rem] max-md:w-[2.8rem]">
                    {props.translatedMenuItems[22]}
                  </div>
                  <div className=" w-[9.8rem] max-md:w-[20.8rem]">
                    <GroupsIcon className="!text-icon mr-1  text-[#f29844]" />
                    {props.translatedMenuItems[23]}
                  </div>
                </div>
              </div>      
              <InfiniteScroll
                dataLength={props.repairLowCompleteOrder.length}
                next={handleLoadMoreLow}
                hasMore={hasMore}
                loader={
                  props.fetchingRepairLowOrderList ? (
                    <div>
                      <BundleLoader />
                    </div>
                  ) : null
                }
                height={"40vh"}
                style={{ scrollbarWidth: "thin" }}
                endMessage={
                  <div class="flex text-center font-poppins font-bold text-xs text-red-500">
                    {props.translatedMenuItems[31]}.{" "}
                  </div>
                }
              >
                <>
                  {props.repairLowCompleteOrder.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <div>
                        <div
                          className="flex rounded justify-between max-sm:  mt-1 bg-white py-ygap items-center   max-sm:rounded-lg max-sm:h-[9rem]
                max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                        >
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center max-sm:items-center">
                            <div className=" flex items-center w-[4.26rem] max-md:w-[4.26rem] max-sm:w-full border-l-2 border-green-500 bg-[#eef2f9] justify-center ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-center w-full ">
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
                            <div className=" flex    max-sm:w-full">
                              <div className="flex items-center max-sm:w-full">
                                <div class="w-[9.43rem] font-semibold  items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                                  <Badge size="small" count={item.count}>
                                    <span
                                      class="underline cursor-pointer text-[#1890ff] ml-gap font-semi-bold text-xs "
                                      onClick={() => {
                                        handleSetParticularOrderData(item);
                                        props.handleOrderDetailsModal(true);
                                      }}
                                    >
                                      {`${item.newOrderNo} `}
                                    </span>
                                  </Badge>
                                  {date === currentdate ? (
                                    <span className=" text-[0.65rem] text-[tomato] ml-1 font-bold">
                                      {props.translatedMenuItems[25]}{" "}
                                      {/* New */}
                                    </span>
                                  ) : null}
                                </div>
                                {props.user.accountInfoInd ? (
                                  <div class="max-sm:w-full max-md:w-[11.02rem] w-[11.02rem] font-poppins  items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex">
                                    <Tooltip>
                                      <div class="max-sm:w-full justify-between ml-gap flex max-md:text-xs">
                                        {item.distributorName}
                                      </div>
                                    </Tooltip>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {props.user.accountInfoInd ? (
                              <div class="flex  items-center max-md:w-[5.71rem] w-[5.71rem] justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                <div>
                                  <MultiAvatar2
                                    primaryTitle={item.contactPersonName}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </div>
                              </div>
                            ) : null}
                            <div className=" flex  max-md:w-[5.31rem] w-[7.31rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class=" font-poppins text-xs">
                                {item.noOfPhones}
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-end max-sm:justify-between max-sm:w-wk max-sm:items-center">
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                              <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
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
                            <div class="flex  items-center max-md:w-[6.03rem] w-[8.03rem]   justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.userName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                            </div>
                            <div class=" flex">
                              <div class="flex   max-md:w-[6.02rem] w-[9.02rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                <div>
                                  <MultiAvatar2
                                    primaryTitle={item.supervisorUserName}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </div>
                              </div>
                              <div class="flex  items-center max-md:w-[6.04rem] w-[10.04rem]  justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                <div>
                                  {item.teamLeadUserName && (
                                    <MultiAvatar2
                                      primaryTitle={item.teamLeadUserName}
                                      imgWidth={"1.8rem"}
                                      imgHeight={"1.8rem"}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className=" flex   max-md:w-[5.05rem] w-[8.05rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between ">
                              <div class=" text-xs  font-semibold  font-poppins">
                                {item.noOfownerPhones}
                              </div>
                            </div>
                            <div class="flex w-[10.06rem]  max-md:w-[10.06rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] text-xs  cursor-pointer justify-cente">
                              {item.status}
                            </div>
                          </div>
                          <div class="flex justify-end ml-gap max-sm:justify-between max-sm:w-wk max-sm:items-center">
                            <div class=" items-center justify-center h-8   bg-[#eef2f9] flex">
                              <PictureAsPdfIcon
                                className="!text-icon text-[red] cursor-pointer"
                                onClick={() => viewAnDownloadPdf(item)}
                              />
                            </div>
                            <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
                                {item.qcStartInd !== 0 && (
                                  <Tooltip
                                    title={props.translatedMenuItems[26]}
                                  >
                                    <PersonAddAlt1
                                      className="!text-icon cursor-pointer max-sm:!text-2xl"
                                      style={{
                                        color: item.supervisorUserName
                                          ? "green"
                                          : "red",
                                      }}
                                      onClick={() => {
                                        props.handleLeadModal(true);
                                        handleSetParticularOrderData(item);
                                      }}
                                    />
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                            <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                              {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                              <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
                                <Tooltip title={props.translatedMenuItems[27]}>
                                  <NoteAltIcon
                                    className=" !text-icon cursor-pointer text-green-800 max-sm:!text-2xl"
                                    onClick={() => {
                                      props.handleNotesModalInOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                            <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
                                <Tooltip title={props.translatedMenuItems[16]}>
                                  <EventRepeatIcon
                                    className="!text-icon cursor-pointer max-sm:!text-2xl text-[green]"
                                    onClick={() => {
                                      props.handleStatusOfOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                            <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins  items-center justify-center h-8   bg-[#eef2f9] flex">
                                <Tooltip title={props.translatedMenuItems[28]}>
                                  <PaidIcon
                                    className="!text-icon cursor-pointer max-sm:!text-2xl text-[#e5625e]"
                                    onClick={() => {
                                      props.handlePaidModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                            <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins  items-center justify-center h-8  bg-[#eef2f9] flex">
                                <Tooltip title={props.translatedMenuItems[30]}>
                                  <Popconfirm
                                    title={props.translatedMenuItems[29]}
                                    onConfirm={() =>
                                      props.deleteOrderRepairData(
                                        item.orderId,
                                        props.userId
                                      )
                                    }
                                  >
                                    <DeleteOutlineIcon className=" !text-icon cursor-pointer text-[red] max-sm:!text-2xl" />
                                  </Popconfirm>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              </InfiniteScroll>
            </div>
          </div>
          <Suspense>
            <AddNotesOrderDrawer
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              particularRowData={particularRowData}
              addNotesInOrder={props.addNotesInOrder}
              handleNotesModalInOrder={props.handleNotesModalInOrder}
            />
            <AddLeadModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              particularRowData={particularRowData}
              addLeadInOrder={props.addLeadInOrder}
              handleLeadModal={props.handleLeadModal}
            />
            <StatusOfOrderModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              handleStatusOfOrder={props.handleStatusOfOrder}
              addStatusOfOrder={props.addStatusOfOrder}
              particularRowData={particularRowData}
            />
            <PaidButtonModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              type={props.type}
              addPaidButtonModal={props.addPaidButtonModal}
              handlePaidModal={props.handlePaidModal}
              particularRowData={particularRowData}
              translatedMenuItems={props.translatedMenuItems}
              modalTitleKey={14}
            />
            <AccountOrderDetailsModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              particularRowData={particularRowData}
              handleOrderDetailsModal={props.handleOrderDetailsModal}
              addOrderDetailsModal={props.addOrderDetailsModal}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

const mapStateToProps = ({ order, auth, distributor }) => ({
  allOrderList: order.allOrderList,
  repairHighCompleteOrder: order.repairHighCompleteOrder,
  fetchingRepairHighOrderList: order.fetchingRepairHighOrderList,
  repairMediumCompleteOrder: order.repairMediumCompleteOrder,
  fetchingRepairMediumOrderList: order.fetchingRepairMediumOrderList,
  repairLowCompleteOrder: order.repairLowCompleteOrder,
  fetchingRepairLowOrderList: order.fetchingRepairLowOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  departmentUser: distributor.departmentUser,
  fetchingOrderByIdError: distributor.fetchingOrderByIdError,
  fetchingOrderById: distributor.fetchingOrderById,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addLeadInOrder: distributor.addLeadInOrder,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  orderShowById: distributor.orderShowById,
  orderSearch: order.orderSearch,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOrderById,
      getRepairHighOrderList,
      getRepairMediumOrderList,
      getRepairLowOrderList,
      emptyOrders,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      handleOrderDetailsModal,
      handleLeadModal,
      deleteOrderRepairData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableByUserID);
