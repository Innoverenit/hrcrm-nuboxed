import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm, Tooltip } from "antd";
import AddIcon from '@mui/icons-material/Add';
import { getTaskByPhoneId,handleSpareProcess } from "../../../Refurbish/RefurbishAction"
import ProcessInventoryDrawer from "./ProcessInventoryDrawer";


function AccountPhoneTaskList(props) {
    const [newData, setnewData] = useState("");
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    function handleSetNewData(item) {
        setnewData(item);
    }
console.log(props.particularRowData)
    return (
        <>
          <div class="mr-5 ml-5">
{/* <div class="font-semibold text-sm underline">{props.particularRowData.imei}</div> */}
                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[18%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                            <Tooltip title="Spare">
                                <AddIcon
                                  onClick={() => {
                                    props.handleSpareProcess(true);
                                    handleSetNewData(item);  
                                    
                                }}
                                />
                                </Tooltip>
                                {/* <QCPhoneTaskToggle phoneTaskId={item.phoneTaskId}/> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            <ProcessInventoryDrawer
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
            handleSpareProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskList);