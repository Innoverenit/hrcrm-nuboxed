import React, { useEffect, lazy, useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import {
  handleReceivedOrderIdPhoneNoteModal,
  updateInspection,
  setEditPhoneData,
  handlereceivePhoneModal,
  getPhonelistByOrderId,
  updateRepairStatus,

} from "../../../InventoryAction";
import MotionPhotosOffIcon from '@mui/icons-material/MotionPhotosOff';
import ReceivedOrderIdPhoneNoteModal from "./ReceivedOrderIdPhoneNoteModal";
import { EditOutlined, FileDoneOutlined, PlusOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar2, SubTitle } from "../../../../../../Components/UI/Elements";
import ReceiveValidationToggle from "./ReceiveValidationToggle";
import dayjs from "dayjs";
import AccountPhoneTaskTable from "../../../../Account/AccountDetailsTab/AccountOrderTab/AccountPhoneTaskTable";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import ReceivedPhoneModal from "./ReceivedPhoneModal";
import ReactToPrint from "react-to-print";
import { base_url2 } from "../../../../../../Config/Auth";
import PhoneDetailsModal from "../../../../Refurbish/ProductionTab/PhoneDetailsModal";
import { handlePhoneDetails, handleInTagDrawer } from "../../../../Refurbish/RefurbishAction"
import TagInDrawer from "../../../../Refurbish/ProductionTab/TagInDrawer";
const QRCodeModal = lazy(() => import("../../../../../../Components/UI/Elements/QRCodeModal"));

function OpenReceivedOrderIdForm(props) {
  const componentRefs = useRef([]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    props.getPhonelistByOrderId(props.rowData.orderPhoneId)
  }, [props.rowData.orderPhoneId])

  const [show, setShow] = useState(false);
  const handleMismatchItem = () => {
    setShow(!show)
  };

  const [pause, setpause] = useState(false)
  function handlePauseResume() {
    setpause(!pause)
  }
  const [particularRowData, setParticularRowData] = useState({});
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [expand, setExpand] = useState(false);
  const [phoneId, setphoneId] = useState("");

  function handleExpand(phoneId) {
    setExpand(!expand);
    setphoneId(phoneId);
  }
  return (
    <>
      {props.fetchingPhoneListById ? <BundleLoader /> :
        <div className='flex justify-end sticky ticky top-0 z-10 '>
          <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className=" md:w-[2rem]"></div>
              <div className=" md:w-[6.7rem]"><FormattedMessage
                id="app.oem"
                defaultMessage="OEM"
              /></div>
              <div className=" md:w-[6.7rem]"><FormattedMessage
                id="app.model"
                defaultMessage="model"
              /></div>
              <div className=" md:w-[6.7rem] "><FormattedMessage
                id="app.imei"
                defaultMessage="imei"
              /></div>
              <div className="md:w-[6.7rem]"><FormattedMessage
                id="app.os"
                defaultMessage="os"
              /> </div>
              <div className="md:w-[6.7rem]"><FormattedMessage
                id="app.gb"
                defaultMessage="gb"
              /></div>
              <div className="md:w-[6.7rem]"><FormattedMessage
                id="app.color"
                defaultMessage="color"
              /></div>
              <div className="md:w-[6.7rem]"><FormattedMessage
                id="app.conditions"
                defaultMessage="conditions"
              /></div>
              <div className="md:w-[8rem]"><FormattedMessage
                id="app.issue"
                defaultMessage="Issue"
              /></div>
              <div className="md:w-[3rem]">
                {/* QR */}
              </div>
              <div className="md:w-[2rem]">
                {/* task */}
              </div>
              <div className="md:w-[2rem]">
                {/* notes */}
              </div>
              <div className="md:w-[8rem]">
                <FormattedMessage
                  id="app.Received"
                  defaultMessage="Receive"
                />
              </div>
              <div className="md:w-[8.4rem]">
                <FormattedMessage
                  id="app.Received"
                  defaultMessage="Received "
                />
              </div>
              <div className="md:w-[2rem]">
              </div>
              <div className="md:w-[7rem]">
              </div>
            </div>
            <div class="overflow-y-auto h-[65vh]">
              <InfiniteScroll
                dataLength={props.phoneListById.length}
                // next={handleLoadMore}
                // hasMore={hasMore}
                // loader={props.fetchingPhoneListById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                height={"65vh"}
              >
                {props.phoneListById.map((item, index) => {
                  return (
                    <div>
                      <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                        <div class="flex">
                          <div className=" flex font-medium   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            {item.mismatchInd && <div class=" text-xs text-cardBody font-poppins">
                              <PlusOutlined onClick={() => {
                                handleMismatchItem();
                                handleSetParticularOrderData(item);
                              }
                              } />
                            </div>}
                          </div>
                          <div className=" flex font-medium  md:w-[5rem] max-sm:w-full  ">
                            {item.company}
                          </div>

                          <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.model}
                            </div>

                          </div>
                          <div className=" flex font-medium  md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                            <div class=" text-sm text-cardBody font-poppins">

                              {item.imei}
                            </div>
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">

                            {item.os}
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.gb}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.color}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.conditions}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.issue}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            <SubTitle>
                              {item.qrCodeId ? (
                                <span onClick={() => {
                                  props.handlePhoneDetails(true)
                                  handleSetParticularOrderData(item);
                                }}>
                                  <QRCodeModal
                                    qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                    imgHeight={"2.8rem"}
                                    imgWidth={"2.8rem"}
                                    imgRadius={20}
                                  />
                                </span>
                              ) : (
                                <span class="text-xs font-bold">
                                  No QR
                                </span>
                              )}
                            </SubTitle>
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            <Tooltip title="Task">
                              <FileDoneOutlined style={{ color: "black", fontSize: "1rem" }} type="file-done"
                                onClick={() => {
                                  handleSetParticularOrderData(item);
                                  handleExpand(item.phoneId);
                                }}
                              />

                            </Tooltip>
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            <Tooltip title="Notes">
                              <NoteAltIcon
                                style={{ cursor: "pointer", fontSize: "1rem", color: "green" }}
                                onClick={() => {
                                  handleSetParticularOrderData(item);
                                  props.handleReceivedOrderIdPhoneNoteModal(true);
                                }}
                              />

                            </Tooltip>
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            <Tooltip>
                              {item.inspectionInd === 1 &&
                                <ReceiveValidationToggle
                                  orderPhoneId={props.rowData.orderPhoneId}
                                  phoneId={item.phoneId}
                                  receivePhoneInd={item.receivePhoneInd}
                                  inspectionInd={item.inspectionInd} />
                              }
                            </Tooltip>
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.receivePhoneUserName !== null &&
                              <>
                                <Tooltip title={item.receivePhoneUserName}>
                                  <MultiAvatar2
                                    primaryTitle={`${item.receivePhoneUserName} `}
                                    imageURL={item.imageURL}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                </Tooltip>
                                &nbsp;
                                {` ${dayjs(item.receivePhoneDate).format("DD-MM-YY")}`}
                              </>
                            }

                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.inspectionInd === 1 && item.receivePhoneInd && (
                              <EditOutlined
                                style={{ color: "orange" }}
                                onClick={() => {
                                  props.setEditPhoneData(item);
                                  props.handlereceivePhoneModal(true);
                                  handleSetParticularOrderData(item);
                                }
                                }
                              />
                            )
                            }
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.inspectionInd !== 0 && item.receivePhoneInd &&
                              <>
                                {!item.cannotRepairInd && item.inspectionInd !== 3 ?
                                  <Button
                                    onClick={() => {
                                      props.updateRepairStatus({
                                        cannotRepairInd: true,
                                        orderPhoneId: props.rowData.orderPhoneId
                                      }, item.phoneId)
                                    }}>
                                    Can't Repair
                                  </Button> : item.inspectionInd === 3 && item.cannotRepairInd === false ? null :
                                    <Tooltip title="Can't Repair">
                                      <MotionPhotosOffIcon className=" !text-base cursor-pointer text-[tomato]" /></Tooltip>}
                              </>}
                          </div>
                        </div>
                        <div className=" flex font-medium   md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            <Tooltip title={<FormattedMessage
                              id="app.Print"
                              defaultMessage="Print"
                            />}>
                              {/* <PrintOutlined
                                                                            // onClick={handlePrint}
                                                                            className="!text-base cursor-pointer"
                                                                        /> */}
                              <ReactToPrint
                                trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print </Button>}
                                content={() => componentRefs.current[index]}
                              />
                            </Tooltip>

                          </div>
                        </div>
                        <div className=" flex font-medium   md:w-[4rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs text-cardBody font-poppins">
                            <Tooltip title={<FormattedMessage
                              id="app.scan"
                              defaultMessage="scan"
                            />}>

                              <Button
                                onClick={() => {
                                  props.handleInTagDrawer(true)
                                  handleSetParticularOrderData(item);
                                }}
                                class=" bg-green-600 cursor-pointer text-gray-50"
                              >
                                Scan </Button>

                            </Tooltip>

                          </div>
                        </div>
                      </div>
                      {/* 2nd part */}
                      {(show && particularRowData.phoneId === item.phoneId) && <div className="flex rounded-xl  mt-4 bg-pink-200 h-8 items-center p-3 " >
                        <div class="flex">
                          <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                            {item.receiveCompany}
                          </div>

                          <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                            <div class=" text-xs text-cardBody font-poppins">
                              {item.receiveModel}
                            </div>

                          </div>
                          <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                            <div class=" text-sm text-cardBody font-poppins">

                              {item.receiveIMEI}
                            </div>
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">

                            {item.receiveOS}
                          </div>
                        </div>

                        <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.receiveGB}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.receiveColor}
                          </div>
                        </div>
                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-xs text-cardBody font-poppins text-center">
                            {item.receiveCondition}
                          </div>
                        </div>
                      </div>}
                      <div style={{ display: "none", textAlign: "center" }}>

                        <div
                          ref={(el) => (componentRefs.current[index] = el)}
                          style={{
                            fontSize: "16px",
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >

                          <div style={{ fontSize: "5rem", marginTop: "2rem" }}>
                            <QRCode
                              size={150}
                              value={`${base_url2}/supplies/masterName/${item.company}/${item.model}`}
                            />
                          </div>
                          <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>IMEI:</span> {item.imei}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {props.rowData.inspectionInd === 1 &&
                <Button type="primary"
                  onClick={handlePauseResume}>
                  {pause ? "Resume" : "Pause"}</Button>}
              {props.rowData.inspectionInd === 1 &&
                <div style={{ marginLeft: '10px' }}>
                  <Button
                    loading={props.updatingInspection}
                    onClick={() => props.updateInspection({
                      inspectionInd: 2,
                      stopInspectionUser: props.userId,
                      stopInspectionDate: dayjs()
                    },
                      props.rowData.orderPhoneId,
                      props.locationDetailsId)}
                    type="primary"
                  >Inspection Completed</Button>
                </div>}
            </div>

            {expand && (
              <AccountPhoneTaskTable
                phoneId={phoneId}
                RowData={particularRowData} />
            )}
            <ReceivedOrderIdPhoneNoteModal
              particularRowData={particularRowData}
              phoNoteReceivedOrderIdModal={props.phoNoteReceivedOrderIdModal}
              handleReceivedOrderIdPhoneNoteModal={props.handleReceivedOrderIdPhoneNoteModal}
            />
            <ReceivedPhoneModal
              handlereceivePhoneModal={props.handlereceivePhoneModal}
              addReceivePhone={props.addReceivePhone}
              orderPhoneId={props.rowData.orderPhoneId}
              particularRowData={particularRowData}
            />
            <PhoneDetailsModal
              handlePhoneDetails={props.handlePhoneDetails}
              showPhoneData={props.showPhoneData}
              phoneId={particularRowData.phoneId}
            />
            <TagInDrawer
              RowData={particularRowData}
              clickTagInDrawr={props.clickTagInDrawr}
              handleInTagDrawer={props.handleInTagDrawer}
            />
          </div>

        </div>}
    </>
  )
}

const mapStateToProps = ({ inventory, auth, refurbish }) => ({
  phoneListById: inventory.phoneListById,
  fetchingPhoneListById: inventory.fetchingPhoneListById,
  updatingInspection: inventory.updatingInspection,
  phoneListData: inventory.phoneListData,
  userId: auth.userDetails.userId,
  addReceivePhone: inventory.addReceivePhone,
  showPhoneData: refurbish.showPhoneData,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhonelistByOrderId,
      handleReceivedOrderIdPhoneNoteModal,
      updateInspection,
      setEditPhoneData,
      handlereceivePhoneModal,
      updateRepairStatus,
      handlePhoneDetails,
      handleInTagDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);
