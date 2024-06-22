import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import TaskStatusToggle from "../Child/TaskStatusToggle";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
import { Tooltip, Input, Button, Avatar,FloatButton } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
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
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
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
          icon={<SearchOutlined />}
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
      <SearchOutlined
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
       
        return <span>{` ${moment(item.assignedOn).format("ll")}`}</span>;
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
const data2 = ` ${moment(item.startDate).format("ll")}`;

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
const data2 = ` ${moment(item.endDate).format("ll")}`;

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
                    {/* Approve */}
                    <FormattedMessage
                      id="app.approve"
                      defaultMessage="Approve"
                    />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(233, 79, 79)",
                      color: "white",
                    }}
                    onClick={() => rejectTaskByTaskId(item.taskId)}
                  >
                    {/* Reject */}
                    <FormattedMessage
                      id="app.reject"
                      defaultMessage="Reject"
                    />
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
                            // title="Do you want to delete?"
                            title={
                              <FormattedMessage
                                id="app.doyouwishtodelete?"
                                defaultMessage="Do you wish to delete?"
                              />
                            }
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
      
      const AppIcon = (props) => (
        <i
          className={`fas fa-heartbeat ${props.className}`}
          style={{ fontSize: "123%" }}
        ></i>
      );
      const PulseIcon = styled(AppIcon)`
        color: #df9697;
        &:hover {
          // background: yellow;
          color: blue;
        }
      `;


















// import React, { lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import styled from "styled-components";
// import TaskStatusToggle from "../Child/TaskStatusToggle";
// import {
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
// import { Tooltip, Input, Button, Avatar } from "antd";
// import moment from "moment";
// import { BundleLoader } from "../../../Components/Placeholder";
// import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
// import { withRouter } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   getTaskListRangeByUserId,
//   deleteTask,
//   approveTaskByTaskId,
//   rejectTaskByTaskId,
//   handleUpdateTaskModal,
//   setEditTask,
//   handleTaskNotesDrawerModal,
//   handleTaskProjectDrawerModal,
// } from "../TaskAction";
// import Highlighter from "react-highlight-words";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import { MultiAvatar } from "../../../Components/UI/Elements";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import AddTaskNotesDrawerModal from "./AddTaskNotesDrawerModal";
// const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
// const ButtonGroup = Button.Group;
// class TaskTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: "",
//       data1: "",
//     };
//   }
//   componentDidMount() {
//     const {
//       getTaskListRangeByUserId,
//       userDetails: { employeeId },
//     } = this.props;
//     getTaskListRangeByUserId(employeeId);
//   }
//   state = {
//     searchText: "",
//     searchedColumn: "",
//   };

//   handleIconClick = (data) => {
//     debugger;
//     this.setState({
//       data,
//     });
//   };
//   handleNotesClick = (data1) => {
//     debugger;
//     this.setState({
//       data1,
//     });
//   };

//   getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             this.searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             this.handleSearch(selectedKeys, confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: "block" }}
//         />

//         <Button
//           type="primary"
//           onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//           icon={<SearchOutlined />}
//           //icon="search"
//           size="small"
//           style={{ width: 90 }}
//         >
//           Search
//         </Button>
//         <Button
//           onClick={() => this.handleReset(clearFilters)}
//           size="small"
//           style={{ width: 90 }}
//         >
//           Reset
//         </Button>
//         <Button
//           type="link"
//           size="small"
//           onClick={() => {
//             confirm({ closeDropdown: false });
//             this.setState({
//               searchText: selectedKeys[0],
//               searchedColumn: dataIndex,
//             });
//           }}
//         >
//           Filter
//         </Button>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         type="search"
//         style={{ color: filtered ? "#1890ff" : undefined }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : "",
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select(), 100);
//       }
//     },
//     render: (text) =>
//       this.state.searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[this.state.searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     this.setState({
//       searchText: selectedKeys[0],
//       searchedColumn: dataIndex,
//     });
//   };

//   handleReset = (clearFilters) => {
//     clearFilters();
//     this.setState({ searchText: "" });
//   };

