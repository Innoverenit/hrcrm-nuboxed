import React, { Component ,lazy} from "react";
import { Button, Tooltip,Popconfirm } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeTask} from "../Task/TaskAction"
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
const TaskConnetToggle = lazy(() =>
  import("./TaskConnetToggle")
);

class SingleTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      taskType: "",
      editInd: true,
    };
  }
  render() {
    const {
      task: { taskType,creationDate, taskTypeId,taskCheckListInd },
      handleChange,
      name,
      value,
      linkedTasks,
      updatingTasks,
      handleUpdateTask,
      handleDeleteTask,
    } = this.props;
    console.log(linkedTasks);
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                   <div class=" flex w-2/5">
                   <div class=" font-semibold" >{taskType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}</div>
                <div>
                  </div>
                </div>
                <div class="flex w-60">
                  <div class="ml-2 w-20">Workflow</div>
                 
                  <div class="ml-4 w-20">
                    <TaskConnetToggle 
                        taskType={taskType}
                        taskTypeId={taskTypeId}
                  taskCheckListInd={taskCheckListInd}
                    />  
                    </div>
                    </div>
                    <div>
                  {this.props.task.editInd ? (
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}
               
                  <Tooltip title="Delete">
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeTask(taskTypeId )}
                        >
                   <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                       </Popconfirm>
                  </Tooltip>
 
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name}
                  // value={value || taskType}
                  defaultValue={taskType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingTasks}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateTask(taskTypeId, value, toggleViewType())
                    }
                  >
                    Save
              
                  </Button>
               
                  <Button type="cancel"  onClick={() => toggleViewType()}>
                    Cancel
                  
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeTask,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleTasks);



