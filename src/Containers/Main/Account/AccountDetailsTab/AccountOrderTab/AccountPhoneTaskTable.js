import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../../AccountAction";
import { addTaskByPhoneId, getTaskListByPhone } from "../../../Refurbish/RefurbishAction"
import { Button, Input, Select } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import AccountPhoneTaskList from "./AccountPhoneTaskList";

const { Option } = Select;

function AccountPhoneTaskTable(props) {
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
    const handleSubmitTask = () => {
        props.addTaskByPhoneId({
            phoneId: props.phoneId,
            itemTaskId: task === "custom" ? "" : task,
            taskName: customName,
            userId: props.userId
        }, props.phoneId, handleCallback())
    }
    function handleCallback() {
        setCustomeName("")
        setTask("")
    }
    return (
        <>
            <div class="flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk">
                    <div class="flex justify-between">
                        <div class="w-[45%]">
                            <div class="font-semibold text-sm">Task List</div>
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
                                loading={props.addingTaskByPhoneById}
                                onClick={handleSubmitTask}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
                <AccountPhoneTaskList phoneId={props.phoneId}   particularRowData={props.particularRowData}/>
            </Suspense>
        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    addingTaskByPhoneById: refurbish.addingTaskByPhoneById,
    taskListByPhone: refurbish.taskListByPhone
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskTable);

