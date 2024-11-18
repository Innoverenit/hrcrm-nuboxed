import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TaskStatusToggle from "../Child/TaskStatusToggle";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
 
} from "@ant-design/icons";

import SearchIcon from '@mui/icons-material/Search';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
import { Tooltip, Input, Button, Avatar,FloatButton } from "antd";
import dayjs from "dayjs";
import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getTaskListRangeByUserId,
  deleteTask,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleTaskNotesDrawerModal,
  handleTaskProjectDrawerModal,
  handleTaskopenModal
} from "../TaskAction";
import Highlighter from "react-highlight-words";
import { MultiAvatar } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const OpenTaskModal = lazy(() => import("./OpenTaskModal"));
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;

const TaskTable = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [currentNameId, setCurrentNameId] = useState("");

  const [currentprocessName, setCurrentprocessName] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getTaskListRangeByUserId(props.employeeId,page);
    // props.getProviderCustomerData(props.provider.serviceId, page);
  }, []);
  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getTaskListRangeByUserId(props.employeeId,page);
      // props.getProviderCustomerData(props.provider.serviceId, page);
    }, 100);
  };
  function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  const handleIconClick = (data) => {
    setData(data);
  };

  const handleNotesClick = (data1) => {
    setData1(data1);
  };
  function handleSetTaskNameId(item) {
    setCurrentNameId(item);
  }
  

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchIcon />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchIcon
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const {
    fetchingTaskListRangeByUserId,
    fetchingTaskListRangeByUserIdError,
    taskListRangeByUserId,
    deleteTask,
    // data1,
    // data,
    approveTaskByTaskId,
    rejectTaskByTaskId,
    handleUpdateTaskModal,
    handleTaskProjectDrawerModal,
    updateTaskModal,
    addDrawerTaskNotesModal,
    handleTaskNotesDrawerModal,
    setEditTask,
    userDetails: { employeeId },
  } = props;

  const columns = [
    {
      title: "",
      width: "2%",
    },
 

    {
      title: "",
     
      width: "2%",
      dataIndex: "priority",
  
      defaultSortOrder: "ascend",
      // width: "20%",
      render: (name, item, i) => {     
        return (
                  <div>
                    {item.priority === "High" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "red",
                        }}
                      ></div>
                    )}
                    {item.priority === "Medium" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "orange",
                        }}
                      ></div>
                    )}
                    {item.priority === "Low" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "teal",
                        }}
                      ></div>
                    )}
                  </div>
                );
      },
    },
    {
      title: "",
      width: "2%",
    },
    {
      title: "Types",
     
      dataIndex: "taskType",
     
       width: "6%",
       render: (name, item, i) => { 
        return <span>{` ${item.taskType}`}</span>;
             
       }
    },

      {
        title: "Name",

    
   dataIndex: "taskName",
      width: "7%",
      render: (name, item, i) => { 
              
        return (
         
             <>
             <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                style={{
                  cursor: "pointer",
                  color: "#042E8A",
                }}          
               >

                 {`${item.taskName} `} &nbsp;


               </span>

             </>
          
        );
      },
    },

    // {
    //   title: "Customer",

    
    //   dataIndex: "customerName",
    //   width: 8,
    //   render: (name, item, i) => { 
        
    //     return (
    //       <span>
    //         {item.customerName === null ? (
    //           ""
    //         ) : (
    //         <Tooltip title={item.customerName}>
    //           <MultiAvatar
    //             primaryTitle={item.customerName}
    //             imgWidth={"1.8em"}
    //             imgHeight={"1.8em"}
    //           />
           
    //         </Tooltip>
    //            )}
    //       </span>
    //     );
    //   },
    // },
        {
          title: "Owner",
          dataIndex: "submittedBy",
          width: 6,
         
          render: (name, item, i) => { 
            return (
              <span>
                <MultiAvatar
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </span>
            );
          },
        },

           {
            title: "Assigned on",
          // dataIndex: "submittedBy",
     
      width: 8,
      render: (name, item, i) => { 
       
        return <span>{` ${dayjs(item.assignedOn).format("ll")}`}</span>;
      },
    },

    {
      title: "Assigned",
    // dataIndex: "submittedBy",

width: 8,
render: (name, item, i) => { 
 
  return (
            <span>
            {item.assignedToName === null ? (
              ""
            ) : (
              <MultiAvatar
                primaryTitle={item.assignedToName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            )}
            </span>
          );
},
},


{
title: "Team",
// dataIndex: "submittedBy",

width: 7,
render: (name, item, i) => { 

return (
          <span>
          <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.owner &&
    item.owner.map((candidate, i) => {
      // Check if candidate exists and has a fullName property
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        // Handle the case where candidate.fullName is null or undefined
        return null; // Or display some default content
      }
    })}
</Avatar.Group>

          </span>
        );
},



},

{
title: "Start",
// dataIndex: "submittedBy",

width: 6,
render: (name, item, i) => { 
const data2 = ` ${dayjs(item.startDate).format("ll")}`;

return (
      <span>
    {data2}
      </span>
    );
},
},

