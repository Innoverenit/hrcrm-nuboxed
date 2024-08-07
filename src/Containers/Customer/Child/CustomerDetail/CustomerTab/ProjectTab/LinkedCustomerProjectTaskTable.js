import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from 'styled-components';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DatabaseOutlined,
  EyeInvisibleOutlined, HeartOutlined, SearchOutlined,  
} from '@ant-design/icons';
import EditIcon from '@mui/icons-material/Edit';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal"
import { Icon, Tooltip,Input, Button, message, Avatar } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledTable, StyledPopconfirm } from "../../../../../../Components/UI/Antd";
import { FlexContainer} from "../../../../../../Components/UI/Layout";
import { withRouter } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   getTaskListRangeByUserId,
//   deleteTask,
//   approveTaskByTaskId,
//   rejectTaskByTaskId,
//   handleUpdateTaskModal,
//   setEditTask,
//   handleTaskProjectDrawerModal
// } from "../TaskAction";
import Highlighter from "react-highlight-words";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef,GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
// const UpdateTaskModal=lazy(()=>import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;
class LinkedCustomerProjectTaskTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
   data:"",
    };
  }
//   componentDidMount() {
//     const {
//       getTaskListRangeByUserId,
//       userDetails: { employeeId },
//     } = this.props;
//     getTaskListRangeByUserId(employeeId);
//   }
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
             icon={<SearchOutlined />}
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
      <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
      taskListRangeByUserId,
      deleteTask,
      approveTaskByTaskId,
      rejectTaskByTaskId,
      handleUpdateTaskModal,
      handleTaskProjectDrawerModal,
      updateTaskModal,
      setEditTask,
      userDetails: { employeeId },
    } = this.props;

    const columns = [
      {
        headerName: "",
        field: "priority",
        width:20,
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
        width:100,
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
        headerName: "Submitted by",
       // title: <FormattedMessage id="app.submittedby" defaultMessage="Submitted by" />,
       field: "submittedBy",
        width:100,
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
        //title: <FormattedMessage id="app.assignedon" defaultMessage="Assigned on" />,
        field: "",
        width:100,
        renderCell: (cellValues,row) => {
          const data=cellValues.row
          return <span>{` ${moment(data.assignedOn).format("ll")}`}</span>;
        },
      },
      {
        headerName: "Assigned",
        //title: <FormattedMessage id="app.assignedon" defaultMessage="Assigned on" />,
        field: "assignedToName",
        width:100,
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
        //title: <FormattedMessage id="app.talent" defaultMessage="Talent" />,
        field: "candidateName",
        width:120,
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
        //title: <FormattedMessage id="app.start" defaultMessage="Start" />,
        field: "startDate",
        width:100,
       // defaultSortOrder: "descend",
       renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
         const date= ` ${moment(data.startDate).format("ll")}`
          return <span>

         {date}
            </span>;
        },
        // sorter: (a, b) => {
        //   var startDateA = a.startDate;
        //   var startDateB = b.startDate;
        //   return moment.utc(startDateA).diff(moment.utc(startDateB));
        // },
      },
      {
        headerName: "End",
        //title: <FormattedMessage id="app.end" defaultMessage="End" />,
        field: "endDate",
        width:100,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
           const data2= ` ${moment(data.endDate).format("ll")}`
          return <span>
          {data2}
            </span>;
        },
        // onFilter: (value, record) => record.endDate.indexOf(value) === 0,
        // sorter: (a, b) => {
        //   var endDateA = a.endDate;
        //   var endDateB = b.endDate;
        //   return moment.utc(endDateA).diff(moment.utc(endDateB));
        // },
      },
      {
        headerName: "Status",
        //title: <FormattedMessage id="app.status" defaultMessage="Status" />,
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
                />
              )}
              {data.complitionStatus === "In Progress" && (
                <StatusIcon
                  type="In Progress"
                  iconType="fa-hourglass-half"
                  tooltip="In Progress"
                />
              )}
              {data.complitionStatus === "Completed" && (
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
    //   {
    //     headerName: "",
    //     field: "Completed",
    //     width:20,
    //     renderCell: (cellValues,row) => {
    //       console.log("cell",cellValues)
    //        const data=cellValues.row
    //       return (
    //         <span>
    //           {data.taskStatus === "Completed" && !data.approvedInd ? (
    //             <>
    //               <FlexContainer>
    //                 <Button
    //                   onClick={() => approveTaskByTaskId(data.taskId)}
    //                   style={{ backgroundColor: "teal", color: "white" }}
    //                 >
    //                   {/* Approve */}
    //                   <FormattedMessage id="app.approve" defaultMessage="Approve" />
    //                 </Button>
    //                 <Button
    //                   style={{
    //                     backgroundColor: "rgb(233, 79, 79)",
    //                     color: "white",
    //                   }}
    //                   onClick={() => rejectTaskByTaskId(data.taskId)}
    //                 >
    //                   {/* Reject */}
    //                   <FormattedMessage id="app.reject" defaultMessage="Reject" />
    //                 </Button>
    //               </FlexContainer>
    //             </>
    //           ) : (
    //               <>
    //                 {data.approvedInd === "Approved" ? (
    //                   <CheckCircleOutlined
    //                     type="check-circle"
    //                     theme="twoTone"
    //                     twoToneColor="#52c41a"
    //                     size={140}
    //                     style={{ fontSize: "1.5625em" }}
    //                   />
    //                 ) : data.approvedInd === "Rejected" ? (
    //                   <CloseCircleOutlined
    //                     type="close-circle"
    //                     theme="twoTone"
    //                     twoToneColor="red"
    //                     size={140}
    //                     style={{ fontSize: "1.5625em" }}
    //                   />
    //                 ) : (
    //                       <></>
    //                     )}
    //               </>
    //             )}
    //         </span>
    //       );
    //     },
    //   },
    //   {
    //     headerName: "",
    //     field: "documentId",
    //     width: 2,
    //     renderCell: (cellValues,row) => {
    //       console.log("cell",cellValues)
    //        const data=cellValues.row
    //       return (
    //             <Tooltip title="Edit">
    //             <BorderColorIcon 
    //                 type="edit"
    //                 style={{ cursor: "pointer", fontSize: "1rem" }}
    //                 onClick={() => {
    //                   this.props.setEditTask(data);
    //                   handleUpdateTaskModal(true);
    //                 }}
    //               />
    //             </Tooltip>
    //       );
    //     },
    //   },
    ,
    
    ];

    if (fetchingTaskListRangeByUserId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        
        <Box sx={{ height: "50em", width: "100%" }}>
        <DataGrid
      getRowId={(row) => row.taskId}
        rows={this.props.linkedcustomerProjectTask}
        columns={columns}
        // pageSize={5}
         rowsPerPageOptions={[5]}
        scrollbarSize={false}
       /// disableSelectionOnClick
        //experimentalFeatures={{ newEditingApi: true }}
        // components={{Toolbar:GridToolbar}}
      />
      </Box>
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
           {/* <UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        />


<AddTaskProjectDrawerModal
handleTaskProjectDrawerModal={this.props.handleTaskProjectDrawerModal}
addDrawerTaskProjectModal={this.props.addDrawerTaskProjectModal}
data={this.state.data}

      /> */}
          
         
      </>
    );
  }
}
const mapStateToProps = ({ auth, task, opportunity }) => ({
  userDetails: auth.userDetails,
 
  userId: auth.userDetails.userId,
  addDrawerTaskProjectModal:task.addDrawerTaskProjectModal,
  updateTaskModal: task.updateTaskModal,
  fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  taskListRangeByUserId: task.taskListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getTaskListRangeByUserId,
    //   handleTaskProjectDrawerModal,
    //   deleteTask,
    //   approveTaskByTaskId,
    //   rejectTaskByTaskId,
    //   setEditTask,
    //   handleUpdateTaskModal,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LinkedCustomerProjectTaskTable)
);

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
          color: status === type ? "orange" : "grey",
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
