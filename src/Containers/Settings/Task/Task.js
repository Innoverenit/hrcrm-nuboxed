
import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input} from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getTasks,
  getTaskCount,
  addTasks,
  removeTask,
  updateTasks,
  searchTaskName,
  ClearReducerDataOfTask
} from "./TaskAction";
import TaskConnetToggle from "./TaskConnetToggle";

const Task = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [tasks, setEvents] = useState(props.tasks);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newTaskName, setTaskName] = useState('');
  useEffect(() => {
      props.getTasks(); 
      props.getTaskCount(props.orgId) 
  }, [])

  const editRegion = (taskTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(taskTypeId);
      setTaskName(name);
  };



  const handleAddTask = () => {
      setAddingRegion(true);
      setTaskName("")
  };

  const handleUpdateTask=(region)=>{
      console.log(region)
      let data={
        taskTypeId:region.taskTypeId,
        taskType:newTaskName
       
      }
props.updateTasks(data,region.taskTypeId)
setEditingId(null);
  }

  const handleTask = () => {
      // if (newRegionName.trim() !== '') {
      //     console.log("New Region:", newRegionName);
      //     const newRegion = {
      //         id: Date.now(),
      //         item: newRegionName
      //     };
      //     setRegions([...regions, newRegion]);
      //     setNewRegionName('');
      //     setAddingRegion(false);
      // }
      let data={
        taskType:newTaskName,
        orgId:props.orgId,
      }
      props.addTasks(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getTasks();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchTaskName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setTaskName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.tasks.length > 0) {
        
        setEvents(props.tasks);
      }
    }, [props.tasks]);

// console.log(regions)
if (props.fetchingItemTask) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
                          type="text" 
                          placeholder="Task"
                          value={newTaskName} 
                          onChange={(e) => setTaskName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleTask}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddTask}> Add More</button>
              )}
          </div>
          </div>
          {tasks.length ? (
  tasks
    .slice() 
    .sort((a, b) => a.taskType.localeCompare(b.taskType)) 
    .map((region, i) => (
            <div className="card9" key={region.taskTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.taskTypeId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Task"
                    value={newTaskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            ) : (
                <div className="region">{region.taskType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
  <div class="flex w-60">
                  <div class="ml-2 w-20">Workflow</div>
                 
                  <div class="ml-4 w-[25rem]">
                    <TaskConnetToggle 
                        taskType={region.taskType}
                        taskTypeId={region.taskTypeId}
                  taskCheckListInd={region.taskCheckListInd}
                    />  
                    </div>
                    </div>
            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.taskTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateTask(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.taskTypeId, region.taskType)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeTask(region.taskTypeId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.taskTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))
        ) : (
            <p>No Data Available</p>
          )}
  <div class=" font-bold">Updated on {dayjs(props.tasks && props.tasks.length && props.tasks[0].updationDate).format('YYYY-MM-DD')} by {props.tasks && props.tasks.length && props.tasks[0].name}</div>
      </div>
  );
};


const mapStateToProps = ({ tasks,auth }) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  tasks: tasks.tasks,
  taskCount:tasks.taskCount,
  orgId: auth.userDetails.organizationId,
  // removingTasks: tasks.removingTasks,
  // removingTasksError: tasks.removingTasksError,
  
  fetchingTasks:tasks.fetchingTasks,
  fetchingTasksError: tasks.fetchingTasksError,

  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks,
      getTaskCount,
      addTasks,
      removeTask,
      updateTasks,
      searchTaskName,
      ClearReducerDataOfTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
