import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SearchIcon from '@mui/icons-material/Search';
import {  Tooltip,Input, Button, Avatar } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../../Components/Placeholder";

import Highlighter from "react-highlight-words";
import { DataGrid} from "@mui/x-data-grid";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
const ButtonGroup = Button.Group;
class LinkedCustomerProjectTaskTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
   data:"",
    };
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
     
      },
      {
        headerName: "Customer",
        
         field: "customerName",
        width:100,
       
      },
      {
        headerName: "Project",
        
        field: "projectName",
        width:110,
       
      },
      {
        headerName: "Submitted by",

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
        width:100,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
            {/* {` ${data.taskType}`} */}
            <MultiAvatar
                    primaryTitle={data.assignedToName}
                   
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
            </span>;
        },
      
      },
      {
        headerName: "Talent",
        field: "candidateName",
        width:120,
        renderCell: (cellValues) => {
          const data=cellValues.row
          return <span>
          
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
        width:100,
       // defaultSortOrder: "descend",
       renderCell: (cellValues,row) => {
        console.log("cell",cellValues)
         const data=cellValues.row
         const date= ` ${dayjs(data.startDate).format("ll")}`
          return <span>

         {date}
            </span>;
        },
   
      },
      {
        headerName: "End",
        field: "endDate",
        width:100,
        renderCell: (cellValues,row) => {
          console.log("cell",cellValues)
           const data=cellValues.row
           const data2= ` ${dayjs(data.endDate).format("ll")}`
          return <span>
          {data2}
            </span>;
        },
     
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
    ,
    
    ];

    if (fetchingTaskListRangeByUserId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        
        <div>
        <DataGrid
      getRowId={(row) => row.taskId}
        rows={this.props.linkedcustomerProjectTask}
        columns={columns}
        // pageSize={5}
         rowsPerPageOptions={[5]}
        scrollbarSize={false}
      
      />
      </div>
                
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
  
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedCustomerProjectTaskTable)


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