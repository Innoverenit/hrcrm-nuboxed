import React, { useEffect, useState, lazy } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import dayjs from "dayjs";
import PaidIcon from "@mui/icons-material/Paid";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddPickupModal from "./AddPickupModal";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import GroupsIcon from "@mui/icons-material/Groups";
import DateRangeIcon from "@mui/icons-material/DateRange";
import UpdateIcon from "@mui/icons-material/Update";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {
  getDistributorOrderByDistributorId,
  getDistributorOrderOfHigh,
  getDistributorOrderOfMedium,
  getDistributorOrderOfLow,
  handleInventoryLocationInOrder,
  handleOrderPickupModal,
  handleOrderDetailsModal,
  handleNotesModalInOrder,
  handlePaidModal,
  handleStatusOfOrder,
  updateOfferPrice,
  handleAccountProduction,
  handleUpdateOrder,
  setEditOrder,
  removeOrderAcc,
  getOrderRecords,
  deleteDistributorData,
  getLocationList,
  updateSubOrderAwb,
  handlePIModal,
} from "../../AccountAction";
import { Badge, Button, Input, Select, Tooltip } from "antd";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../../Components/Common";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { PersonAddAlt1 } from "@mui/icons-material";
import PIOPenModal from "./PIOPenModal";
import axios from "axios";
import { base_url2 } from "../../../../../Config/Auth";
import { BundleLoader } from "../../../../../Components/Placeholder";
const SubOrderList = lazy(() => import("./SubOrderList"));
const AddLocationInOrder = lazy(() => import("./AddLocationInOrder"));
const AccountOrderDetailsModal = lazy(() =>
  import("./AccountOrderDetailsModal")
);
const StatusOfOrderModal = lazy(() => import("./StatusOfOrderModal"));
const AddNotesOrderModal = lazy(() => import("./AddNotesOrderModal"));
const PaidButtonModal = lazy(() => import("./PaidButtonModal"));
const AccountproductionModal = lazy(() => import("./AccountProductionModal"));
const UpdateOrderModal = lazy(() =>
  import("./UpdateAccountOrder/UpdateOrderModal")
);
const { Option } = Select;

