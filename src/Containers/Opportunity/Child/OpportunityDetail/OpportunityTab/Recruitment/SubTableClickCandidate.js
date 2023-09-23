import React,{useEffect,Component,useMemo} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Suspense } from "react";
import styled from 'styled-components'
import {
  getCandidateById,
  getTopicsByCandidateId,
  handleRecruiterDrawerModal,
  //   getContactDocument,
} from "../../../../../Candidate/CandidateAction";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import AddRecruiterDrawerModal from "./AddRecruiterDrawerModal"
import { Link } from "../../../../../../Components/Common";
import dayjs from "dayjs";
import AddCandidateDateModal from "../Recruitment/AddCandidateDateModal"
import RecruitmentSwitch from "./RecruitmentSwitch";
import RecruitmentDetails from "./Child/RecruitmentDetails";
import RecruitmentStages from "./RecruitmentStages";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from "moment"
import {

  Popconfirm,
  Tooltip,
  Dropdown,
  Menu,
  Progress,

  Table, Input, Button,
  message,
  Icon,
  DatePicker,
  Badge
} from "antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { StyledTable } from "../../../../../../Components/UI/Antd";
 import {getCandidateRequirement,LinkStatusRecruit,LinkStageRecruit,handleCandidateDateModal} from "../../../../OpportunityAction"
import { CheckCircleTwoTone, CompassOutlined, EyeInvisibleTwoTone, EyeOutlined, StopTwoTone } from "@ant-design/icons";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";
import DocumentsLoadMore from "../DocumentsLoadMore";

class SubTableClickCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profileId: "",
      candidateId: "",
      currentcandidateIdId:"",
      setCurrentcandidateIdId:"",
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
          icon={<SearchOutlined />}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
     title:"Recruit Owner",
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
          {/* {item.candidateBilling} {item.currency}  */}
          {moment(item.avilableDate).format("L")}
         
        </>
      );
    },
  },
    {
        title: "Stages",
        // title: <FormattedMessage
        //   id="app.callType"
        //   defaultMessage="Stages"
        // />,
        dataIndex: "callType",
        width: "7%",
        render: (name, item, i) => {
          var findProbability = 0;
          item.stageList.forEach((element) => {
            if (element.stageId === item.stageId) {
              findProbability = element.probability;
            }
          });

          // const config = {
          //   height: 100,
          //   width: 100,
          //   autoFit: false,
          //   percent: findProbability,
          //   color: ['#5B8FF9', '#6'],
          // };
          return (
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
                          rec={item}
                          stageId={item.stageId}
                          recruitOwner={item.recruitOwner}
                          candidateName={item.candidateName}
                          approveInd={item.approveInd}
                          rejectInd={item.rejectInd}
                          stageClick={(stageId) => {
                            this.props.LinkStageRecruit(
                              {
                                opportunityId: this.props.opportunityId,
                                stageId: stageId,
                                recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },
                              // this.props.emailSendStage({
                              //   opportunityId: item.opportunityId,
                              //   userId: this.props.userId,
                              //   profileId: item.profileId,
                              //   stageId: stageId,
                              //   candidateId: item.contactId,
                              // })
                            );
                          }}
                        />{" "}
                      </Menu.Item>
                    </Menu>
                  </div>
                }
                trigger={["click"]}
              >
                <Tooltip title={item.stageName}>
                  {" "}
                   {/* {item.recruitOwner ===this.props.fullName && (  */}
                  <Progress
                    type="circle"
                    style={{ cursor: "pointer",color:"red" }}
                    percent={findProbability}
                    //disable={true}
                    width={30}
                     strokeColor={"#005075"}
                   
                  />
                   {/* )}  */}
                </Tooltip>
              </Dropdown>
            </span>
          );
        },
       },
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
                        title={<FormattedMessage
                          id="app.selected"
                          defaultMessage="Selected"
                        />}

                      >
                        <CheckCircleTwoTone
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
                        <StopTwoTone
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
                        title={<FormattedMessage
                          id="app.select"
                          defaultMessage="Select"
                        />}

                      >
                        <CheckCircleTwoTone
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
                      <Tooltip //title={"Drop"}
                        title={<FormattedMessage
                          id="app.drop"
                          defaultMessage="Drop"
                        />}

                      >
                        <StopTwoTone
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
  //   title: "Documents Awaited" ,
  //   dataIndex:"documentSetList",
  //   width: "15%",
  // },

  {
    title: <FormattedMessage id="app.doucumentsAwaited" defaultMessage="Documents Awaited"  />,
    // dataIndex: "documentSetList",
    width: "17%",
    // ...getColumnSearchProps("documentSetList"),
    render: (name, item, i) => {
      const data =
        item.documentSetList === null
          ? []
          : item.documentSetList.filter((document) => {
              return document !== null && document !== "";
            });

      return (
        <>
          {item.documentSetList === [] ? (
            "No Data"
          ) : (
            <span>
              <DocumentsLoadMore documentSetList={data} />
            </span>
          )}
        </>
      );
    },
  },





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
        {item.onboardDate === null ? "No Data" :
          <span>
            {moment(item.onboardDate).format("L")}
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
                <Tooltip //title="Close Details"
                  title={<FormattedMessage
                    id="app.closedetails"
                    defaultMessage="Close Details"
                  />}
                >
                  <EyeInvisibleTwoTone
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
                >{user.pulseAccessInd ===true && (
                    <PulseIcon></PulseIcon>
                    )}          
                  <Tooltip //title="Access Details"
                    title={<FormattedMessage
                      id="app.accessdetails"
                      defaultMessage="Access Details"
                    />}
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