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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import EmptyPage from "../../../../../Main/EmptyPage";
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
//     const columns = [
//       {
//         title: "",
//         width: "2%",
//         render: (name, item, i) => {
//           const data = `Requirement ID : ${item.recruitmentId}`
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <Tooltip
//               // className="ant-tooltip-inner"
//               // placement="rightTop" 
//               overlayStyle={{ maxWidth: '300px', }}

//               title={data}
//             >
//               <span
//                 // onClick={() => handleReasonOfDelete(item.orderId)}
//                 style={{
//                   // color:
//                   //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
//                   cursor: "pointer",
//                 }}
//               >
//                 <i class="fa fa-info-circle"></i>
//               </span>
//             </Tooltip>
//             ),
//           };
         
//         },
//       },
//       {
//         title: "Job ID",
//         width: "11%",
//         dataIndex: "jobOrder",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <>
//                 <Badge count={item.number} style={{ right: "1px" }}>
//                   <span             
//                   >

//                     {`${item.jobOrder} `} &nbsp;


//                   </span>
//                 </Badge>
//               </>
//             ),
//           };
         
//         },

//       },

//       // {
//       //   title:"",
//       //     width: "8%",
//       //   dataIndex:"number",

//       // },
//       {
//         title: "Requirement",
        
//         dataIndex: "requirementName",
//         width: "13%",
//         render: (name, item, i) => {
//           const currentdate = dayjs().format("DD/MM/YYYY");
//           const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//           console.log(item);

//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <>
//               <span
//                 onClick={() => {            
//                  this.props.handleAddRequiremenDetailtModal(true);
//                  this.props.setCurrentOpportunityRecruitMentData(item);
//                   }}
//                 style={{
//                   cursor: "pointer",                  
//                   color: "blue",
//                 }}
//               >
//                 {/* {`${item.requirementName} `} */}

//                 <Tooltip title={item.requirementName}>
//                   {elipsize(item.requirementName, 20)}
//                 </Tooltip>

//               </span>
//               &nbsp;&nbsp;
//               {date === currentdate ? (
//                 <span
//                   style={{
//                     color: "tomato",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   New
//                 </span>
//               ) : null}
//             </>
//             ),
//           };

         
//         },
//       },
//       {
//         title: "Category",
//         dataIndex: "category",
//         width: "9%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: <span>{item.category}</span>,
//           };
//         },

//       },
//       // {
//       //   title: "Created",
//       //   width: "7%",
//       //   dataIndex: "recruitOwner",
//       //   render: (name, item, i) => {
//       //     return {
//       //       props: {
//       //         style: {
//       //           background:
//       //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//       //               ? "rgb(158 183 223)"
//       //               : null,

//       //         },
//       //       },
  
//       //       children: <span>
//       //          <SubTitle>
//       //         <Tooltip title={item.recruitOwner}>
//       //           <MultiAvatar
//       //             primaryTitle={item.recruitOwner}
//       //             // imageId={item.imageId}
//       //             // imageURL={item.imageURL}
//       //             imgWidth={"2.1em"}
//       //             imgHeight={"2.1em"}
//       //           />
//       //         </Tooltip>
//       //       </SubTitle>
//       //       </span>,
//       //     };
        
//       //   },
//       // },

//       {
//         title:"Created",
//         width: "7%",
//          dataIndex: "recruitOwner",
//          render: (text, item) => {
//          return <>
//          {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
//          <Tooltip title={item.recruitOwner}>
//             <span>
//               <MultiAvatar
//                 primaryTitle={item.recruitOwner}
//                 // imageId={item.ownerImageId}
//                 //  imageURL={item.imageURL}
//                 imgWidth={"2.1em"}
//                 imgHeight={"2.1em"}
//               />
//               </span>
//              </Tooltip>      
         
//          </>
//         },
         
