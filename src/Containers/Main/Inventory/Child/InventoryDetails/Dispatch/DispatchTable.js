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

const DispatchPhoneListModal = lazy(() => import("./DispatchPhoneListModal"));
const DispatchPackedToggle = lazy(() => import("./DispatchPackedToggle"));
const DispatchValidationToggle = lazy(() => import("./DispatchValidationToggle"));
const DispatchOrderAwbModal = lazy(() => import("./DispatchOrderAwbModal"));

function DispatchTable(props) {
  useEffect(() => {
    props.getDispatchList(props.locationDetailsId);
    props.getAllShipper()
  }, []);

  const [dispatchDate, setdispatchDate] = useState(undefined)


  function handleDatePickerCahnge(date, dateString) {
    setdispatchDate(dayjs(dateString).format("DD/MM/YYYY"));
  }

  const [rowData, setRowData] = useState({})
  const handleRowData = (item) => {
    setRowData(item)
  }

  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
      <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className=" md:w-[7%]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" md:w-[5.2rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.units" defaultMessage="Units" /></div>
            <div className="md:w-[8.5rem]"><FormattedMessage id="app.inspection" defaultMessage="Inspection" /></div>
            <div className="md:w-[8.5rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.packed" defaultMessage="Packed ?" /></div>
            <div className=" md:w-[6.1rem]"><FormattedMessage id="app.shipper" defaultMessage="Shipper" /></div>
            <div className="md:w-[8.5rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery" /></div>
            <div className=" md:w-[6.1rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
            <div className=" md:w-[6.1rem]"><FormattedMessage id="app.status" defaultMessage="Status" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
            <div className="w-12"></div>
          </div>

          {props.allDispatchList.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.createAt).format("DD/MM/YYYY");
            return (
              <div>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
                  <div class="flex">

                    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
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

                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">

                      {item.distributorName}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.contactPersonName}
                    </div>
                  </div>


                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
                        null : <DispatchPackedToggle
                          locationDetailsId={props.locationDetailsId}
                          item={item}
                        />}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.unloadingAddresses && item.unloadingAddresses[0].city || ""}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {/* {item.dispatchInspectionInd === 4 && !item.newAwbNo ? */}

                      <Button type="primary"
                        onClick={() => {
                          handleRowData(item);
                          props.handleCreateAWB(true)
                        }}>Create AWB</Button>
                      {/* : item.dispatchInspectionInd === 4 && item.newAwbNo ? <b>Awb Created</b> : null
                      } */}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.shipperName === "null" ? "" : item.shipperName}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.pickUp === "null" ? "" : dayjs(item.pickUp).format("DD-MM-YYYY")}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.newAwbNo === "null" ? "" : item.newAwbNo}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.status === "null" ? "" : item.status}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.dispatchInspectionInd === 4 && item.newAwbNo &&
                        <DispatchValidationToggle
                          locationDetailsId={props.locationDetailsId}
                          item={item}
                        />}
                    </div>
                  </div>
                  <div class="flex md:items-center">

                  </div>
                  <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                          style={{ cursor: "pointer", fontSize: "13px" }}
                        // onClick={() => {
                        //   handleRowData(item);
                        //   props.handleInventoryReceivedNoteOrderModal(true);
                        // }}
                        />

                      </Tooltip>
                    </div>

                    {/* <div>
                   <Tooltip title={item.salesExecutiveEmail}>
               <div>
                 <i class="far fa-envelope"></i>
               </div>
             </Tooltip>
                        </div> */}
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>



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

// const columns = [
//   {
//     title: "",
//     width: "1%",
//   },

//   {
//     title: "Dispatch ID",
//     width: "18%",
//     // dataIndex: "dispatchId",
//     render: (name, item, i) => {
//       const currentdate = moment().format("DD/MM/YYYY");
//       const date = moment(item.creationDate).format("DD/MM/YYYY");
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },

