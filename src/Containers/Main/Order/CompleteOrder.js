import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import PaidIcon from "@mui/icons-material/Paid";
import dayjs from "dayjs";
import {
  getCompleteOrders,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  emptyOrders,
} from "./OrderAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { MultiAvatar2 } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";

const AddNotesOrderDrawer = lazy(() => import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() =>
  import(
    "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"
  )
);
const StatusOfOrderModal = lazy(() =>
  import("../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal")
);
const PaidButtonModal = lazy(() =>
  import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal")
);
function CompleteOrder(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getCompleteOrders(props.userId, page);
    setPage(page + 1);
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const [particularRowData, setParticularRowData] = useState({});
  const [show, setshow] = useState(false);
  const [orderId, setorderId] = useState("");
  function handleOrder(orderId) {
    setshow(true);
    setorderId(orderId);
  }
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getCompleteOrders(props.userId, page);
  };
  useEffect(() => {
    return () => props.emptyOrders();
  }, []);

  return (
    <>
      <OnlyWrapCard style={{ backgroundColor: "white" }}>
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
          <div className="w-[12rem] max-md:w-[12rem]">
            {props.translatedMenuItems[14]} ID
          </div>
          <div className="w-[28rem] max-md:w-[28rem]">
            {" "}
            {props.translatedMenuItems[18]}
          </div>
          <div className="w-[28rem] max-md:w-[28rem] ">
            {props.translatedMenuItems[19]}
          </div>
          <div className="w-[32rem] max-md:w-[32rem]">
            # {props.translatedMenuItems[35]}
          </div>
          <div className="w-[16rem] max-md:w-[16rem]">
            {props.translatedMenuItems[36]}
          </div>
          <div className="w-[24rem] max-md:w-[24rem]"></div>
        </div>
        <InfiniteScroll
          dataLength={props.comepletOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            props.fetchingCompleteOrders ? (
              <div>
                <BundleLoader />
              </div>
            ) : null
          }
          height={"80vh"}
          style={{ scrollbarWidth: "thin" }}
          endMessage={
            <p class="flex text-center font-poppins font-bold text-xs text-red-500">
              {props.translatedMenuItems[31]}.{" "}
            </p>
          }
        >
          {props.comepletOrder.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex">
                    <div className=" flex items-center w-wk   max-sm:w-full">
                      <div className="flex  items-center max-sm:w-full">
                        <div class="w-60">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold"
                              onClick={() => {
                                handleOrder(item.orderId);
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}
                            >
                              {`${item.newOrderNo} `}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class=" cursor-pointer text-red-600 font-bold text-[0.65rem]">
                                  {props.translatedMenuItems[25]}
                                </span>
                              ) : null}
                            </span>
                          </Badge>
                        </div>
                        <div class="w-[4%]"></div>

                        <div class="max-sm:w-full md:w-44">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-44 max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex   md:w-48 max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class=" text-xs  font-poppins">{item.noOfPhones}</h4>
                    </div>
                    <div className=" flex  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                      <span>{date}</span>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex   md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </h4>
                    </div>
                    <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs  font-poppins">
                        <Tooltip title={props.translatedMenuItems[27]}>
                          <NoteAltIcon
                            className=" cursor-pointer text-green-600 !text-icon"
                            onClick={() => {
                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>
                    </div>
                    <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs  font-poppins">
                        <Tooltip title={props.translatedMenuItems[16]}>
                          <EventRepeatIcon
                            className=" cursor-pointer !text-icon"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>
                    </div>
                    <div className=" flex  w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs  font-poppins">
                        <Tooltip title={props.translatedMenuItems[28]}>
                          <PaidIcon
                            className=" cursor-pointer  !text-icon"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </OnlyWrapCard>
      <Suspense>
        <AddNotesOrderDrawer
          particularRowData={particularRowData}
          addNotesInOrder={props.addNotesInOrder}
          handleNotesModalInOrder={props.handleNotesModalInOrder}
        />
        <StatusOfOrderModal
          handleStatusOfOrder={props.handleStatusOfOrder}
          addStatusOfOrder={props.addStatusOfOrder}
          particularRowData={particularRowData}
        />
        <PaidButtonModal
          type={props.type}
          addPaidButtonModal={props.addPaidButtonModal}
          handlePaidModal={props.handlePaidModal}
          particularRowData={particularRowData}
          translatedMenuItems={props.translatedMenuItems}
          modalTitleKey={0}
        />
        <AccountOrderDetailsModal
          particularRowData={particularRowData}
          handleOrderDetailsModal={props.handleOrderDetailsModal}
          addOrderDetailsModal={props.addOrderDetailsModal}
        />
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ order, auth, distributor }) => ({
  allOrderList: order.allOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  fetchingCompleteOrdersError: order.fetchingCompleteOrdersError,
  fetchingCompleteOrders: order.fetchingCompleteOrders,
  userId: auth.userDetails.userId,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  comepletOrder: order.comepletOrder,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCompleteOrders,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      handleOrderDetailsModal,
      emptyOrders,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