//       },
//       // {
//       //   title: "Recruiter",
//       //   width: "7%",
//       //   render: (name, item, i) => {
//       //     return {
//       //       props: {
//       //         style: {
//       //           background:
//       //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//       //               ? "rgb(158 183 223)"
//       //               : null,

//       //         },
//       //       },
  
//       //       children: 
            
//       //         <>
        
              
//       //          <FlexContainer justifyContect="space-evenly">
//       //          {item.recruiterList && item.recruiterList.map((item, i) => {
//       //            return (
//       //             <Tooltip
//       //             title={item.fullName}
//       //          >
//       //             <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
//       //           <MultiAvatar
//       //            primaryTitle={item.fullName||""}
//       //             // imageId={item.imageId}
//       //             // imageURL={item.imageURL}
//       //             imgWidth={"2.1em"}
//       //             imgHeight={"2.1em"}
//       //           />
//       //           </div>
//       //         </Tooltip>
//       //            );
//       //       })} 
//       //       </FlexContainer>
//       //       </>
            
              
           
//       //     };
        
//       //   },
//       // },

//       {
//         title: "Recruiter",
//         width: "11%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: 
            
//               <>
       
                  
//         <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
//         {item.recruiterList && item.recruiterList.map((item, i) => {
//           const data=item.fullName.split("")[0].toUpperCase()
//           console.log("datas",data)
//                  return (
//                   <Tooltip title={item.fullName}>
       
//         <Avatar style={{ backgroundColor: '#f56a00' }}>{data}</Avatar> 
//         </Tooltip> 
//                  )

//      })} 
    
//     </Avatar.Group>
     
    
                
            
//             </>
            
              
           
//           };
        
//         },
//       },
//       {
//         title: "Created On",
//         width: "10%",
//         dataIndex: "creationDate",
//         render: (text, item) => {
//           const creationDate = dayjs(item.creationDate).format("L");

//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: <span>
              
//            {creationDate}
//             </span>,
//           };
        
          
//         },
//       },





//       {
//         title: "Start",
//         width: "9%",
//         render: (name, item, i) => {
//           console.log(item);
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children:<span>{dayjs(item.avilableDate).format("L")}</span>
//           };
        
//         },
//         sorter: (a, b) => {
//           if (a.avilableDate < b.avilableDate) {
//             return -1;
//           }
//           if (a.avilableDate > b.avilableDate) {
//             return 1;
//           }
//           return 0;
//         },
//       },
//       {
//         title:"Duration",
//         width: "8%",
//         render: (text, item) => {
//           //const getDate = (date) => dayjs(date, 'DD/MM/YYYY').startOf('month')
// const diff = Math.abs(dayjs(item.availableDate).diff(dayjs(item.endDate), 'months'));
// const date=diff+1
//          // const availableDate = dayjs(item.availableDate).subtract(item.endDate);
//           return <>
//           {/* {item.availableDate === null ? "None" : */}
//             <span>
//               {/* {dayjs(item.availableDate).subtract(item.endDate).month()} */}
//               {date} months
//             </span>
//           {/* } */}
//         </>
//         },
        
//       },
//       {
//         //title: "Rate/hr",
//         title:"Billing"
//        ,
//         dataIndex: "billing",
//         width: "8%",
//         //   defaultSortOrder: "descend",
//         // sorter: (a, b) => a.billing - b.billing,
//         render: (name, item, i) => {
//           console.log(item);
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children:<span>{item.billing} {item.currency}</span>
//           };
        
//         },
//       },
//   {
//         title: "Skill Set"
//        ,

//         width: "15%",
//         render: (name, item, i) => {
//           console.log(this.props.SkillList);
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: <span>
//             <RecruitmentFilter
//               handleSkillsetChoose={this.handleSkillsetChoose}
//               // topicsByCandidateId={this.props.topicsByCandidateId}
//               SkillList={item.skillSetList}
//               name={this.state.skillSetData}
//               skillName={item.skillName}
//               candidatetList={item.candidatetList}
//               fullName={item.fullName}
          
