import React, { useState, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, } from "antd";
import { getAllShipper } from "../../../../Shipper/ShipperAction";
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getDispatchList,
  addFinalDispatchData,
  handlePickupDateModal,
  updateDispatchInspectionButton,
  handleCreateAWB
} from "../../../InventoryAction"
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";

const DispatchPhoneListModal = lazy(() => import("./DispatchPhoneListModal"));
const DispatchPackedToggle = lazy(() => import("./DispatchPackedToggle"));
const DispatchValidationToggle = lazy(() => import("./DispatchValidationToggle"));
const DispatchOrderAwbModal = lazy(() => import("./DispatchOrderAwbModal"));

function DispatchTable(props) {
  useEffect(() => {
    props.getDispatchList(props.locationDetailsId);
    props.getAllShipper()
  }, []);

  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    props.getDispatchList(props.locationDetailsId);
  };
  const [rowData, setRowData] = useState({})
  const handleRowData = (item) => {
    setRowData(item)
  }

  return (
    <>
      {props.fetchingDispatchList ? <BundleLoader /> :
        <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg max-sm:m-1 m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className=" flex max-sm:hidden justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
              <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
              <div className=" w-[4.012rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.01rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
              <div className=" w-[3.22rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.22rem] "><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
              <div className="w-[4.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.5rem]"><FormattedMessage id="app.units" defaultMessage="Units" /></div>
              <div className="w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.001rem]"><FormattedMessage id="app.inspection" defaultMessage="Inspection" /></div>

              <div className="w-[4.03rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.03rem]"><FormattedMessage id="app.packed" defaultMessage="Packed ?" /></div>
              <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.3rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery" /></div>
              <div className=" w-[6.03rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.03rem]"><FormattedMessage id="app.shipper" defaultMessage="Shipper" /></div>
              < div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem]"><FormattedMessage id="app.pickup" defaultMessage="pickup" /></div>
              <div className=" w-[4.10rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.10rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
              <div className=" w-[3.20rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.20rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div>
              <div className="w-[3.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.5rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
              <div className="w-[2%]"></div>
            </div>
            <InfiniteScroll
              dataLength={props.allDispatchList.length}
              // next={handleLoadMore}
              // hasMore={hasMore}
              // loader={props.fetchingDispatchList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            >
              {props.allDispatchList.length ? <>
                {props.allDispatchList.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 max-sm:h-[7rem] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex font-medium flex-col w-[7.2rem] max-xl:w-[5.2rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                            <div class="text-sm flex text-cardBody font-semibold  font-poppins cursor-pointer  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm text-blue-600">
                              <div
                                onClick={() => {
                                  handleRowData(item);
                                  props.handlePickupDateModal(true);
                                }}
                              >{item.newOrderNo}</div>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-xs font-bold text-[tomato]">
                                  New
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.4rem] max-xl:w-[3.4rem] max-lg:w-[2.5rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-poppins">
                              <MultiAvatar2
                                primaryTitle={item.distributorName}
                                imageURL={item.imageURL}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[4.1rem] max-xl:w-[3.41rem] max-lg:w-[2.41rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                              <MultiAvatar2
                                primaryTitle={item.contactPersonName}
                                imageURL={item.imageURL}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div>

                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">


                          <div className=" flex font-medium flex-col w-[5.4rem] max-xl:w-[2.6rem] max-lg:w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[6.5rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 ?
                                <Button
                                  loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingDispatchInspectionButton}
                                  onClick={() => {
                                    handleRowData(item);
                                    props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                  style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                                  Start
                                </Button>
                                : item.dispatchInspectionInd === 2 ||
                                  item.dispatchInspectionInd === 3 ||
                                  item.dispatchInspectionInd === 4 ?
                                  <b>Completed</b>
                                  : item.dispatchInspectionInd === 1 ?
                                    <Button
                                      style={{ fontWeight: "500", color: "white" }}
                                      // onClick={() => props.updateDispatchInspectionButton({ dispatchInspectionInd : 1 }, item.orderPhoneId, props.locationDetailsId)}
                                      type="primary">
                                      Pause
                                    </Button> :
                                    null}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[4.8rem] max-xl:w-[4.8rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
                                null : <DispatchPackedToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex font-medium flex-col w-[7.76rem] max-xl:w-[4.26rem] max-lg:w-[3.26rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.unloadingAddresses && item.unloadingAddresses[0].city || ""}
                            </div>
                          </div>

                          <div className=" flex font-medium flex-col w-[6.78rem] max-xl:w-[4.58rem] max-lg:w-[3.58rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.shipperName === "null" ? "" : item.shipperName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.5rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.pickUp === "null" ? "" : dayjs(item.pickUp).format("DD-MM-YYYY")}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[7.01rem] max-xl:w-[5.01rem] max-lg:w-[3.71rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.unloadingAddresses && item.unloadingAddresses[0].city && !item.newAwbNo ? <Button type="primary"
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleCreateAWB(true)
                                }}>Create AWB</Button> : item.newAwbNo}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[4.2rem] max-lg:w-[2.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.status === "null" ? "" : item.status}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col w-[5rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 4 && item.newAwbNo &&
                                <DispatchValidationToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                          <div class="flex flex-col md:w-[2rem] max-sm:flex-row max-sm:w-[6%]">
                            <div>
                              <Tooltip title="Notes">
                                <NoteAltIcon
                                  style={{ cursor: "pointer", fontSize: "13px" }}
                                />

                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
                : !props.allDispatchList.length
                  && !props.fetchingDispatchList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>}



      <DispatchPhoneListModal
        rowData={rowData}
        handlePickupDateModal={props.handlePickupDateModal}
        openPickupDateModal={props.openPickupDateModal}
      />
      <DispatchOrderAwbModal
        rowData={rowData}
        addCreateAwb={props.addCreateAwb}
        handleCreateAWB={props.handleCreateAWB}
      />
    </>
  );
}

const mapStateToProps = ({ shipper, inventory, auth, dispatch }) => ({
  allDispatchList: inventory.allDispatchList,
  allShipper: shipper.allShipper,
  openPickupDateModal: inventory.openPickupDateModal,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  pickUpModal: inventory.pickUpModal,
  userId: auth.userDetails.userId,
  fetchingDispatchList: inventory.fetchingDispatchList,
  addCreateAwb: inventory.addCreateAwb,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllShipper,
      getDispatchList,
      handlePickupDateModal,
      updateDispatchInspectionButton,
      addFinalDispatchData,
      handleCreateAWB
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DispatchTable)
);