{
title: "End",
// dataIndex: "submittedBy",

width: 6,
render: (name, item, i) => { 
const data2 = ` ${dayjs(item.endDate).format("ll")}`;

return (
      <span>
    {data2}
      </span>
    );
},
},
{
    title: "Status",
    dataIndex: "taskStatus",
    width: 4,
    render: (name, item, i) => { 
     
      return (
        <ButtonGroup>
          {item.complitionStatus === "To Start" && (
            <StatusIcon
              type="To Start"
              iconType="fa-hourglass-start"
              tooltip="To Start"
              color="blue"
            />
          )}
          {item.complitionStatus === "In Progress" && (
            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
            />
          )}
          {item.complitionStatus === "completed" && (
            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
            />
          )}
        </ButtonGroup>
      );
    },
  },


      {
      title: "",
      
      dataIndex: "Completed",
      width: 10,
      render: (name, item, i) => { 
       
        return (
          <span>
            {item.taskStatus === "Completed" && !item.approvedInd ? (
              <>
                <div>
                  <Button
                    onClick={() => approveTaskByTaskId(item.taskId)}
                    style={{ backgroundColor: "teal", color: "white" }}
                  >
                     Approve
                    
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(233, 79, 79)",
                      color: "white",
                    }}
                    onClick={() => rejectTaskByTaskId(item.taskId)}
                  >
                     Reject 
                  </Button>
                </div>
              </>
            ) : (
              <>
                {item.approvedInd === "Approved" ? (
                  <CheckCircleOutlined
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                    size={140}
                    style={{ fontSize: "1rem" }}
                  />
                ) : item.approvedInd === "Rejected" ? (
                  <CloseCircleOutlined
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="red"
                    size={140}
                    style={{ fontSize: "1rem" }}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </span>
        );
      },
    },


    {
      title: "",
      // dataIndex: "submittedBy",
          width: 2,
          render: (name, item, i) => { 
           
            return (
              <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
              />
            );
          },
        },

       


        {
          title: "",
          // dataIndex: "submittedBy",
              width: 2,
              render: (name, item, i) => { 
              
                return (
                  <Tooltip title="Edit">
                    {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit" class=" cursor-pointer !text-icon text-[tomato]"
                          onClick={() => {
                          props.setEditTask(item);
                          handleUpdateTaskModal(true);
                        }}
                      />
                    )}
                  </Tooltip>
                );
              },
            },


            {
              title: "",
              // dataIndex: "submittedBy",
                  width: 2,
                  render: (name, item, i) => { 
                  
                    return (
                      <>
                        {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                         title="Do you want to delete?"
                            
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                            <DeleteIcon
                              type="delete"
                              style={{ cursor: "pointer",color:"red", fontSize: "0.8rem" }}
                            />
                          </StyledPopconfirm>
                        )}
                      </>
                    );
                  },
                },


                // {
                     
                //   title: "",
                //   // dataIndex: "submittedBy",
                //       width: 2,
                //       render: (name, item, i) => { 
                //         // console.log("cell",cellValues)
                      
                //         return (
                //           <Tooltip title="Pulse">
                //             <MonitorHeartIcon
                //               type="edit"
                //               style={{
                //                 cursor: "pointer",
                //                 color: "#df9697",
                //                 fontSize: "0.8rem",
                //               }}
                //               onClick={() => {
                //                 handleTaskProjectDrawerModal(true);
                //                 this.handleIconClick(item);
                //               }}
                //             />
                //           </Tooltip>
                //         );
                //       },
                //     },



                        {
   
                          title: "",
                          // dataIndex: "submittedBy",
                              width: 2,
                              render: (name, item, i) => { 
        return (
          <>
            {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
          </>
        );
      },
    },
              


   
                  
    
  ];
  console.log("currentNameId", currentNameId);


  return (
    <>
      {page < props.noOfPages ?
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <FloatButton.Group style={{width:"8rem",height:"5rem"}} >
            <Button
              style={{
                color: "#1f92e2",
                fontWeight: "600",
                fontSize: "15px",
                padding: "4px 12px",
                boxShadow: "0px 0px 5px 2px #d2e2ed",
                borderRadius: "22px"
              }}
              onClick={() => handleLoadMore()}
            >Load More</Button>
            </FloatButton.Group>
          </div> : null}
      <StyledTable
        columns={columns}
        dataSource={taskListRangeByUserId}
        pagination={false}
        // loading={fetchingTaskListRangeByUserId || fetchingTaskListRangeByUserIdError}
        scroll={{ y: tableHeight }}
      />

<UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        />
        <OpenTaskModal
          addTaskDetailModal={props.addTaskDetailModal}
          handleTaskopenModal={props.handleTaskopenModal}
          item={currentprocessName}
        />

        <AddTaskProjectDrawerModal
          handleTaskProjectDrawerModal={props.handleTaskProjectDrawerModal}
          addDrawerTaskProjectModal={props.addDrawerTaskProjectModal}
          data={data}
        />
<AddTaskNotesDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
  handleTaskNotesDrawerModal={props.handleTaskNotesDrawerModal}
  addDrawerTaskNotesModal={props.addDrawerTaskNotesModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>


      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    addTaskDetailModal:task.addTaskDetailModal,
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
    noOfPages: task.taskListRangeByUserId.length && task.taskListRangeByUserId[0].noOfPages || "",
      fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  fetchingTaskListRangeByUserIdError:task.fetchingTaskListRangeByUserIdError,
  taskListRangeByUserId: task.taskListRangeByUserId,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskListRangeByUserId,
        handleTaskProjectDrawerModal,
        deleteTask,
        handleTaskNotesDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
        handleTaskopenModal
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
   
    function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
          size = "1.875em";
        } else {
          size = "1em";
        }
        return (
          <Tooltip title={tooltip}>
            <Button
              ghost={status !== type}
              style={{
                padding: "0.375em",
                borderColor: "transparent",
                color: type === "Completed" ? "green" : "orange",
              }}
              onClick={onClick}
            >
              <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
            </Button>
          </Tooltip>
        );
      }
      function overdue(pendingDays) {
        //debugger;
        if (pendingDays === -1) {
          //debugger;
          return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
        }
        if (pendingDays < 0) {
          //debugger;
          return (
            <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
              pendingDays
            )} Days`}</span>
          );
        }
        if (pendingDays === 1) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Day`}</span>
          );
        }
        if (pendingDays > 0) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Days`}</span>
          );
        }
      }