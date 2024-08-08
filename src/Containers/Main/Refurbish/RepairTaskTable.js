import React, { useEffect,useState } from 'react'
import { getTaskByPhoneId, deleteTaskList,handleSpareProcess } from "./RefurbishAction"
import { MultiAvatar } from '../../../Components/UI/Elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QCPhoneTaskToggle from './QCPhoneTaskToggle'
import { Popconfirm,Tooltip } from "antd";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import AddIcon from '@mui/icons-material/Add';
import QcTaskNwToggle from './QcTaskNwToggle'
import ProcessSpareDrawer from './ProcessSpareDrawer'

const RepairTaskTable = (props) => {
    const [newData, setnewData] = useState("");
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])

    function handleSetNewData(item) {
        setnewData(item);
    }
    console.log(props.taskByPhone)
    return (
        <div>
          <div class="mr-5 ml-5">

                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[100%] flex justify-center max-sm:w-auto mt-2 ">
                             <div class="w-[30%]">
                                {item.taskName}
                            </div>
                            <div class="w-[70%] flex justify-between">
                                <QCPhoneTaskToggle item={item}  
                                  RowData={props.RowData}
                                />
                                <QcTaskNwToggle 
                                item={item} 
                                RowData={props.RowData}

                                />
                                 <Tooltip title="Spare">
                                <AddIcon
                                  onClick={() => {
                                    props.handleSpareProcess(true);
                                    handleSetNewData(item);
                                   // hanldeSpare();

                                }}
                                />
                                </Tooltip>
                                <MultiAvatar
                                    primaryTitle={`${item.completeTaskUserName}`}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                />
                                <span>
                                    {dayjs(item.creationDate).format("DD-MM-YY")}
                                </span>
                                <span>
                                    <Clock
                                         style={{ width: "5rem", height: "5rem" }}
                                        value={dayjs(item.creationDate).format("HH:mm")} />

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
                    )
                })}
            </div>
            <ProcessSpareDrawer
         newData={newData}
                  RowData={props.RowData}   
                  rowData={props.rowData}           
                  processSpareModal={props.processSpareModal}
                    handleSpareProcess={props.handleSpareProcess}
                />
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

