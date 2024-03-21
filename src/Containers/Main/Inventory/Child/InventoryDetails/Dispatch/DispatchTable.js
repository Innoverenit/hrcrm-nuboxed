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
          <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
              <div className=""></div>
              <div className=" md:w-[7%]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
              <div className=" md:w-[5rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
              <div className=" md:w-[5rem] "><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
              <div className="md:w-[3rem]"><FormattedMessage id="app.units" defaultMessage="Units" /></div>
              <div className="md:w-[6rem]"><FormattedMessage id="app.inspection" defaultMessage="Inspection" /></div>
              <div className="md:w-[5rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery" /></div>
              <div className="md:w-[5rem]"><FormattedMessage id="app.packed" defaultMessage="Packed ?" /></div>

              <div className=" md:w-[5rem]"><FormattedMessage id="app.shipper" defaultMessage="Shipper" /></div>
              < div className=" md:w-[3.5rem]"><FormattedMessage id="app.pickup" defaultMessage="pickup" /></div>
              <div className=" md:w-[5rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
              <div className=" md:w-[5rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div>
              <div className="md:w-[4rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
              <div className="md:w-[2%]"></div>
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
                      <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
                        <div class="flex">

                          <div className=" flex font-medium flex-col md:w-[7%] max-sm:w-full  ">
                            <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
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


                        </div>

                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins">
                            <MultiAvatar2
                              primaryTitle={item.distributorName}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            <MultiAvatar2
                              primaryTitle={item.contactPersonName}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </div>


                        <div className=" flex font-medium flex-col md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.dispatchInspectionInd === 0 ?
                              <Button
                                onClick={() => props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)}
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
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.unloadingAddresses && item.unloadingAddresses[0].city || ""}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
                              null : <DispatchPackedToggle
                                locationDetailsId={props.locationDetailsId}
                                item={item}
                              />}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.shipperName === "null" ? "" : item.shipperName}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[3.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.pickUp === "null" ? "" : dayjs(item.pickUp).format("DD-MM-YYYY")}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.newAwbNo === "null" ? <Button type="primary"
                              onClick={() => {
                                handleRowData(item);
                                props.handleCreateAWB(true)
                              }}>Create AWB</Button> : item.newAwbNo}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.status === "null" ? "" : item.status}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.dispatchInspectionInd === 4 && item.newAwbNo &&
                              <DispatchValidationToggle
                                locationDetailsId={props.locationDetailsId}
                                item={item}
                              />}
                          </div>
                        </div>
                        <div class="flex flex-col md:w-[2%] max-sm:flex-row max-sm:w-[6%]">
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
