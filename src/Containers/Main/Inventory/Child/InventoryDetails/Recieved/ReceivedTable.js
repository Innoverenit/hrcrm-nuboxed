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
            <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
              <div className=" md:w-[11rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
              <div className=" md:w-[8rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
              <div className="md:w-[6rem]"><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
              <div className="md:w-[6rem]"><FormattedMessage id="app.inspectedby" defaultMessage="Inspected By" /></div>
              <div className="md:w-[5rem]"></div>
              <div className="md:w-[7rem]"><FormattedMessage id="app.phone" defaultMessage="Phones #" /></div>
              <div className="md:w-[7rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
              <div className="md:w-[7rem]"><FormattedMessage id="app.location" defaultMessage="Location" /></div>
              <div className="md:w-[7rem]"></div>
              <div className="md:w-[2rem]"></div>
              <div className="md:w-[2rem]"></div>
            </div>
            <InfiniteScroll
              dataLength={props.allReceivedUser.length}
              // next={handleLoadMore}
              // hasMore={hasMore}
              // loader={props.fetchingReceivedUserList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            >
              {props.allReceivedUser.length ? <>
                {props.allReceivedUser.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">

                        <div className=" flex font-medium flex-col md:w-[11rem] max-sm:w-full  ">
                          <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer underline text-blue-600">
                            <div class=" flex justify-evenly">
                              <div
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleReceivedOrderIdModal(true);
                                }}
                              >{item.newOrderNo}
                              </div>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-xs font-bold text-[tomato]">
                                  New
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins">

                            {item.distributorName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">

                            <MultiAvatar
                              primaryTitle={item.contactPersonName}
                              imageId={item.imageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">

                            <MultiAvatar
                              primaryTitle={item.startInspectionUserName}
                              imageId={item.imageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.phoneReceiveCount}/{item.phoneCount}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div>
                            {item.inspectionInd === 0 ? <ReceivedOrderToggle
                              orderId={item.orderPhoneId}
                              locationId={props.locationDetailsId}
                              inventoryReceiveInd={item.inventoryReceiveInd}
                            /> : <b>Received</b>}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            {locationChange && (item.orderPhoneId === rowData.orderPhoneId) ?
                              <>
                                <Select
                                  value={locationValue}
                                  onChange={(value) =>
                                    handleChangeLocation(value)
                                  }
                                >
                                  {productionLocation.map((a) => {
                                    return <Option value={a.locationDetailsId}>{a.locationName}</Option>;
                                  })}
                                </Select>
                                <div>
                                  <Button
                                    type='primary'
                                    loading={props.addingLocationInOrder}
                                    onClick={() => {
                                      props.addDeliveryDate({
                                        transferInd: 2,
                                        inspectionInd: 3,
                                        locationId: locationValue,
                                        userId: props.userId,
                                        orderPhoneId: item.orderPhoneId
                                      }, handleCallback())
                                    }}>Save</Button>
                                  <Button onClick={handlelocation}>Cancel</Button>
                                </div>
                              </>
                              : item.locationName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
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
                                  onClick={() => {
                                    handleRowData(item)
                                    handlelocation();
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
                                  </Button> : item.inventoryReceiveInd ? <b>Store locator</b> : null}
                          </div>
                        </div>

                        <div class="flex flex-col md:w-[3rem] max-sm:flex-row max-sm:w-[6%]">
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
                        <div class="flex flex-col md:w-[2rem] max-sm:flex-row max-sm:w-[6%]">
                          {/* {item.mismatchOrderInd && */}
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
                          {/* } */}
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