//   render() {
//     //debugger;
//     const {
//       fetchingTaskListRangeByUserId,
//       fetchingTaskListRangeByUserIdError,
//       taskListRangeByUserId,
//       deleteTask,
//       approveTaskByTaskId,
//       rejectTaskByTaskId,
//       handleUpdateTaskModal,
//       handleTaskProjectDrawerModal,
//       updateTaskModal,
//       addDrawerTaskNotesModal,
//       handleTaskNotesDrawerModal,
//       setEditTask,
//       userDetails: { employeeId },
//     } = this.props;

//     // const columns = [
//     //   {
//     //     headerName: "",
//     //     field: "priority",
//     //     width: 5,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       //debugger;
//     //       return (
//     //         <div>
//     //           {data.priority === "High" && (
//     //             <div
//     //               style={{
//     //                 borderRadius: "50%",
//     //                 height: "2.1875em",
//     //                 width: "2.1875em",
//     //                 backgroundColor: "red",
//     //               }}
//     //             ></div>
//     //           )}
//     //           {data.priority === "Medium" && (
//     //             <div
//     //               style={{
//     //                 borderRadius: "50%",
//     //                 height: "2.1875em",
//     //                 width: "2.1875em",
//     //                 backgroundColor: "orange",
//     //               }}
//     //             ></div>
//     //           )}
//     //           {data.priority === "Low" && (
//     //             <div
//     //               style={{
//     //                 borderRadius: "50%",
//     //                 height: "2.1875em",
//     //                 width: "2.1875em",
//     //                 backgroundColor: "teal",
//     //               }}
//     //             ></div>
//     //           )}
//     //         </div>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     //title: "Expense Type",
//     //     headerName: "Type",

//     //     field: "taskType",
//     //     width: 90,
//     //     renderCell: (cellValues) => {
//     //       const data = cellValues.row;
//     //       return <span>{` ${data.taskType}`}</span>;
//     //     },
//     //   },
//     //   {
//     //     headerName: "Name",

//     //     field: "taskName",
//     //     width: 110,
//     //   },
//     //   {
//     //     headerName: "Customer",

//     //     field: "customerName",
//     //     width: 80,
//     //     renderCell: (cellValues) => {
//     //       const data = cellValues.row;
//     //       return (
//     //         <span>
//     //           {data.customerName === null ? (
//     //             ""
//     //           ) : (
//     //           <Tooltip title={data.customerName}>
//     //             <MultiAvatar
//     //               primaryTitle={data.customerName}
//     //               imgWidth={"1.8em"}
//     //               imgHeight={"1.8em"}
//     //             />
             
//     //           </Tooltip>
//     //              )}
//     //         </span>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "Project",