//             />
//           </span>,
//           };
          
//         },
//       },
     
//       {
//         title: "",
//         width: "3%",
//         render: (name, item, i) => {
//           console.log(this.state.skillSetData)
//           // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children: 
//             <>
//             {(this.state.skillSetData || item.skillName) &&
//               <span
//                 // type="edit"
//                 style={{ cursor: "pointer", color: "tomato",fontSize:"15px" }}
//                 onClick={() => {
//                   this.props.LinkSkillsRecruit({
//                     opportunityId: item.opportunityId,
//                     stageId: item.stageId,
//                     recruitmentProcessId: item.recruitmentProcessId,
//                     skillName: this.state.skillSetData || item.skillName,
//                     recruitmentId: item.recruitmentId,
//                     profileId: item.profileId,
//                   });
//                   this.props.getRecruiter(
//                     this.state.skillSetData || item.skillName,
//                     item.recruitmentId,
//                     item.opportunityId,



//                   );
//                   this.handleCandidateDataSet(item);
//                   this.props.handleRecruiterModal(true);
//                 }}
//               >
//                 <PsychologyAltIcon 
//                 style={{fontSize:"0.8rem",cursor:"pointer"}}
//                  />
//               </span>
//             }
//           </>
//           };
          
//         }
//       },

//       {
//         title: "",
//         width: "2%",
//         render: (name, item, i) => {
//           //           const arr=[item];
//           // let finalData=""
//           //           arr.forEach((item)=>{
//           // finalData=`${item}`
//           //           })
//           //           console.log(finalData)
//         //   const data = this.props.skillsCount
//         //   let result = Object.keys(data).map(key => {
//         //     return ({ name: key, value: data[key] })
//         //   }
//         //   )
//         //   const newArray = result.map(element => {
//         //     return `${element.name}  
//         // -${element.value}`
//         //   });

//         //   let text = newArray.toString() + "\r\n";
//         //   console.log(text)

//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
  
//             children:<span>
//                 <Tooltip
//               // title={text}
//               style={{ whiteSpace: 'pre-line' }}
//             >
//               <span
//                 style={{
//                   // color:
//                   //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
//                   cursor: "pointer",
//                   marginLeft: "-4px",
//                   fontSize:"large"
//                 }}
//                 onClick={() => {
                 
//                   this.props.getSkillsCount(
//                     item.recruitmentId,
//                     this.props.organizationId,


//                    );
//                    this.props.handleBarChartOrderModal(true);
//                 }}



//               >

//                 <HelpIcon  style={{fontSize:"0.8rem",cursor:"pointer"}}/>
//               </span>
//             </Tooltip>
//             </span>
//           };

         
//         },
//       },

//   //     {
//   //       title:"",
//   //         width: "3%",
//   //     render:(name,item,i)=>{
//   //       console.log(this.state.skillSetData)
//   //     // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
//   //     return(
//   //       <>
//   //       {(this.state.skillSetData || item.skillName) && 
//   //       <span
//   //       // type="edit"
//   //       style={{ cursor: "pointer",color:"tomato" }}
//   //       onClick={() => {
//   //            this.props.LinkSkillsRecruit({
//   //                   opportunityId: item.opportunityId,
//   //                   stageId: item.stageId,
//   //                   recruitmentProcessId: item.recruitmentProcessId,
//   //                   skillName:this.state.skillSetData || item.skillName,
//   //                   recruitmentId: item.recruitmentId,
//   //                   profileId: item.profileId,
//   //                 });
//   //                 this.props.getRecruiter(
//   //                    this.state.skillSetData || item.skillName,
//   //                     item.profileId,
//   //                    item.opportunityId,
                     

                   
//   //                 );
//   //                 this.handleCandidateDataSet(item);
//   //             this.props.handleRecruiterModal(true);
//   //       }}
//   //       >
//   //     
//   //       </span>
//   //         }
//   //       </>
//   //     )
//   //   }
//   // },



