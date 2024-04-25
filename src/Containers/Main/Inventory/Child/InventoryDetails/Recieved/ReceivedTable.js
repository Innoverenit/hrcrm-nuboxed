import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select, } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getReceivedUserList,
  handleReceivedModal,
  handleDeliveryDateModal,
  setEditReceiveInventory,
  handleReceivedOrderIdModal,
  updateInspection,
  handleMismatchPhoneModal,
  handleInventoryReceivedNoteOrderModal,
  addDeliveryDate,
} from "../../../InventoryAction";
import { getLocationList } from "../../../../Account/AccountAction"
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import ReceivedOrderToggle from "./ReceivedOrderToggle";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import LabelOffIcon from '@mui/icons-material/LabelOff';
import ReceivedMismatchModal from "./ReceivedMismatchModal";

const DeliveryDateModal = lazy(() => import("./DeliveryDateModal"));
const OpenReceivedOrderIdModal = lazy(() => import("./OpenReceivedOrderIdModal"));
const { Option } = Select;

const ReceivedTable = (props) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getLocationList(props.orgId);
    props.getReceivedUserList(props.locationDetailsId)
  }, [])

  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getReceivedUserList(props.locationDetailsId)
  };

  const [rowData, setRowData] = useState({})
  const handleRowData = (item) => {
    setRowData(item)
  }
  const [pause, setpause] = useState(false)

  function handlePauseResume() {
    setpause(!pause)
  }
  const [locationChange, setLocationChange] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  function handleChangeLocation(id) {
    setLocationValue(id)
  }
  function handlelocation() {
    setLocationChange(!locationChange);
  }
  function handleCallback() {
    setLocationChange(false)
    setLocationValue("")
  }
  const productionLocation = props.inventory.filter((item) => {
    return item.productionInd === true
  })
  return (
    <>
      {props.fetchingReceivedUserList ? <BundleLoader /> :
        <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className=" flex max-sm:hidden  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
              <div className=" w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
              <div className=" w-[11.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
              <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
              <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.owner" defaultMessage="owner" /></div>
              <div className="w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.phone" defaultMessage="Phones #" /></div>
              <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.inspectedby" defaultMessage="Inspected By" /></div>
              <div className="w-[5.2rem]"></div>
              <div className="w-[7.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
              <div className="w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage id="app.location" defaultMessage="Location" /></div>
              <div className="w-[7.31rem]"></div>
              <div className="w-[2.1rem]"></div>
              <div className="w-[2.01rem]"></div>
            </div>
            <InfiniteScroll
              dataLength={props.allReceivedUser.length}
              // next={handleLoadMore}
              // hasMore={hasMore}
              // loader={props.fetchingReceivedUserList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            >
              {props.allReceivedUser.length ? <>
                {props.allReceivedUser.map((item, key) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 max-sm:h-[7rem] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[11rem] max-xl:w-[7rem] max-lg:w-[5.5rem] max-sm:w-auto  ">
                            <div class="text-sm text-cardBody font-semibold max-sm:text-sm  font-poppins cursor-pointer  text-blue-600 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              <div class=" flex ">
                                <span
                                  onClick={() => {
                                    handleRowData(item);
                                    props.handleReceivedOrderIdModal(true);
                                  }}
                                >{item.newOrderNo}
                                </span>&nbsp;&nbsp;
                                {date === currentdate ? (
                                  <div class="text-xs font-bold text-[tomato]">
                                    New
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col w-[11.1rem] max-xl:w-[8.1rem] max-lg:w-[5.7rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              {item.distributorName}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[5.5rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              <MultiAvatar
                                primaryTitle={item.contactPersonName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.5rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              <MultiAvatar
                                primaryTitle={item.userName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[8.21rem] max-xl:w-[6.21rem] max-lg:w-[4.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.5rem] max-xl:w-[3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.inspectionInd !== 0 && <MultiAvatar
                                primaryTitle={item.startInspectionUserName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5rem] max-xl:w-[4rem] max-lg:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.phoneReceiveCount}/{item.phoneCount}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[7.5rem] max-xl:w-[5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div>
                              {item.inspectionInd === 0 ? <ReceivedOrderToggle
                                orderId={item.orderPhoneId}
                                locationId={props.locationDetailsId}
                                inventoryReceiveInd={item.inventoryReceiveInd}
                              /> : <b className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">Received</b>}
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col  w-[7.51rem] max-xl:w-[5.01rem] max-lg:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.productionLocationName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[8rem] max-xl:w-[8rem] max-lg:w-[7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.inspectionInd === 0 && item.inventoryReceiveInd ?
                                <Button
                                  loading={item.orderId === rowData.orderId && props.updatingInspection}
                                  type="primary"
                                  className="w-28 text-base"
                                  onClick={() => {
                                    handleRowData(item)
                                    props.updateInspection({
                                      inspectionInd: 1,
                                      startInspectionUser: props.userId,
                                      startInspectionDate: dayjs()
                                    }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                >
                                  Start Inspection
                                </Button>
                                : item.inspectionInd === 2 && item.inventoryReceiveInd ?
                                  <Button
                                    className="cursor-pointer text-base"
                                    // onClick={() => {
                                    //   handleRowData(item)
                                    //   handlelocation();
                                    // }}
                                    onClick={() => {
                                      props.addDeliveryDate({
                                        transferInd: 2,
                                        inspectionInd: 3,
                                        locationId: props.locationDetailsId,
                                        userId: props.userId,
                                        orderPhoneId: item.orderPhoneId
                                      }, handleCallback())
                                    }}
                                  >
                                    Send To Store
                                  </Button> :
                                  item.inspectionInd === 1 && item.inventoryReceiveInd ?
                                    <Button
                                      className="w-28 text-base"
                                      type="primary"
                                      onClick={handlePauseResume}>
                                      {pause ? "Resume Inspection" : "Pause Inspection"}
                                    </Button> : item.inventoryReceiveInd ? <b>Sent To Facility</b> : null}
                            </div>
                          </div>

                          <div class="flex flex-col w-[3rem] max-sm:flex-row max-sm:w-auto">
                            <div>
                              <Tooltip title="Notes">
                                <NoteAltIcon
                                  className="!text-base cursor-pointer"
                                  onClick={() => {
                                    handleRowData(item);
                                    props.handleInventoryReceivedNoteOrderModal(true);
                                  }}
                                />

                              </Tooltip>
                            </div>
                          </div>
                          <div class="flex flex-col w-[2rem] max-sm:flex-row max-sm:w-auto">
                            {item.mismatchOrderInd &&
                              <div>
                                <Tooltip title="Mismatch Phones">
                                  <LabelOffIcon
                                    class=" text-red-700"
                                    onClick={() => {
                                      handleRowData(item);
                                      props.handleMismatchPhoneModal(true)
                                    }}
                                  />

                                </Tooltip>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </> : !props.allReceivedUser.length
                && !props.fetchingReceivedUserList ? <NodataFoundPage /> : null}

            </InfiniteScroll>
          </div>
        </div>}

      <DeliveryDateModal
        rowData={rowData}
        addDeliverDate={props.addDeliverDate}
        handleDeliveryDateModal={props.handleDeliveryDateModal}
      />

      <OpenReceivedOrderIdModal
        locationDetailsId={props.locationDetailsId}
        rowData={rowData}
        receivedOrdeIdModal={props.receivedOrdeIdModal}
        handleReceivedOrderIdModal={props.handleReceivedOrderIdModal}
      />
      <ReceivedMismatchModal
        rowData={rowData}
        handleMismatchPhoneModal={props.handleMismatchPhoneModal}
        mismatchPhoneModal={props.mismatchPhoneModal}
      />
    </>
  );
}


const mapStateToProps = ({ inventory, distributor, auth }) => ({
  updatingInspection: inventory.updatingInspection,
  fetchingReceivedUserList: inventory.fetchingReceivedUserList,
  allReceivedUser: inventory.allReceivedUser,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  addDeliverDate: inventory.addDeliverDate,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  inventory: inventory.inventory,
  mismatchPhoneModal: inventory.mismatchPhoneModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditReceiveInventory,
      getReceivedUserList,
      handleMismatchPhoneModal,
      handleReceivedModal,
      handleDeliveryDateModal,
      handleReceivedOrderIdModal,
      handleInventoryReceivedNoteOrderModal,
      updateInspection,
      getLocationList,
      addDeliveryDate
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)
);
