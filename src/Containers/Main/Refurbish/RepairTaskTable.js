import React, { useEffect,useState,Suspense } from 'react'
import { getTaskByPhoneId, deleteTaskList,handleSpareProcess } from "./RefurbishAction"
import { MultiAvatar } from '../../../Components/UI/Elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QCPhoneTaskToggle from './QCPhoneTaskToggle'
import { Button, Popconfirm,Tooltip } from "antd";
import dayjs from "dayjs";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import QcTaskNwToggle from './QcTaskNwToggle'
import RepairSpareListTable from './RepairSpareListTable'
import { BundleLoader } from '../../../Components/Placeholder'
import AddSpareInRepair from './AddSpareInRepair'
import DeleteIcon from '@mui/icons-material/Delete';
const RepairTaskTable = (props) => {
    const [newData, setnewData] = useState("");
    const [open,setOpen]=useState(false);
    const [newOpen,setNewOpen]=useState(false);
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])

    function handleSetNewData(item) {
        setnewData(item);
    }
    function handleCross() {
        setOpen(false);
    }
    function handleClose() {
        setNewOpen(false);
    }
    console.log(props.taskByPhone)
    return (
        <div>
          <div class="mr-5 ml-5">

                {props.taskByPhone.map((item) => {
                    return (
                        <>
                        <div class="cursor-pointer w-[100%] flex justify-center max-sm:w-auto mt-2 ">
                             <div class="w-[30%]"
                              onClick={() => {
                              setOpen(true);
                                handleSetNewData(item);
                            }}
                             >
                                {item.taskName} {item.level}
                            </div>
                            <div class="w-[70%] flex justify-between">
                                <QCPhoneTaskToggle item={item}  
                                  RowData={props.RowData}
                                  orderPhoneId={props.rowData.orderPhoneId} 
                                />
                                <QcTaskNwToggle 
                                item={item} 
                                RowData={props.RowData}

                                />
                                 <Tooltip title="Spare">
                                 
                                   <Button
                                   type="primary"
                                  onClick={() => {
                                    setNewOpen(true);
                                    handleSetNewData(item);
                                   // hanldeSpare();

                                }}><DataSaverOnIcon className="!text-icon"/> Spare</Button>
                           
                                </Tooltip>
                                <MultiAvatar
                                    primaryTitle={`${item.completeTaskUserName}`}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                />
                                <span>
                                    {dayjs(item.creationDate).format("DD-MM-YY")}
                                </span>                          
                                <span className="digital-clock">
    {dayjs(item.creationDate).format("HH:mm")}
</span>
                                {!item.completeTaskInd && <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({
                                        userId: props.userId
                                    }, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>}
                            </div>

                        </div>
                        {open && item.phoneTaskId === newData.phoneTaskId &&
                         <Suspense fallback={<BundleLoader />}>
                            <div className="mt-2">
                            <RepairSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                            onClose={handleCross}   
                            phoneTaskId={newData && newData.phoneTaskId}                               
                        />
                             </div>
                         </Suspense>
                }
                 {newOpen && item.phoneTaskId === newData.phoneTaskId &&
                         <Suspense fallback={<BundleLoader />}>
                            <div className="mt-2">
                         <AddSpareInRepair
                                 phoneId={props.phoneId}
                                 RowData={props.RowData}
                                // orderPhoneId={props.rowData.orderPhoneId} 
                                 newData={newData} 
                                 onClose={handleClose}                    
                             />
                             </div>
                         </Suspense>
                }
                        </>
                    )
                })}
            </div> 
        </div>
    )
}
const mapStateToProps = ({ auth, refurbish }) => ({
    taskByPhone: refurbish.taskByPhone,
    userId: auth.userDetails.userId,
    processSpareModal: refurbish.processSpareModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaskByPhoneId,
            deleteTaskList,
            handleSpareProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);