//     //     field: "projectName",
//     //     width: 110,
//     //   },
//     //   {
//     //     headerName: "Owner",
//     //     field: "submittedBy",
//     //     width: 70,
//     //     renderCell: (cellValues) => {
//     //       const data = cellValues.row;
//     //       return (
//     //         <span>
//     //           <MultiAvatar
//     //             primaryTitle={data.submittedBy}
//     //             imgWidth={"1.8em"}
//     //             imgHeight={"1.8em"}
//     //           />
//     //         </span>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "Assigned on",
//     //     field: "",
//     //     width: 100,
//     //     renderCell: (cellValues, row) => {
//     //       const data = cellValues.row;
//     //       return <span>{` ${moment(data.assignedOn).format("ll")}`}</span>;
//     //     },
//     //   },
//     //   {
//     //     headerName: "Assigned",
//     //     //title: <FormattedMessage id="app.assignedon" defaultMessage="Assigned on" />,
//     //     field: "assignedToName",
//     //     width: 90,
//     //     renderCell: (cellValues) => {
//     //       const data = cellValues.row;
//     //       return (
//     //         <span>
//     //         {data.assignedToName === null ? (
//     //           ""
//     //         ) : (
//     //           <MultiAvatar
//     //             primaryTitle={data.assignedToName}
//     //             imgWidth={"1.8em"}
//     //             imgHeight={"1.8em"}
//     //           />
//     //         )}
//     //         </span>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "Team",
//     //     field: "candidateName",
//     //     width: 70,
//     //     renderCell: (cellValues) => {
//     //       const data = cellValues.row;
//     //       return (
//     //         <span>
//     //           <Avatar.Group
//     //             maxCount={2}
//     //             maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//     //           >
//     //             {data.candidates &&
//     //               data.candidates.map((candidate, i) => {
//     //                 const data1 = candidate.candidateName.slice(0, 2);
//     //                 console.log("datas", data1);
//     //                 return (
//     //                   <Tooltip title={candidate.candidateName}>
//     //                     <Avatar style={{ backgroundColor: "#94b3e4" }}>
//     //                       {data1}
//     //                     </Avatar>
//     //                   </Tooltip>
//     //                 );
//     //               })}
//     //           </Avatar.Group>
//     //         </span>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "Start",
//     //     field: "startDate",
//     //     width: 90,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       const date = ` ${moment(data.startDate).format("ll")}`;
//     //       return <span>{date}</span>;
//     //     },
//     //   },
//     //   {
//     //     headerName: "End",
//     //     field: "endDate",
//     //     width: 90,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       const data2 = ` ${moment(data.endDate).format("ll")}`;
//     //       return <span>{data2}</span>;
//     //     },
//     //   },
//     //   {
//     //     headerName: "Status",
//     //     field: "taskStatus",
//     //     width: 20,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       return (
//     //         <ButtonGroup>
//     //           {data.complitionStatus === "To Start" && (
//     //             <StatusIcon
//     //               type="To Start"
//     //               iconType="fa-hourglass-start"
//     //               tooltip="To Start"
//     //               color="blue"
//     //             />
//     //           )}
//     //           {data.complitionStatus === "In Progress" && (
//     //             <StatusIcon
//     //               type="In Progress"
//     //               iconType="fa-hourglass-half"
//     //               tooltip="In Progress"
//     //             />
//     //           )}
//     //           {data.complitionStatus === "completed" && (
//     //             <StatusIcon
//     //               type="Completed"
//     //               iconType="fa-hourglass"
//     //               tooltip="Completed"
//     //             />
//     //           )}
//     //         </ButtonGroup>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "",
//     //     field: "Completed",
//     //     width: 120,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       return (
//     //         <span>
//     //           {data.taskStatus === "Completed" && !data.approvedInd ? (
//     //             <>
//     //               <div>
//     //                 <Button
//     //                   onClick={() => approveTaskByTaskId(data.taskId)}
//     //                   style={{ backgroundColor: "teal", color: "white" }}
//     //                 >
//     //                   {/* Approve */}
//     //                   <FormattedMessage
//     //                     id="app.approve"
//     //                     defaultMessage="Approve"
//     //                   />
//     //                 </Button>
//     //                 <Button
//     //                   style={{
//     //                     backgroundColor: "rgb(233, 79, 79)",
//     //                     color: "white",
//     //                   }}
//     //                   onClick={() => rejectTaskByTaskId(data.taskId)}
//     //                 >
//     //                   {/* Reject */}
//     //                   <FormattedMessage
//     //                     id="app.reject"
//     //                     defaultMessage="Reject"
//     //                   />
//     //                 </Button>
//     //               </div>
//     //             </>
//     //           ) : (
//     //             <>
//     //               {data.approvedInd === "Approved" ? (
//     //                 <CheckCircleOutlined
//     //                   type="check-circle"
//     //                   theme="twoTone"
//     //                   twoToneColor="#52c41a"
//     //                   size={140}
//     //                   style={{ fontSize: "1rem" }}
//     //                 />
//     //               ) : data.approvedInd === "Rejected" ? (
//     //                 <CloseCircleOutlined
//     //                   type="close-circle"
//     //                   theme="twoTone"
//     //                   twoToneColor="red"
//     //                   size={140}
//     //                   style={{ fontSize: "1rem" }}
//     //                 />
//     //               ) : (
//     //                 <></>
//     //               )}
//     //             </>
//     //           )}
//     //         </span>
//     //       );
//     //     },
//     //   },

//     //   {
//     //     headerName: "",
//     //     // field: "documentId",
//     //     width: 0,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data1 = cellValues.row;

