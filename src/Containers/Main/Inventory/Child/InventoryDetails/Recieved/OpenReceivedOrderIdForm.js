import React, { useEffect, lazy, useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip, Input } from "antd";
import QRCode from "qrcode.react";
import {
  handleReceivedOrderIdPhoneNoteModal,
  updateInspection,
  setEditPhoneData,
  handlereceivePhoneModal,
  getPhonelistByOrderId,
  updateRepairStatus,

} from "../../../InventoryAction";
import ReceivedOrderIdPhoneNoteModal from "./ReceivedOrderIdPhoneNoteModal";
import { EditOutlined, FileDoneOutlined, PlusOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";
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
const { Search } = Input;

function OpenReceivedOrderIdForm(props) {
  const componentRefs = useRef([]);

  const handlePrint = () => {
    window.print();
  };
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getPhonelistByOrderId(props.rowData.orderPhoneId, page)
  }, [])

  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getPhonelistByOrderId(props.rowData.orderPhoneId, page)
  };

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
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div class=" flex justify-between">
        <div class=" w-3/6">
          <div style={{ display: "flex", marginLeft: "8rem" }}>

            <Button type="primary">
              Scan
            </Button>
            <div style={{ marginLeft: '10px' }}>
              <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
          </div>
        </div>
        <div class=" w-3/6">
          <div style={{ display: "flex", marginLeft: "20rem" }}>
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
        </div>
      </div>
      {/* {props.fetchingPhoneListById ? <BundleLoader /> : */}
      <div className='flex justify-center sticky ticky z-10 '>
        <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" md:w-[2rem]"></div>
            <div className=" md:w-[6.74rem]"><FormattedMessage
              id="app.oem"
              defaultMessage="OEM"
            /></div>
            <div className=" md:w-[6.73rem]"><FormattedMessage
              id="app.model"
              defaultMessage="model"
            /></div>
            <div className=" md:w-[6.07rem] "><FormattedMessage
              id="app.imei"
              defaultMessage="imei"
            /></div>
            <div className="md:w-[6.71rem]">Info</div>


            <div className="md:w-[6.75rem]"><FormattedMessage
              id="app.conditions"
              defaultMessage="conditions"
            /></div>
            <div className="md:w-[15rem]"><FormattedMessage
              id="app.issue"
              defaultMessage="Issue"
            /></div>
            <div className="md:w-[5.1rem]">
              {/* QR */}
            </div>
            <div className="md:w-[2rem]">
              {/* task */}
            </div>
            <div className="md:w-[2rem]">
              {/* notes */}
            </div>
            <div className="md:w-[4.1rem]">
              <FormattedMessage
                id="app.Received"
                defaultMessage="Received"
              />
            </div>
            <div className="md:w-[5.4rem]">

            </div>
            <div className="md:w-[2rem]">
            </div>
            <div className="md:w-[7.02rem]">
            </div>
            <div className="md:w-[7.3rem]">
              <FormattedMessage
                id="app.Status"
                defaultMessage="Status"
              />
            </div>
          </div>
          <div >
            <InfiniteScroll
              dataLength={props.phoneListById.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingPhoneListById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"70vh"}
            >
              {props.phoneListById.map((item, index) => {
                return (
                  <div>
                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
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
                        <div className=" flex font-medium  md:w-[5.03rem] max-sm:w-full  ">
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

                      <div className=" flex font-medium  md:w-[12.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">

                          {item.os} {item.gb}  {item.color}
                        </div>
                      </div>

                      <div className=" flex font-medium  md:w-[6.63rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          {item.conditions}
                        </div>
                      </div>
                      <div className=" flex font-medium  md:w-[12.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          {item.issue}
                        </div>
                      </div>

                      <div className=" flex font-medium  md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          <Tooltip title="Task">
                            <FileDoneOutlined   className="!text-icon  text-[black]" type="file-done"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                handleExpand(item.phoneId);
                              }}
                            />

                          </Tooltip>
                        </div>
                      </div>
                      <div className=" flex font-medium  md:w-[3.06rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className="!text-icon cursor-pointer text-[green]"
                           
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleReceivedOrderIdPhoneNoteModal(true);
                              }}
                            />

                          </Tooltip>
                        </div>
                      </div>

                      <div className=" flex font-medium  md:w-[7.06rem] max-sm:flex-row w-full max-sm:justify-between ">
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

                      <div className=" flex font-medium  md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between ">
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

                      <div className=" flex font-medium  md:w-[3.09rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          {item.inspectionInd === 1 && item.receivePhoneInd && !item.cannotRepairInd && (
                            <EditOutlined
                            className="!text-icon cursor-pointer text-[orange]"
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

                      <div className=" flex font-medium  md:w-[7.08rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins text-center">
                          {item.inspectionInd !== 0 && item.receivePhoneInd &&
                            <>
                              {!item.cannotRepairInd && item.inspectionInd !== 3 ?
                                <Button
                                  loading={particularRowData.phoneId === item.phoneId && props.updatingRepairStatus}
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.updateRepairStatus({
                                      cannotRepairInd: true,
                                      orderPhoneId: props.rowData.orderPhoneId
                                    }, item.phoneId)
                                  }}>
                                  Can't Repair
                                </Button> :
                                <Button
                                  loading={particularRowData.phoneId === item.phoneId && props.updatingRepairStatus}
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.updateRepairStatus({
                                      cannotRepairInd: false,
                                      orderPhoneId: props.rowData.orderPhoneId
                                    }, item.phoneId)
                                  }}>
                                  Change Status
                                </Button>
                                //   <Tooltip title="Can't Repair">
                                //   <MotionPhotosOffIcon className=" !text-base cursor-pointer text-[tomato]" />
                                // </Tooltip>
                              }
                            </>}
                        </div>
                      </div>
                      <div className=" flex font-medium   md:w-[5.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.cannotRepairInd && "Can't Repair"}
                        </div>
                      </div>
                      <div className=" flex font-medium   md:w-[5.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          <Tooltip title={<FormattedMessage
                            id="app.Print"
                            defaultMessage="Print"
                          />}>

                            <ReactToPrint
                              trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print QR </Button>}
                              content={() => componentRefs.current[index]}
                            />
                          </Tooltip>

                        </div>
                      </div>

                    </div>
                    {/* 2nd part */}
                    {(show && particularRowData.phoneId === item.phoneId) && <div className="flex rounded-xl  mt-4 bg-pink-200 h-8 items-center p-1 " >
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

      </div>
      {/* } */}
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
  updatingRepairStatus: inventory.updatingRepairStatus,
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
