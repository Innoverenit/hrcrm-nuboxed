import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { OnlyWrapCard } from "../../Components/UI/Layout";
import {getAllRequirementTable} from "../Requirement/RequirementAction"
import InfiniteScroll from "react-infinite-scroll-component";



class AllRequirementTable extends Component {
 
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
//   handleCallback = () => {
//     if (this.props.role === "USER" && this.props.user.department === "Recruiter") {
//       this.props.getRecruiterRequiremnt(this.props.recruiterId);
//     } else {
//       this.props.getRecruitByOpportunityId(this.props.opportunityId);

//     }
//     // this.props.getRecruitByOpportunityId(this.props.opportunityId);
//   };
//   handleCopy = (
//     recruitmentId,
//     recruitmentProcessId,
//     stageId,
//     opportunityId
//   ) => {
//     const value = {
//       recruitmentId: recruitmentId,
//       recruitmentProcessId: recruitmentProcessId,
//       stageId: stageId,
//       opportunityId: opportunityId,
//     };
//     this.props.addRecruitProProfile(value, this.handleCallback);
//   };

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
    // this.props.getCandidateById(candidateId);
    // this.props.getTopicsByCandidateId(candidateId);
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
  this.props.getAllRequirementTable(this.props.orgId)
   
  }

//   handleCallBack = (status, opportunityId, profileId) => {
//     if (status === "success") {
//       // message.success("Candidate Selected");
//       this.props.emailSendRecruitment({
//         opportunityId: opportunityId,
//         userId: this.props.userId,
//         profileId: profileId,
//       });
//     }
//   };


  render() {
    const{requirementTable,fetchingAllRequirementTable} =this.props;
   
// console.log(this.props.requirementTable)
    

    // console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
   
    
 


    // if (this.props.fetchingRecruitToOpportunity) {
    //   return <BundleLoader />;
    // }
   
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
  <div className=' flex justify-end sticky top-28 z-auto'>
      <OnlyWrapCard style={{backgroundColor:"#eaedf1"}}>
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">Job ID</div>
        <div className=" md:w-[4.2rem] ">Requirement</div>
        <div className="md:w-[5.8rem]">Category</div>
        <div className="md:w-[8.5rem]">Customer</div>
        <div className="md:w-[3.8rem]">Created</div> 
        <div className="md:w-[5.2rem]">Recruiter</div>
        <div className="md:w-[1.5rem]">On</div>
        <div className="md:w-[3.3rem]">Start</div>
        <div className="w-12">Duration</div>
        <div className="w-12">Billing</div>
        <div className="w-12">Talent</div>
        <div className="w-12">Sponsor</div>

      </div>
      <InfiniteScroll
        dataLength={requirementTable.length}
        // next={handleLoadMore}
        // hasMore={hasMore}
        loader={fetchingAllRequirementTable?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"75vh"}
      >
        {requirementTable.map((item) => {
          const currentdate = moment().format("DD/MM/YYYY");
          const date = moment(item.creationDate).format("DD/MM/YYYY");

          const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-11 items-center p-3"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                              
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins">
                                    {item.jobOrder}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.requirementName}

                                    </div>
                                    <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.category}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.customerName}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.recruitOwner}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.creationDate}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {/* {item.creationDate} */}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.billing}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.candidatetList}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.candidatetList}

                                    </div>
                                </div>
         
                   </div>
             
                            </div>
                        </div>
           </div>
          );
        })}
         </InfiniteScroll>
      </OnlyWrapCard>
      </div>
 
    
      </>
    );
  }
}

const mapStateToProps = ({ auth, requirement }) => ({
  user: auth.userDetails,
  requirementTable:requirement.requirementTable,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fetchingAllRequirementTable:requirement.fetchingAllRequirementTable

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getAllRequirementTable
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementTable);

// const columns = [
//   {
//     title: "",
//     width: "2%",
//     // render: (name, item, i) => {
//     //   const data = ` Profile ID : ${item.profileId}  Recruitment ID : ${item.recruitmentId}`
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },
//     //     children: (
//     //       <Tooltip
//     //       // className="ant-tooltip-inner"
//     //       // placement="rightTop" 
//     //       overlayStyle={{ maxWidth: '300px', }}

