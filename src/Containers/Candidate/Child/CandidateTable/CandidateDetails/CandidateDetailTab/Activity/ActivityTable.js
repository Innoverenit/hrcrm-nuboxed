import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input} from "antd";
import dayjs from "dayjs";
import { getActivityListByCandidateId } from "../../../../../CandidateAction";
import Highlighter from "react-highlight-words";
import { CheckCircleOutlined, FileDoneOutlined, PhoneOutlined, ScheduleOutlined, SearchOutlined } from "@ant-design/icons";

const ButtonGroup = Button.Group;
class LinkedCandidateActivity extends Component {
 
  componentDidMount() {
      this.props.getActivityListByCandidateId(this.props.candidateId); 
  }


  state = {
    searchText: "",
    searchedColumn: "",
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
    // console.log(this.props.candidateId);
    const { fetchingActivityCandidate,candidateId } = this.props;
    // console.log(candidateId);

 

    return (
      <>
           <div className=' flex justify-end sticky top-28 z-auto'>
           <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">Type</div>
       <div className=" md:w-[8.1rem]">Topic</div>
       <div className=" md:w-[13.1rem] ">Start</div>
       <div className=" md:w-[8.5rem] ">End</div>   
       <div className="md:w-[8.5rem]">Status</div>
       <div className="md:w-[8.5rem]">Priority</div>

      </div>

      
      {this.props.activityCandidate.map((item) => { 

                    return (
                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex font-medium flex-row md:w-[20.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Name
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                            {item.activity === "Call" && <PhoneOutlined type="phone" />}
            {item.activity === "Event" && <ScheduleOutlined type="schedule" />}
            {item.activity === "Task" && <FileDoneOutlined type="file-done" />}
                            </div>
                         
       
                          <div className=" flex font-medium flex-col md:w-[2.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Country
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
       {item.type}
                            </div>
                          </div>
                      
                        </div>
                      
                          <div className=" flex font-medium flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Refurbish
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                          {item.topic}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[9.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>{` ${dayjs(item.startDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[11.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>{` ${dayjs(item.endDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            {item.completionInd === true && (
              <CheckCircleOutlined
                type="check-circle"
                theme="twoTone"
                twoToneColor="#52c41a"
                size={180}
                style={{ fontSize: "20px" }}
              />
            )}
          </span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            
            {item.status} 
           </span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            
            {item.priority} 
           </span>
                            </div>
                          </div>
                    
                       
                          </div>
                      </div>
                    </div>


                    )
                })}
      </div>
      </div>
        {/* <StyledTable
          pagination={false}
          scroll={{ y: 280 }}
          rowKey=""
          columns={columns}
          dataSource={this.props.activityCandidate}
          Loading={fetchingActivityCandidate}
         
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  activityCandidate: candidate.activityCandidate,
  fetchingActivityCandidate: candidate.fetchingActivityCandidate,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getActivityListByCandidateId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedCandidateActivity);
// const columns = [
//   {
//     title: "",
//     width: "5%",
//     dataIndex: "activity",
//     render: (name, item, i) => {
//       return (
//         <>
//           {item.activity === "Call" && <PhoneOutlined type="phone" />}
//           {item.activity === "Event" && <ScheduleOutlined type="schedule" />}
//           {item.activity === "Task" && <FileDoneOutlined type="file-done" />}
//         </>
//       );
//     },
//   },
//   {
//     title: "Type",
//     width: "12%",
//     dataIndex: "type",
//   },
//   {
//     title: "Topic",
//     width: "20%",
//     dataIndex: "topic",
//     ...this.getColumnSearchProps("topic"),
    
//   },
//   {
//     title: "Start",
//     width: "20%",
//     dataIndex: "startDate",
//     defaultSortOrder: "descend",
//     render: (name, item, i) => {
//       return <span>{` ${dayjs(item.startDate).format("lll")}`}</span>;
//     },
//     sorter: (a, b) => {
//       var startDateA = a.startDate;
//       var startDateB = b.startDate;
//       return dayjs.utc(startDateA).diff(dayjs.utc(startDateB));
//     },
//   },
//   {
//     title: "End",
//     width: "20%",
//     dataIndex: "endDate",
//     render: (name, item, i) => {
//       return <span>{` ${dayjs(item.endDate).format("lll")}`}</span>;
//     },
//     onFilter: (value, record) => record.endDate.indexOf(value) === 0,
//     sorter: (a, b) => {
//       var endDateA = a.endDate;
//       var endDateB = b.endDate;
//       return dayjs.utc(endDateA).diff(dayjs.utc(endDateB));
//     },
//   },
//   {
//     title: "",
//     width: "3%",
//     dataIndex: "completionInd",
//     render: (name, item, i) => {
//       return (
//         <span>
//           {item.completionInd === true && (
//             <CheckCircleOutlined
//               type="check-circle"
//               theme="twoTone"
//               twoToneColor="#52c41a"
//               size={180}
//               style={{ fontSize: "20px" }}
//             />
//           )}
//         </span>
//       );
//     },
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     width: "8%",
//   },
//   {
//     title: "Priority",
//     width: "6%",
//     dataIndex: "priority",
//   },
// ];