const AccountOrderTable = (props) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getOrderRecords(props.distributorId, "repair");
    props.getLocationList(props.orgId);
    props.getDistributorOrderOfHigh(
      props.distributorId,
      page,
      "repair",
      "High"
    );
    props.getDistributorOrderOfLow(props.distributorId, page, "repair", "Low");
  }, []);

  const [print, setprint] = useState(false);
  const handlePrint = () => {
    setprint(!print);
  };
  const [particularRowData, setParticularRowData] = useState({});
  const [locationChange, setLocationChange] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    setPage(page + 1);

    props.getDistributorOrderOfHigh(
      props.distributorId,
      page,
      "repair",
      "High"
    );
  };

  const handleLoadMoreLow = () => {
    setPage(page + 1);

    props.getDistributorOrderOfLow(props.distributorId, page, "repair", "Low");
  };
  const [visible, setVisible] = useState(false);
  const handleUpdateRevisePrice = () => {
    setVisible(!visible);
  };
  const [price, setPrice] = useState(particularRowData.offerPrice);
  const [checkAwb, setCheckAwb] = useState(false);

  const handleCheckAwb = () => {
    setCheckAwb(!checkAwb);
  };
  const handleChange = (val) => {
    setPrice(val);
  };
  const handleSubmitPrice = () => {
    props.updateOfferPrice(
      {
        offerPrice: price,
        orderPhoneId: particularRowData.orderId,
        customerPriceInd: true,
      },
      particularRowData.orderId,
      props.distributorId
    );
    setVisible(false);
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
    <>
      <div className=" flex sticky   z-auto">
        <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex  w-[100%]  bg-transparent   sticky  z-10">
            <div className="flex justify-between w-[80%]  !text-lm font-bold font-poppins">
              <div className=" max-md:w-[3.54rem] w-[3.54rem] truncate text-[white] flex justify-center bg-[red]">
                {props.translatedMenuItems[33]} {/* Urgent */}
              </div>
              <div className=" max-md:w-[10.41rem] truncate w-[6.7rem]">
                {" "}
                {/* Order ID"*/}
                <DynamicFeedIcon className="!text-icon  text-[#e4eb2f]" />{" "}
                {props.translatedMenuItems[19]} ID
              </div>
              <div className=" w-[5.5rem] truncate max-md:w-[9.012rem]">
                {" "}
                {/*Created */}
                <DateRangeIcon className="!text-icon  " />{" "}
                {props.translatedMenuItems[26]}
              </div>
              <div className="w-[5.3rem] max-md:w-[9.012rem]">
                {props.translatedMenuItems[39]} {/* LOB */}
              </div>
              <div className="truncate w-[4.8rem] max-md:w-[2.81rem] "></div>
              <div className="truncate w-[5.4rem] max-md:w-[5.91rem]">
                <ContactPageIcon className="!text-icon" />{" "}
                {props.translatedMenuItems[9]}{" "}
                {/*Contact"
                            /> */}
              </div>
              <div className=" w-[4.6rem] truncate max-md:w-[6.11rem]">
                {props.translatedMenuItems[41]}{" "}
                {/* Quoted"
                            /> */}
              </div>
              <div className=" truncate max-md:w-[5.09rem] w-[4.3rem] ">
                {props.translatedMenuItems[42]}{" "}
                {/*"Final"
                            /> */}
              </div>
              <div className=" truncate w-[6.7rem] max-md:w-[5.076rem]">
                {props.translatedMenuItems[43]}{" "}
                {/*Revised"
                            /> */}
              </div>
              <div className="w-[3.5rem] truncate  max-md:w-[5.063rem] "></div>
              <div className="w-[5.9rem] max-md:w-[8.10rem] ">
                {props.translatedMenuItems[44]}{" "}
                {/* Received"
                            /> */}
              </div>
              <div className="w-[6.2rem] truncate max-md:w-[8.03rem] ">
                {props.translatedMenuItems[45]}{" "}
                {/*Supervisor"
                            /> */}
              </div>
              <div className=" w-[5.5rem] truncate max-md:w-[8.12rem]">
                <GroupsIcon className="!text-base  text-[#e4eb2f]" />{" "}
                {props.translatedMenuItems[46]}{" "}
                {/*Lead"
                            /> */}
              </div>

              <div className="w-[5rem] truncate  max-md:w-[8.02rem] ">
                <UpdateIcon className="!text-icon mr-1 text-[#ff66b3]" />{" "}
                {props.translatedMenuItems[24]}
              </div>
            </div>
          </div>
          <InfiniteScroll
            dataLength={props.highDistributorOrder.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={
              props.fetchingDistributorOfHigh ? (
                <div style={{ textAlign: "center" }}>
                  <BundleLoader />
                </div>
              ) : null
            }
            height={"35vh"}
            style={{ scrollbarWidth: "thin" }}
          >
            {props.highDistributorOrder.length ? (
              <>
                {props.highDistributorOrder.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div
                        className={`flex rounded mt-1  items-center bg-white py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border-[#23A0BE] hover:shadow-[#23A0BE]
`}
                      >
                        <div
                          className={`flex ${
                            item.active
                              ? ""
                              : "opacity-50 cursor-not-allowed pointer-events-none"
                          }
  `}
                        >
                          <div class="flex w-[42rem] ">
                            <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] w-[3.56rem] max-md:w-[2.56rem] max-sm:  ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between  max-md:flex-col">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
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
                            </div>

                            <div className=" flex items-center  ml-gap bg-[#eef2f9] w-[7.4rem] h-8 max-md:w-[7.4rem] max-sm:flex-row  max-sm:justify-between">
                              <div class=" text-xs ml-gap items-center font-poppins">
                                <span
                                  class="underline cursor-pointer font-bold text-[#1890ff]"
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.handleOrderDetailsModal(true);
                                  }}
                                >
                                  {item.newOrderNo}
                                </span>
                                <Badge
                                  class=" ml-2"
                                  size="small"
                                  count={item.count || 0}
                                  overflowCount={999}
                                  offset={[0, -16]}
                                ></Badge>

                                {date === currentdate ? (
                                  <span class="text-[tomato] text-[0.65rem] font-bold">
                                    {/* New*/}
                                    {props.translatedMenuItems[27]}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 max-md:w-[4.81rem] w-[5.81rem] text-xs  max-sm:flex-row  max-sm:justify-between ">
                              {date}
                            </div>
                            <div className=" flex max-md:w-[6.31rem] w-[6.31rem] text-xs max-sm:flex-row  max-sm:justify-between items-center justify-center ml-gap bg-[#eef2f9] h-8 "></div>

                            <div className=" flex max-md:w-[4.9rem] w-[4.9rem] items-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div class=" font-poppins ">
                                <Badge
                                  class=" ml-2"
                                  size="small"
                                  count={item.awbCount || 0}
                                  overflowCount={999}
                                  offset={[0, -16]}
                                >
                                  <Button
                                    style={{
                                      boxShadow: "#faad14 1px 2px 0px 0px",
                                    }}
                                    class=" bg-green-500"
                                    onClick={() => {
                                      handleCheckAwb();
                                      handleSetParticularOrderData(item);
                                    }}
                                  >
                                    <span className="!text-[#faad14]">
                                      {/* Ship  */}
                                      {props.translatedMenuItems[47]} ID
                                    </span>
                                  </Button>
                                </Badge>
                              </div>
                            </div>
                            <div className=" flex max-md:w-[5.9rem] w-[5.9rem] items-center justify-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.contactPersonName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                            </div>

                            <div className=" flex  items-center  ml-gap bg-[#eef2f9] h-8  max-md:w-[5rem] w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {(item.expectedPrice / 1000).toFixed(2)}k
                              </div>
                            </div>
                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 max-md:w-[5.03rem] w-[5.03rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {(item.finalPrice / 1000).toFixed(2)}k
                              </div>
                            </div>

                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 w-[8.05rem] max-md:w-[8.05rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {visible &&
                                item.orderId === particularRowData.orderId ? (
                                  <Input
                                    type="text"
                                    value={price}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                  />
                                ) : (
                                  (item.offerPrice / 1000).toFixed(2)
                                )}
                                k
                              </div>
                            </div>
                          </div>
                          <div className=" flex  max-md:w-[6.06rem] w-[3.06rem] items-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                              {visible &&
                              item.orderId === particularRowData.orderId ? (
                                <>
                                  <div className=" flex justify-between flex-col">
                                    <Button
                                      onClick={() => {
                                        handleSubmitPrice();
                                      }}
                                    >
                                      {props.translatedMenuItems[48]}{" "}
                                      {/*Save"
                                                                        /> */}
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleUpdateRevisePrice(false)
                                      }
                                    >
                                      {props.translatedMenuItems[49]}{" "}
                                      {/*Cancel"
                                                                    /> */}
                                    </Button>
                                  </div>
                                </>
                              ) : item.qcStartInd === 3 &&
                                item.priceConfirmInd === false ? (
                                <Tooltip title={props.translatedMenuItems[50]}>
                                  <PublishedWithChangesIcon
                                    onClick={() => {
                                      handleUpdateRevisePrice();
                                      handleSetParticularOrderData(item);
                                    }}
                                    className="!text-icon cursor-pointer text-[tomato]"
                                  />
                                </Tooltip>
                              ) : null}
                            </div>
                          </div>
                          <div className=" flex w-[5.1rem]  max-md:w-[15.1rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center">
                              {item.locationName}
                            </div>
                          </div>
                          <div className=" flex w-[6.04rem] max-md:w-[16.04rem]  items-center justify-center ml-gap bg-[#eef2f9] h-8 text-xs max-sm:flex-row  max-sm:justify-between ">
                            <div>
                              {item.supervisorUserName ? (
                                <MultiAvatar
                                  primaryTitle={item.supervisorUserName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              ) : (
                                <div class="text-[red]">
                                  {/* Tag Supervisor */}
                                  {props.translatedMenuItems[51]}
                                </div>
                              )}
                            </div>
                          </div>
                          <div class="flex flex-row w-[5.03rem] items-center  justify-center ml-gap bg-[#eef2f9] h-8 max-md:w-[10.03rem] max-sm:flex-row  max-sm:justify-between">
                            <div class=" font-poppins text-xs">
                              {item.shipById}
                            </div>
                          </div>
                          <div className=" flex w-[5.05rem]  max-md:w-[17.05rem] max-sm:flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center">
                              {item.productionLocationName}
                            </div>
                          </div>
                          <div className=" flex w-[3.6rem] max-md:w-[11.06rem] max-sm:flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between  ">
                            {item.inventoryReceiveInd ? null : (
                              <Tooltip
                                title={props.translatedMenuItems[52]}

                                //  Select Inventory Location"
                              >
                                <Button
                                  type="primary"
                                  className="cursor-pointer text-xs bg-[#3096e9] text-white"
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.handleOrderPickupModal(true);
                                  }}
                                >
                                  {props.translatedMenuItems[53]}
                                  {/*
                                                                    Pickup"
                                                                /> */}
                                </Button>
                              </Tooltip>
                            )}
                          </div>
                          <div class="flex items-center  justify-end w-[9.6rem]  ml-gap bg-[#eef2f9] h-8">
                            <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[54]}
                                  // "PI List"
                                >
                                  <span
                                    className="!text-icon cursor-pointer text-[green]"
                                    onClick={() => {
                                      props.handlePIModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  >
                                    PI
                                  </span>
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[5]}

                                  //     Notes"
                                  // />}
                                >
                                  <NoteAltIcon
                                    className="!text-icon cursor-pointer text-[green]"
                                    onClick={() => {
                                      props.handleNotesModalInOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[24]}

                                  //     Status"
                                  // />}
                                >
                                  <EventRepeatIcon
                                    className="!text-icon cursor-pointer"
                                    onClick={() => {
                                      props.handleStatusOfOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[55]}
                                  // "Collection"
                                >
                                  <PaidIcon
                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                    onClick={() => {
                                      props.handlePaidModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              {!item.inventoryReceiveInd ? (
                                <div class=" cursor-pointer">
                                  <Tooltip
                                    title={props.translatedMenuItems[60]}
                                    // "Add Supervisor"
                                  >
                                    <PersonAddAlt1
                                      className="!text-icon cursor-pointer"
                                      style={{
                                        color: item.supervisorUserName
                                          ? "green"
                                          : "red",
                                      }}
                                      onClick={() => {
                                        props.handleInventoryLocationInOrder(
                                          true
                                        );
                                        handleSetParticularOrderData(item);
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                              ) : null}

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[56]}

                                  //     defaultMessage="Rating"
                                  // />}
                                >
                                  <StarBorderIcon className="!text-icon cursor-pointer" />
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[57]}

                                  //     defaultMessage="Feedback"
                                >
                                  <FeedbackIcon className="!text-icon cursor-pointer text-[#10d512] " />
                                </Tooltip>
                              </div>

                              <div>
                                <PictureAsPdfIcon
                                  className="!text-icon text-[red] cursor-pointer"
                                  onClick={() => viewAnDownloadPdf(item)}
                                />
                              </div>

                              <div>
                                {item.inventoryReceiveInd ? null : (
                                  <Tooltip
                                    title={props.translatedMenuItems[58]}
                                  >
                                    <BorderColorIcon
                                      className=" !text-icon cursor-pointer text-[tomato]"
                                      onClick={() => {
                                        props.setEditOrder(item);
                                        props.handleUpdateOrder(true);
                                        handleSetParticularOrderData(item);
                                      }}
                                    />
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Tooltip title={props.translatedMenuItems[59]}>
                            <DeleteOutlineIcon
                              ClassName="!text-icon text-[tomato] cursor-pointer"
                              onClick={() => {
                                props.removeOrderAcc(
                                  {
                                    active: item.active ? false : true,
                                  },
                                  item.orderId,
                                  props.distributorId,
                                  0,
                                  "repair",
                                  "High"
                                );
                              }}
                            />
                          </Tooltip>
                        </div>
                      </div>

                      {checkAwb &&
                        item.orderId === particularRowData.orderId && (
                          <SubOrderList orderId={particularRowData.orderId} />
                        )}
                    </div>
                  );
                })}
              </>
            ) : !props.highDistributorOrder.length &&
              !props.fetchingDistributorOfHigh ? (
              <NodataFoundPage />
            ) : null}
          </InfiniteScroll>
          {/* </div> */}
        </div>
      </div>

      <div className=" flex sticky   z-auto">
        <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex  w-[100%]  bg-transparent   sticky  z-10">
            <div className="flex justify-between w-[80%]  !text-lm font-bold font-poppins">
              <div className=" max-md:w-[3.54rem] w-[3.54rem] truncate text-[white] flex justify-center bg-[teal]">
                {props.translatedMenuItems[37]} {/* normal */}
              </div>
              <div className=" max-md:w-[10.41rem] truncate w-[6.7rem]">
                {" "}
                {/* Order ID"*/}
                <DynamicFeedIcon className="!text-icon  text-[#e4eb2f]" />{" "}
                {props.translatedMenuItems[19]} ID
              </div>
              <div className=" w-[5.5rem] truncate max-md:w-[9.012rem]">
                {" "}
                {/*Created */}
                <DateRangeIcon className="!text-icon  " />{" "}
                {props.translatedMenuItems[26]}
              </div>
              <div className="w-[5.3rem] max-md:w-[9.012rem]">
                {props.translatedMenuItems[2]} {/* LOB */}
              </div>
              <div className="truncate w-[4.8rem] max-md:w-[2.81rem] "></div>
              <div className="truncate w-[5.4rem] max-md:w-[5.91rem]">
                <ContactPageIcon className="!text-icon" />{" "}
                {props.translatedMenuItems[9]}{" "}
                {/*Contact"
                            /> */}
              </div>
              <div className=" w-[4.6rem] truncate max-md:w-[6.11rem]">
                {props.translatedMenuItems[41]}{" "}
                {/* Quoted"
                            /> */}
              </div>
              <div className=" truncate max-md:w-[5.09rem] w-[4.3rem] ">
                {props.translatedMenuItems[42]}{" "}
                {/*"Final"
                            /> */}
              </div>
              <div className=" truncate w-[6.7rem] max-md:w-[5.076rem]">
                {props.translatedMenuItems[43]}{" "}
                {/*Revised"
                            /> */}
              </div>
              <div className="w-[3.5rem] truncate  max-md:w-[5.063rem] "></div>
              <div className="w-[5.9rem] max-md:w-[8.10rem] ">
                {props.translatedMenuItems[44]}{" "}
                {/* Received"
                            /> */}
              </div>
              <div className="w-[6.2rem] truncate max-md:w-[8.03rem] ">
                {props.translatedMenuItems[44]}{" "}
                {/*Supervisor"
                            /> */}
              </div>
              <div className=" w-[5.5rem] truncate max-md:w-[8.12rem]">
                <GroupsIcon className="!text-base  text-[#e4eb2f]" />{" "}
                {props.translatedMenuItems[46]}{" "}
                {/*Lead"
                            /> */}
              </div>

              <div className="w-[5rem] truncate  max-md:w-[8.02rem] ">
                <UpdateIcon className="!text-icon mr-1 text-[#ff66b3]" />{" "}
                {props.translatedMenuItems[24]}
              </div>
            </div>
          </div>
          {/* <div class="overflow-x-auto h-[64vh]"> */}
          <InfiniteScroll
            dataLength={props.highDistributorOrder.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={
              props.fetchingDistributorOfHigh ? (
                <div style={{ textAlign: "center" }}>
                  <BundleLoader />
                </div>
              ) : null
            }
            height={"35vh"}
            style={{ scrollbarWidth: "thin" }}
          >
            {props.highDistributorOrder.length ? (
              <>
                {props.highDistributorOrder.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div
                        className={`flex rounded mt-1  items-center bg-white py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid  leading-3 hover:border-[#23A0BE] hover:shadow-[#23A0BE]
`}
                      >
                        <div
                          className={`flex ${
                            item.active
                              ? ""
                              : "opacity-50 cursor-not-allowed pointer-events-none"
                          }
  `}
                        >
                          <div class="flex w-[42rem] ">
                            <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] w-[3.56rem] max-md:w-[2.56rem] max-sm:  ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between  max-md:flex-col">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                    {item.priority === "High" && (
                                      <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>
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
                            </div>

                            <div className=" flex items-center  ml-gap bg-[#eef2f9] w-[7.4rem] h-8 max-md:w-[7.4rem] max-sm:flex-row  max-sm:justify-between">
                              <div class=" text-xs ml-gap items-center font-poppins">
                                <span
                                  class="underline cursor-pointer font-bold text-[#1890ff]"
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.handleOrderDetailsModal(true);
                                  }}
                                >
                                  {item.newOrderNo}
                                </span>
                                <Badge
                                  class=" ml-2"
                                  size="small"
                                  count={item.count || 0}
                                  overflowCount={999}
                                  offset={[0, -16]}
                                ></Badge>

                                {date === currentdate ? (
                                  <span class="text-[tomato] text-[0.65rem] font-bold">
                                    {/* New*/}
                                    {props.translatedMenuItems[27]}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 max-md:w-[4.81rem] w-[5.81rem] text-xs  max-sm:flex-row  max-sm:justify-between ">
                              {date}
                            </div>
                            <div className=" flex max-md:w-[6.31rem] w-[6.31rem] text-xs max-sm:flex-row  max-sm:justify-between items-center justify-center ml-gap bg-[#eef2f9] h-8 "></div>

                            <div className=" flex max-md:w-[4.9rem] w-[4.9rem] items-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                              <div class=" font-poppins ">
                                <Badge
                                  class=" ml-2"
                                  size="small"
                                  count={item.awbCount || 0}
                                  overflowCount={999}
                                  offset={[0, -16]}
                                >
                                  <Button
                                    style={{
                                      boxShadow: "#faad14 1px 2px 0px 0px",
                                    }}
                                    class=" bg-green-500"
                                    onClick={() => {
                                      handleCheckAwb();
                                      handleSetParticularOrderData(item);
                                    }}
                                  >
                                    <span className="!text-[#faad14]">
                                      {/* Ship  */}
                                      {props.translatedMenuItems[47]} ID
                                    </span>
                                  </Button>
                                </Badge>
                              </div>
                            </div>
                            <div className=" flex max-md:w-[5.9rem] w-[5.9rem] items-center justify-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.contactPersonName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                            </div>

                            <div className=" flex  items-center  ml-gap bg-[#eef2f9] h-8  max-md:w-[5rem] w-[5rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {(item.expectedPrice / 1000).toFixed(2)}k
                              </div>
                            </div>
                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 max-md:w-[5.03rem] w-[5.03rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {(item.finalPrice / 1000).toFixed(2)}k
                              </div>
                            </div>

                            <div className=" flex items-center  ml-gap bg-[#eef2f9] h-8 w-[8.05rem] max-md:w-[8.05rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <CurrencySymbol
                                  currencyType={item.orderCurrencyName}
                                />{" "}
                                {visible &&
                                item.orderId === particularRowData.orderId ? (
                                  <Input
                                    type="text"
                                    value={price}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                  />
                                ) : (
                                  (item.offerPrice / 1000).toFixed(2)
                                )}
                                k
                              </div>
                            </div>
                          </div>
                          <div className=" flex  max-md:w-[6.06rem] w-[3.06rem] items-center  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins">
                              {visible &&
                              item.orderId === particularRowData.orderId ? (
                                <>
                                  <div className=" flex justify-between flex-col">
                                    <Button
                                      onClick={() => {
                                        handleSubmitPrice();
                                      }}
                                    >
                                      {props.translatedMenuItems[48]}{" "}
                                      {/*Save"
                                                                        /> */}
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleUpdateRevisePrice(false)
                                      }
                                    >
                                      {props.translatedMenuItems[49]}{" "}
                                      {/*Cancel"
                                                                    /> */}
                                    </Button>
                                  </div>
                                </>
                              ) : item.qcStartInd === 3 &&
                                item.priceConfirmInd === false ? (
                                <Tooltip title={props.translatedMenuItems[50]}>
                                  <PublishedWithChangesIcon
                                    onClick={() => {
                                      handleUpdateRevisePrice();
                                      handleSetParticularOrderData(item);
                                    }}
                                    className="!text-icon cursor-pointer text-[tomato]"
                                  />
                                </Tooltip>
                              ) : null}
                            </div>
                          </div>
                          <div className=" flex w-[5.1rem]  max-md:w-[15.1rem] items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center">
                              {item.locationName}
                            </div>
                          </div>
                          <div className=" flex w-[6.04rem] max-md:w-[16.04rem]  items-center justify-center ml-gap bg-[#eef2f9] h-8 text-xs max-sm:flex-row  max-sm:justify-between ">
                            <div>
                              {item.supervisorUserName ? (
                                <MultiAvatar
                                  primaryTitle={item.supervisorUserName}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              ) : (
                                <div class="text-[red]">
                                  {/* Tag Supervisor */}
                                  {props.translatedMenuItems[51]}
                                </div>
                              )}
                              {/* <span style={{ color: item.supervisorUserName ? "green" : "red" }}>
                                                            {item.supervisorUserName ? item.supervisorUserName : "Tag Supervisor"}
                                                        </span> */}
                            </div>
                          </div>
                          <div class="flex flex-row w-[5.03rem] items-center  justify-center ml-gap bg-[#eef2f9] h-8 max-md:w-[10.03rem] max-sm:flex-row  max-sm:justify-between">
                            <div class=" font-poppins text-xs">
                              {item.shipById}
                            </div>
                          </div>
                          <div className=" flex w-[5.05rem]  max-md:w-[17.05rem] max-sm:flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center">
                              {item.productionLocationName}
                            </div>
                          </div>
                          <div className=" flex w-[3.6rem] max-md:w-[11.06rem] max-sm:flex-row items-center justify-center ml-gap bg-[#eef2f9] h-8 max-sm:justify-between  ">
                            {item.inventoryReceiveInd ? null : (
                              <Tooltip
                                title={props.translatedMenuItems[52]}

                                //  Select Inventory Location"
                              >
                                <Button
                                  type="primary"
                                  className="cursor-pointer text-xs bg-[#3096e9] text-white"
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.handleOrderPickupModal(true);
                                  }}
                                >
                                  {props.translatedMenuItems[53]}
                                  {/*
                                                                    Pickup"
                                                                /> */}
                                </Button>
                              </Tooltip>
                            )}
                          </div>
                          <div class="flex items-center  justify-end w-[9.6rem]  ml-gap bg-[#eef2f9] h-8">
                            <div class="flex flex-row  max-sm:flex-row max-sm:w-[10%]">
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[54]}
                                  // "PI List"
                                >
                                  <span
                                    className="!text-icon cursor-pointer text-[green]"
                                    onClick={() => {
                                      props.handlePIModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  >
                                    PI
                                  </span>
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[5]}

                                  //     Notes"
                                  // />}
                                >
                                  <NoteAltIcon
                                    className="!text-icon cursor-pointer text-[green]"
                                    onClick={() => {
                                      props.handleNotesModalInOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[24]}

                                  //     Status"
                                  // />}
                                >
                                  <EventRepeatIcon
                                    className="!text-icon cursor-pointer"
                                    onClick={() => {
                                      props.handleStatusOfOrder(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[55]}
                                  // "Collection"
                                >
                                  <PaidIcon
                                    className="!text-icon cursor-pointer text-[#e5625e]"
                                    onClick={() => {
                                      props.handlePaidModal(true);
                                      handleSetParticularOrderData(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              {!item.inventoryReceiveInd ? (
                                <div class=" cursor-pointer">
                                  <Tooltip
                                    title={props.translatedMenuItems[60]}
                                    // "Add Supervisor"
                                  >
                                    <PersonAddAlt1
                                      className="!text-icon cursor-pointer"
                                      style={{
                                        color: item.supervisorUserName
                                          ? "green"
                                          : "red",
                                      }}
                                      onClick={() => {
                                        props.handleInventoryLocationInOrder(
                                          true
                                        );
                                        handleSetParticularOrderData(item);
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                              ) : null}

                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[56]}

                                  //     defaultMessage="Rating"
                                  // />}
                                >
                                  <StarBorderIcon className="!text-icon cursor-pointer" />
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip
                                  title={props.translatedMenuItems[57]}

                                  //     defaultMessage="Feedback"
                                >
                                  <FeedbackIcon className="!text-icon cursor-pointer text-[#10d512] " />
                                </Tooltip>
                              </div>

                              <div>
                                <PictureAsPdfIcon
                                  className="!text-icon text-[red] cursor-pointer"
                                  onClick={() => viewAnDownloadPdf(item)}
                                />
                              </div>

                              <div>
                                {item.inventoryReceiveInd ? null : (
                                  <Tooltip
                                    title={props.translatedMenuItems[58]}
                                  >
                                    <BorderColorIcon
                                      className=" !text-icon cursor-pointer text-[tomato]"
                                      onClick={() => {
                                        props.setEditOrder(item);
                                        props.handleUpdateOrder(true);
                                        handleSetParticularOrderData(item);
                                      }}
                                    />
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Tooltip title={props.translatedMenuItems[59]}>
                            <DeleteOutlineIcon
                              ClassName="!text-icon text-[tomato] cursor-pointer"
                              onClick={() => {
                                props.removeOrderAcc(
                                  {
                                    active: item.active ? false : true,
                                  },
                                  item.orderId,
                                  props.distributorId,
                                  0,
                                  "repair",
                                  "High"
                                );
                              }}
                            />
                          </Tooltip>
                        </div>
                      </div>

                      {checkAwb &&
                        item.orderId === particularRowData.orderId && (
                          <SubOrderList orderId={particularRowData.orderId} />
                        )}
                    </div>
                  );
                })}
              </>
            ) : !props.highDistributorOrder.length &&
              !props.fetchingDistributorOfHigh ? (
              <NodataFoundPage />
            ) : null}
          </InfiniteScroll>
          {/* </div> */}
        </div>
      </div>

      <AddLocationInOrder
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        translatedMenuItems={props.translatedMenuItems}
        particularRowData={particularRowData}
        addInventoryInOrder={props.addInventoryInOrder}
        handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
      />
      <AddPickupModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        handleOrderPickupModal={props.handleOrderPickupModal}
        addpickupLocation={props.addpickupLocation}
        particularRowData={particularRowData}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AddNotesOrderModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AccountOrderDetailsModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal}
        translatedMenuItems={props.translatedMenuItems}
      />
      <StatusOfOrderModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        handleStatusOfOrder={props.handleStatusOfOrder}
        addStatusOfOrder={props.addStatusOfOrder}
        particularRowData={particularRowData}
        translatedMenuItems={props.translatedMenuItems}
      />
      <PaidButtonModal
        distributorId={props.distributorId}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        type={props.type}
        addPaidButtonModal={props.addPaidButtonModal}
        handlePaidModal={props.handlePaidModal}
        particularRowData={particularRowData}
        activeTab={props.activeTab}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AccountproductionModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        accountOrderProduction={props.accountOrderProduction}
        handleAccountProduction={props.handleAccountProduction}
        translatedMenuItems={props.translatedMenuItems}
      />
      <UpdateOrderModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        distributorId={props.distributorId}
        handleUpdateOrder={props.handleUpdateOrder}
        updateOrderModal={props.updateOrderModal}
        translatedMenuItems={props.translatedMenuItems}
      />
      <PIOPenModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        particularRowData={particularRowData}
        distributorId={props.distributorId}
        handlePIModal={props.handlePIModal}
        piButtonModal={props.piButtonModal}
        translatedMenuItems={props.translatedMenuItems}
      />
    </>
  );
};
const mapStateToProps = ({ distributor, auth, departments }) => ({
  accountOrderProduction: distributor.accountOrderProduction,
  distributorOrder: distributor.distributorOrder,
  addNotesInOrder: distributor.addNotesInOrder,
  inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
  addInventoryInOrder: distributor.addInventoryInOrder,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  addStatusOfOrder: distributor.addStatusOfOrder,
  updateOrderModal: distributor.updateOrderModal,
  addPaidButtonModal: distributor.addPaidButtonModal,
  orgId: auth.userDetails.organizationId,
  addpickupLocation: distributor.addpickupLocation,

  userId: auth.userDetails.userId,

  updatingSuborderAwb: distributor.updatingSuborderAwb,
  addingLocationInOrder: distributor.addingLocationInOrder,
  fetchingDistributorByDistributorId:
    distributor.fetchingDistributorByDistributorId,
  highDistributorOrder: distributor.highDistributorOrder,
  fetchingDistributorOfHigh: distributor.fetchingDistributorOfHigh,
  mediumdistributorOrder: distributor.mediumdistributorOrder,
  fetchingDistributorOfMedium: distributor.fetchingDistributorOfMedium,
  lowDistributorOrder: distributor.lowDistributorOrder,
  fetchingDistributorOfLow: distributor.fetchingDistributorOfLow,
  piButtonModal: distributor.piButtonModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderByDistributorId,
      getDistributorOrderOfHigh,
      getDistributorOrderOfMedium,
      getDistributorOrderOfLow,
      handleInventoryLocationInOrder,
      handleOrderDetailsModal,
      handleStatusOfOrder,
      handlePaidModal,
      handleNotesModalInOrder,
      updateOfferPrice,
      handleAccountProduction,
      handleUpdateOrder,
      setEditOrder,
      handleOrderPickupModal,
      removeOrderAcc,
      deleteDistributorData,
      getLocationList,
      updateSubOrderAwb,
      getOrderRecords,
      handlePIModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderTable);