//     //       title={data}
//     //     >
//     //       <span
//     //         // onClick={() => handleReasonOfDelete(item.orderId)}
//     //         style={{
//     //           // color:
//     //           //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
//     //           cursor: "pointer",
//     //         }}
//     //       >
//     //         <i class="fa fa-info-circle"></i>
//     //       </span>
//     //     </Tooltip>
//     //     ),
//     //   };
     
//     // },
//   },
//   {
//     title: "Job ID",
//     width: "9%",
//     dataIndex: "jobOrder",
//     // render: (name, item, i) => {
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },
//     //     children: (
//     //       <>
//     //         <Badge count={item.number} style={{ right: "1px" }}>
//     //           <span             
//     //           >

//     //             {`${item.jobOrder} `} &nbsp;


//     //           </span>
//     //         </Badge>
//     //       </>
//     //     ),
//     //   };
     
//     // },

//   },

//   // {
//   //   title:"",
//   //     width: "8%",
//   //   dataIndex:"number",

//   // },
//   {
//     //title: "Requirement",
//     title: <FormattedMessage
//       id="app.requirementName"
//       defaultMessage="Requirement"
//     />,
//     dataIndex: "requirementName",
//     width: "13%",
  
//   },
//   {
//     title: "Category",
//     dataIndex: "category",
//     width: "9%",


//   },
//   {
//     title: "Customer",
//     dataIndex: "customerName",
//     width: "9%",


//   },
 

//   {
//     title:"Created",
//     width: "7%",
//      dataIndex: "recruitOwner",
//     //  render: (text, item) => {
//     //  return <>
//     //  {/* {item.assignedTo === item.ownerName ? "" : item.assignedTo}  */}
//     //  <Tooltip title={item.recruitOwner}>
//     //     <span>
//     //       <MultiAvatar
//     //         primaryTitle={item.recruitOwner}
//     //         // imageId={item.ownerImageId}
//     //         //  imageURL={item.imageURL}
//     //         imgWidth={"2.1em"}
//     //         imgHeight={"2.1em"}
//     //       />
//     //       </span>
//     //      </Tooltip>      
     
//     //  </>
//     // },
     
//   },
//   {
//     title: "Recruiter",
//     width: "7%",
//     // render: (name, item, i) => {
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },

//     //     children: 
        
//     //       <>
    
          
//     //        <FlexContainer justifyContect="space-evenly">
//     //        {item.recruiterList && item.recruiterList.map((item, i) => {
//     //          return (
//     //           <Tooltip
//     //           title={item.fullName}
//     //        >
//     //           <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}>
//     //         <MultiAvatar
//     //          primaryTitle={item.fullName||""}
//     //           // imageId={item.imageId}
//     //           // imageURL={item.imageURL}
//     //           imgWidth={"2.1em"}
//     //           imgHeight={"2.1em"}
//     //         />
//     //         </div>
//     //       </Tooltip>
//     //          );
//     //     })} 
//     //     </FlexContainer>
//     //     </>
        
          
       
//     //   };
    
//     // },
//   },
//   {
//     title: "On",
//     width: "10%",
//     dataIndex: "creationDate",
//     // render: (text, item) => {
//     //   const creationDate = moment(item.creationDate).format("ll");

//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },

//     //     children: <span>
          
//     //    {creationDate}
//     //     </span>,
//     //   };
    
      
//     // },
//   },





//   {
//     //title: "Start",
//     title: <FormattedMessage
//       id="app.processName"
//       defaultMessage="Start"
//     />,
//     width: "9%",
//     // render: (name, item, i) => {
//     //   console.log(item);
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },

//     //     children:<span>{moment(item.avilableDate).format("ll")}</span>
//     //   };
    
