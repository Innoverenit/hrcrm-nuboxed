
import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { Tooltip } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Input} from "antd";
import { BundleLoader } from "../../../Components/Placeholder";

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
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

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
if (props.fetchingTasks) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mr-2 mt-7px" >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"taskType"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"54%"}}
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
          <div class=" flex flex-col w-wk" >
         
         <div className="!h-[69vh] !mt-2 rounded  shadow-[0em 0.25em 0.625em -0.125em] border-solid text-black m-1 p-1 w-full font-poppins overflow-auto" >

          
          {!props.fetchingTasks && tasks.length === 0 ? <NodataFoundPage /> : tasks.slice().sort((a, b) => a.taskType.localeCompare(b.taskType)).map((region, index) => (
            <div className="flex rounded ml-1  font-bold shadow shadow-gray-300 shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.taskTypeId}>
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
                <div className="flex w-1/4" >{region.taskType}
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
  <div class="flex w-1/4">
                  <div class="w-20 items-center">Workflow</div>
                 
                  <div class="ml-4 w-1/6">
                    <TaskConnetToggle 
                        taskType={region.taskType}
                        taskTypeId={region.taskTypeId}
                  taskCheckListInd={region.taskCheckListInd}
                    />  
                    </div>
                    </div>
            {/* Action buttons */}
            <div className="flex justify-end w-12 items-center">
                {/* Edit button */}
                {editingId === region.taskTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateTask(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   className=" !text-icon text-red-600 cursor-pointer "  onClick={() => editRegion(region.taskTypeId, region.taskType)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeTask(region.taskTypeId)}
                      >
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </div>
            </div>
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