//       // {
//       //   title: "Talent",
//       //   dataIndex: "candidatetList",
//       //   width: "12%",
//       //   render: (name, item, i) => {
//       //     return {
//       //       props: {
//       //         style: {
//       //           background:
//       //              this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//       //               ? "rgb(158 183 223)"
//       //               : null,

//       //         },
//       //       },
//       //       children: (
//       //         <span>
//       //         {/* <CandidateLoadMore
//       //         candidatetList={item.candidatetList}
//       //         handleClickCandidateName={this.handleClickCandidateName}
//       //         candidateNo={item.candidateNo}
//       //         fullName={item.fullName}
//       //         /> */}
//       //          <FlexContainer justifyContect="space-evenly">
//       //           {item.candidatetList && item.candidatetList.map((candidate, i) => {
//       //             console.log(candidate)
//       //             return (
                    
//       //               <Tooltip
//       //               title={candidate.fullName}
//       //           >
//       //               <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
//       //                onClick={() => {
//       //                 this.handleClickCandidateName(item.recruitmentId)
//       //                 this.props.getCandidateRequirement(
//       //                    item.recruitmentId, 
    
//       //                 );
//       //                 }}
                 
//       //               >
                      
//       //                   <MultiAvatar
//       //                      primaryTitle={candidate.fullName||""}
//       //                     // imageId={item.imageId}
//       //                     // imageURL={item.imageURL}
//       //                     imgWidth={"30"}
//       //                     imgHeight={"30"}
//       //                   />
//       //                 </div>
//       //                  </Tooltip>
  
//       //             );                 
//       //           })} 
//       //           <div
//       //           // style={{ 
//       //           //   margin: "2px", 
//       //           //   borderRadius: "50%",
//       //           //   cursor:"pointer" ,
//       //           //   background:
//       //           //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//       //           //     ? "rgb(158 183 223)"
//       //           //     : null,
              
//       //           onClick={() => {
//       //             this.handleClickCandidateName(item.recruitmentId)
//       //             this.props.getCandidateRequirement(
//       //                item.recruitmentId, 

//       //             );
//       //             }}
//       //           >   
//       //          {item.candidateNo} 
//       //          </div>           
//       //          </FlexContainer>
//       //       </span>
//       //       ),
//       //     };
//       //   },
//       //  },

//        {
//         title: "Talent",
//         dataIndex: "candidatetList",
//         width: "14%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <>
              
              
//                     <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
//                      onClick={() => {
//                       this.handleClickCandidateName(item.recruitmentId)
//                       this.props.getCandidateRequirement(item.recruitmentId,);
//                       this.props.getRequirementOwner(item.recruitmentId,);
//                       }}
                 
//                     >
//                       <Avatar.Group maxCount={7} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
//         {item.candidatetList && item.candidatetList.map((candidate, i)=> {
//           const data1=candidate.fullName.split("")[0].toUpperCase()
//           console.log("datas",data1)
//                  return (
//                   <Tooltip title={candidate.fullName}>
       
//         <Avatar style={{ backgroundColor: '#f56a00' }}>{data1}</Avatar> 
//         </Tooltip> 
//                  )

//      })} 
//           <div
//                 // style={{ 
//                 //   margin: "2px", 
//                 //   borderRadius: "50%",
//                 //   cursor:"pointer" ,
//                 //   background:
//                 //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                 //     ? "rgb(158 183 223)"
//                 //     : null,
              
//                 onClick={() => {
//                   this.handleClickCandidateName(item.recruitmentId)
//                   this.props.getCandidateRequirement(
//                      item.recruitmentId, 

//                   );
//                   }}
//                 >   
//                {item.candidateNo} 
//                </div>
    
//     </Avatar.Group>
                      
                       
//                       </div>
                       
                      
  
                
                           
             
//             </>
//             ),
//           };
//         },
//        },
     
