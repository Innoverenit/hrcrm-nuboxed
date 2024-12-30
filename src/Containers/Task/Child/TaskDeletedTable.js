import React, { lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal"
import { Tooltip,Input, Button, Avatar } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm } from "../../../Components/UI/Antd";

import DeleteIcon from '@mui/icons-material/Delete';
import {
  getDeletedTask,
  deleteTask,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleTaskProjectDrawerModal
} from "../TaskAction";
import Highlighter from "react-highlight-words";

import { DataGrid } from "@mui/x-data-grid";
import { MultiAvatar } from "../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
const ButtonGroup = Button.Group;
class TaskDeletedTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
   data:"",
    };
  }
  componentDidMount() {
    const {
        getDeletedTask,
      userDetails: { employeeId },
    } = this.props;
    getDeletedTask(employeeId);
  }
  state = {
    searchText: "",
    searchedColumn: "",
  };


  handleIconClick = (data) => {
    debugger;
    this.setState({
    
      data,
    });
   
  };

  getColumnSearchProps = (dataIndex) => ({
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
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchIcon />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
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
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    //debugger;
    const {
      fetchingTaskListRangeByUserId,
      taskDeleteList,
      deleteTask,
      approveTaskByTaskId,
      rejectTaskByTaskId,
      handleUpdateTaskModal,
      handleTaskProjectDrawerModal,
      setEditTask,
      userDetails: { employeeId },
    } = this.props;

    console.log("Task",this.props.taskDeleteList)

    const columns = [
      {
        headerName: "",
        field: "priority",
        width:5,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
          //debugger;
          return (
            <div>
              {data.priority === "High" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "red",
                  }}
                >
                </div>
              )} 
              {data.priority === "Medium" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "orange",
                  }}
                ></div>
              )}
              {data.priority === "Low" && (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "2.1875em",
                    width: "2.1875em",
                    backgroundColor: "teal",
                  }}
                >
            </div>  
              )}
            </div>
          );
        },
        // sorter: (a, b) =>
        //   a.priority &&
        //     a.priority.toLowerCase() > b.pritority &&
        //     b.priority.toLowerCase()
        //     ? 1
        //     : -1,
      },
      {
        //title: "Expense Type",
        headerName:"Type",
       
        field: "taskType",
        width:90,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>{` ${data.taskType}`}</span>;
        },
      },
      {
        headerName: "Name",
        
        field: "taskName",
        width:110,
        //...this.getColumnSearchProps('taskName'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.taskName}`}</span>;
        // },
      },
      {
        headerName: "Customer",
        
         field: "customerName",
        width:80,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
            {/* {` ${data.taskType}`} */}
            <Tooltip title={data.customerName}>
            <MultiAvatar
                    primaryTitle={data.customerName}
                    // imageId={item.ownerImageId}
                    // imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                  </Tooltip>
            </span>;
        },
        //...this.getColumnSearchProps('taskName'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.taskName}`}</span>;
        // },
      },
      {
        headerName: "Project",
        
        field: "projectName",
        width:110,
        //...this.getColumnSearchProps('taskName'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.taskName}`}</span>;
        // },
      },
      {
        headerName: "Owner",
       field: "submittedBy",
        width:70,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
            {/* {` ${data.taskType}`} */}
            <MultiAvatar
                    primaryTitle={data.submittedBy}
                    // imageId={item.ownerImageId}
                    // imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
            </span>;
        },
        //...this.getColumnSearchProps('submittedBy'),
        // render: (name, item, i) => {
        //   return <span>{` ${item.submittedBy}`}</span>;
        // },
      },
      {
        headerName: "Assigned on",
        field: "",
        width:100,
        renderCell: (cellValues,row) => {
          const data=cellValues.row
          return <span>{` ${dayjs(data.assignedOn).format("ll")}`}</span>;
        },
      },
      {
        headerName: "Assigned",
        field: "assignedToName",
        width:90,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
            {/* {` ${data.taskType}`} */}
            <MultiAvatar
                    primaryTitle={data.assignedToName}
                    // imageId={item.ownerImageId}
                    // imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
            </span>;
        },
      
      },
      {
        headerName: "Talent",
              field: "candidateName",
        width:70,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
            {/* {` ${data.taskType}`} */}
            {/* {data.candidates &&
                    data.candidates.map((candidate, i) => {
                      const data1 = candidate.candidateName
                        .split("")[0]
                        .toUpperCase();
                      console.log("datas", data1);
                      return (
                        <Tooltip title={data1}>
            <MultiAvatar
                    primaryTitle={candidate.candidateName}
                    // imageId={item.ownerImageId}
                    // imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                  </Tooltip>
                      );
                    })} */}
                      <Avatar.Group
                    maxCount={2}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {data.candidates &&
                      data.candidates.map((candidate, i) => {
                        const data1 = candidate.candidateName
                           .slice(0,2)
                          // .split("")[0]
                          // .toUpperCase();
                        console.log("datas", data1);
                        return (
                          <Tooltip title={candidate.candidateName}>
                            <Avatar style={{ backgroundColor: "#94b3e4" }}>
                              {data1}
                            </Avatar>
                          </Tooltip>
                        );
                      })}
                   
                  </Avatar.Group>

            </span>;
        },
        //...this.getColumnSearchProps('candidateName'),
        // defaultSortOrder: "descend",
      },
      {
        headerName: "Start",
      field: "startDate",
        width:90,
       // defaultSortOrder: "descend",
       renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
         const date= ` ${dayjs(data.startDate).format("ll")}`
          return <span>
{date}
            {/* <Tooltip title={date}>
            <CalendarOutlined />
            </Tooltip> */}
            </span>;
        },
        // sorter: (a, b) => {
        //   var startDateA = a.startDate;
        //   var startDateB = b.startDate;
        //   return dayjs(startDateA).diff(dayjs(startDateB));
        // },
      },
      {
        headerName: "End",
      
        field: "endDate",
        width:90,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
           const data2= ` ${dayjs(data.endDate).format("ll")}`
          return <span>
            {data2}
           {/* <Tooltip title={data2}>
            <DatabaseOutlined />
            </Tooltip> */}
            </span>;
        },
        // onFilter: (value, record) => record.endDate.indexOf(value) === 0,
        // sorter: (a, b) => {
        //   var endDateA = a.endDate;
        //   var endDateB = b.endDate;
        //   return dayjs(endDateA).diff(dayjs(endDateB));
        // },
      },
      {
        headerName: "Status",
    
        field: "taskStatus",
        width:20,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
          return (
          
            <ButtonGroup>
              {data.complitionStatus === "To Start" && (
                <StatusIcon
                  type="To Start"
                  iconType="fa-hourglass-start"
                  tooltip="To Start"
                   color="blue"
                />
              )}
              {data.complitionStatus === "In Progress" && (
                <StatusIcon
                  type="In Progress"
                  iconType="fa-hourglass-half"
                  tooltip="In Progress"
                />
              )}
              {data.complitionStatus === "completed" && (
                <StatusIcon
                  type="Completed"
                  iconType="fa-hourglass"
                  tooltip="Completed"
                />
              )}
            </ButtonGroup> 
          
           
           
            
          );
          // return <span>{` ${item.taskStatus}`}</span>;
        },
      },
      {
        headerName: "",
        field: "Completed",
        width:120,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
          return (
            <span>
              {data.taskStatus === "Completed" && !data.approvedInd ? (
                <>
                  <div>
                    <Button
                      onClick={() => approveTaskByTaskId(data.taskId)}
                      style={{ backgroundColor: "teal", color: "white" }}
                    >
                      Approve
                  
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(233, 79, 79)",
                        color: "white",
                      }}
                      onClick={() => rejectTaskByTaskId(data.taskId)}
                    >
                      Reject
                  
                    </Button>
                  </div>
                </>
              ) : (
                  <>
                    {data.approvedInd === "Approved" ? (
                      <CheckCircleOutlineIcon
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                        size={140}
                        style={{ fontSize: "1.5625em" }}
                      />
                    ) : data.approvedInd === "Rejected" ? (
                      <HighlightOffIcon
                        type="close-circle"
                        theme="twoTone"
                        twoToneColor="red"
                        size={140}
                        style={{ fontSize: "1.5625em" }}
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
        headerName: "",
        field: "documentId",
        width: 0,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
          return (
                <Tooltip title="Edit">
                  {this.props.userId===data.userId&&(
                <BorderColorIcon 
                    type="edit"
                    style={{ cursor: "pointer", fontSize: "1rem" }}
                    onClick={() => {
                      this.props.setEditTask(data);
                      handleUpdateTaskModal(true);
                    }}
                  />
                  )}
                </Tooltip>
          );
        },
      },
      {
        headerName: "",
        field: "taskId",
        width: 0,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
          return (
            <>
            {data.complitionStatus !== "completed" &&(
            <StyledPopconfirm
            title="Do you want to delete?"
           
              onConfirm={() => deleteTask(data.taskId, employeeId)}
            >
              <DeleteIcon type="delete" style={{ cursor: "pointer" }} />
            </StyledPopconfirm>
            )}
            </>
          );
        },
      },
      {
        headerName: "",
        field: "ProjectId",
        width: 0,
        renderCell: (cellValues,row) => {
          // console.log("cell",cellValues)
           const data=cellValues.row
          return (
                <Tooltip title="Edit">
                 
               {/* <PulseIcon
                 onClick={() => {
                  // this.props.setEditTask(data);
                  handleTaskProjectDrawerModal(true);
                }}
               /> */}

                  <MonitorHeartIcon
                    type="edit"
                    style={{ cursor: "pointer",color:"#df9697", fontSize: "1rem" }}
                    onClick={() => {
                      // this.props.setEditTask(data);
                      handleTaskProjectDrawerModal(true);
                      this.handleIconClick( data)
                    }}
                  />
               
                </Tooltip>
          );
        },
      },

    //   {
    //     headerName: "",
    //     field: "statusId",
    //     width: 65,
    //     renderCell: (cellValues,row) => {
    //       // console.log("cell",cellValues)
    //        const data=cellValues.row
    //       return (
    //         <>
    //         {data.complitionStatus === "completed" &&(
    //         <TaskStatusToggle
            
    //         completionInd={data.completionInd}
    //         taskId={data.taskId}
    //         // type={props.active ? "primary" : "danger"}
    //         // candidateId={item.candidateId}
    //         // active={item.active}
    //       />
          
    //         )}
    //         </>
               
    //       );
    //     },
    //   },
    ];

    if (fetchingTaskListRangeByUserId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        
 
        <DataGrid
      getRowId={(row) => row.taskId}
        rows={ taskDeleteList}
        columns={columns}
        // pageSize={5}
         rowsPerPageOptions={[5]}
        scrollbarSize={false}
       /// disableSelectionOnClick
        //experimentalFeatures={{ newEditingApi: true }}
        // components={{Toolbar:GridToolbar}}
      />
 
          {/* <StyledTable
            columns={columns}
            dataSource={taskListRangeByUserId}
            pagination={false}
            scroll={{ y: tableHeight }}
            // pagination={{
            //   defaultPageSize: 5,
            //   // showSizeChanger: true,
            //   // pageSizeOptions: ["5", "10"]
            // }}
            expandedRowRender={(record) => {
              return (
                <>
                  <p>{record.taskDescription || ""}</p>
                </>
              );
            }} 
          /> */}
         

<AddTaskProjectDrawerModal
handleTaskProjectDrawerModal={this.props.handleTaskProjectDrawerModal}
addDrawerTaskProjectModal={this.props.addDrawerTaskProjectModal}
data={this.state.data}
translateText={this.props.translateText}
selectedLanguage={this.props.selectedLanguage}
      />
          
         
      </>
    );
  }
}
const mapStateToProps = ({ auth, task, opportunity }) => ({
  userDetails: auth.userDetails,
 
  userId: auth.userDetails.userId,
  addDrawerTaskProjectModal:task.addDrawerTaskProjectModal,
  fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  taskDeleteList: task.taskDeleteList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDeletedTask,
      handleTaskProjectDrawerModal,
      deleteTask,
      approveTaskByTaskId,
      rejectTaskByTaskId,
      setEditTask,
      handleUpdateTaskModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeletedTable)


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

