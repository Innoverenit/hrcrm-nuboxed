
import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDispatchUpdateList,
  updateDispatchInspectionButton,
  handleRejectReasonModal,
  handleInventoryTask
} from "../../../InventoryAction";
import {handleQCPhoneNotesOrderModal} from "../../../../Refurbish/RefurbishAction"
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip } from "antd";
import TaskIcon from '@mui/icons-material/Task';
import RejectedReasonModal from "./RejectedReasonModal";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import QCPhoneNotesOrderModal from "../../../../Refurbish/QCPhoneNotesOrderModal";
import InventoryExpandTaskModal from "./InventoryExpandTaskModal";
const QRCodeModal = lazy(() => import("../../../../../../Components/UI/Elements/QRCodeModal"));
const DispatchTaskTable = lazy(() => import("./DispatchTaskTable"))
const DispatchReceiveToggle = lazy(() => import("./DispatchReceiveToggle"));


function DispatchInventoryDetailsTable(props) {
  useEffect(() => {
    props.getDispatchUpdateList(props.rowData.orderPhoneId)
  }, [])

  const [rowData, setrowData] = useState({});
  const [phoneId, setphoneId] = useState("");
  const [task, setTask] = useState(false);
  const [RowData, setRowData] = useState({});
  function handleSetRowData(item) {
      setRowData(item);
  }
  const handlePhoneTask = (id) => {
    setTask(!task)
    setphoneId(id);
  }
  const handleRowData = (data) => {
    setrowData(data)
  }
  const itemValue = props.updateDispatchList.every((item) => item.dispatchInspectionInd === 1)
  console.log(itemValue)
  console.log("dispatch",props.rowData.dispatchInspectionInd)
 
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
            <div class="rounded max-sm:m-1  py-ygap w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
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
                stopDispatchInspectionDate: dayjs()
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

                <div className=" flex max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold font-poppins items-end !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
                    <div className='w-[6.2rem] text-sm text-[#00A2E8] truncate max-md:w-[5.2rem]'>Brand</div>
                    <div className=" w-[4.92rem] truncate max-md:w-[4.92rem] ">Model</div>
                    <div className="w-[5.01rem] truncate max-md:w-[6.01rem]  max-xl:w-[5.001rem]">IMEI</div>
                    <div className=" w-[7.121rem] truncate max-md:w-[4.121rem] ">OS</div>
                    <div className=" w-[11.1rem] truncate max-md:w-[4.1rem] ">GB</div>
                    <div className="w-[3.8rem] truncate max-md:w-[2.8rem] ">Color</div>
                    <div className=" w-[5.1rem] truncate max-md:w-[5.1rem] ">Condition</div>
                    <div className=" w-[9.12rem] truncate max-md:w-[18.12rem] ">Technician</div>                 
                    <div className=" w-[11.1rem] truncate max-md:w-[4.1rem] ">Inspected</div>
                    
                </div>
                <div class="">
                   
                        {props.updateDispatchList.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                            return (
                                <div >
           
                                    <div className="flex rounded  mt-1 bg-white items-center py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex border-l-2  h-8 border-green-500 bg-[#eef2f9] items-center justify-start w-[5.7rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                               {item.company}
                                            </div>
                                            <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[5.01rem] max-xl:w-[22.8rem] max-lg:w-[17.8rem] max-sm:w-auto  ">
                                               
                                            {item.model} 
                                            </div>
                                            
<div className=" flex  w-[7.5rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        <div class=" text-xs  font-semibold  font-poppins  max-sm:text-sm">
                        {item.imei}
                        </div>
                      </div>
                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]   w-[5rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-sm ml-gap font-poppins  max-sm:text-xs">
                                                    {item.os}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]   w-[4.61rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                        <div class=" text-sm ml-gap font-poppins  max-sm:text-xs">
                                                    {item.gb}
                                                </div>

                                            </div>

                                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] truncate  w-[5.6rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-sm ml-gap font-poppins  max-sm:text-xs">
                                                    {item.color}
                                                </div>

                                            </div>
                                            <div className=" flex  items-center justify-cente truncate h-8 ml-gap bg-[#eef2f9] w-[7.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm ml-gap font-poppins text-center  max-sm:text-xs">
                                                    {item.conditions}

                                                </div>
                                            </div>
                                            <div className=" flex  items-center justify-center truncate h-8 ml-gap bg-[#eef2f9] w-[7.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm ml-gap font-poppins text-center  max-sm:text-xs">
                                                    {item.repairTechnicianName}

                                                </div>
                                            </div>
             
          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[7.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center  max-sm:text-xs">
                                                    {item.dispatchPhoneUserName}

                                                </div>
                                            </div>
          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins text-center  max-sm:text-xs">
                                                    {item.reason}

                                                </div>
                                            </div>
                                            <div className="flex items-center w-[2rem] justify-end h-8 ml-gap bg-[#eef2f9] ">
                                            <Tooltip title="Task">
            <TaskIcon style={{ color: "black" }} type="file-done"
              onClick={() => {
                handleRowData(item);
                handlePhoneTask(item.phoneId);
                props.handleInventoryTask(true);
              }}
            />

          </Tooltip>
          <Tooltip title="Notes">
                                                        <NoteAltIcon className="!text-icon mr-1 cursor-pointer text-[green]"                                                             
                                                                onClick={() => {
                                                                    handleSetRowData(item);
                                                                    props.handleQCPhoneNotesOrderModal(true);
                                                                }}
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
          </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    
                </div>
              
            </div>
            <Suspense fallback={<BundleLoader />}>
                
            {/* {task && <DispatchTaskTable phoneId={phoneId} />} */}
            <InventoryExpandTaskModal  
           phoneId={phoneId}         
           rowData={rowData}
                  inventoryExpandTask={props.inventoryExpandTask}
                  handleInventoryTask={props.handleInventoryTask}
                />
      <RejectedReasonModal
        rowData={rowData}
        rejectedReasonModal={props.rejectedReasonModal}
        handleRejectReasonModal={props.handleRejectReasonModal}
      /> 
      <QCPhoneNotesOrderModal
                    RowData={RowData}
                    phoNotesQCOrderModal={props.phoNotesQCOrderModal}
                    handleQCPhoneNotesOrderModal={props.handleQCPhoneNotesOrderModal}
                />
            </Suspense>

        </div>
    </>
)
}

const mapStateToProps = ({ inventory, distributor, auth,refurbish }) => ({
  updateDispatchList: inventory.updateDispatchList,
  fetchingUpdateDispatchList:inventory.fetchingUpdateDispatchList,
  fetchingUpdateDispatchListError:inventory.fetchingUpdateDispatchListError,
  rejectedReasonModal: inventory.rejectedReasonModal,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal,
  userId: auth.userDetails.userId,
  phoNotesQCOrderModal: refurbish.phoNotesQCOrderModal,
  inventoryExpandTask: inventory.inventoryExpandTask
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDispatchUpdateList,
      updateDispatchInspectionButton,
      handleRejectReasonModal,
      handleQCPhoneNotesOrderModal,
      handleInventoryTask
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchInventoryDetailsTable);
