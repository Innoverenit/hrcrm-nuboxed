import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getTaskByPhoneId, deleteTaskList,handleSpareProcess } from "./RefurbishAction"
import { Popconfirm, Tooltip } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';
import ProcessSpareDrawer from "./ProcessSpareDrawer";

function QCPhoneTaskList(props) {
    const [newData, setnewData] = useState("");

    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    function handleSetNewData(item) {
        setnewData(item);
    }
 
    return (
        <>
<div class="mr-5 ml-5">
                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[25%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div class="basis-[85%]">
                                {item.level}
                            </div>
                            <Tooltip title="Spare">
                                <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                  onClick={() => {
                                    props.handleSpareProcess(true);
                                    handleSetNewData(item);  
                                    
                                }}
                                />
                                </Tooltip>
                            <div>
                                <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({}, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>

                            </div>
                        </div>
                    )
                })}
            </div>
            <ProcessSpareDrawer
         newData={newData} 
         RowData={props.RowData}                       
                  processSpareModal={props.processSpareModal}
                    handleSpareProcess={props.handleSpareProcess}
                />

        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
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

export default connect(mapStateToProps, mapDispatchToProps)(QCPhoneTaskList);