//         children: (
//           <>
//             <Badge count={item.productNum}
//               // style={{ height: "19px" }}
//               size="small"
//             >
//               <div
//                 onClick={() => handleDispatch(item.dispatchId)}
//                 style={{
//                   cursor: "pointer",
//                   textDecoration: "underline",
//                   color: item.pickUpInd ? "black" : "tomato"
//                 }}
//               >

//                 {`${item.dispatchId} `} &nbsp;

//                 {date === currentdate ? (
//                   <div
//                     style={{
//                       color: "tomato",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     New
//                   </div>
//                 ) : null}
//               </div>
//             </Badge>
//           </>
//         ),
//       };
//     },
//   },

//   {
//     title: "Pickup",
//     dataIndex: "pickUpDate",
//     width: "7%",
//     // editable: true,
//     onFilter: (value, record) => record.pickUpDate.indexOf(value) === 0,
//     sorter: (a, b) => {
//       const pickUpDateA = a.pickUpDate && a.pickUpDate.toLowerCase();
//       const pickUpDateB = b.pickUpDate && b.pickUpDate.toLowerCase();
//       if (pickUpDateA < pickUpDateB) {
//         return -1;
//       }
//       if (pickUpDateA > pickUpDateB) {
//         return 1;
//       }

//       // names must be equal
//       return 0;
//     },
//     render: (name, item, i) => {
//       return (
//         <>
//           {item.pickUpDate === null ? "Waiting" :
//             moment(item.pickUpDate).format("DD/MM/YY")
//           }
//         </>
//       )
//     },
//   },
//   {
//     title: "",
//     width: "3%",
//     dataIndex: "pickUpInd",
//     render: (name, item, i) => {
//       return item.pickUpInd === true ? (
//         <CheckCircleOutlined
//           theme="twoTone"
//           twoToneColor="#00FF00"
//           size={180}
//           style={{
//             color: "green",
//             fontSize: "16px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         />
//       ) : (
//         <div
//           onClick={() => {
//             props.handlePickupDateModal(true);
//             props.setEditInventory(item);
//           }}
//         >
//           <i class="far fa-calendar-alt" />
//         </div>
//       );
//     },
//   },

