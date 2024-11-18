import React, { useEffect ,useState,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getTaskByPhoneId, deleteTaskList,handleSpareProcess } from "./RefurbishAction"
import { Button, Popconfirm, Tooltip,Modal } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ProcessSpareDrawer from "./ProcessSpareDrawer";
import { BundleLoader } from "../../../Components/Placeholder";
import AddSpareInRepair from "./AddSpareInRepair";

function QCPhoneTaskList(props) {
    const [newData, setnewData] = useState("");

    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    function handleSetNewData(item) {
        setnewData(item);
    }
    function handleClose() {
        props.handleSpareProcess(false);
    }
    return (
        <>
<div class="mr-5 ml-5 ">
                {props.taskByPhone.map((item) => {
                    return (
                        <>
                        <div class="cursor-pointer w-[71%] flex justify-center mt-4">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div class="basis-[85%]">
                                {item.level}
                            </div>
                            <div class="w-40">
                            <Tooltip title="Spare">
                                <Button 
                                style={{width:"6rem"}}
                                type="primary"
                                onClick={() => {
                                    props.handleSpareProcess(true);
                                    handleSetNewData(item);  
                                    
                                }}> <DataSaverOnIcon className="!text-icon"/>Spares</Button> 
                                </Tooltip>
                                </div>
                            <div>
                                <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({}, item.phoneTaskId)}
                                >
                                    <DeleteOutlineIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm>

                            </div>
                        </div>
                        
                     {props.processSpareModal && item.phoneTaskId === newData.phoneTaskId &&
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
           
            {/* <ProcessSpareDrawer
         newData={newData} 
         RowData={props.RowData}                       
                  processSpareModal={props.processSpareModal}
                    handleSpareProcess={props.handleSpareProcess}
                /> */}

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