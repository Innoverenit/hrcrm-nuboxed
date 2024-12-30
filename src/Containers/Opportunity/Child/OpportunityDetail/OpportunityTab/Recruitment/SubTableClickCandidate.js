import React,{Component,} from "react";
import { connect } from "react-redux";

import { Suspense } from "react";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import styled from 'styled-components'
import {
  getCandidateById,
  getTopicsByCandidateId,
  handleRecruiterDrawerModal,
} from "../../../../../Candidate/CandidateAction";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Link } from "../../../../../../Components/Common";
import dayjs from "dayjs";
import AddCandidateDateModal from "../Recruitment/AddCandidateDateModal"
import RecruitmentDetails from "./Child/RecruitmentDetails";
import RecruitmentStages from "./RecruitmentStages";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import {
  Tooltip,
  Dropdown,
  Menu,
  Progress,
 Input, Button,
} from "antd";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
 import {LinkStatusRecruit,LinkStageRecruit,handleCandidateDateModal} from "../../../../OpportunityAction"
 import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import DocumentsLoadMore from "../DocumentsLoadMore";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
class SubTableClickCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profileId: "",
      candidateId: "",
      currentcandidateIdId:"",
      setCurrentcandidateIdId:"",
      clickedArrow: null,
      // contactId: "",
      // candidateId: "",
      // editModal: false,
      // stageList: [],
      recruitmentId: "",
      // skillSetData: "",
      // candidatePostData: {},
      // searchText: '',
      // searchedColumn: '',
      subTableVisible: false
    };
  }

 

  handleSetCurrentcandidateId(candidateId) {
    this.setState({ setCurrentcandidateId:candidateId,  });
    // setCurrentcandidateId(candidateId);
    console.log("frt1",candidateId);
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
  handleIconClick = (profileId, candidateId, stageList,candidateName) => {
    debugger;
    this.setState({ 
      show: true, profileId, candidateId, stageList,
      candidateName ,
      subTableVisible: !this.state.subTableVisible,

    });
    this.props.getCandidateById(candidateId);
    this.props.getTopicsByCandidateId(candidateId);
    // this.props.getContactDocument(contactId);
  };

  handleRecruitClick = (recruitmentId) => {
    debugger;
    this.setState({ recruitmentId });
    
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };

  handleArrowClick = (stageName, stagesId) => {
    // console.log(`Stage Name: ${stageName}, ID: ${id}`);
    this.setState({ clickedArrow: stagesId }); // Update the clicked arrow state
  };

  
  // useEffect(() => {
  //   props.getCandidateRequirement(props.recruitmentId);
   
  // }, []);

  render() {
    console.log("cus",this.props.customerId);
    const {user}=this.props;
    if (this.props.fetchingCandidateRequirement) {
      return <BundleLoader/>;
    }
   
    // const ownerlistType = 
   
    
        
    //     this.props.candidateRequirement.map((candidateRequirement) => {
    //       return {
    //         text: candidateRequirement.recruitOwner || "",
    //         value: candidateRequirement.recruitOwner,
    //       };
    //     })

        const ownerlistType = this.props.requirementOwner.map((item) => {
          return {
            text: item.recruitOwner,
            value: item.recruitOwner,
          };
        });
      
     
    console.log("Profile",this.state.profileId)
    console.log(this.props.candidateRequirement.profileId)
    const dateFormat = "MM/DD/YYYY";
  const {
    candidateRequirement:{candidateId},
  } = this.props;
  console.log("fullNmae1",this.props.fullName)
  const columns = [
    { 
      title: "Talent",
       dataIndex:"candidateName",
       width:"15%",
       ...this.getColumnSearchProps("candidateName"),
       render(name, item, ) {
        return (
          <>
           <Link
              toUrl={`/candidate/${item.candidateId}`}
              title={`${item.candidateName || ""} `}
            />
            {/* <Link
              to={`candidate/${item.candidateId}`}
              title={`${item.candidateName}`}
            /> */}
          </>
        );
      }
   },
   {
     title:"Recruiter",
     dataIndex:"recruitOwner",
     width:"16%",
     
      filters:ownerlistType,
      render: (text, item) => {
        return (
          <>
            {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
            <Tooltip title={item.recruitOwner}>
              <span>
                <MultiAvatar
                  primaryTitle={item.recruitOwner}
                  // imageId={item.ownerImageId}
                  //  imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
            </Tooltip>
          </>
        );
      },
      onFilter: (value, record) => {
        console.log(value, record);
        return record.recruitOwner=== value;
        
      },
   },
    { title: "Cost" ,
    dataIndex:"candidateBilling",
    width:"6%",
    render: (name, item, i) => {        
      return (
        <>
         {item.currency}  {item.candidateBilling} 
         
        </>
      );
    },

  },

  {
    title:"Availabillity",
    dataIndex:"avilableDate",
    width:"14%",
    sorter: (a, b) => {
      var nameA = a.avilableDate; // ignore upper and lowercase
      var nameB = b.avilableDate; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    },
    render: (name, item, i) => {   
      const avilableDate = dayjs(item.avilableDate).format("ll");     
      return (
        <>
         {`${dayjs(item.avilableDate).format("YYYY/MM/DD")}`}
          {/* {item.candidateBilling} {item.currency}  */}
          {/* {dayjs(item.avilableDate).format("L")} */}
         
        </>
      );
    },
  },


  {
    title: "",
    width: "4%",
    render: (name, item, i) => {
      return (
        <>

          <div class=" text-xs  font-poppins text-center  max-sm:text-sm">
                                          {item.stageList&&item.stageList.map((stage) => (
                                               <Tooltip title={stage.stageName}>
                      <svg
                        key={stage.stagesId}
                        width="21"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => this.handleArrowClick(stage.stageName, stage.stagesId,item)} // Attach click handler
                        style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                      >
                        <g>
                          <title>background</title>
                          <rect
                            fill="#fff"
                            id="canvas_background"
                            height="19"
                            width="23"
                            y="-1"
                            x="-1"
                          />
                        </g>
                        <g>
                          <path
                            stroke="#5f5f5c"
                            d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                            strokeWidth="0.5"
                            fill={
                              this.state.clickedArrow === stage.stagesId
                                ? "rgba(9, 191, 45, 0.6)" // Change color to red if this arrow is clicked
                                : "rgba(88, 93, 89, 0.6)"
                            }
                          />
                        </g>
                      </svg>
                      </Tooltip>
                    ))}
        
                                          </div>
              
            {/* <AddCandidateDateModal
                handleCandidateDateModal={this.props.handleCandidateDateModal}
                   profileId={item.profileId}
                addCandidateDateModal={this.props.addCandidateDateModal}
               /> */}   
        </>
               
      );
    },
  },
    // {
    //     title: "Stages",
       
    //     dataIndex: "callType",
    //     width: "7%",
    //     render: (name, item, i) => {
    //       var findProbability = 0;
    //       item.stageList.forEach((element) => {
    //         if (element.stageId === item.stageId) {
    //           findProbability = element.probability;
    //         }
    //       });

    //       // const config = {
    //       //   height: 100,
    //       //   width: 100,
    //       //   autoFit: false,
    //       //   percent: findProbability,
    //       //   color: ['#5B8FF9', '#6'],
    //       // };
    //       return (
    //         <span>
    //           <Dropdown
    //             overlay={
    //               <div>
    //                 <Menu mode="horizontal">
    //                   <Menu.Item
    //                     style={{
    //                       paddingLeft: 5,
    //                       paddingRight: 5,
    //                       backgroundColor: "#F5F5F5",
    //                     }}
    //                   >
    //                     <RecruitmentStages
    //                       rec={item}
    //                       stageId={item.stageId}
    //                       recruitOwner={item.recruitOwner}
    //                       candidateName={item.candidateName}
    //                       approveInd={item.approveInd}
    //                       rejectInd={item.rejectInd}
    //                       stageClick={(stageId) => {
    //                         this.props.LinkStageRecruit(
    //                           {
    //                             opportunityId: this.props.opportunityId,
    //                             stageId: stageId,
    //                             recruitmentProcessId: item.recruitmentProcessId,
    //                             recruitmentId: item.recruitmentId,
    //                             profileId: item.profileId,
    //                           },
    //                           // this.props.emailSendStage({
    //                           //   opportunityId: item.opportunityId,
    //                           //   userId: this.props.userId,
    //                           //   profileId: item.profileId,
    //                           //   stageId: stageId,
    //                           //   candidateId: item.contactId,
    //                           // })
    //                         );
    //                       }}
    //                     />{" "}
    //                   </Menu.Item>
    //                 </Menu>
    //               </div>
    //             }
    //             trigger={["click"]}
    //           >
    //             <Tooltip title={item.stageName}>
    //               {" "}
    //                {/* {item.recruitOwner ===this.props.fullName && (  */}
    //               <Progress
    //                 type="circle"
    //                 style={{ cursor: "pointer",color:"red" }}
    //                 percent={findProbability}
    //                 //disable={true}
    //                 width={30}
    //                  strokeColor={"#005075"}
                   
    //               />
    //                {/* )}  */}
    //             </Tooltip>
    //           </Dropdown>
    //         </span>
    //       );
    //     },
    //    },
    {
        title: "",
        dataIndex: "callType",
        width: "6%",
        render: (name, item, i) => {
          return (
            <span>
              {/* {item.candidateName ? ( */}
                <>
                  {item.approveInd&&item.recruitOwner ? (
                    <>
                      <Tooltip //title={"Offer rolled out"}
                        title="Selected"
                    

                      >
                        <CheckCircleOutlineIcon
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#24D8A7"
                          style={{ fontSize: "1.6em",
                          // cursor:
                          // this.props.recruitOwner ===this.props.fullName
                           
                          // ? "not-allowed"
                          // : "pointer",
                         }}
                        />
                      </Tooltip>
                    </>
                  ) : item.rejectInd&&item.recruitOwner ? (
                    <>
                      <Tooltip title={"Dropped"}>
                        {" "}
                        <DoDisturbIcon
                          type="stop"
                          theme="twoTone"
                          twoToneColor="red"         
                          style={{ fontSize: "1.6em", marginLeft: "0.875em" }}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip //title={"Offer"}
                        title="Select"
                       

                      >
                        <CheckCircleOutlineIcon
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#24D8A7"
                          size={140}
                          style={{ fontSize: "1.3em",
                          cursor:
                          item.recruitOwner !=this.props.fullName
                           
                          ? "not-allowed"
                            : "pointer",
                         }}
                          onClick={() => 
                            item.recruitOwner !=this.props.fullName
                            ?null
                            :this.props.LinkStatusRecruit(
                            
                              {
                                approveInd: true,
                                opportunityId: item.opportunityId,
                                candidateId: item.candidateId,
                                // stageId: item.stageId,
                                // recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },

                              // (data) =>
                              //   this.handleCallBack(
                              //     data,

                              //     item.opportunityId,
                              //     item.profileId
                              //   )
                            )
                            
                          }
                        />
                      </Tooltip>

                      &nbsp; &nbsp;
                      <Tooltip 
                      title={"Drop"}
                      

                      >
                        <DoDisturbIcon
                          type="stop"
                          theme="twoTone"
                          twoToneColor="red"
                          size={140}
                          style={{ fontSize: "1.2em",
                          cursor:
                          item.recruitOwner !=this.props.fullName
                           
                          ? "not-allowed"
                            : "pointer",
                         }}
                         onClick={() => 
                          item.recruitOwner !=this.props.fullName
                          ?null
                          :this.props.LinkStatusRecruit(
                              {
                                rejectInd: true,
                                opportunityId: item.opportunityId,
                                // stageId: item.stageId,
                                candidateId: item.candidateId,
                                // recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },
                              // (data) =>
                              //   this.handleCallBack(
                              //     data,

                              //     item.opportunityId,
                              //     item.profileId
                              //   )
                            )
                          }
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              {/* ) : null} */}
            </span>
          );
        },
     },
  //  {
  //       title: "OnBoard",
  //       dataIndex: "callType",
  //       width: "7%",
  //       render: (text, item) => {
  //         return (
  //           <>
  //             <RecruitmentSwitch
  //               contactId={item.contactId}
  //               profileId={item.profileId}
  //               opportunityId={item.opportunityId}
  //               recruitmentId={item.recruitmentId}
  //               candidateInd={item.candidateInd}
  //               approveInd={item.approveInd}
  //               rejectInd={item.rejectInd}
  //             />
    
  //           </>
  //         );
  //       },
  //     },
  {
    title: "",
    width: "4%",
    render: (name, item, i) => {
      return (
        <>
           {item.approveInd===true ? (
        
           <span
            style={{ 
              cursor: "pointer",
              color:
              item.onboardInd===true?"blue":"grey"
            
            }}
            onClick={() => {
              this.props.handleCandidateDateModal(true);
              this.handleIconClick(
                item.profileId,
                item.candidateId,
                item.stageList,
                item.candidateName
              )
              this.handleRecruitClick(item.recruitmentId)
            }}
            >
             <SettingsAccessibilityIcon
              style={{ fontSize: "1.6em" }}  />
            </span>          
            ) : null}    
            {/* <AddCandidateDateModal
                handleCandidateDateModal={this.props.handleCandidateDateModal}
                   profileId={item.profileId}
                addCandidateDateModal={this.props.addCandidateDateModal}
               /> */}   
        </>
               
      );
    },
  },



  // {
  //   title:"Documents Awaited" ,
  //   // dataIndex: "documentSetList",
  //   width: "17%",
  //   // ...getColumnSearchProps("documentSetList"),
  //   render: (name, item, i) => {
  //     const data =
  //       item.documentSetList === null
  //         ? []
  //         : item.documentSetList.filter((document) => {
  //             return document !== null && document !== "";
  //           });
  // const data1=item.documentSetList;
  //     return (
       
  //         data1.length === 0 ? (
  //           "None"
  //         ) : (
  //           <span>
  //             <DocumentsLoadMore documentSetList={data} />
  //           </span>
  //         )
  //     );
  //   },
    
  // },





    { 
      title: "OnBoard Date" ,
      dataIndex:"onboardDate",
      width: "15%",
      sorter: (a, b) => {
        var nameA = a.onboardDate; // ignore upper and lowercase
        var nameB = b.onboardDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      },
      render: (name, item) => {
        const onboardDate = dayjs(item.onboardDate).format("ll");
        return <>
        {item.onboardDate === null ? "None" :
          <span>
             {`${dayjs(item.onboardDate).format("YYYY/MM/DD")}`}
            {/* {dayjs(item.onboardDate).format("L")} */}
          </span>
        }
      </>
      },
     

  },

  {
    title: "",
    dataIndex: "callType",
    width: "2%",
    render: (name, item, i) => {
      const close =
        this.state.show === true && this.state.profileId === item.profileId;

      return (
        <>
          {/* {item.candidateName ? ( */}
            <>
              {close ? (
                <Tooltip 
                title="Close Details"
                
                >
                  <VisibilityOffIcon
                    type="eye-invisible"
                    onClick={() => this.handleCloseIconClick()}
                    style={{
                      fontSize: "1.125em",
                      color:
                        this.state.show === true &&
                        this.state.profileId === item.profileId &&
                        "#1890ff",
                    }}
                    size="30"
                  />
                </Tooltip>
              ) : (
                <>
                <span
                   onClick={() =>{
                    // this.props.handleRecruiterDrawerModal(  true );
                  
                    this.handleIconClick(
                          item.profileId,
                          item.candidateId,
                          item.stageList,
                          item.candidateName
                        )
                  }}               
                  style={{
                    fontSize: "1.2em",
                    color:
                      this.state.show === true &&
                      this.state.profileId === item.profileId &&
                      "#1890ff",
                  }}
                >
                  {/* {user.pulseAccessInd ===true && ( */}
                  <MonitorHeartIcon className=" !text-icon text-[#df9697]"/>
                    {/* )}           */}
                  <Tooltip 
                  title="Access Details"
                
                  >                  
                  </Tooltip>                
                  </span>
                  &nbsp;  
                </>
              )}            
            </>
          {/* ) : ( */}
            <></>
          {/* )} */}
        </>
      );
    },
  },
  
   
   
    // { title: "doc icon" },
    // { title: "employement icon" },
    // { title: "Training icon" }
  ]
  return (
   
    <>
   
    <StyledTable
       rowKey="talentId"
      scroll={{ y: 220 }}
      pagination={false}
      columns={columns}
      dataSource={this.props.candidateRequirement}

    />
         {/* {this.state.subTableVisible && ( 
    <AddRecruiterDrawerModal
    
    subTableVisible={this.state.subTableVisible}
    handleIconClick={this.state.profileId}
      candidateId={this.state.candidateId}
      candidate={this.props.candidate}
      profileId={this.state.profileId}
      stageList={this.state.stageList}
      candidateName={this.state.candidateName}
    />
  )} */}
     {this.state.subTableVisible && (
          <RecruitmentDetails
            candidateId={this.state.candidateId}
            candidate={this.props.candidate}
            profileId={this.state.profileId}
            stageList={this.state.stageList}
          />
        )}
   
   <Suspense fallback={"Loading..."}>
           <AddCandidateDateModal
           customerId={this.props.customerId}
   handleCandidateDateModal={this.props.handleCandidateDateModal}
    candidateId={this.state.candidateId}
    candidateName={this.state.candidateName}
    recruitmentId={this.state.recruitmentId}
      // candidate={this.props.candidate}
      profileId={this.state.profileId}
   addCandidateDateModal={this.props.addCandidateDateModal}
  />
  </Suspense>
  {/* {this.state.show && (
    <RecruitmentDetails
      candidateId={this.state.candidateId}
      candidate={this.props.candidate}
      profileId={this.state.profileId}
      stageList={this.state.stageList}
    />
  )} */}

 
  </> 
  );
  
}
}
const mapStateToProps = ({ auth, team, candidate,opportunity }) => ({
  topicsByCandidateId: candidate.topicsByCandidateId,
  fullName:auth.userDetails.fullName,
  candidate: candidate.candidate,
  user: auth.userDetails,
  addDrawerRecruiterModal:candidate.addDrawerRecruiterModal,
  candidateRequirement:opportunity.candidateRequirement,
  addCandidateDateModal:opportunity.addCandidateDateModal
  // recruitmentId:opportunity.recruitByOpportunityId.recruitmentId
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LinkStatusRecruit,
      LinkStageRecruit,
      getCandidateById,
      getTopicsByCandidateId,
      handleCandidateDateModal,
      handleRecruiterDrawerModal
      
      //  getCandidateRequirement
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SubTableClickCandidate);
const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%",margin:"auto" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;