//   {
//     title: "Ship To",
//     dataIndex: "shipToLocationName",
//     ...getColumnSearchProps("shipToLocationName"),
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: (
//           <Link
//             toUrl={`/inventory/${(item.shipToLocationId &&
//               item.shipToLocationId) ||
//               ""}/Receive`}
//             title={item.shipToLocationName}
//           ></Link>
//         ),
//       };
//     },

//     width: "12%",
//   },
//   {
//     title: "Bill To",
//     dataIndex: "billToLocationName",
//     ...getColumnSearchProps("billToLocationName"),
//     width: "12%",
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: <div>{item.billToLocationName}</div>,
//       };
//     },
//   },
//   {
//     title: "Sent",
//     dataIndex: "pickedByName",
//     ...getColumnSearchProps("pickedByName"),
//     width: "12%",
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: <div>{item.pickedByName}</div>,
//       };
//     },
//   },
//   {
//     title: "Delivery",
//     width: "8%",
//     // dataIndex: "dispatchDate",
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: (
//           <>
//             {item.receivedDate === null ? "" :
//               <div>
//                 {moment(item.receivedDate).format("DD/MM/YY")} &nbsp;&nbsp;
//               </div>
//             }
//           </>
//         ),
//       };
//     },
//     onFilter: (value, record) => record.receivedDate.indexOf(value) === 0,
//     sorter: (a, b) => {
//       const receivedDateA = a.receivedDate && a.receivedDate.toLowerCase();
//       const receivedDateB = b.receivedDate && b.receivedDate.toLowerCase();
//       if (receivedDateA < receivedDateB) {
//         return -1;
//       }
//       if (receivedDateA > receivedDateB) {
//         return 1;
//       }

//       // names must be equal
//       return 0;
//     },
//   },

//   {
//     // title: "Delivery Status",
//     title: "",
//     dataIndex: "deliveryStatus",
//     width: "3%",
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: <div>{item.deliveryStatus}</div>,
//       };
//     },
//   },
//   {
//     title: "Received",
//     dataIndex: "receivedByName",
//     ...getColumnSearchProps("receivedByName"),
//     width: "12%",
//     render: (name, item, i) => {
//       return {
//         props: {
//           style: {
//             background:
//               (show || showShipperDetail) && dispatchId === item.dispatchId
//                 ? "rgb(158 183 223)"
//                 : null,
//           },
//         },
//         children: <div>{item.receivedByName}</div>,
//       };
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       //debugger
//       return item.pickUpInd === false ? (
//         <Tooltip title="Update Dispatch ID">
//           <div
//             style={{
//               cursor: "pointer",
//               fontSize: "12px",
//               color: "green",
//             }}
//             onClick={() => {
//               props.handleDispatchModal(true);
//               handleSetParticularOrderData(item);
//               props.setEditDispatch(item);
//             }}
//           >
//             <i class="far fa-share-square"></i>
//           </div>
//         </Tooltip>
//       ) : null;
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       //debugger
//       return (
//         <Tooltip title="Shipper">
//           <div
//             style={{ cursor: "pointer", fontSize: "12px" }}
//             onClick={() => {
//               handleShipper(item.dispatchId);
//               props.setEditDispatch(item);
//             }}
//           >
//             <i class="fas fa-shopping-basket"></i>
//           </div>
//         </Tooltip>
//       );
//     },
//   },
// ];

// import React, { useState, Suspense, lazy, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import { Input, Tooltip, Button, Form, DatePicker, Switch, Typography, Popconfirm, Select } from "antd";
// import { getAllShipper } from "../../../../Shipper/ShipperAction";
// import moment from "moment";
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import {
//   getDispatchList,
//   addFinalDispatchData,
//   handlePickupDateModal,
//   updateDispatchInspectionButton,
//   handleCreateAWB
// } from "../../../InventoryAction"
// import { withRouter } from "react-router";
// import DispatchPhoneListModal from "./DispatchPhoneListModal";
// import DispatchPackedToggle from "./DispatchPackedToggle";
// import DispatchValidationToggle from "./DispatchValidationToggle";
// import DispatchOrderAwbModal from "./DispatchOrderAwbModal";

// const { Option } = Select;
// function DispatchTable(props) {
//   useEffect(() => {
//     props.getDispatchList(props.locationDetailsId);
//     props.getAllShipper()
//   }, []);

//   const [form] = Form.useForm();
//   const [data, setData] = useState([]);
//   const [editingKey, setEditingKey] = useState('');
//   const [dispatchDate, setdispatchDate] = useState(undefined)
//   useEffect(() => {
//     setData(props.allDispatchList)
//   }, [props.allDispatchList])

//   const isEditing = (record) => record.orderPhoneId === editingKey;

//   function handleDatePickerCahnge(date, dateString) {
//     setdispatchDate(moment(dateString).format("YYYY-MM-DD"))
//   }
//   const EditableCell = ({
//     editing,
//     dataIndex,
//     title,
//     inputType,
//     record,
//     index,
//     children,
//     ...restProps
//   }) => {
//     const dateFormat = "YYYY-MM-DD";
//     const inputNode = <Input />;
//     const selectNode = <Select />
//     return (
//       <td {...restProps}>
//         {editing && inputType === "select" ? (
//           <Form.Item
//             name={dataIndex}
//             style={{
//               margin: 0,
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: `Please Input ${title}!`,
//               },
//             ]}
//           >
//             {/* {inputNode} */}
//             <Select>
//               {props.allShipper.map((item) => {
//                 return <Option value={item.shipperId}>{item.shipperName} </Option>;
//               })}
//             </Select>
//           </Form.Item>
//         ) : editing && inputType === "number" ? (
//           <Form.Item
//             name={dataIndex}
//             style={{
//               margin: 0,
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: `Please Input ${title}!`,
//               },
//             ]}
//           >
//             {inputNode}
//           </Form.Item>
//         ) :
//           editing && inputType === "picker" ? (
//             <Form.Item
//               style={{ margin: 0 }}
//               name={dataIndex}
//               rules={[
//                 {
//                   required: true,
//                   message: `Please Input ${title}!`,
//                 },
//               ]}
//             >
//               <DatePicker
//                 format={dateFormat}
//                 onChange={(date, dateString) => handleDatePickerCahnge(date, dateString)} />
//             </Form.Item>

//           ) : (
//             children
//           )}
//       </td>

//     );
//   };
//   const edit = (record) => {
//     form.setFieldsValue({
//       dispatchAwbNo: '',
//       dispatchDate: "",
//       shipperName: "",
//       ...record,
//     });
//     setEditingKey(record.orderPhoneId);
//   };
//   const cancel = () => {
//     setEditingKey('');
//   };
//   const save = async (key) => {
//     // alert("try");
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.orderPhoneId);
//       if (index > -1) {
//         // alert("if");
//         const item = newData[index];
//         console.log(item)
//         newData.splice(index, 1, { ...item, dispatchDate, ...row });
//         const a = newData[index];
//         let newEndDate = moment(a.dispatchDate).format("YYYY-MM-DD");
//         console.log(a.dispatchAwbNo, a.dispatchDate, a.shipperName)
//         props.addFinalDispatchData
//           ({
//             dispatchAwbNo: a.dispatchAwbNo,
//             dispatchDate: a.dispatchDate,
//             shipperId: a.shipperName,
//             dispatchedBy: props.userId
//           },
//             a.orderPhoneId,
//             props.locationDetailsId
//           )
//         setEditingKey('');
//       } else {
//         alert("else");
//         // newData.push(row);
//         setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };
//   const [rowData, setRowData] = useState({})
//   const handleRowData = (item) => {
//     setRowData(item)
//   }
//   const columns = [

//     {
//       width: "1%"
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
//                 props.handlePickupDateModal(true);
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
//       title: "Customer",
//       width: "9%",
//       dataIndex: "distributorName"
//     },
//     {
//       title: "Contact",
//       width: "9%",
//       dataIndex: "contactPersonName"
//     },
//     {
//       title: "Phones #",
//       width: "9%",
//       dataIndex: "phoneCount",
//       render: (text, item) => {
//         return (
//           <>{item.dispatchPhoneCount}/{item.phoneReceiveCount}</>
//         )
//       }
//     },
//     {
//       title: "Inspection",
//       width: "10%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
//             {item.dispatchInspectionInd === 0 ?
//               <Button
//                 onClick={() => props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)}
//                 style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
//                 Start
//               </Button>
//               : item.dispatchInspectionInd === 2 ||
//                 item.dispatchInspectionInd === 3 ||
//                 item.dispatchInspectionInd === 4 ?
//                 <b>Completed</b>
//                 : item.dispatchInspectionInd === 1 ?
//                   <Button
//                     style={{ fontWeight: "500", color: "white" }}
//                     // onClick={() => props.updateDispatchInspectionButton({ dispatchInspectionInd : 1 }, item.orderPhoneId, props.locationDetailsId)}
//                     type="primary">
//                     Pause
//                   </Button> :
//                   null}
//           </>
//         );
//       },
//     },
//     {
//       title: "Packed ?",
//       width: "8%",
//       render: (text, item) => {
//         return (
//           <>
//             {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
//               null : <DispatchPackedToggle
//                 locationDetailsId={props.locationDetailsId}
//                 item={item}
//               />}
//           </>

//         )
//       }
//     },
//     {
//       title: "Delivery",
//       width: "10%",
//       render: (text, item) => {
//         return (
//           <>{item.unloadingAddresses && item.unloadingAddresses[0].city || ""}</>
//         )
//       }
//     },
//     {
//       title: "",
//       width: "10%",
//       render: (text, item) => {
//         return (
//           <>
//             {item.dispatchInspectionInd === 4 && !item.newAwbNo ?

//               <Button type="primary"
//                 onClick={() => {
//                   handleRowData(item);
//                   props.handleCreateAWB(true)
//                 }}>Create AWB</Button>
//               : item.dispatchInspectionInd === 4 && item.newAwbNo ? <b>Awb Created</b> : null
//             }</>
//         )
//       }
//     },
//     {
//       title: "Shipper",
//       width: "12%",
//       dataIndex: "shipperName",
//       render: (text, item) => {
//         return (
//           <>{item.shipperName === "null" ? "" : item.shipperName}</>
//         )
//       },

//     },
//     {
//       title: "Delivery",
//       width: "12%",
//       dataIndex: "pickUp",
//       render: (text, item) => {
//         return (
//           <>{item.pickUp === "null" ? "" : moment(item.pickUp).format("DD-MM-YYYY")}</>
//         )
//       },
//       // editable: true
//     },
//     {
//       title: "AWB",
//       width: "12%",
//       dataIndex: "newAwbNo",
//       render: (text, item) => {
//         return (
//           <>{item.newAwbNo === "null" ? "" : item.newAwbNo}</>
//         )
//       },

//     },

//     {
//       title: "Status",
//       width: "10%",
//       dataIndex: "status",
//       render: (text, item) => {
//         return (
//           <>{item.status === "null" ? "" : item.status}</>
//         )
//       },

//     },
//     // {
//     //   title: '',
//     //   width: "6%",
//     //   dataIndex: 'operation',
//     //   render: (_, record) => {
//     //     const editable = isEditing(record);
//     //     return editable ? (
//     //       <div>
//     //         <Typography.Link
//     //           onClick={() =>
//     //             save(record.orderPhoneId)
//     //           }
//     //           style={{
//     //             marginRight: 8,
//     //           }}
//     //         >
//     //           Save
//     //         </Typography.Link>
//     //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//     //           <a>Cancel</a>
//     //         </Popconfirm>
//     //       </div>
//     //     ) :
//     //       record.dispatchInspectionInd === 4 ?
//     //         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//     //           <FontAwesomeIcon icon={solid('pen-to-square')} />
//     //         </Typography.Link>
//     //         : null
//     //   },
//     // },

//     {
//       title: "Pick Up",
//       width: "8%",
//       render: (text, item) => {
//         return (
//           <>
//             {item.dispatchInspectionInd === 4 && item.newAwbNo &&
//               <DispatchValidationToggle
//                 locationDetailsId={props.locationDetailsId}
//                 item={item}
//               />}

//           </>
//         )
//       }
//     },
//     {
//       title: "",
//       width: "2%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <Tooltip title="Notes">
//             <NoteAltIcon
//               style={{ cursor: "pointer", fontSize: "13px" }}
//             // onClick={() => {
//             //   handleRowData(item);
//             //   props.handleInventoryReceivedNoteOrderModal(true);
//             // }}
//             />

//           </Tooltip>
//         );
//       },
//     },

//   ];

//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === 'dispatchAwbNo' ? 'number' : col.dataIndex === 'dispatchDate' ? 'picker' : 'select',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });
//   return (
//     <>
//       {true && (
//         <Form form={form} component={false}>
//           <StyledTable
//             rowKey="orderPhoneId"
//             dataSource={data}
//             scroll={{ y: 320 }}
//             pagination={false}
//             components={{
//               body: {
//                 cell: EditableCell,
//               },
//             }}
//             loading={props.fetchingDispatchList}
//             columns={mergedColumns}
//             sticky={true}
//             rowClassName="editable-row"
//           />
//         </Form>)}

//       {/* <Suspense fallback={<BundleLoader />}>
//         {show && <DispatchDetailsTable dispatchId={dispatchId} />}
//         {showShipperDetail && <ShipperDetailsTable dispatchId={dispatchId} />}
//       </Suspense>

//       <DispatchModal
//         dispatchId={dispatchId}
//         particularRowData={particularRowData}
//         dispatchModal={props.dispatchModal}
//         handleDispatchModal={props.handleDispatchModal}
//       />
//       */}
//       <DispatchPhoneListModal
//         rowData={rowData}
//         handlePickupDateModal={props.handlePickupDateModal}
//         openPickupDateModal={props.openPickupDateModal}
//       />
//       <DispatchOrderAwbModal
//         rowData={rowData}
//         addCreateAwb={props.addCreateAwb}
//         handleCreateAWB={props.handleCreateAWB}
//       />
//     </>
//   );
// }

// const mapStateToProps = ({ shipper, inventory, auth, dispatch }) => ({
//   allDispatchList: inventory.allDispatchList,
//   allShipper: shipper.allShipper,
//   openPickupDateModal: inventory.openPickupDateModal,
//   pickUpModal: inventory.pickUpModal,
//   userId: auth.userDetails.userId,
//   fetchingDispatchList: inventory.fetchingDispatchList,
//   addCreateAwb: inventory.addCreateAwb,
//   locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getAllShipper,
//       getDispatchList,
//       handlePickupDateModal,
//       updateDispatchInspectionButton,
//       addFinalDispatchData,
//       handleCreateAWB
//     },
//     dispatch
//   );

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(DispatchTable)
// );

// // const columns = [
// //   {
// //     title: "",
// //     width: "1%",
// //   },

// //   {
// //     title: "Dispatch ID",
// //     width: "18%",
// //     // dataIndex: "dispatchId",
// //     render: (name, item, i) => {
// //       const currentdate = moment().format("DD/MM/YYYY");
// //       const date = moment(item.creationDate).format("DD/MM/YYYY");
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },

// //         children: (
// //           <>
// //             <Badge count={item.productNum}
// //               // style={{ height: "19px" }}
// //               size="small"
// //             >
// //               <div
// //                 onClick={() => handleDispatch(item.dispatchId)}
// //                 style={{
// //                   cursor: "pointer",
// //                   textDecoration: "underline",
// //                   color: item.pickUpInd ? "black" : "tomato"
// //                 }}
// //               >

// //                 {`${item.dispatchId} `} &nbsp;

// //                 {date === currentdate ? (
// //                   <div
// //                     style={{
// //                       color: "tomato",
// //                       fontWeight: "bold",
// //                     }}
// //                   >
// //                     New
// //                   </div>
// //                 ) : null}
// //               </div>
// //             </Badge>
// //           </>
// //         ),
// //       };
// //     },
// //   },

// //   {
// //     title: "Pickup",
// //     dataIndex: "pickUpDate",
// //     width: "7%",
// //     // editable: true,
// //     onFilter: (value, record) => record.pickUpDate.indexOf(value) === 0,
// //     sorter: (a, b) => {
// //       const pickUpDateA = a.pickUpDate && a.pickUpDate.toLowerCase();
// //       const pickUpDateB = b.pickUpDate && b.pickUpDate.toLowerCase();
// //       if (pickUpDateA < pickUpDateB) {
// //         return -1;
// //       }
// //       if (pickUpDateA > pickUpDateB) {
// //         return 1;
// //       }

// //       // names must be equal
// //       return 0;
// //     },
// //     render: (name, item, i) => {
// //       return (
// //         <>
// //           {item.pickUpDate === null ? "Waiting" :
// //             moment(item.pickUpDate).format("DD/MM/YY")
// //           }
// //         </>
// //       )
// //     },
// //   },
// //   {
// //     title: "",
// //     width: "3%",
// //     dataIndex: "pickUpInd",
// //     render: (name, item, i) => {
// //       return item.pickUpInd === true ? (
// //         <CheckCircleOutlined
// //           theme="twoTone"
// //           twoToneColor="#00FF00"
// //           size={180}
// //           style={{
// //             color: "green",
// //             fontSize: "16px",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //           }}
// //         />
// //       ) : (
// //         <div
// //           onClick={() => {
// //             props.handlePickupDateModal(true);
// //             props.setEditInventory(item);
// //           }}
// //         >
// //           <i class="far fa-calendar-alt" />
// //         </div>
// //       );
// //     },
// //   },

// //   {
// //     title: "Ship To",
// //     dataIndex: "shipToLocationName",
// //     ...getColumnSearchProps("shipToLocationName"),
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: (
// //           <Link
// //             toUrl={`/inventory/${(item.shipToLocationId &&
// //               item.shipToLocationId) ||
// //               ""}/Receive`}
// //             title={item.shipToLocationName}
// //           ></Link>
// //         ),
// //       };
// //     },

// //     width: "12%",
// //   },
// //   {
// //     title: "Bill To",
// //     dataIndex: "billToLocationName",
// //     ...getColumnSearchProps("billToLocationName"),
// //     width: "12%",
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: <div>{item.billToLocationName}</div>,
// //       };
// //     },
// //   },
// //   {
// //     title: "Sent",
// //     dataIndex: "pickedByName",
// //     ...getColumnSearchProps("pickedByName"),
// //     width: "12%",
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: <div>{item.pickedByName}</div>,
// //       };
// //     },
// //   },
// //   {
// //     title: "Delivery",
// //     width: "8%",
// //     // dataIndex: "dispatchDate",
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: (
// //           <>
// //             {item.receivedDate === null ? "" :
// //               <div>
// //                 {moment(item.receivedDate).format("DD/MM/YY")} &nbsp;&nbsp;
// //               </div>
// //             }
// //           </>
// //         ),
// //       };
// //     },
// //     onFilter: (value, record) => record.receivedDate.indexOf(value) === 0,
// //     sorter: (a, b) => {
// //       const receivedDateA = a.receivedDate && a.receivedDate.toLowerCase();
// //       const receivedDateB = b.receivedDate && b.receivedDate.toLowerCase();
// //       if (receivedDateA < receivedDateB) {
// //         return -1;
// //       }
// //       if (receivedDateA > receivedDateB) {
// //         return 1;
// //       }

// //       // names must be equal
// //       return 0;
// //     },
// //   },

// //   {
// //     // title: "Delivery Status",
// //     title: "",
// //     dataIndex: "deliveryStatus",
// //     width: "3%",
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: <div>{item.deliveryStatus}</div>,
// //       };
// //     },
// //   },
// //   {
// //     title: "Received",
// //     dataIndex: "receivedByName",
// //     ...getColumnSearchProps("receivedByName"),
// //     width: "12%",
// //     render: (name, item, i) => {
// //       return {
// //         props: {
// //           style: {
// //             background:
// //               (show || showShipperDetail) && dispatchId === item.dispatchId
// //                 ? "rgb(158 183 223)"
// //                 : null,
// //           },
// //         },
// //         children: <div>{item.receivedByName}</div>,
// //       };
// //     },
// //   },
// //   {
// //     title: "",
// //     dataIndex: "documentId",
// //     width: "2%",
// //     render: (name, item, i) => {
// //       //debugger
// //       return item.pickUpInd === false ? (
// //         <Tooltip title="Update Dispatch ID">
// //           <div
// //             style={{
// //               cursor: "pointer",
// //               fontSize: "12px",
// //               color: "green",
// //             }}
// //             onClick={() => {
// //               props.handleDispatchModal(true);
// //               handleSetParticularOrderData(item);
// //               props.setEditDispatch(item);
// //             }}
// //           >
// //             <i class="far fa-share-square"></i>
// //           </div>
// //         </Tooltip>
// //       ) : null;
// //     },
// //   },
// //   {
// //     title: "",
// //     dataIndex: "documentId",
// //     width: "2%",
// //     render: (name, item, i) => {
// //       //debugger
// //       return (
// //         <Tooltip title="Shipper">
// //           <div
// //             style={{ cursor: "pointer", fontSize: "12px" }}
// //             onClick={() => {
// //               handleShipper(item.dispatchId);
// //               props.setEditDispatch(item);
// //             }}
// //           >
// //             <i class="fas fa-shopping-basket"></i>
// //           </div>
// //         </Tooltip>
// //       );
// //     },
// //   },
// // ];