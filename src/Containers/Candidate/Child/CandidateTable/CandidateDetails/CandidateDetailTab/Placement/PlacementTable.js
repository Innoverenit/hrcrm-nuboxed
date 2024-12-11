import React, { Component} from "react";
import { connect } from "react-redux";
import RecruitmentStages from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentStages";
import { bindActionCreators } from "redux";
import PlacementDetails from "./PlacementDetails"
import {  Menu,Dropdown,Button,Progress,Tooltip,Input } from "antd";
import Highlighter from 'react-highlight-words';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from "dayjs";
import OutputIcon from '@mui/icons-material/Output';
import {
   getPlacement,
} from "../../../../../CandidateAction";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EventIcon from '@mui/icons-material/Event';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import StairsIcon from '@mui/icons-material/Stairs';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
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
    translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
      
      "1152",//1 Requirement 0 
       "213",//2Quotation 1
      "248",//3Customer 2
        "176", // Start Date 3 
       "1050", // Stages 4
      "1743", //Result 5 
        "126",// End Date 6
        "1744",// //7 Job
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
   <div className=' flex  sticky  z-auto h-[79vh]'>
   <div class="rounded m-1 p-1 w-[100%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold text-lm font-poppins sticky items-end z-10">
        <div className=" max-md:w-[10.5rem] w-[8.3rem] truncate text-sm text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/> 
        {this.state.translatedMenuItems[0]}</div>        {/* Job ID */}
       <div className=" max-md:w-[8.1rem] w-[8.5rem] truncate">
        <RecentActorsIcon className="!text-icon mr-1 "/>{this.state.translatedMenuItems[0]}
        {/* Requirement */}
        </div>
       <div className=" max-md:w-[13.1rem] w-[12.2rem] truncate">
        <LightbulbIcon className="!text-icon  text-[#c42847]"/>{this.state.translatedMenuItems[1]}{/* Quotation */}
        </div>
       <div className=" max-md:w-[8.5rem] w-[9.6rem] truncate ">
        <AcUnitIcon className="!text-icon  text-[#c42847]"/>{this.state.translatedMenuItems[2]}{/* Customer */}
       </div>
       <div className=" max-md:w-[8.2rem] w-[7.21rem] truncate">
        <EventIcon className="!text-icon text-[#5A189A] "/> {this.state.translatedMenuItems[3]}        {/* Start Date*/}
    </div> 
       <div className="max-md:w-[8.5rem] w-[6.1rem] truncate">{this.state.translatedMenuItems[4]} 
        <StairsIcon className="!text-icon mr-1 text-[#c42847]"/>
        {/* Stages */}
        </div>
       <div className="max-md:w-[8.5rem] w-[6.4rem] truncate">
        <OutputIcon className="!text-icon mr-1 text-[#c42847]"/>
      {this.state.translatedMenuItems[5]} 
      {/* Result  */}
        </div>
       <div className=" max-md:w-[8.2rem]  w-[7.2rem] truncate">
        <EventIcon className="!text-icon text-[#5A189A] "/>{this.state.translatedMenuItems[6]} 
        {/* End Date */}
        </div>
      </div>
      {placement.map((item) => { 
  const close =
  this.state.show === true 
                    return (
                      <div>
                     <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
                        <div class="flex">
                          <div className=" flex items-center max-md:w-[20.12rem] ">
                          <div class="flex ml-gap  text-xs font-poppins max-md:w-[10.1rem] w-[7.1rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] items-center  ">
                          <div class=" ml-gap text-xs  font-poppins">
                              {item.jobOrder}
                              </div>
                            </div>
                          <div className=" flex  max-md:w-[10.001rem] w-[8.001rem] items-center justify-start h-8 bg-[#eef2f9] ml-gap  max-sm:justify-between">
                           <div class=" ml-gap text-xs  font-poppins">
                              {item.requirementName}
                            </div>
                          </div>
                        </div>
                          <div className=" flex  max-md:w-[9.21rem]  w-[12.21rem] items-center justify-start h-8 bg-[#eef2f9] ml-gap  max-sm:justify-between">
                          <div class="  text-xs ml-gap font-poppins">
                          {item.opprtunityName}
                            </div>
                          </div>
                          <div className=" flex  max-md:w-[9.22rem] w-[9.22rem] items-center justify-start h-8 bg-[#eef2f9] ml-gap  max-sm:justify-between">
                          <div class="  text-xs  ml-gap font-poppins">
                         {item.accountName}
                            </div>
                          </div>
                          <div className=" flex items-center justify-center h-8 bg-[#eef2f9] ml-gap max-md:w-[11.12rem] w-[7.12rem]   max-sm:justify-between">
                          <div class="  text-xs ml-gap font-poppins">
                            <span>{` ${dayjs(item.avilableDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                          <div className=" flex  max-md:w-[7.1rem] w-[6.1rem] items-center justify-center h-8 bg-[#eef2f9] ml-gap  max-sm:justify-between ">
                           <div class="  text-xs ml-gap font-poppins">
                            <span>
            <Dropdown
              overlay={
                <div>
                  <Menu mode="horizontal">
                    <Menu.Item className=" pl-1 pr-1 bg-[#F5F5F5]" >
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
                          <div className=" flex w-[6.2rem] max-md:w-[7.1rem]   max-sm:justify-between  items-center justify-center h-8  ml-gap">
                          <div class="  text-xs  font-poppins">
                            <span>                    
                            <div class="text-[#1b911a]  text-xs ">{item.result}</div>   
                            </span>
                            </div>
                          </div>
                          <div className=" flex  max-md:w-[7.1rem] w-[7.01rem]  max-sm:justify-between items-center justify-center h-8 bg-[#eef2f9] ml-gap">
                          <div class="  text-xs  font-poppins">
                            <span>{` ${dayjs(item.endDate).format("DD/MM/YYYY")}`}</span>
                            </div>
                          </div>
                    
                          <div class="flex  w-[5%] max-sm:w-[10%] items-center justify-center h-8 bg-[#eef2f9] ml-gap">
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
                           <MonitorHeartIcon className=" !text-icon text-[#df9697] hover:text-blue-600"/>
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
                            <MonitorHeartIcon className=" !text-icon text-[#df9697]"/>
                             )}
                          </span>
                        </Tooltip>
                      </>
                    )}
                            </div></div> </div>
                      </div>
                    </div>
                    )
                })}
      </div>
      </div>
          {this.state.show && (
            <PlacementDetails
                 candidateId={this.state.candidateId}
            stageList={this.state.stageList}
            profileId={this.state.profileId}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
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