//       {
//         title: "Sponsor",
     
//         dataIndex: "sponserName",
//         width: "7%",
//         render: (text, item) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children:
//             <Tooltip
//             title={`${item.sponserName}`}
//          > 
//             <span>
              
//                <MultiAvatar
//                  primaryTitle={item.sponserName||""}
//                   // imageId={item.imageId}
//                   // imageURL={item.imageURL}
//                   imgWidth={"2.1em"}
//                   imgHeight={"2.1em"}
//                 />
               
//               {/* {item.sponserName} */}
//               </span>,
//               </Tooltip>
//           };
         
//         },
//       },
//       {
//         title: "",
//         dataIndex: "callType",
//         width: "2%",
//         render: (name, item, i) => {
//           const close =
//             this.state.show === true && this.state.profileId === item.profileId;

//             return {
//               props: {
//                 style: {
//                   background:
//                      this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                       ? "rgb(158 183 223)"
//                       : null,
  
//                 },
//               },
//               children: (
//                 <>
//                 {item.candidateName ? (
//                   <>
//                     {close ? (
//                       <Tooltip title="Close Details"
                        
//                       >
//                         <VisibilityOffIcon
//                           type="eye-invisible"
//                           onClick={() => this.handleCloseIconClick()}
//                           style={{
//                             fontSize: "1.125em",
//                             color:
//                               this.state.show === true &&
//                               this.state.profileId === item.profileId &&
//                               "#1890ff",
//                           }}
//                           size="30"
//                         />
//                       </Tooltip>
//                     ) : (
//                       <>
//                         <Tooltip title="Access Details"
//                         >
//                           <VisibilityIcon
//                             type="eye"
//                             onClick={() =>
//                               this.handleIconClick(
//                                 item.profileId,
//                                 item.candidateId,
//                                 item.stageList
//                               )
//                             }
//                             style={{
//                               fontSize: "1.125em",
//                               color:
//                                 this.state.show === true &&
//                                 this.state.profileId === item.profileId &&
//                                 "#1890ff",
//                             }}
//                             size="30"
//                           />
//                         </Tooltip>
//                       </>
//                     )}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </>
//               ),
//             };

          
//         },
//       },
//       {
//         title: "",
//         width: "2%",
//         render: (name, item, i) => {

//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <>
//               {/* {item.approveInd || item.rejectInd ? null : ( */}
//               {this.props.user.userType !== "USER" && this.props.user.department !== "Recruiter" && ( 
//               <BorderColorIcon
//                 type="edit"
//                 style={{ cursor: "pointer",fontSize:"0.8rem" }}
//                 onClick={() => {
//                   this.props.handleAddRequirementModal(true);
//                   this.props.setCurrentOpportunityRecruitMentData(item);

//                 }}
//               />
//               )}
//               {/* )} */}
//             </>
//             ),
//           };
         
//         },
//       },
//       {
//         title: "",
//         dataIndex: "id",
//         width: "2%",
//         render: (name, item, i) => {
//           return (
//             <Tooltip title='Click to Close'>
       
//             <span
//              onClick={() => {
//               this.props.LinkClosedRequirement(
//                 item.recruitmentId,
//                 this.handleCallback
//                 // this.props.organizationId,
  
  
//               );
//               // item.opportunityId
//             }}
         
//             >
//               <LockOpenIcon    
//                style={{  fontSize: "0.8rem",
//                cursor: "pointer",}}
//                />
//                </span>
  
//         </Tooltip>
             
//           );
//         },
//       },

//       {
//         title: "",
//         dataIndex: "id",
//         width: "2%",
//         render: (name, item, i) => {
//           return {
//             props: {
//               style: {
//                 background:
//                    this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//                     ? "rgb(158 183 223)"
//                     : null,

//               },
//             },
//             children: (
//               <StyledPopconfirm
//               title="Do you want to delete?"
//               onConfirm={() =>
//                 this.props.deleteRequirementData(
//                   item.recruitmentId,

