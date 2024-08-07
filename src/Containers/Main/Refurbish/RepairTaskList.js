import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../Account/AccountAction";
import { addTaskByPhoneId, getTaskListByPhone, } from "./RefurbishAction"
import { Button, Input, Switch, Select } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import RepairTaskTable from "./RepairTaskTable";
const QCPhoneTaskList = lazy(() => import("./QCPhoneTaskList"));

const { Option } = Select;

function RepairTaskList(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId);
        props.getTaskListByPhone(props.phoneId)
    }, []);

    const [task, setTask] = useState("")
    const [customName, setCustomeName] = useState("")
    const [type, setType] = useState(false)
    const handleTask = (value) => {
        console.log(value)
        setTask(value)
    }
    const handleCustomeName = (e) => {
        setCustomeName(e.target.value)
    }
    const handleCallback = () => {
        setCustomeName("")
        setTask("")
    }
    const handleSubmitTask = () => {
        props.addTaskByPhoneId({
            phoneId: props.phoneId,
            itemTaskId: task === "custom" ? "" : task,
            taskName: customName,
            userId: props.userId
        }, props.phoneId, handleCallback())
    }
    return (
        <>
            <div class="flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk">
                    <div class="flex justify-between">
                        <div class="w-[45%]">
                            <Select onChange={handleTask}>
                                <Option value={"custom"}>{"Custom"} </Option>
                                {props.phoTasklist.map((a) => {
                                    return <Option value={a.itemTaskId}>{a.name}</Option>;
                                })}
                                {props.taskListByPhone.map((a) => {
                                    return <Option value={a.repairTaskId}>{a.taskName}</Option>;
                                })}
                            </Select>

                        </div>
                        {task === "custom" &&
                            <div class="w-[45%]">
                                <Input type="text" value={customName} placeholder="Enter Custome Task" onChange={(value) => { handleCustomeName(value) }} />
                            </div>
                        }
                    </div>

                </div>
                <div class=" h-full w-w47.5 max-sm:w-wk">
                    <div class="flex justify-between">
                        <div class="w-[48%]">
                            <Button type="primary"
                            disabled={ props.RowData.repairStatus === "To Start" || props.RowData.repairStatus === "Complete"}
                                loading={props.addingTaskByPhoneById}
                                onClick={handleSubmitTask}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
                <RepairTaskTable phoneId={props.phoneId} 
                 RowData={props.RowData}/>
            </Suspense>
        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    taskListByPhone: refurbish.taskListByPhone,
    addingTaskByPhoneById: refurbish.addingTaskByPhoneById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist,
            addTaskByPhoneId,
            getTaskListByPhone
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskList);