//     //       return (
//     //         <NoteAltIcon
//     //           onClick={() => {
//     //             handleTaskNotesDrawerModal(true);
//     //             this.handleNotesClick(data1);
//     //           }}
//     //           style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
//     //         />
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "",
//     //     field: "documentId",
//     //     width: 0,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       return (
//     //         <Tooltip title="Edit">
//     //           {this.props.userId === data.userId && (
//     //             <BorderColorIcon
//     //               type="edit"
//     //               style={{ cursor: "pointer", fontSize: "0.8rem" }}
//     //               onClick={() => {
//     //                 this.props.setEditTask(data);
//     //                 handleUpdateTaskModal(true);
//     //               }}
//     //             />
//     //           )}
//     //         </Tooltip>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "",
//     //     field: "taskId",
//     //     width: 0,
//     //     renderCell: (cellValues, row) => {
//     //       console.log("cell", cellValues);
//     //       const data = cellValues.row;
//     //       return (
//     //         <>
//     //           {data.complitionStatus !== "completed" && (
//     //             <StyledPopconfirm
//     //               // title="Do you want to delete?"
//     //               title={
//     //                 <FormattedMessage
//     //                   id="app.doyouwishtodelete?"
//     //                   defaultMessage="Do you wish to delete?"
//     //                 />
//     //               }
//     //               onConfirm={() => deleteTask(data.taskId, employeeId)}
//     //             >
//     //               <DeleteIcon
//     //                 type="delete"
//     //                 style={{ cursor: "pointer",color:"red", fontSize: "0.8rem" }}
//     //               />
//     //             </StyledPopconfirm>
//     //           )}
//     //         </>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     headerName: "",
//     //     field: "ProjectId",
//     //     width: 0,
//     //     renderCell: (cellValues, row) => {
//     //       // console.log("cell",cellValues)
//     //       const data = cellValues.row;
//     //       return (
//     //         <Tooltip title="Pulse">
//     //           <MonitorHeartIcon
//     //             type="edit"
//     //             style={{
//     //               cursor: "pointer",
//     //               color: "#df9697",
//     //               fontSize: "0.8rem",
//     //             }}
//     //             onClick={() => {
//     //               handleTaskProjectDrawerModal(true);
//     //               this.handleIconClick(data);
//     //             }}
//     //           />
//     //         </Tooltip>
//     //       );
//     //     },
//     //   },

//     //   {
//     //     headerName: "",
//     //     field: "statusId",
//     //     width: 65,
//     //     renderCell: (cellValues, row) => {
//     //       // console.log("cell",cellValues)
//     //       const data = cellValues.row;
//     //       return (
//     //         <>
//     //           {data.complitionStatus === "completed" && (
//     //             <TaskStatusToggle
//     //               completionInd={data.completionInd}
//     //               taskId={data.taskId}
//     //             />
//     //           )}
//     //         </>
//     //       );
//     //     },
//     //   },
//     // ];


//     const columns = [
//       {
//         title: "",
//         width: "2%",
//       },
  
//       {
//         title: "",
       
//         width: "2%",
//         dataIndex: "priority",
    
//         defaultSortOrder: "ascend",
//         // width: "20%",
//         render: (name, item, i) => {     
//           return (
//                     <div>
//                       {item.priority === "High" && (
//                         <div
//                           style={{
//                             borderRadius: "50%",
//                             height: "2.1875em",
//                             width: "2.1875em",
//                             backgroundColor: "red",
//                           }}
//                         ></div>
//                       )}
//                       {item.priority === "Medium" && (
//                         <div
//                           style={{
//                             borderRadius: "50%",
//                             height: "2.1875em",
//                             width: "2.1875em",
//                             backgroundColor: "orange",
//                           }}
//                         ></div>
//                       )}
//                       {item.priority === "Low" && (
//                         <div
//                           style={{
//                             borderRadius: "50%",
//                             height: "2.1875em",
//                             width: "2.1875em",
//                             backgroundColor: "teal",
//                           }}
//                         ></div>
//                       )}
//                     </div>
//                   );
//         },
//       },
//       {
//         title: "Type",
       
//         dataIndex: "taskType",
       
//          width: "6%",
//          render: (name, item, i) => { 
//           return <span>{` ${item.taskType}`}</span>;
               