//     // },
//     // sorter: (a, b) => {
//     //   if (a.avilableDate < b.avilableDate) {
//     //     return -1;
//     //   }
//     //   if (a.avilableDate > b.avilableDate) {
//     //     return 1;
//     //   }
//     //   return 0;
//     // },
//   },
//   {
//     title:"Duration",
//     width: "8%",
// //         render: (text, item) => {
// //           //const getDate = (date) => moment(date, 'DD/MM/YYYY').startOf('month')
// // const diff = Math.abs(moment(item.availableDate).diff(moment(item.endDate), 'months'));
// // const date=diff+1
// //          // const availableDate = moment(item.availableDate).subtract(item.endDate);
// //           return <>
// //           {/* {item.availableDate === null ? "No Data" : */}
// //             <span>
// //               {/* {moment(item.availableDate).subtract(item.endDate).month()} */}
// //               {date} months
// //             </span>
// //           {/* } */}
// //         </>
// //         },
    
//   },
//   {
//     //title: "Rate/hr",
//     title: <FormattedMessage
//       id="app.billing"
//       defaultMessage="Billing"
//     />,
//     dataIndex: "billing",
//     width: "8%",
//     //   defaultSortOrder: "descend",
//     // sorter: (a, b) => a.billing - b.billing,
//     // render: (name, item, i) => {
//     //   console.log(item);
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },

//     //     children:<span>{item.billing} {item.currency}</span>
//     //   };
    
//     // },
//   },
 

 
 





//   {
//     title: "Talent",
//     dataIndex: "candidatetList",
//     width: "12%",
//     // render: (name, item, i) => {
//     //   return {
//     //     props: {
//     //       style: {
//     //         background:
//     //            this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //             ? "rgb(158 183 223)"
//     //             : null,

//     //       },
//     //     },
//     //     children: (
//     //       <span>
        
        
//     //        <FlexContainer justifyContect="space-evenly">
//     //         {item.candidatetList && item.candidatetList.map((candidate, i) => {
//     //           console.log(candidate)
//     //           return (
                
//     //             <Tooltip
//     //             title={candidate.fullName}
//     //         >
//     //             <div style={{ margin: "2px", borderRadius: "50%",cursor:"pointer" }}
//     //             //  onClick={() => {
//     //             //   this.handleClickCandidateName(item.recruitmentId)
//     //             //   this.props.getCandidateRequirement(
//     //             //      item.recruitmentId, 

//     //             //   );
//     //             //   }}
             
//     //             >
                  
//     //                 <MultiAvatar
//     //                    primaryTitle={candidate.fullName||""}
//     //                   // imageId={item.imageId}
//     //                   // imageURL={item.imageURL}
//     //                   imgWidth={"30"}
//     //                   imgHeight={"30"}
//     //                 />
//     //               </div>
//     //                </Tooltip>

//     //           );                 
//     //         })} 
//     //         <div
//     //         // style={{ 
//     //         //   margin: "2px", 
//     //         //   borderRadius: "50%",
//     //         //   cursor:"pointer" ,
//     //         //   background:
//     //         //   this.state.subTableVisible&&this.state.recruitmentId === item.recruitmentId
//     //         //     ? "rgb(158 183 223)"
//     //         //     : null,
          
//     //         // onClick={() => {
//     //         //   this.handleClickCandidateName(item.recruitmentId)
//     //         //   this.props.getCandidateRequirement(
//     //         //      item.recruitmentId, 

//     //         //   );
//     //         //   }}
//     //         >   
//     //        {/* {item.candidateNo}  */}
//     //        </div>           
//     //        </FlexContainer>
//     //     </span>
//     //     ),
//     //   };
//     // },
//    },

//   {
//     //title: "Sponsor",
//     title: <FormattedMessage
//       id="app.sponserName"
//       defaultMessage="Sponsor"
//     />,
//     dataIndex: "sponserName",
//     width: "7%",
   
//   },


 
 

 

// ];
