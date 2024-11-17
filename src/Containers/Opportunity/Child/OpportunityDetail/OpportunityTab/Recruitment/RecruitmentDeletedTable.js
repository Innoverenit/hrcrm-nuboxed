import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LockOpenIcon from '@mui/icons-material/LockOpen';

import SkillBarChatModal from "../../OpportunityTab/Recruitment/Child/SkillBarChartModal"
import AddRequirementModal from "./AddRequirementModal"
import HelpIcon from '@mui/icons-material/Help';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import AddRequirementDetailModal from "../Recruitment/AddRequirementDetailModal"
import {
  StyledTable,
  StyledPopconfirm,
  StyledModal,
} from "../../../../../../Components/UI/Antd";
import RecruitmentFilter from "./RecruitmentFilter";
import AddRecruiterModal from "./AddRecruiterModal"
import {
  getRecruitmentDelete,
  LinkSkillsRecruit,
  getskillsetList,
  getRecruiter,
  getSkillsCount,
  LinkStageRecruit,
  LinkStatusRecruit,
  setCurrentOpportunityRecruitMentData,
  getCandidateRequirement,
  setCurrentRecruiterData,
  handleSponsorModal,
  handleRecruiterModal,
  handleAddRequirementModal,
  setAddRequirement,
  getRecruiterRequiremnt,
  handleAddRequiremenDetailtModal,
  LinkClosedRequirement,
  handleBarChartOrderModal,
  getRequirementOwner,
  emailSendStage,
} from "../../../../OpportunityAction";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  Tooltip,
  Badge,
  Avatar
} from "antd";
import RecruitmentDetails from "./Child/RecruitmentDetails";
import {
  getCandidateById,
  getTopicsByCandidateId,
} from "../../../../../Candidate/CandidateAction";
import dayjs from "dayjs";
import EditRecruitForm from "./EditRecruitForm";
import { Suspense } from "react";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import SelectSponsorForm from "./SelectSponsorForm";
import { addRecruitProProfile, deleteRequirementData } from "../../../../OpportunityAction";
import SubTableClickCandidate from "../Recruitment/SubTableClickCandidate";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
class RecruitmentDeletedTable extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show1:false,
      profileId: "",
      contactId: "",
      candidateId: "",
      editModal: false,
      stageList: [],
      recruitmentId: "",
      skillSetData: "",
      candidatePostData: {},
      searchText: '',
      searchedColumn: '',
      subTableVisible: false
    };
  }

  handleClickCandidateName = (recruitmentId) => {
    this.setState({
       subTableVisible: !this.state.subTableVisible,
       recruitmentId:recruitmentId
      })
  };
  handleCandidateDataSet = (data) => {
    this.setState({ candidatePostData: data })
  }
  handleSkillsetChoose = (data) => {
    this.setState({ skillSetData: data })
  }
  handleCallback = () => {
    if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
      this.props.getRecruiterRequiremnt(this.props.recruiterId);
    } else {
      this.props.getRecruitmentDelete(this.props.opportunityId);

    }
    // this.props.getRecruitmentDelete(this.props.opportunityId);
  };
  handleCopy = (
    recruitmentId,
    recruitmentProcessId,
    stageId,
    opportunityId
  ) => {
    const value = {
      recruitmentId: recruitmentId,
      recruitmentProcessId: recruitmentProcessId,
      stageId: stageId,
      opportunityId: opportunityId,
    };
    this.props.addRecruitProProfile(value, this.handleCallback);
  };

  handleEditModal = (data) => {
    this.setState({ editModal: data });
  };
 
  // handleRecruitertModal = (data) => {
  //   this.setState({ recruiterModal: data });
  // };
  handleError = (recruitmentId, profileId) => {
    debugger;
    this.setState({ recruitmentId: recruitmentId, profileId: profileId });
    this.props.handleSponsorModal(true);
    // message.error("Select sponser");
    // this.props.emailSendInvoice({ quoteId: this.props.quoteId });
  };
  handleIconClick = (profileId, candidateId, stageList,recruitmentId) => {
    debugger;
    this.setState({ show: true, profileId, candidateId, stageList,recruitmentId });
    this.props.getCandidateById(candidateId);
    this.props.getTopicsByCandidateId(candidateId);
    // this.props.getContactDocument(contactId);
  };

  // handleDeleteIconClick = (profileId, ) => {
  //   debugger;
  //   this.setState({  profileId, });
  //  this.props.deleteRequirementData(this.props.recruitmentId);
  //   // this.props.getTopicsByCandidateId(candidateId);
  //   // this.props.getContactDocument(contactId);
  // };


  handleCloseIconClick = () => {
    this.setState({ show: false });
  };

  handleReasonOfDelete() {
    this.setshow(false);
    this.setshowHis(false);
    this.setshowFeed(false);
    this.setshowPayment(false);
    this.setshowRes(true);
    // setorderId(orderId);
  }

  componentDidMount() {
    // alert(this.props.opportunityId)
    if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
      this.props.getRecruiterRequiremnt(this.props.recruiterId);
    } else {
      this.props.getRecruitmentDelete(this.props.opportunityId);

    }
    // this.props.getskillsetList();
    //this.props.getSkillsCount(this.state.recruitmentId,this.props.organizationId,)
  }

  handleCallBack = (status, opportunityId, profileId) => {
    if (status === "success") {
      // message.success("Candidate Selected");
      this.props.emailSendRecruitment({
        opportunityId: opportunityId,
        userId: this.props.userId,
        profileId: profileId,
      });
    }
  };


  render() {
    console.log("Don",this.props.candidateId)
    console.log("recruit",this.props.recruiterRequirement)
    const {
      recruitByOpportunityId,

    } = this.props;
    console.log("Best",this.props.recruitmentId)
    console.log("Best1",this.state.candidatePostData)

    console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
    console.log(this.props.recruitByOpportunityId.length && this.props.recruitByOpportunityId[0].recruiterNames)
    const columns = [
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          const data = `Requirement ID : ${item.recruitmentId}`
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <Tooltip
              // className="ant-tooltip-inner"
              // placement="rightTop" 
              overlayStyle={{ maxWidth: '300px', }}

              title={data}
            >
              <span
                // onClick={() => handleReasonOfDelete(item.orderId)}
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-info-circle"></i>
              </span>
            </Tooltip>
            ),
          };
         
        },
      },
      {
        title: "Job ID",
        width: "11%",
        dataIndex: "jobOrder",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <>
                <Badge count={item.number} style={{ right: "1px" }}>
                  <span             
                  >

                    {`${item.jobOrder} `} &nbsp;


                  </span>
                </Badge>
              </>
            ),
          };
         
        },

      },

      // {
      //   title:"",
      //     width: "8%",
      //   dataIndex:"number",

      // },
      {
        //title: "Requirement",
        title: <FormattedMessage
          id="app.requirementName"
          defaultMessage="Requirement"
        />,
        dataIndex: "requirementName",
        width: "13%",
        render: (name, item, i) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          console.log(item);

          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <>
              <span
                onClick={() => {            
                 this.props.handleAddRequiremenDetailtModal(true);
                 this.props.setCurrentOpportunityRecruitMentData(item);
                  }}
                style={{
                  cursor: "pointer",                  
                  color: "blue",
                }}
              >
                {/* {`${item.requirementName} `} */}

                <Tooltip title={item.requirementName}>
                  {elipsize(item.requirementName, 20)}
                </Tooltip>

              </span>
              &nbsp;&nbsp;
              {date === currentdate ? (
                <span
                  style={{
                    color: "tomato",
                    fontWeight: "bold",
                  }}
                >
                  New
                </span>
              ) : null}
            </>
            ),
          };

         
        },
      },
      {
        title: "Category",
        dataIndex: "category",
        width: "9%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children: <span>{item.category}</span>,
          };
        },

      },
      // {
      //   title: "Created",
      //   width: "7%",
      //   dataIndex: "recruitOwner",
      //   render: (name, item, i) => {
      //     return {
      //       props: {
      //         style: {
      //           background:
      //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //               ? "rgb(158 183 223)"
      //               : null,

      //         },
      //       },
  
      //       children: <span>
      //          <SubTitle>
      //         <Tooltip title={item.recruitOwner}>
      //           <MultiAvatar
      //             primaryTitle={item.recruitOwner}
      //             // imageId={item.imageId}
      //             // imageURL={item.imageURL}
      //             imgWidth={"2.1em"}
      //             imgHeight={"2.1em"}
      //           />
      //         </Tooltip>
      //       </SubTitle>
      //       </span>,
      //     };
        
      //   },
      // },

      {
        title:"Created",
        width: "7%",
         dataIndex: "recruitOwner",
         render: (text, item) => {
         return <>
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
        },
         
      },
      // {
      //   title: "Recruiter",
      //   width: "7%",
      //   render: (name, item, i) => {
      //     return {
      //       props: {
      //         style: {
      //           background:
      //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //               ? "rgb(158 183 223)"
      //               : null,

      //         },
      //       },
  
      //       children: 
            
      //         <>
        
              
      //          <FlexContainer justifyContect="space-evenly">
      //          {item.recruiterList && item.recruiterList.map((item, i) => {
      //            return (
      //             <Tooltip
      //             title={item.fullName}
      //          >
      //             <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
      //           <MultiAvatar
      //            primaryTitle={item.fullName||""}
      //             // imageId={item.imageId}
      //             // imageURL={item.imageURL}
      //             imgWidth={"2.1em"}
      //             imgHeight={"2.1em"}
      //           />
      //           </div>
      //         </Tooltip>
      //            );
      //       })} 
      //       </FlexContainer>
      //       </>
            
              
           
      //     };
        
      //   },
      // },

      {
        title: "Recruiter",
        width: "11%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children: 
            
              <>
       
                  
        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        {item.recruiterList && item.recruiterList.map((item, i) => {
          const data=item.fullName.split("")[0].toUpperCase()
          console.log("datas",data)
                 return (
                  <Tooltip title={item.fullName}>
       
        <Avatar style={{ backgroundColor: '#f56a00' }}>{data}</Avatar> 
        </Tooltip> 
                 )

     })} 
    
    </Avatar.Group>
     
    
                
            
            </>
            
              
           
          };
        
        },
      },
      {
        title: "Created On",
        width: "10%",
        dataIndex: "creationDate",
        render: (text, item) => {
          const creationDate = dayjs(item.creationDate).format("L");

          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children: <span>
              
           {creationDate}
            </span>,
          };
        
          
        },
      },





      {
        //title: "Start",
        title: <FormattedMessage
          id="app.processName"
          defaultMessage="Start"
        />,
        width: "9%",
        render: (name, item, i) => {
          console.log(item);
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children:<span>{dayjs(item.avilableDate).format("L")}</span>
          };
        
        },
        sorter: (a, b) => {
          if (a.avilableDate < b.avilableDate) {
            return -1;
          }
          if (a.avilableDate > b.avilableDate) {
            return 1;
          }
          return 0;
        },
      },
      {
        title:"Duration",
        width: "8%",
        render: (text, item) => {
          //const getDate = (date) => dayjs(date, 'DD/MM/YYYY').startOf('month')
const diff = Math.abs(dayjs(item.availableDate).diff(dayjs(item.endDate), 'months'));
const date=diff+1
         // const availableDate = dayjs(item.availableDate).subtract(item.endDate);
          return <>
          {/* {item.availableDate === null ? "None" : */}
            <span>
              {/* {dayjs(item.availableDate).subtract(item.endDate).month()} */}
              {date} months
            </span>
          {/* } */}
        </>
        },
        
      },
      {
        //title: "Rate/hr",
        title: <FormattedMessage
          id="app.billing"
          defaultMessage="Billing"
        />,
        dataIndex: "billing",
        width: "8%",
        //   defaultSortOrder: "descend",
        // sorter: (a, b) => a.billing - b.billing,
        render: (name, item, i) => {
          console.log(item);
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children:<span>{item.billing} {item.currency}</span>
          };
        
        },
      },
      // {
      //   //title: "Stages",
      //   title: <FormattedMessage
      //     id="app.callType"
      //     defaultMessage="Stages"
      //   />,
      //   dataIndex: "callType",
      //   width: "6%",
      //   render: (name, item, i) => {
      //     var findProbability = 0;
      //     item.stageList.forEach((element) => {
      //       if (element.stageId === item.stageId) {
      //         findProbability = element.probability;
      //       }
      //     });
      //     return (
      //       <span>
      //         <Dropdown
      //           overlay={
      //             <div>
      //               <Menu mode="horizontal">
      //                 <Menu.Item
      //                   style={{
      //                     paddingLeft: 5,
      //                     paddingRight: 5,
      //                     backgroundColor: "#F5F5F5",
      //                   }}
      //                 >
      //                   <RecruitmentStages
      //                     rec={item}
      //                     stageId={item.stageId}
      //                     candidateName={item.candidateName}
      //                     approveInd={item.approveInd}
      //                     rejectInd={item.rejectInd}
      //                     stageClick={(stageId) => {
      //                       this.props.LinkStageRecruit(
      //                         {
      //                           opportunityId: this.props.opportunityId,
      //                           stageId: stageId,
      //                           recruitmentProcessId: item.recruitmentProcessId,
      //                           recruitmentId: item.recruitmentId,
      //                           profileId: item.profileId,
      //                         },
      //                         this.props.emailSendStage({
      //                           opportunityId: item.opportunityId,
      //                           userId: this.props.userId,
      //                           profileId: item.profileId,
      //                           stageId: stageId,
      //                           candidateId: item.contactId,
      //                         })
      //                       );
      //                     }}
      //                   />{" "}
      //                 </Menu.Item>
      //               </Menu>
      //             </div>
      //           }
      //           trigger={["click"]}
      //         >
      //           <Tooltip title={item.stageName}>
      //             {" "}
      //             <Progress
      //               type="circle"
      //               style={{ cursor: "pointer" }}
      //               percent={findProbability}
      //               width={30}
      //               strokeColor={"#005075"}
      //             />
      //           </Tooltip>
      //         </Dropdown>
      //       </span>
      //     );
      //   },
      // },

      // {
      //   title: "",
      //   dataIndex: "callType",
      //   width: "6%",
      //   render: (name, item, i) => {
      //     return (
      //       <span>
      //         {item.candidateName ? (
      //           <>
      //             {item.approveInd ? (
      //               <>
      //                 <Tooltip //title={"Offer rolled out"}
      //                   title={<FormattedMessage
      //                     id="app.selected"
      //                     defaultMessage="Selected"
      //                   />}

      //                 >
      //                   <Icon
      //                     type="check-circle"
      //                     theme="twoTone"
      //                     twoToneColor="#52c41a"
      //                     size={140}
      //                     style={{ fontSize: "1.2em", }}
      //                   />
      //                 </Tooltip>
      //               </>
      //             ) : item.rejectInd ? (
      //               <>
      //                 <Tooltip title={"Dropped"}>
      //                   {" "}
      //                   <Icon
      //                     type="stop"
      //                     theme="twoTone"
      //                     twoToneColor="red"
      //                     size={140}
      //                     style={{ fontSize: "1.2em", marginLeft: "0.875em" }}
      //                   />
      //                 </Tooltip>
      //               </>
      //             ) : (

      //               <>


      //                 <Tooltip //title={"Offer"}
      //                   title={<FormattedMessage
      //                     id="app.select"
      //                     defaultMessage="Select"
      //                   />}

      //                 >
      //                   <Icon
      //                     type="check-circle"
      //                     theme="twoTone"
      //                     twoToneColor="#52c41a"
      //                     size={140}
      //                     style={{ fontSize: "1.2em" }}
      //                     onClick={() => {
      //                       this.props.LinkStatusRecruit(
      //                         {
      //                           approveInd: true,
      //                           opportunityId: item.opportunityId,
      //                           candidateId: item.candidateId,
      //                           // stageId: item.stageId,
      //                           // recruitmentProcessId: item.recruitmentProcessId,
      //                           recruitmentId: item.recruitmentId,
      //                           profileId: item.profileId,
      //                         },

      //                         (data) =>
      //                           this.handleCallBack(
      //                             data,

      //                             item.opportunityId,
      //                             item.profileId
      //                           )
      //                       );
      //                     }}
      //                   />
      //                 </Tooltip>

      //                 &nbsp; &nbsp;
      //                 <Tooltip //title={"Drop"}
      //                   title={<FormattedMessage
      //                     id="app.drop"
      //                     defaultMessage="Drop"
      //                   />}

      //                 >
      //                   <Icon
      //                     type="stop"
      //                     theme="twoTone"
      //                     twoToneColor="red"
      //                     size={140}
      //                     style={{ fontSize: "1.2em" }}
      //                     onClick={() => {
      //                       this.props.LinkStatusRecruit(
      //                         {
      //                           rejectInd: true,
      //                           opportunityId: item.opportunityId,
      //                           // stageId: item.stageId,
      //                           candidateId: item.candidateId,
      //                           // recruitmentProcessId: item.recruitmentProcessId,
      //                           recruitmentId: item.recruitmentId,
      //                           profileId: item.profileId,
      //                         },
      //                         (data) =>
      //                           this.handleCallBack(
      //                             data,

      //                             item.opportunityId,
      //                             item.profileId
      //                           )
      //                       );
      //                     }}
      //                   />
      //                 </Tooltip>
      //               </>
      //             )}
      //           </>
      //         ) : null}




      //       </span>


      //     );

      //   },

      // },

      // {
      //   title: "",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     //           const arr=[item];
      //     // let finalData=""
      //     //           arr.forEach((item)=>{
      //     // finalData=`${item}`
      //     //           })
      //     //           console.log(finalData)
      //     const data = this.props.skillsCount
      //     let result = Object.keys(data).map(key => {
      //       return ({ name: key, value: data[key] })
      //     }
      //     )
      //     const newArray = result.map(element => {
      //       return `${element.name}  
      //   -${element.value}`
      //     });

      //     let text = newArray.toString() + "\r\n";
      //     console.log(text)

      //     return {
      //       props: {
      //         style: {
      //           background:
      //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //               ? "rgb(158 183 223)"
      //               : null,

      //         },
      //       },
  
      //       children:<span>
      //           <Tooltip
      //         title={text}
      //         style={{ whiteSpace: 'pre-line' }}
      //       >
      //         <span
      //           style={{
      //             // color:
      //             //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
      //             cursor: "pointer",
      //             marginLeft: "-13px"
      //           }}
      //           onClick={() => {
      //             this.props.getSkillsCount(
      //               item.recruitmentId,
      //               this.props.organizationId,


      //             );
      //           }}



      //         >

      //           <FontAwesomeIcon icon={solid('circle-question')} />
      //         </span>
      //       </Tooltip>
      //       </span>
      //     };

         
      //   },
      // },
    
      {
        //title: "Skill Set",
        title: <FormattedMessage
          id="app.callType"
          defaultMessage="Skill Set"
        />,

        width: "15%",
        render: (name, item, i) => {
          console.log(this.props.SkillList);
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children: <span>
            <RecruitmentFilter
              handleSkillsetChoose={this.handleSkillsetChoose}
              // topicsByCandidateId={this.props.topicsByCandidateId}
              SkillList={item.skillSetList}
              name={this.state.skillSetData}
              skillName={item.skillName}
              candidatetList={item.candidatetList}
              fullName={item.fullName}
            // recruitmentId={item.recruitmentId}
            // approveInd={item.approveInd}
            // stageInd={item.stageInd}
            // rejectInd={item.rejectInd}
            // filter={(value) => {
            //   this.props.LinkSkillsRecruit({
            //     opportunityId: item.opportunityId,
            //     stageId: item.stageId,
            //     recruitmentProcessId: item.recruitmentProcessId,
            //     // skillSet: value,
            //     skillSetDetailsId:value,
            //     recruitmentId: item.recruitmentId,
            //     profileId: item.profileId,
            //   });
            // }}
            />
          </span>,
          };
          
        },
      },
     
      {
        title: "",
        width: "3%",
        render: (name, item, i) => {
          console.log(this.state.skillSetData)
          // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children: 
            <>
            {(this.state.skillSetData || item.skillName) &&
              <span
                // type="edit"
                style={{ cursor: "pointer", color: "tomato",fontSize:"15px" }}
                onClick={() => {
                  this.props.LinkSkillsRecruit({
                    opportunityId: item.opportunityId,
                    stageId: item.stageId,
                    recruitmentProcessId: item.recruitmentProcessId,
                    skillName: this.state.skillSetData || item.skillName,
                    recruitmentId: item.recruitmentId,
                    profileId: item.profileId,
                  });
                  this.props.getRecruiter(
                    this.state.skillSetData || item.skillName,
                    item.recruitmentId,
                    item.opportunityId,



                  );
                  this.handleCandidateDataSet(item);
                  this.props.handleRecruiterModal(true);
                }}
              >
                <PsychologyAltIcon 
                style={{fontSize:"0.8rem",cursor:"pointer"}}
                 />
              </span>
            }
          </>
          };
          
        }
      },

      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          //           const arr=[item];
          // let finalData=""
          //           arr.forEach((item)=>{
          // finalData=`${item}`
          //           })
          //           console.log(finalData)
        //   const data = this.props.skillsCount
        //   let result = Object.keys(data).map(key => {
        //     return ({ name: key, value: data[key] })
        //   }
        //   )
        //   const newArray = result.map(element => {
        //     return `${element.name}  
        // -${element.value}`
        //   });

        //   let text = newArray.toString() + "\r\n";
        //   console.log(text)

          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
  
            children:<span>
                <Tooltip
              // title={text}
              style={{ whiteSpace: 'pre-line' }}
            >
              <span
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                  marginLeft: "-4px",
                  fontSize:"large"
                }}
                onClick={() => {
                 
                  this.props.getSkillsCount(
                    item.recruitmentId,
                    this.props.organizationId,


                   );
                   this.props.handleBarChartOrderModal(true);
                }}



              >

                <HelpIcon  style={{fontSize:"0.8rem",cursor:"pointer"}}/>
              </span>
            </Tooltip>
            </span>
          };

         
        },
      },

  //     {
  //       title:"",
  //         width: "3%",
  //     render:(name,item,i)=>{
  //       console.log(this.state.skillSetData)
  //     // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
  //     return(
  //       <>
  //       {(this.state.skillSetData || item.skillName) && 
  //       <span
  //       // type="edit"
  //       style={{ cursor: "pointer",color:"tomato" }}
  //       onClick={() => {
  //            this.props.LinkSkillsRecruit({
  //                   opportunityId: item.opportunityId,
  //                   stageId: item.stageId,
  //                   recruitmentProcessId: item.recruitmentProcessId,
  //                   skillName:this.state.skillSetData || item.skillName,
  //                   recruitmentId: item.recruitmentId,
  //                   profileId: item.profileId,
  //                 });
  //                 this.props.getRecruiter(
  //                    this.state.skillSetData || item.skillName,
  //                     item.profileId,
  //                    item.opportunityId,
                     

                   
  //                 );
  //                 this.handleCandidateDataSet(item);
  //             this.props.handleRecruiterModal(true);
  //       }}
  //       >
  //      <FontAwesomeIcon icon={solid('person-circle-question')} />
  //       </span>
  //         }
  //       </>
  //     )
  //   }
  // },



      // {
      //   title: "Talent",
      //   dataIndex: "candidatetList",
      //   width: "12%",
      //   render: (name, item, i) => {
      //     return {
      //       props: {
      //         style: {
      //           background:
      //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //               ? "rgb(158 183 223)"
      //               : null,

      //         },
      //       },
      //       children: (
      //         <span>
      //         {/* <CandidateLoadMore
      //         candidatetList={item.candidatetList}
      //         handleClickCandidateName={this.handleClickCandidateName}
      //         candidateNo={item.candidateNo}
      //         fullName={item.fullName}
      //         /> */}
      //          <FlexContainer justifyContect="space-evenly">
      //           {item.candidatetList && item.candidatetList.map((candidate, i) => {
      //             console.log(candidate)
      //             return (
                    
      //               <Tooltip
      //               title={candidate.fullName}
      //           >
      //               <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
      //                onClick={() => {
      //                 this.handleClickCandidateName(item.recruitmentId)
      //                 this.props.getCandidateRequirement(
      //                    item.recruitmentId, 
    
      //                 );
      //                 }}
                 
      //               >
                      
      //                   <MultiAvatar
      //                      primaryTitle={candidate.fullName||""}
      //                     // imageId={item.imageId}
      //                     // imageURL={item.imageURL}
      //                     imgWidth={"30"}
      //                     imgHeight={"30"}
      //                   />
      //                 </div>
      //                  </Tooltip>
  
      //             );                 
      //           })} 
      //           <div
      //           // style={{ 
      //           //   margin: "2px", 
      //           //   borderRadius: "50%",
      //           //   cursor:"pointer" ,
      //           //   background:
      //           //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
      //           //     ? "rgb(158 183 223)"
      //           //     : null,
              
      //           onClick={() => {
      //             this.handleClickCandidateName(item.recruitmentId)
      //             this.props.getCandidateRequirement(
      //                item.recruitmentId, 

      //             );
      //             }}
      //           >   
      //          {item.candidateNo} 
      //          </div>           
      //          </FlexContainer>
      //       </span>
      //       ),
      //     };
      //   },
      //  },

       {
        title: "Talent",
        dataIndex: "candidatetList",
        width: "14%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <>
              
              
                    <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
                     onClick={() => {
                      this.handleClickCandidateName(item.recruitmentId)
                      this.props.getCandidateRequirement(item.recruitmentId,);
                      this.props.getRequirementOwner(item.recruitmentId,);
                      }}
                 
                    >
                      <Avatar.Group maxCount={7} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        {item.candidatetList && item.candidatetList.map((candidate, i)=> {
          const data1=candidate.fullName.split("")[0].toUpperCase()
          console.log("datas",data1)
                 return (
                  <Tooltip title={candidate.fullName}>
       
        <Avatar style={{ backgroundColor: '#f56a00' }}>{data1}</Avatar> 
        </Tooltip> 
                 )

     })} 
          <div
                // style={{ 
                //   margin: "2px", 
                //   borderRadius: "50%",
                //   cursor:"pointer" ,
                //   background:
                //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                //     ? "rgb(158 183 223)"
                //     : null,
              
                onClick={() => {
                  this.handleClickCandidateName(item.recruitmentId)
                  this.props.getCandidateRequirement(
                     item.recruitmentId, 

                  );
                  }}
                >   
               {item.candidateNo} 
               </div>
    
    </Avatar.Group>
                      
                       
                      </div>
                       
                      
  
                
                           
             
            </>
            ),
          };
        },
       },
      // {
      //   title: "Candidate",
      //   dataIndex: "candidateName",
      //   width: "12%",
      //   render: (name, item, i) => {
      //     // const fullName = ` ${item.salutation || ""} ${item.firstName ||
      //     //   ""} ${item.middleName || ""} ${item.lastName || ""}`;
      //     //   const currentdate = dayjs().format("DD/MM/YYYY");
      //     //   const date = dayjs(item.creationDate).format("DD/MM/YYYY");
      //     //   console.log(date, currentdate, currentdate === date);
      //     return (
      //       <>
      //         <Link
      //           toUrl={`/candidate/${item.candidateId}`}
      //           title={`${item.candidateName || ""} `}
      //         />


      //       </>
      //     );
      //   },
      //   //  ...this.getColumnSearchProps('candidateName'),


      // },
      // {
      //   title: "Cost",
      //   dataIndex: "candidateBilling",
      //   width: "6%",
      //   render: (name, item, i) => {
      //     console.log(item);
      //     return (
      //       <>
      //         {item.candidateBilling} {item.currency}
      //       </>
      //     );
      //   },
      //   //  ...this.getColumnSearchProps('candidateName'),


      // },

      // {
      //   //title: "Candidate",
      //   title: <FormattedMessage
      //     id="app.callType"
      //     defaultMessage="Candidate"
      //   />,
      //   dataIndex: "callType",
      //   width: "24%",
      //   render: (name, item, i) => {
      //     return (
      //       <span>
      //         <RecruitmentContact
      //           candidateData={item.candidateList}
      //           stageInd={item.stageInd}
      //           name={item.candidateName}
      //           approveInd={item.approveInd}
      //           rejectInd={item.rejectInd}
      //           // contact={(value) => {
      //           //   //debugger;
      //           //   this.props.LinkCandidateRecruit({
      //           //     opportunityId: item.opportunityId,
      //           //     stageId: item.stageId,
      //           //     recruitmentProcessId: item.recruitmentProcessId,
      //           //     contactId: value,
      //           //     recruitmentId: item.recruitmentId,
      //           //     profileId: item.profileId,
      //           //   });
      //           // }}
      //         />
      //       </span>
      //     );
      //   },
      // },

      // {
      //   title: "OnBoard",
      //   dataIndex: "callType",
      //   width: "7%",
      //   render: (text, item) => {
      //     return (
      //       <>
      //         <RecruitmentSwitch
      //           contactId={item.contactId}
      //           profileId={item.profileId}
      //           opportunityId={item.opportunityId}
      //           recruitmentId={item.recruitmentId}
      //           candidateInd={item.candidateInd}
      //           approveInd={item.approveInd}
      //           rejectInd={item.rejectInd}
      //         />
      //       </>
      //     );
      //   },
      // },
      {
        //title: "Sponsor",
        title: <FormattedMessage
          id="app.sponserName"
          defaultMessage="Sponsor"
        />,
        dataIndex: "sponserName",
        width: "7%",
        render: (text, item) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            // children: (
            //   <>
            //   <RecruitmentSwitchSponsor
            //     sponserId={item.sponserId}
            //     profileId={item.profileId}
            //     opportunityId={item.opportunityId}
            //     recruitmentId={item.recruitmentId}
            //     sponserInd={item.sponserInd}
            //     candidateId={item.contactId}
            //     approveInd={item.approveInd}
            //     rejectInd={item.rejectInd}
            //     handleError={this.handleError}
            //   />
            // </>
            // ),
            children:
            <Tooltip
            title={`${item.sponserName}`}
         > 
            <span>
              
               <MultiAvatar
                 primaryTitle={item.sponserName||""}
                  // imageId={item.imageId}
                  // imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
               
              {/* {item.sponserName} */}
              </span>,
              </Tooltip>
          };
         
        },
      },
      // {
      //   title: "",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <Tooltip
      //         //title={"Copy"}
      //         title={<FormattedMessage
      //           id="app.copy"
      //           defaultMessage="Copy"
      //         />}
      //       >
      //         <Icon
      //           type="copy"
      //           style={{ cursor: "pointer" }}
      //           onClick={() =>
      //             this.handleCopy(
      //               item.recruitmentId,
      //               item.recruitmentProcessId,
      //               item.stageList[1].stageId,
      //               this.props.opportunityId
      //             )
      //           }
      //         />
      //       </Tooltip>
      //     );
      //   },
      // },
      {
        title: "",
        dataIndex: "callType",
        width: "2%",
        render: (name, item, i) => {
          const close =
            this.state.show === true && this.state.profileId === item.profileId;

            return {
              props: {
                style: {
                  background:
                     this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                      ? "rgb(158 183 223)"
                      : null,
  
                },
              },
              children: (
                <>
                {item.candidateName ? (
                  <>
                    {close ? (
                      <Tooltip //title="Close Details"
                        title={<FormattedMessage
                          id="app.closedetails"
                          defaultMessage="Close Details"
                        />}
                      >
                        <EyeInvisibleOutlined
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
                        <Tooltip //title="Access Details"
                          title={<FormattedMessage
                            id="app.accessdetails"
                            defaultMessage="Access Details"
                          />}
                        >
                          <EyeOutlined
                            type="eye"
                            onClick={() =>
                              this.handleIconClick(
                                item.profileId,
                                item.candidateId,
                                item.stageList
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
                          />
                        </Tooltip>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
              ),
            };

          
        },
      },
      {
        title: "",
        width: "2%",
        render: (name, item, i) => {

          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <>
              {/* {item.approveInd || item.rejectInd ? null : ( */}
              {this.props.user.userType !== "USER" && this.props.user.department !== "Recruiter" && ( 
              <BorderColorIcon
                type="edit"
                style={{ cursor: "pointer",fontSize:"0.8rem" }}
                onClick={() => {
                  this.props.handleAddRequirementModal(true);
                  this.props.setCurrentOpportunityRecruitMentData(item);

                }}
              />
              )}
              {/* )} */}
            </>
            ),
          };
         
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <Tooltip title='Click to Close'>
       
            <span
             onClick={() => {
              this.props.LinkClosedRequirement(
                item.recruitmentId,
                this.handleCallback
                // this.props.organizationId,
  
  
              );
              // item.opportunityId
            }}
         
            >
              <LockOpenIcon    
               style={{  fontSize: "0.8rem",
               cursor: "pointer",}}
               />
               </span>
  
        </Tooltip>
             
          );
        },
      },

      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return {
            props: {
              style: {
                background:
                   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
                    ? "rgb(158 183 223)"
                    : null,

              },
            },
            children: (
              <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() =>
                this.props.deleteRequirementData(
                  item.recruitmentId,

                )
              }
            >
              {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
              {this.props.user.userType !== "USER" && this.props.user.department !== "Recruiter" && ( 
              <DeleteIcon type="delete"
       
                style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }}
              />
              )}
              {/* )} */}
            </StyledPopconfirm>
            ),
          };
        
        },
      },

    ];



    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
        <StyledTable
          // rowKey={(record) =>record.profileId}
          rowKey="profileId"
          scroll={{ y: 220 }}
          pagination={false}


          columns={columns}
          dataSource={
            this.props.user.department === "Recruiter"
              ? this.props.recruiterRequirement
              : this.props.recruitDelete
          }
          loading={
            this.props.user.department === "Recruiter"
              ? this.props.fetchingRecruiterRequirement || this.props.fetchingRecruiterRequirementError
              : this.props.fetchingRecruitToOpportunity || this.props.fetchingRecruitToOpportunityError
          }
          onChange={console.log("call onChangeHere...")}
        
        />
        <Suspense fallback={"Loading"}>
            {this.state.subTableVisible && (
              <SubTableClickCandidate
              // profileId={this.state.profileId}
              candidateRequirement={this.props.candidateRequirement}
              // recruitmentId={this.state.recruitmentId}
               />
            )}
          </Suspense>
        {/* )} */}
        {this.state.show && (
          <RecruitmentDetails
            candidateId={this.state.candidateId}
            candidate={this.props.candidate}
            profileId={this.state.profileId}
            stageList={this.state.stageList}
          />
        )}
        <SkillBarChatModal
        skillsCount={this.props.skillsCount}
         candidatePostData={this.state.candidatePostData}
        showBarChartModal={this.props.showBarChartModal}
        handleBarChartOrderModal={this.props.handleBarChartOrderModal}
        //particularRowData={particularRowData}
      />

        <StyledModal
          //title="Position"
          title={<FormattedMessage
            id="app.position"
            defaultMessage="Position"
          />}
          width="24%"
          visible={this.state.editModal}
          maskClosable={false}
          destroyOnClose
          // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => this.handleEditModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EditRecruitForm />
          </Suspense>
        </StyledModal>
        <StyledModal
          // title="Select Sponsor"
          title={<FormattedMessage
            id="app.selectsponsor"
            defaultMessage="Select Sponsor"
          />}
          width="20%"
          visible={this.props.addSponsorModal}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => this.props.handleSponsorModal(false)}
          footer={null}
        >
          <SelectSponsorForm
            handleSponsorModal={this.props.handleSponsorModal}
            recruitmentId={this.state.recruitmentId}
            profileId={this.state.profileId}
          />

          {/* <Suspense fallback={<BundleLoader />}>
          <PartnerTable />
        </Suspense> */}
        </StyledModal>
        <Suspense fallback={"Loading..."}>
          <AddRecruiterModal
            addRecruiterModal={this.props.addRecruiterModal}
            handleRecruiterModal={this.props.handleRecruiterModal}
            recruiter={this.props.recruiter}
            //recruitmentId={this.state.recruitmentId}
            candidatePostData={this.state.candidatePostData}
            opportunityId={this.props.opportunityId}

          />
        </Suspense>
        <Suspense fallback={"Loading..."}>
          {/* {this.setshow &&( */}
          <AddRequirementModal
            handleAddRequirementModal={this.props.handleAddRequirementModal}
            addRequirementModal={this.props.addRequirementModal}
          // requirementName={this.props.requirementName}


          />
          <AddRequirementDetailModal
            handleAddRequiremenDetailtModal={this.props.handleAddRequiremenDetailtModal}
            addRequirementDetailModal={this.props.addRequirementDetailModal}
          // requirementName={this.props.requirementName}


          />
          {/* )} */}
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity, contact, auth, candidate }) => ({
  user: auth.userDetails,
  opportunityId: opportunity.opportunity.opportunityId,
  recruitByOpportunityId: opportunity.recruitByOpportunityId,
   recruitmentId:opportunity.opportunity.recruitmentId,
  fetchingRecruitToOpportunity: opportunity.fetchingRecruitToOpportunity,
  topicsByCandidateId: candidate.topicsByCandidateId,
  fetchingRecruiterRequirement:opportunity.fetchingRecruiterRequirement,
  fetchingSkillSetList: opportunity.fetchingSkillSetList,
  candidate: candidate.candidate,
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  recruiter: opportunity.recruiter,
  fetchingRecruiter: opportunity.fetchingRecruiter,
  skillsCount: opportunity.skillsCount,
  recruiterRequirement: opportunity.recruiterRequirement,
  SkillList: opportunity.SkillList,
  fetchingRecruiterRequirementError:opportunity.fetchingRecruiterRequirementError,
  addRequirementDetailModal:opportunity.addRequirementDetailModal,
  organizationId: auth.userDetails.organizationId,
  addSponsorModal: opportunity.addSponsorModal,
  addRecruiterModal: opportunity.addRecruiterModal,
  addRequirementModal: opportunity.addRequirementModal,
  recruiterId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementOwner:opportunity.requirementOwner,
  recruitDelete:opportunity.recruitDelete,
  showBarChartModal: opportunity.showBarChartModal,
  //  candidateId:candidateRequirement.candidateId,
  candidateRequirement:opportunity.candidateRequirement,
  //recruitmentId:opportunity.recruitByOpportunityId.recruitmentId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRecruitProProfile,
      getRecruitmentDelete,
      handleSponsorModal,
      LinkSkillsRecruit,
      setAddRequirement,
      getSkillsCount,
      handleAddRequirementModal,
      // handleRecruitModal,
      // LinkCandidateRecruit,
      LinkStageRecruit,
      LinkStatusRecruit,
      // emailSendRecruitment,
      getCandidateById,
      getTopicsByCandidateId,
      getskillsetList,
      getRecruiter,
      // getContactDocument,

      setCurrentRecruiterData,
      handleRecruiterModal,
      deleteRequirementData,
      getRecruitmentDelete,
      getRequirementOwner,
      setCurrentOpportunityRecruitMentData,

      emailSendStage,
      getRecruiterRequiremnt,
      getCandidateRequirement,
      handleAddRequiremenDetailtModal,
      LinkClosedRequirement,
      handleBarChartOrderModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentDeletedTable);
