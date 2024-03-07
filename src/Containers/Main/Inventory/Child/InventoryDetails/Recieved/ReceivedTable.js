import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getReceivedUserList,
  handleReceivedModal,
  handleDeliveryDateModal,
  setEditReceiveInventory,
  handleReceivedOrderIdModal,
  updateInspection,
  handleInventoryReceivedNoteOrderModal
} from "../../../InventoryAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import ReceivedOrderToggle from "./ReceivedOrderToggle";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const DeliveryDateModal = lazy(() => import("./DeliveryDateModal"));
const OpenReceivedOrderIdModal = lazy(() => import("./OpenReceivedOrderIdModal"));

const ReceivedTable = (props) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
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


  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className=" md:w-[14.5rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" md:w-[8.12rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
            <div className=" md:w-[11.5rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className="md:w-[4.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
            <div className="md:w-[10.5rem]"><FormattedMessage id="app.inspectedby" defaultMessage="Inspected By" /></div>
            <div className="md:w-[10.24rem]"><FormattedMessage id="app.phone" defaultMessage="Phones #" /></div>
            <div className="md:w-[5.23rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
            <div className="md:w-[5.2rem]"></div>
            <div className="w-12"></div>
          </div>
          <InfiniteScroll
            dataLength={props.allReceivedUser.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingReceivedUserList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >
            {props.allReceivedUser.length ? <>
              {props.allReceivedUser.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.createAt).format("DD/MM/YYYY");
                return (
                  <div>
                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                      <div class="flex">

                        <div className=" flex font-medium flex-col md:w-[14.1rem] max-sm:w-full  ">
                          <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer underline text-blue-600">
                            <div
                              onClick={() => {
                                handleRowData(item);
                                props.handleReceivedOrderIdModal(true);
                              }}
                            >{item.newOrderNo}</div>&nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-xs font-bold text-[tomato]">
                                New
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">

                          <div class=" text-xs text-cardBody font-poppins">
                            {item.awbNo}
                          </div>

                        </div>

                      </div>

                      <div className=" flex font-medium flex-col md:w-[12.51rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-poppins">

                          {item.distributorName}
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[5.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-semibold  font-poppins">

                          <MultiAvatar
                            primaryTitle={item.contactPersonName}
                            imageId={item.imageId}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        </div>
                      </div>

                      <div className=" flex font-medium flex-col md:w-[4.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-semibold  font-poppins">

                          <MultiAvatar
                            primaryTitle={item.startInspectionUserName}
                            imageId={item.imageId}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[4.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                          {item.phoneReceiveCount}/{item.phoneCount}
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[7.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                          {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[10.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div>
                          {item.inspectionInd === 0 ? <ReceivedOrderToggle
                            orderId={item.orderPhoneId}
                            locationId={props.locationDetailsId}
                            inventoryReceiveInd={item.inventoryReceiveInd}
                          /> : <b>Received</b>}
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-[8.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                          {item.inspectionInd === 0 && item.inventoryReceiveInd ?
                            <Button
                              type="primary"
                              className="w-28 text-base"
                              onClick={() => props.updateInspection({
                                inspectionInd: 1,
                                startInspectionUser: props.userId,
                                startInspectionDate: dayjs()
                              }, item.orderPhoneId, props.locationDetailsId)}
                            >
                              Start Inspection
                            </Button>
                            : item.inspectionInd === 2 && item.inventoryReceiveInd ?
                              <Button
                                className="cursor-pointer text-base"
                                onClick={() => {
                                  handleRowData(item)
                                  props.handleDeliveryDateModal(true);
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
                      <div class="flex md:items-center">

                      </div>
                      <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
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

                    </div>
                  </div>
                );
              })}
            </> : !props.allReceivedUser.length
              && !props.fetchingReceivedUserList ? <NodataFoundPage /> : null}

          </InfiniteScroll>
        </div>
      </div>

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
      {/* 
      <InventoryNoteReceivedOrderModal
        rowData={rowData}
        invenReceivedNoteOrderModal={props.invenReceivedNoteOrderModal}
        handleInventoryReceivedNoteOrderModal={props.handleInventoryReceivedNoteOrderModal}

      /> */}
    </>
  );
}


const mapStateToProps = ({ inventory, auth }) => ({
  fetchingReceivedUserList: inventory.fetchingReceivedUserList,
  allReceivedUser: inventory.allReceivedUser,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  addDeliverDate: inventory.addDeliverDate,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditReceiveInventory,
      getReceivedUserList,
      handleReceivedModal,
      handleDeliveryDateModal,
      handleReceivedOrderIdModal,
      handleInventoryReceivedNoteOrderModal,
      updateInspection
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)
);

// import React, { Component, Suspense, lazy, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import { Spacer } from "../../../../../../Components/UI/Elements";
// import { Input, Tooltip, Space, Button, Badge } from "antd";
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import {
//   getReceivedUserList,
//   handleReceivedModal,
//   handleDeliveryDateModal,
//   setEditReceiveInventory,
//   handleReceivedOrderIdModal,
//   updateInspection,
//   handleInventoryReceivedNoteOrderModal
// } from "../../../InventoryAction";
// import moment from "moment";
// import Highlighter from "react-highlight-words";
// import { SearchOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import DeliveryDateModal from "./DeliveryDateModal";
// import { withRouter } from "react-router";
// import OpenReceivedOrderIdModal from "./OpenReceivedOrderIdModal";

// const ReceivedTable = (props) => {


//   useEffect(() => {
//     props.getReceivedUserList(props.locationDetailsId)
//   }, [])

//   const [rowData, setRowData] = useState({})
//   const handleRowData = (item) => {
//     setRowData(item)
//   }
//   const [pause, setpause] = useState(false)

//   function handlePauseResume() {
//     setpause(!pause)
//   }
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },

//     {
//       title: "Order #",
//       dataIndex: "newOrderNo",
//       width: "15%",
//       render: (name, item, i) => {
//         const currentdate = moment().format("DD/MM/YYYY");
//         const date = moment(item.createAt).format("DD/MM/YYYY");
//         return (
//           <>
//             <div
//               style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
//               onClick={() => {
//                 handleRowData(item);
//                 props.handleReceivedOrderIdModal(true);
//               }}
//             >{item.newOrderNo}</div>
//             &nbsp;&nbsp;
//             {date === currentdate ? (
//               <div
//                 style={{
//                   color: "tomato",
//                   fontWeight: "bold",
//                 }}
//               >
//                 New
//               </div>
//             ) : null}
//           </>
//         );
//       },
//     },
//     {
//       title: "AWB",
//       width: "8%",
//       dataIndex: 'awbNo',
//     },

//     {
//       title: "Customer",
//       width: "10%",
//       dataIndex: "distributorName"
//     },
//     {
//       title: "Contact",
//       width: "10%",
//       dataIndex: "contactPersonName"
//     },
//     {
//       title: "Inspected By",
//       width: "10%",
//       dataIndex: "startInspectionUserName"
//     },
//     {
//       title: "Phones #",
//       width: "10%",
//       dataIndex: "phoneCount",
//       render: (text, item) => {
//         return (
//           <>{item.phoneReceiveCount}/{item.phoneCount}</>
//         )
//       }

//     },

//     {
//       title: "Pick Up",
//       width: "10%",
//       render: (text, item) => {
//         return (
//           <>{item.orderDetailsViewDTO && item.orderDetailsViewDTO.name || ""}</>
//         )
//       }
//     },
//     {
//       title: "",
//       width: "3%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <Tooltip title="Notes">
//             <NoteAltIcon
//               style={{ cursor: "pointer", fontSize: "13px" }}
//               onClick={() => {
//                 handleRowData(item);
//                 props.handleInventoryReceivedNoteOrderModal(true);
//               }}
//             />

//           </Tooltip>
//         );
//       },
//     },

//     {
//       title: "",
//       width: "10%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
//             {item.inspectionInd === 0 ?
//               <Button
//                 onClick={() => props.updateInspection({
//                   inspectionInd: 1,
//                   startInspectionUser: props.userId,
//                   startInspectionDate: moment()
//                 }, item.orderPhoneId, props.locationDetailsId)}
//                 style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
//                 Start Inspection
//               </Button>
//               : item.inspectionInd === 2 ?
//                 <Button
//                   style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white", fontWeight: "500" }}
//                   onClick={() => {
//                     handleRowData(item)
//                     props.handleDeliveryDateModal(true);
//                   }}
//                 >
//                   Send To Store
//                 </Button> :
//                 item.inspectionInd === 1 ?
//                   <Button
//                     style={{ fontWeight: "500", color: "white" }}
//                     onClick={handlePauseResume}
//                     type="primary">
//                     {pause ? "Resume Inspection" : "Pause Inspection"}
//                   </Button> : <b>Store locator</b>}
//           </>
//         );
//       },
//     },
//   ];


//   return (
//     <>
//       <StyledTable
//         rowKey=""
//         columns={columns}
//         dataSource={props.allReceivedUser}
//         loading={
//           props.fetchingReceivedUserList
//         }
//         pagination={false}
//         scroll={{ y: 160 }}

//       />

//       <DeliveryDateModal
//         rowData={rowData}
//         addDeliverDate={props.addDeliverDate}
//         handleDeliveryDateModal={props.handleDeliveryDateModal}
//       />

//       <OpenReceivedOrderIdModal
//         locationDetailsId={props.locationDetailsId}
//         rowData={rowData}
//         receivedOrdeIdModal={props.receivedOrdeIdModal}
//         handleReceivedOrderIdModal={props.handleReceivedOrderIdModal}
//       />
//       {/*
//       <InventoryNoteReceivedOrderModal
//         rowData={rowData}
//         invenReceivedNoteOrderModal={props.invenReceivedNoteOrderModal}
//         handleInventoryReceivedNoteOrderModal={props.handleInventoryReceivedNoteOrderModal}

//       /> */}
//       <Spacer />
//     </>
//   );
// }


// const mapStateToProps = ({ inventory, auth }) => ({
//   fetchingReceivedUserList: inventory.fetchingReceivedUserList,
//   allReceivedUser: inventory.allReceivedUser,
//   locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
//   addDeliverDate: inventory.addDeliverDate,
//   receivedOrdeIdModal: inventory.receivedOrdeIdModal,
//   receivedOrdeIdModal: inventory.receivedOrdeIdModal,
//   invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
//   userId: auth.userDetails.userId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setEditReceiveInventory,
//       getReceivedUserList,
//       handleReceivedModal,
//       handleDeliveryDateModal,
//       handleReceivedOrderIdModal,
//       handleInventoryReceivedNoteOrderModal,
//       updateInspection
//     },
//     dispatch
//   );

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)
// );