//                 )
//               }
//             >
//               {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
//               {this.props.user.userType !== "USER" && this.props.user.department !== "Recruiter" && ( 
//               <DeleteIcon type="delete"
       
//                 style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }}
//               />
//               )}
//               {/* )} */}
//             </StyledPopconfirm>
//             ),
//           };
        
//         },
//       },

//     ];



    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
       <div className=' flex   sticky  z-auto'>
     <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent items-end sticky  z-10">
        <div className=" flex justify-between w-[100%] !text-lm font-bold font-poppins">
      
        <div className="  w-[2.02rem]">   </div>
        <div className="  w-[15.7rem] text-sm text-[#00A2E8]  truncate ">            
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />
        {/* {translatedMenuItems[0]} */}
        Job ID
     
        </div>
        <div className=" w-[14.9rem] truncate ">   <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />  
        {/* {translatedMenuItems[1]} */}
        Requirement
          </div>
        <div className="   w-[15.9rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
        {/* {translatedMenuItems[2]} */}
        Sponsor
        </div>
        <div className="  w-[15.6rem] truncate "> <DateRangeIcon className="!text-icon  mr-1"/>
        {/* {translatedMenuItems[3]} */}
        # Positions
        </div>
        <div className="   w-[15.99rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
        {/* {translatedMenuItems[4]} */}
        Submitted</div> 
        <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        {/* {translatedMenuItems[5]} */}
        Selected </div>
        <div className=" w-[16.1rem] truncate ">   <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />
        {/* {translatedMenuItems[6]} */}
        OnBoarded</div>
        <div className="   w-[16.3rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
        {/* {translatedMenuItems[7]} */}
        Recruiter</div>
        <div className="  w-[13.2rem] truncate "> <DateRangeIcon className="!text-icon  mr-1"/>
        {/* {translatedMenuItems[8]} */}
        Talent</div>
        <div className="   w-[14.01rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
        {/* {translatedMenuItems[8]} */}
        Website</div> 
        <div className="  w-[14.02rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        {/* {translatedMenuItems[10]} */}
        Monster</div>
         </div>    
      </div>
      { !this.props.fetchingAllRecruitmentDetailsByOppId && this.props.allRecruitmentDetailsByOppId.length ===0 ?<EmptyPage/>: this.props.allRecruitmentDetailsByOppId.map((item, index) => {
    return (
        <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class="flex  w-[3.1rem] items-center justify-start  border-l-2 border-green-500 h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              <div className='text-xs ml-gap font-poppins'>
              {/* {item.jobOrder} */}
           </div>
                </div>
                </div>
                <div class="flex  w-[8.2rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
           {/* {item.recruiterName} */}
          </div>
          </div> 
          <div class="flex  w-[8.3rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
        
          {/* {item.sponserName} */}
          </div>
          </div> 
          <div class="flex  w-[8.4rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
          {/* {item.number} */}
          </div>
          </div> 
          <div class="flex  w-[7.3rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
         {/* {item.offered} */}
          </div>
          </div> 
          <div class="flex  w-[8.4rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
        {/* {item.closedPosition} */}
          </div>
          </div> 
          <div class="flex  w-[8.5rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
       {/* {item.onBoardNo} */}
          </div>
          </div> 
          <div class="flex  w-[8.6rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'> 
         
          </div>
          </div> 
          <div class="flex  w-[8.7rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'> 
           {/* {item.candidatetList} */}
          </div>
          </div> 
          <div class="flex  w-[8.8rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
         
          </div>
          </div> 
          <div class="flex  w-[7.1rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  font-poppins'>
    
          </div>
          </div> 
          <div class="flex  w-[7.2rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
      
          </div>
          </div> 
        
                </div>             
    ) }
            )} 
      </div>    
      </div>
        {/* <StyledTable
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
        
        /> */}
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
          title="Position"
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
          title="Select Sponsor"
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
