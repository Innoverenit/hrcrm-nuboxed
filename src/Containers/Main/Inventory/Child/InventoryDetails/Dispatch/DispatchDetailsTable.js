
import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getDispatchUpdateList,
  updateDispatchInspectionButton,
  handleRejectReasonModal
} from "../../../InventoryAction";
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import moment from "moment";
import RejectedReasonModal from "./RejectedReasonModal";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const QRCodeModal = lazy(() => import("../../../../../../Components/UI/Elements/QRCodeModal"));
const DispatchTaskTable = lazy(() => import("./DispatchTaskTable"))
const DispatchReceiveToggle = lazy(() => import("./DispatchReceiveToggle"));


function OpenReceivedOrderIdForm(props) {
  useEffect(() => {
    props.getDispatchUpdateList(props.rowData.orderPhoneId)
  }, [])

  const [rowData, setRowData] = useState({});
  const [phoneId, setphoneId] = useState("");
  const [task, setTask] = useState(false);

  const handlePhoneTask = (id) => {
    setTask(!task)
    setphoneId(id);
  }
  const handleRowData = (data) => {
    setRowData(data)
  }
  const itemValue = props.updateDispatchList.every((item) => item.dispatchInspectionInd === 1)
  console.log(itemValue)
  console.log("dispatch",props.rowData.dispatchInspectionInd)
  // const columns = [
  //   {
  //     title: "",
  //     dataIndex: "",
  //     width: "1%",
  //   },
  //   {
  //     title: "OEM",
  //     dataIndex: "company",
  //     width: "9%",

  //   },
  //   {
  //     title: "Model",
  //     dataIndex: "model",
  //     width: "8%",
  //   },
  //   {
  //     title: "IMEI",
  //     dataIndex: "imei",
  //     width: "8%",
  //   },
  //   {
  //     title: "OS",
  //     dataIndex: "os",
  //     width: "7%",

  //   },
  //   {
  //     title: "GB",
  //     dataIndex: "gb",
  //     width: "7%",
  //   },
  //   {
  //     title: "Color",
  //     dataIndex: "color",
  //     width: "9%",
  //   },
  //   {
  //     title: "Condition",
  //     dataIndex: "conditions",
  //     width: "9%",
  //   },
  //   {
  //     title: "Technician",
  //     dataIndex: "repairTechnicianName",
  //     width: "10%",
  //   },


  //   // {
  //   //   title: "QR",
  //   //   width: "8%",
  //   //   render: (name, item, i) => {
  //   //     return (
  //   //       <SubTitle>
  //   //         {item.qrCodeId ? (
  //   //           <QRCodeModal
  //   //             qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
  //   //             imgHeight={"2.8em"}
  //   //             imgWidth={"2.8em"}
  //   //             imgRadius={20}
  //   //           />
  //   //         ) : (
  //   //           <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
  //   //             No QR
  //   //           </span>
  //   //         )}
  //   //       </SubTitle>
  //   //     );
  //   //   },
  //   // },
  //   {
  //     title: "",
  //     width: "3%",
  //     render: (name, item, i) => {
  //       //debugger
  //       return (
  //         <Tooltip title="Task">
  //           <FileDoneOutlined style={{ color: "black" }} type="file-done"
  //             onClick={() => {
  //               handleRowData(item);
  //               handlePhoneTask(item.phoneId);
  //             }}
  //           />

  //         </Tooltip>
  //       );
  //     },
  //   },
  //   {
  //     title: "",
  //     width: "3%",
  //     render: (name, item, i) => {
  //       //debugger
  //       return (
  //         <Tooltip title="Notes">
  //           <NoteAltIcon
  //             style={{ cursor: "pointer", fontSize: "13px" }}
  //           // onClick={() => {
  //           //   handleSetParticularOrderData(item);
  //           //   props.handleReceivedOrderIdPhoneNoteModal(true);
  //           // }}
  //           />

  //         </Tooltip>
  //       );
  //     },
  //   },

  //   {
  //     title: "Inspected",
  //     width: "8%",
  //     render: (name, item, i) => {
  //       //debugger
  //       return (
  //         <Tooltip>
  //           {props.rowData.dispatchInspectionInd === 1 && <DispatchReceiveToggle
  //             phoneId={item.phoneId}
  //             dispatchPhoneInd={item.dispatchPhoneInd}
  //             dispatchInspectionInd={item.dispatchInspectionInd}
  //             orderPhoneId={props.rowData.orderPhoneId}
  //           />}
  //         </Tooltip>
  //       );
  //     },
  //   },
  //   {
  //     dataIndex: "dispatchPhoneUserName",
  //     width: "10%",
  //   },
  //   {
  //     title: "",
  //     width: "8%",
  //     render: (name, item, i) => {
  //       //debugger
  //       return (
  //         <Tooltip>
  //           {!item.rejectInd && item.dispatchPhoneInd ? <Button
  //             onClick={() => {
  //               handleRowData(item)
  //               props.handleRejectReasonModal(true)
  //             }}
  //           >Reject</Button>
  //             : item.rejectInd && item.dispatchPhoneInd ?
  //               <Button
  //                 style={{ backgroundColor: "red", color: "white" }}
  //               // onClick={() => {
  //               //   handleRowData(item)
  //               //   props.handleRejectReasonModal(true)
  //               // }}
  //               >Rejected</Button> : null
  //           }
  //         </Tooltip>
  //       );
  //     },
  //   },
  //   {
  //     dataIndex: "reason",
  //     width: "10%",
  //   },

  // ];


  // const tab = document.querySelector(".ant-layout-sider-children");
  // const tableHeight = tab && tab.offsetHeight - 200;
  // return (
  //   <>
  //     <StyledTable
  //       columns={columns}
  //       loading={
  //         props.fetchingUpdateDispatchList || props.fetchingUpdateDispatchListError
  //                   }
  //       // loading={props.fetchingUpdateDispatchList}
  //       dataSource={props.updateDispatchList}
  //       pagination={false}
  //       scroll={{ y: tableHeight }}
  //     />
  //     <div class=" flex justify-end" >
  //       {/* {props.rowData.dispatchInspectionInd === 1 && <Button type="primary">Pause</Button>} */}
  //       {props.rowData.dispatchInspectionInd === 1 && <div>In Progress</div>}
  //       {props.rowData.dispatchInspectionInd === 1 && itemValue === true &&
  //         <div class=" ml-2" >
  //           <Button
  //             loading={props.updatingDispatchInspectionButton}
  //             onClick={() => props.updateDispatchInspectionButton({
  //               dispatchInspectionInd: 2,
  //               stopDispatchInspectionUser: props.userId,
  //               stopDispatchInspectionDate: moment()
  //             },
  //               props.rowData.orderPhoneId,
  //               props.locationDetailsId)}
  //             type="primary"
  //           >Inspection Completed</Button>
  //         </div>}
  //     </div>
  //     {task && <DispatchTaskTable phoneId={phoneId} />}
  //     <RejectedReasonModal
  //       rowData={rowData}
  //       rejectedReasonModal={props.rejectedReasonModal}
  //       handleRejectReasonModal={props.handleRejectReasonModal}
  //     />
  //   </>
  // );
  console.log(props.updateDispatchList?.[0]?.showQualityInspectionInd);
const brick= props.updateDispatchList?.[0]?.showQualityInspectionInd
{props.updateDispatchList.map((item) => { 
  console.log(item.showQualityInspectionInd)
  const tense = item.showQualityInspectionInd
})}
let buttonRendered = false;
  return (
    <>
        <div className=' flex sticky  z-auto'>
            <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div class=" flex justify-end" >  
{props.updateDispatchList.map((item) => {
  console.log(item.showQualityInspectionInd)
  const tense = item.showQualityInspectionInd
  if (!buttonRendered && props.rowData.dispatchInspectionInd === 1 && itemValue === true && tense) {
    buttonRendered = true;
    return (
      <div className=' flex sticky z-auto'>
        <div class=" flex justify-end" >
          <div class=" ml-2" >
            <Button
              loading={props.updatingDispatchInspectionButton}
              onClick={() => props.updateDispatchInspectionButton({
                dispatchInspectionInd: 2,
                stopDispatchInspectionUser: props.userId,
                stopDispatchInspectionDate: moment()
              }, props.rowData.orderPhoneId, props.locationDetailsId)}
              type="primary"
              disabled={!tense}
            >
              Inspection Completed
            </Button>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
})}
</div>

                <div className=" flex max-sm:hidden  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className='w-[5.2rem]'>Brand</div>
                    <div className=" w-[4.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Model</div>
                    <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.001rem]">IMEI</div>
                    <div className=" w-[4.121rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">OS</div>
                    <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">GB</div>

                    <div className="w-[2.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Color</div>
                    <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Condition</div>
                    <div className=" w-[18.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Technician</div>                 
                    <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Inspected</div>
                    
                </div>
                {/* <div class=" flex justify-end" >   
               
        { 
props.rowData.dispatchInspectionInd === 1 && itemValue === true &&
          <div class=" ml-2" >
            <Button
              loading={props.updatingDispatchInspectionButton}
              onClick={() => props.updateDispatchInspectionButton({
                dispatchInspectionInd: 2,
                stopDispatchInspectionUser: props.userId,
                stopDispatchInspectionDate: moment()
              },
                props.rowData.orderPhoneId,
                props.locationDetailsId)}
              type="primary"       
              disabled={!props.tense}             
            >Inspection Completed</Button>
          </div>}
         
      </div> */}



                <div class="">
                   
                        {props.updateDispatchList.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div >
           
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex font-medium w-[4.7rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                               {item.company}
                                            </div>
                                            <div className=" flex font-medium w-[3.01rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                               
                                            {item.model} 
                                            </div>
                                            
<div className=" flex font-medium flex-col w-[7.5rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                        {item.imei}
                        </div>
                      </div>
                                            <div className=" flex font-medium   w-[5rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.os}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium   w-[3.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.gb}
                                                </div>

                                            </div>

                                            <div className=" flex font-medium   w-[4.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.color}
                                                </div>

                                            </div>
                                            <div className=" flex font-medium  w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.conditions}

                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[8.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.repairTechnicianName}

                                                </div>
                                            </div>
                                            <Tooltip title="Task">
            <FileDoneOutlined style={{ color: "black" }} type="file-done"
              onClick={() => {
                handleRowData(item);
                handlePhoneTask(item.phoneId);
              }}
            />

          </Tooltip>
          <Tooltip title="Notes">
            <NoteAltIcon
              style={{ cursor: "pointer", fontSize: "13px" }}
            // onClick={() => {
            //   handleSetParticularOrderData(item);
            //   props.handleReceivedOrderIdPhoneNoteModal(true);
            // }}
            />

          </Tooltip>
          <Tooltip>
            {props.rowData.dispatchInspectionInd === 1 && <DispatchReceiveToggle
              phoneId={item.phoneId}
              dispatchPhoneInd={item.dispatchPhoneInd}
              dispatchInspectionInd={item.dispatchInspectionInd}
              orderPhoneId={props.rowData.orderPhoneId}
            />}
          </Tooltip>
          <div className=" flex font-medium  w-[7.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.dispatchPhoneUserName}

                                                </div>
                                            </div>
                                            {/* <Tooltip>
            {!item.rejectInd && item.dispatchPhoneInd ? <Button
              onClick={() => {
                handleRowData(item)
                props.handleRejectReasonModal(true)
              }}
            >Reject</Button>
              : item.rejectInd && item.dispatchPhoneInd ?
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                // onClick={() => {
                //   handleRowData(item)
                //   props.handleRejectReasonModal(true)
                // }}
                >Rejected</Button> : null
            }
          </Tooltip> */}
          <div className=" flex font-medium  w-[8.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.reason}

                                                </div>
                                            </div>
                                         
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    
                </div>
              
            </div>
            <Suspense fallback={<BundleLoader />}>
                
            {task && <DispatchTaskTable phoneId={phoneId} />}
      <RejectedReasonModal
        rowData={rowData}
        rejectedReasonModal={props.rejectedReasonModal}
        handleRejectReasonModal={props.handleRejectReasonModal}
      /> 
            </Suspense>

        </div>
    </>
)
}

const mapStateToProps = ({ inventory, distributor, auth }) => ({
  updateDispatchList: inventory.updateDispatchList,
  fetchingUpdateDispatchList:inventory.fetchingUpdateDispatchList,
  fetchingUpdateDispatchListError:inventory.fetchingUpdateDispatchListError,
  rejectedReasonModal: inventory.rejectedReasonModal,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal,
  userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDispatchUpdateList,
      updateDispatchInspectionButton,
      handleRejectReasonModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);