//          }
//       },

//         {
//           title: "Name",

      
//      dataIndex: "taskName",
//         width: "7%",
//       },

//       {
//         title: "Customer",

      
//         dataIndex: "customerName",
//         width: 8,
//         render: (name, item, i) => { 
          
//           return (
//             <span>
//               {item.customerName === null ? (
//                 ""
//               ) : (
//               <Tooltip title={item.customerName}>
//                 <MultiAvatar
//                   primaryTitle={item.customerName}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
             
//               </Tooltip>
//                  )}
//             </span>
//           );
//         },
//       },

//       {
//         title: "Project",

      
//         dataIndex: "projectName",
          
//             width: 8,
//           },
//           {
//             title: "Owner",
//             dataIndex: "submittedBy",
//             width: 6,
           
//             render: (name, item, i) => { 
//               return (
//                 <span>
//                   <MultiAvatar
//                     primaryTitle={item.submittedBy}
//                     imgWidth={"1.8em"}
//                     imgHeight={"1.8em"}
//                   />
//                 </span>
//               );
//             },
//           },

//              {
//               title: "Assigned on",
//             // dataIndex: "submittedBy",
       
//         width: 8,
//         render: (name, item, i) => { 
         
//           return <span>{` ${moment(item.assignedOn).format("ll")}`}</span>;
//         },
//       },

//       {
//         title: "Assigned",
//       // dataIndex: "submittedBy",
 
//   width: 8,
//   render: (name, item, i) => { 
   
//     return (
//               <span>
//               {item.assignedToName === null ? (
//                 ""
//               ) : (
//                 <MultiAvatar
//                   primaryTitle={item.assignedToName}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               )}
//               </span>
//             );
//   },
// },


// {
//   title: "Team",
// // dataIndex: "submittedBy",

// width: 7,
// render: (name, item, i) => { 

//   return (
//             <span>
//               <Avatar.Group
//                 maxCount={2}
//                 maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//               >
//                 {item.candidates &&
//                   item.candidates.map((candidate, i) => {
//                     const data1 = candidate.candidateName.slice(0, 2);
//                     console.log("datas", data1);
//                     return (
//                       <Tooltip title={candidate.candidateName}>
//                         <Avatar style={{ backgroundColor: "#94b3e4" }}>
//                           {data1}
//                         </Avatar>
//                       </Tooltip>
//                     );
//                   })}
//               </Avatar.Group>
//             </span>
//           );
// },



// },

// {
//   title: "Start",
// // dataIndex: "submittedBy",

// width: 6,
// render: (name, item, i) => { 
//   const data2 = ` ${moment(item.startDate).format("ll")}`;

// return (
//         <span>
//       {data2}
//         </span>
//       );
// },
// },

// {
//   title: "End",
// // dataIndex: "submittedBy",

// width: 6,
// render: (name, item, i) => { 
//   const data2 = ` ${moment(item.endDate).format("ll")}`;

// return (
//         <span>
//       {data2}
//         </span>
//       );
// },
// },
// {
//       title: "Status",
//       dataIndex: "taskStatus",
//       width: 4,
//       render: (name, item, i) => { 
       
//         return (
//           <ButtonGroup>
//             {item.complitionStatus === "To Start" && (
//               <StatusIcon
//                 type="To Start"
//                 iconType="fa-hourglass-start"
//                 tooltip="To Start"
//                 color="blue"
//               />
//             )}
//             {item.complitionStatus === "In Progress" && (
//               <StatusIcon
//                 type="In Progress"
//                 iconType="fa-hourglass-half"
//                 tooltip="In Progress"
//               />
//             )}
//             {item.complitionStatus === "completed" && (
//               <StatusIcon
//                 type="Completed"
//                 iconType="fa-hourglass"
//                 tooltip="Completed"
//               />
//             )}
//           </ButtonGroup>
//         );
//       },
//     },


//         {
//         title: "",
        
//         dataIndex: "Completed",
//         width: 10,
//         render: (name, item, i) => { 
         
