import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../../AccountAction";
import { addTaskByPhoneId, getTaskListByPhone } from "../../../Refurbish/RefurbishAction"
import { Button, Input, Select } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";

const AccountPhoneTaskList = lazy(() => import('./AccountPhoneTaskList'));
const { Option } = Select;

function AccountPhoneTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId);
        props.getTaskListByPhone(props.phoneId)
    }, []);

    const [task, setTask] = useState("")
    const [selectedLevel, setSelectedLevel] = useState(null);
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
            userId: props.userId,
            orgId:props.orgId,
            level:task === "custom" ? selectedLevel : ""
        }, props.phoneId, handleCallback())
    }
    function handleCallback() {
        setCustomeName("")
        setTask("")
    }
    const handleChangeValue = (value) => {
        console.log("Selected Level:", value);
        setSelectedLevel(value); // Update selected value in state
      };
    return (
        <>
            <div class="flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5.5 max-sm:w-wk">
                    <div class="flex justify-between">
                        <div class="w-[45%]">
                            <div class="font-semibold text-xs">Task List</div>
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
                        {task === "custom" &&
                        <Select
        style={{ width: 200 }}
        placeholder="Select a Level"
        onChange={handleChangeValue} 
        value={selectedLevel}   
      >
        <Option value="L1">L1</Option>
        <Option value="L2">L2</Option>
        <Option value="L3">L3</Option>
      </Select>
}
                    </div>

                </div>
                <div class=" h-full w-w47.5.5 max-sm:w-wk">
                    <div class="flex justify-between">
                        <div class="w-[48%]">
                            <Button type="primary"
                             disabled={ props.particularRowData.repairStatus === "Complete"}
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

