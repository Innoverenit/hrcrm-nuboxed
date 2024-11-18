import React, { Component} from "react";
import { connect } from "react-redux";
import RecruitmentStages from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentStages";
import { bindActionCreators } from "redux";
import PlacementDetails from "./PlacementDetails"
import {  Menu,Dropdown,Button,
  Progress,Tooltip,Input } from "antd";
  import Highlighter from 'react-highlight-words';

  import SearchIcon from '@mui/icons-material/Search';
import dayjs from "dayjs";

import {
   getPlacement,
} from "../../../../../CandidateAction";
import styled from "styled-components";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
class PlacementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stageList: [],
      candidateId:"",
      searchText: '',
    searchedColumn: '',
    };
  }
  getColumnSearchProps = dataIndex => ({

    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchIcon />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchIcon style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  handleIconClick = (profileId) => {
    debugger;
    this.setState({ show: true,profileId  });
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
    
  componentDidMount() {
    // debugger;
    const { getPlacement, candidateId, } = this.props;
    console.log(candidateId);
    if (candidateId) {
      getPlacement(candidateId);
    }
  }
  
  render() {
    console.log(this.props.candidateId);
    const {
      placement,
      user,
      candidateId,
      fetchingPlacement,
      fetchingPlacementError,
      //   deleteDocument,
    } = this.props;
    console.log(candidateId);
 

    return (
      <>
   <div className=' flex justify-end sticky top-28 z-auto'>
   <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.5rem]">Job ID</div>
       <div className=" md:w-[8.1rem]">Requirement</div>
       <div className=" md:w-[13.1rem] ">Opportunity</div>
       <div className=" md:w-[8.5rem] ">Customer</div>
       <div className=" md:w-[8.2rem] ">Start Date</div>
       <div className="md:w-[8.5rem]">Stages</div>
       <div className="md:w-[8.5rem]">Result</div>
       <div className=" md:w-[8.2rem] ">End Date</div>

      </div>

      
      {placement.map((item) => { 
  const close =
  this.state.show === true 
                    return (

                      <div class="w-wk">
                      <div class=" flex rounded-xl justify-between bg-white mt-[0.5rem]  h-[2.75rem] items-center p-3">
                        <div class="flex">
                          <div className=" flex font-medium flex-row md:w-[20.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Name
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                              {item.jobOrder}
                            </div>
                         
       
                          <div className=" flex font-medium flex-col md:w-[2.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Country
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
       {item.requirementName}
                            </div>
                          </div>
                      
                        </div>
                      
                          <div className=" flex font-medium flex-row md:w-[9.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Refurbish
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                          {item.opprtunityName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[9.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                         {item.accountName}
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[11.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Inventory
                            </div> */}
       
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>{` ${dayjs(item.avilableDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            <Dropdown
              overlay={
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <RecruitmentStages
                      />{" "}
                    </Menu.Item>
                  </Menu>
                </div>
              }
              trigger={["click"]}
            >
              <Tooltip>
                {" "}
                <Progress
                  type="circle"
                  style={{ cursor: "pointer" }}
                  width={40}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>
          </span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>
            
            {item.result} 
           </span>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">
                            {/* <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                              Billing
                            </div> */}
                            <div class=" font-normal text-[0.82rem]  font-poppins">
                            <span>{` ${dayjs(item.endDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                    
                          <div class="flex flex-row w-[5%] max-sm:flex-row max-sm:w-[10%]">
                            <div>
                            {close ? (
                    <Tooltip title="Close Details"
                      
                    >
                        <span
                        onClick={() => this.handleCloseIconClick()}
                        style={{
                          fontSize: "1.125em",
                          color:
                          this.state.show === true &&
                          this.state.profileId === item.profileId &&
                          "#1890ff",
                        }}
                        size="30"
                      >{user.pulseAccessInd ===true && ( 
                           <PulseIcon></PulseIcon>
                           )}
                           </span>
                    </Tooltip>
                  ) :
                   (
                      <>
                        <Tooltip title="Access Details"
                       
                        >
                <span
                            onClick={() =>
                              this.handleIconClick(
                                item.profileId,
                              )
                            }
                            style={{
                              fontSize: "1.125em",
                              color:
                                this.state.show === true &&
                                this.state.profileId === item.profileId &&
                              "#1890ff",
                               
                                
                            }}
                            size="30"
                          >{user.pulseAccessInd ===true && ( 
                            <MonitorHeartIcon style={{fontSize:"1rem" ,color: "#df9697"}}/>
                             )}
                          </span>
                        </Tooltip>
                      </>
                    )}
                            </div>
            
                            <div></div>
                          </div>
                     
                      
                   
                          </div>
                      </div>
                    </div>


                    )
                })}
      </div>
      </div>

        {/* {true && (
          <StyledTable
            pagination={false}
            scroll={{ y: 280 }}
            rowKey="candidateId"
            columns={columns}
            dataSource={placement}
            Loading={
              fetchingPlacement ||
               fetchingPlacementError
             }
            onChange={console.log("task onChangeHere...")}
          />
        
        )} */}
          {this.state.show && (
            <PlacementDetails
                 candidateId={this.state.candidateId}
            stageList={this.state.stageList}
            profileId={this.state.profileId}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = ({ candidate,auth }) => ({
  placement: candidate.placement,
  fetchingPlacement: candidate.fetchingPlacement,
  user: auth.userDetails,
  fetchingPlacementError:candidate.fetchingPlacementError,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getPlacement,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacementTable);
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

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