//           return (
//             <span>
//               {item.taskStatus === "Completed" && !item.approvedInd ? (
//                 <>
//                   <div>
//                     <Button
//                       onClick={() => approveTaskByTaskId(item.taskId)}
//                       style={{ backgroundColor: "teal", color: "white" }}
//                     >
//                       {/* Approve */}
//                       <FormattedMessage
//                         id="app.approve"
//                         defaultMessage="Approve"
//                       />
//                     </Button>
//                     <Button
//                       style={{
//                         backgroundColor: "rgb(233, 79, 79)",
//                         color: "white",
//                       }}
//                       onClick={() => rejectTaskByTaskId(item.taskId)}
//                     >
//                       {/* Reject */}
//                       <FormattedMessage
//                         id="app.reject"
//                         defaultMessage="Reject"
//                       />
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   {item.approvedInd === "Approved" ? (
//                     <CheckCircleOutlined
//                       type="check-circle"
//                       theme="twoTone"
//                       twoToneColor="#52c41a"
//                       size={140}
//                       style={{ fontSize: "1rem" }}
//                     />
//                   ) : item.approvedInd === "Rejected" ? (
//                     <CloseCircleOutlined
//                       type="close-circle"
//                       theme="twoTone"
//                       twoToneColor="red"
//                       size={140}
//                       style={{ fontSize: "1rem" }}
//                     />
//                   ) : (
//                     <></>
//                   )}
//                 </>
//               )}
//             </span>
//           );
//         },
//       },


//       {
//         title: "",
//         // dataIndex: "submittedBy",
//             width: 2,
//             render: (name, item, i) => { 
             
//               return (
//                 <NoteAltIcon
//                   onClick={() => {
//                     handleTaskNotesDrawerModal(true);
//                     this.handleNotesClick(item);
//                   }}
//                   style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
//                 />
//               );
//             },
//           },


//           {
//             title: "",
//             // dataIndex: "submittedBy",
//                 width: 2,
//                 render: (name, item, i) => { 
                
//                   return (
//                     <Tooltip title="Edit">
//                       {this.props.userId === item.userId && (
//                         <BorderColorIcon
//                           type="edit"
//                           style={{ cursor: "pointer", fontSize: "0.8rem" }}
//                           onClick={() => {
//                             this.props.setEditTask(item);
//                             handleUpdateTaskModal(true);
//                           }}
//                         />
//                       )}
//                     </Tooltip>
//                   );
//                 },
//               },


//               {
//                 title: "",
//                 // dataIndex: "submittedBy",
//                     width: 2,
//                     render: (name, item, i) => { 
                    
//                       return (
//                         <>
//                           {item.complitionStatus !== "completed" && (
//                             <StyledPopconfirm
//                               // title="Do you want to delete?"
//                               title={
//                                 <FormattedMessage
//                                   id="app.doyouwishtodelete?"
//                                   defaultMessage="Do you wish to delete?"
//                                 />
//                               }
//                               onConfirm={() => deleteTask(item.taskId, employeeId)}
//                             >
//                               <DeleteIcon
//                                 type="delete"
//                                 style={{ cursor: "pointer",color:"red", fontSize: "0.8rem" }}
//                               />
//                             </StyledPopconfirm>
//                           )}
//                         </>
//                       );
//                     },
//                   },


//                   {
                       
//                     title: "",
//                     // dataIndex: "submittedBy",
//                         width: 2,
//                         render: (name, item, i) => { 
//                           // console.log("cell",cellValues)
                        
//                           return (
//                             <Tooltip title="Pulse">
//                               <MonitorHeartIcon
//                                 type="edit"
//                                 style={{
//                                   cursor: "pointer",
//                                   color: "#df9697",
//                                   fontSize: "0.8rem",
//                                 }}
//                                 onClick={() => {
//                                   handleTaskProjectDrawerModal(true);
//                                   this.handleIconClick(item);
//                                 }}
//                               />
//                             </Tooltip>
//                           );
//                         },
//                       },



//                           {
     
//                             title: "",
//                             // dataIndex: "submittedBy",
//                                 width: 2,
//                                 render: (name, item, i) => { 
//           return (
//             <>
//               {item.complitionStatus === "completed" && (
//                 <TaskStatusToggle
//                   completionInd={item.completionInd}
//                   taskId={item.taskId}
//                 />
//               )}
//             </>
//           );
//         },
//       },
                


     
                    
      
//     ];

//     // if (fetchingTaskListRangeByUserId) {
//     //   return <BundleLoader />;
//     // }
//     const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight * 0.75;
//     return (
//       <>
//         {/* <Box sx={{ height: "50em", width: "100%" }}>
//           <DataGrid
//             getRowId={(row) => row.taskId}
//             rows={taskListRangeByUserId}
//             columns={columns}
//             // pageSize={5}
//             rowsPerPageOptions={[5]}
//             scrollbarSize={false}
//           />
//         </Box> */}

// <StyledTable
      
//         // rowKey={(record) => record.ta}
//         // bordered
//         // rowKey="opportunityId"
//         columns={columns}
//         dataSource={
//           taskListRangeByUserId
//         }
//         pagination={false}
//         // onChange={onChange}
//          loading={fetchingTaskListRangeByUserId || fetchingTaskListRangeByUserIdError}
//         scroll={{ y: tableHeight }}     
       
//       />
 
//         <UpdateTaskModal
//           updateTaskModal={updateTaskModal}
//           handleUpdateTaskModal={handleUpdateTaskModal}
//         />

//         <AddTaskProjectDrawerModal
//           handleTaskProjectDrawerModal={this.props.handleTaskProjectDrawerModal}
//           addDrawerTaskProjectModal={this.props.addDrawerTaskProjectModal}
//           data={this.state.data}
//         />
//         <AddTaskNotesDrawerModal
//           handleTaskNotesDrawerModal={this.props.handleTaskNotesDrawerModal}
//           addDrawerTaskNotesModal={this.props.addDrawerTaskNotesModal}
//           data1={this.state.data1}
//         />
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ auth, task, opportunity }) => ({
//   userDetails: auth.userDetails,
//   addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
//   userId: auth.userDetails.userId,
//   addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
//   updateTaskModal: task.updateTaskModal,
//   fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
//   fetchingTaskListRangeByUserIdError:task.fetchingTaskListRangeByUserIdError,
//   taskListRangeByUserId: task.taskListRangeByUserId,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getTaskListRangeByUserId,
//       handleTaskProjectDrawerModal,
//       deleteTask,
//       handleTaskNotesDrawerModal,
//       approveTaskByTaskId,
//       rejectTaskByTaskId,
//       setEditTask,
//       handleUpdateTaskModal,
//     },
//     dispatch
//   );

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(TaskTable)
// );

// function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
//   const start = type;
//   console.log(start);
//   //////debugger;
//   if (status === type) {
//     size = "1.875em";
//   } else {
//     size = "1em";
//   }
//   return (
//     <Tooltip title={tooltip}>
//       <Button
//         ghost={status !== type}
//         style={{
//           padding: "0.375em",
//           borderColor: "transparent",
//           color: type === "Completed" ? "green" : "orange",
//         }}
//         onClick={onClick}
//       >
//         <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
//       </Button>
//     </Tooltip>
//   );
// }
// function overdue(pendingDays) {
//   //debugger;
//   if (pendingDays === -1) {
//     //debugger;
//     return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
//   }
//   if (pendingDays < 0) {
//     //debugger;
//     return (
//       <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
//         pendingDays
//       )} Days`}</span>
//     );
//   }
//   if (pendingDays === 1) {
//     //debugger;
//     return (
//       <span
//         style={{ color: "#21ce21", fontStyle: "italic" }}
//       >{`${pendingDays} Day`}</span>
//     );
//   }
//   if (pendingDays > 0) {
//     //debugger;
//     return (
//       <span
//         style={{ color: "#21ce21", fontStyle: "italic" }}
//       >{`${pendingDays} Days`}</span>
//     );
//   }
// }

// const AppIcon = (props) => (
//   <i
//     className={`fas fa-heartbeat ${props.className}`}
//     style={{ fontSize: "123%" }}
//   ></i>
// );
// const PulseIcon = styled(AppIcon)`
//   color: #df9697;
//   &:hover {
//     // background: yellow;
//     color: blue;
//   }
// `;
