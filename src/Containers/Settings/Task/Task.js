import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from "@mui/icons-material/Download";
import { Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";

import dayjs from "dayjs";
import {
  getTasks,
  getTaskCount,
  addTasks,
  removeTask,
  updateTasks,
  searchTaskName,
  ClearReducerDataOfTask,
} from "./TaskAction";
import TaskConnetToggle from "./TaskConnetToggle";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const Task = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [tasks, setEvents] = useState(props.tasks);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newTaskName, setTaskName] = useState("");

  useEffect(() => {
    props.getTasks();
    props.getTaskCount(props.orgId);
  }, []);

  const editRegion = (taskTypeId, name) => {
    setEditingId(taskTypeId);
    setTaskName(name);
  };

  const handleAddTask = () => {
    setAddingRegion(true);
    setTaskName("");
  };

  const handleUpdateTask = (region) => {
    if (!newTaskName.trim()) {
      alert("Task name is mandatory. Please provide a valid name.");
      return;
    }

    let data = {
      taskTypeId: region.taskTypeId,
      taskType: newTaskName.trim(),
    };

    props.updateTasks(data, region.taskTypeId);
    setEditingId(null);
  };

  const handleTask = () => {
    if (!newTaskName.trim()) {
      alert("Task name is mandatory. Please provide a valid name.");
      return;
    }

    let data = {
      taskType: newTaskName.trim(),
      orgId: props.orgId,
    };

    props.addTasks(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getTasks();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchTaskName(currentData);
    } else {
      alert("Please provide a valid search input.");
    }
  };

  const handleCancelAdd = () => {
    setTaskName("");
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

  if (props.fetchingTasks) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mr-2 mt-7px">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a
            href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=taskType`}
          >
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
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Task"
                value={newTaskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleTask}
              >
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddTask}
            >
              + Add More
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col w-wk">
        <div className="!h-[69vh] !mt-2 rounded border-[#0000001f] border shadow-[#a3abb980] border-solid text-black p-1 w-full font-poppins overflow-auto">
          {!props.fetchingTasks && tasks.length === 0 ? (
            <NodataFoundPage />
          ) : (
            tasks
              .slice()
              .sort((a, b) => a.taskType.localeCompare(b.taskType))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.taskTypeId}
                >
                  {editingId === region.taskTypeId ? (
                    <input
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      placeholder="Task"
                      value={newTaskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  ) : (
                    <div className="flex w-1/4">
                      {region.taskType}
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">
                          New
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div className="flex w-1/4">
                    <div className="w-20 items-center">Workflow</div>
                    <div className="ml-4 w-1/6">
                      <TaskConnetToggle
                        taskType={region.taskType}
                        taskTypeId={region.taskTypeId}
                        taskCheckListInd={region.taskCheckListInd}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end w-12 items-center">
                    {editingId === region.taskTypeId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateTask(region)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <BorderColorIcon
                        className="!text-icon text-red-600 cursor-pointer"
                        onClick={() =>
                          editRegion(region.taskTypeId, region.taskType)
                        }
                      />
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeTask(region.taskTypeId)}
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(props.tasks && props.tasks.length && props.tasks[0].updationDate).format(
          "YYYY-MM-DD"
        )}{" "}
        by {props.tasks && props.tasks.length && props.tasks[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tasks, auth }) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  tasks: tasks.tasks,
  taskCount: tasks.taskCount,
  orgId: auth.userDetails.organizationId,
  fetchingTasks: tasks.fetchingTasks,
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
      ClearReducerDataOfTask,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Task);
