import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import AddRequirementModal from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddRequirementModal"
import {
  StyledTable,
  StyledPopconfirm,
  StyledModal,
} from "../../../Components/UI/Antd";
import { Tooltip } from "antd";
import HelpIcon from '@mui/icons-material/Help';
import RecruitmentFilter from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentFilter";
import AddRecruiterModal from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddRecruiterModal"
import {
  getRecruitByRecruiterId,
  LinkSkillsRecruit,
  getskillsetList,
  getRecruiter,
  getSkillsCount,
  //   LinkCandidateRecruit,
  LinkStageRecruit,
  LinkStatusRecruit,
  //setCurrentRecruitMentData,
  setCurrentRecruiterData,
  //   //  emailSendRecruitment,
  handleSponsorModal,
  handleRecruiterModal,
  handleAddRequirementModal,
  setAddRequirement,
  // handleRecruiterModal,
  // handleRecruitModal
  emailSendStage,
} from "../../Opportunity/OpportunityAction";
import { BundleLoader } from "../../../Components/Placeholder";
import RecruitmentDetails from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/RecruitmentDetails";
import {
  getCandidateById,
  getTopicsByCandidateId,
  //   getContactDocument,
} from "../../Candidate/CandidateAction";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import dayjs from "dayjs";
import EditRecruitForm from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/EditRecruitForm";
import { Suspense } from "react";
import { elipsize } from "../../../Helpers/Function/Functions";
import RecruitmentSwitch from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentSwitch";
import SelectSponsorForm from "../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/SelectSponsorForm";
import { addRecruitProProfile, deleteRequirementData } from "../../Opportunity/OpportunityAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
class DemandTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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
    };
  }

  // handleCallback = () => {
  //   this.props.getRecruitByOpportunityId(this.props.opportunityId);
  // };
  handleCandidateDataSet = (data) => {
    this.setState({ candidatePostData: data })
  }
  handleSkillsetChoose = (data) => {
    this.setState({ skillSetData: data })
  }
  handleCallback = () => {
    this.props.getRecruitByRecruiterId(this.props.recruiterId);
  };
  handleCopy = (
    recruitmentId,
    recruitmentProcessId,
    stageId,
    opportunityId,
    recruiterId
  ) => {
    const value = {
      recruitmentId: recruitmentId,
      recruitmentProcessId: recruitmentProcessId,
      stageId: stageId,
      opportunityId: opportunityId,
      recruiterId: recruiterId,
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
  handleIconClick = (profileId, candidateId, stageList) => {
    debugger;
    this.setState({ show: true, profileId, candidateId, stageList });
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

    this.props.getRecruitByRecruiterId(this.props.recruiterId);

    // this.props.getskillsetList();
    //  this.props.getSkillsCount(this.props.organizationId,)
  }




  render() {
    const {
      recruitByRecruiterIdId,

    } = this.props;

    console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
    const columns = [
      {
        title: "Job ID",
        width: "5%",
      },
      {
        title: "Requirement",
        dataIndex: "requirementName",
        width: "13%",
        render: (name, item, i) => {
          console.log(item);

          return (
            <>
              <span
                onClick={() => {
                  this.props.handleAddRequirementModal(true);
                //   this.props.setCurrentRecruitMentData(item);
                }}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {/* {`${item.requirementName} `} */}

                <Tooltip title={item.requirementName}>
                  {elipsize(item.requirementName, 20)}
                </Tooltip>

              </span>
            </>

          );
        },
      },
      {
        title: "Category",
        width: "8%",
        dataIndex: "number"
      },

      {
        title: "",
        width: "2%",
        render: (name, item, i) => {
          const data = `Requirement ID : ${item.recruitmentId}`
          return (
            <Tooltip
              overlayStyle={{ maxWidth: '300px', }}
              title={data}
            >
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-info-circle"></i>
              </span>
            </Tooltip>
          );
        },
      },
      {
        title: "Positions",
        width: "8%",
        dataIndex: "number"
      },
      {
        title: "Start",
        dataIndex: "processName",
        width: "9%",
        render: (name, item, i) => {
          console.log(item);
          return <span>{dayjs(item.avilableDate).format("ll")}</span>;
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
        //title: "Rate/hr",
        title: "Billing"
      ,
        dataIndex: "billing",
        width: "8%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.billing - b.billing,
        render: (name, item, i) => {
          console.log(item);
          return (
            <>
              {item.billing} {item.currency}
            </>
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
              {item.candidateName ? (
                <>
                  {item.approveInd ? (
                    <>
                      <Tooltip //title={"Offer rolled out"}
                        title="Selected"
                      

                      >
                        <CheckCircleOutlineIcon
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={140}
                          style={{ fontSize: "1.2em", }}
                        />
                      </Tooltip>
                    </>
                  ) : item.rejectInd ? (
                    <>
                      <Tooltip title={"Dropped"}>
                        {" "}
                        <DoDisturbIcon
                          type="stop"
                          size={140}
                          style={{ fontSize: "1.2em", marginLeft: "0.875em" }}
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
                          twoToneColor="#52c41a"
                          size={140}
                          style={{ fontSize: "1.2em" }}
                          onClick={() => {
                            this.props.LinkStatusRecruit(
                              {
                                approveInd: true,
                                opportunityId: item.opportunityId,
                                candidateId: item.candidateId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },

                              (data) =>
                                this.handleCallBack(
                                  data,

                                  item.opportunityId,
                                  item.profileId
                                )
                            );
                          }}
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
                          style={{ fontSize: "1.2em" }}
                          onClick={() => {
                            this.props.LinkStatusRecruit(
                              {
                                rejectInd: true,
                                opportunityId: item.opportunityId,
                                // stageId: item.stageId,
                                candidateId: item.candidateId,
                                // recruitmentProcessId: item.recruitmentProcessId,
                                recruitmentId: item.recruitmentId,
                                profileId: item.profileId,
                              },
                              (data) =>
                                this.handleCallBack(
                                  data,

                                  item.opportunityId,
                                  item.profileId
                                )
                            );
                          }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              ) : null}




            </span>


          );

        },

      },

      {
        title: "",
        width: "1%",
        render: (name, item, i) => {
          const arr = [item];
          let finalData = ""
          arr.forEach((item) => {
            finalData = `${item}`
          })
          console.log(finalData)
          const data = this.props.skillsCount
          let result = Object.keys(data).map(key => {
            return ({ name: key, value: data[key] })
          }
          )
          const newArray = result.map(element => {
            return `${element.name}  
        -${element.value}`
          });

          let text = newArray.toString() + "\r\n";
          console.log(text)



          return (
            <Tooltip
              title={text}
              style={{ whiteSpace: 'pre-line' }}
            >
              <span
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                  width: "1%",
                }}
                onClick={() => {
                  this.props.getSkillsCount(
                    item.recruitmentId,
                    this.props.organizationId,


                  );
                }}


              >
                <HelpIcon 
                 />
              </span>
            </Tooltip>
          );
        },
      },
      {
        title: "Skill Set",

        width: "15%",
        render: (name, item, i) => {
          console.log(this.props.SkillList);
          return (
            <span>
              <RecruitmentFilter
                handleSkillsetChoose={this.handleSkillsetChoose}
                // topicsByCandidateId={this.props.topicsByCandidateId}
                SkillList={item.skillSetList}
                name={this.state.skillSetData}
                skillName={item.skillName}
                candidateName={item.candidateName}
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
            </span>
          );
        },
      },
      {
        title: "",
        width: "3%",
        render: (name, item, i) => {
          console.log(this.state.skillSetData)
          // const IconShow = this.state.skillSetData.skillName !== {} ? true : false;
          return (
            <>
              {(this.state.skillSetData || item.skillName) &&
                <span
                  // type="edit"
                  style={{ cursor: "pointer", color: "tomato" }}
                  onClick={() => {
                    this.props.LinkSkillsRecruit({
                      opportunityId: this.props.opportunityId,
                      stageId: item.stageId,
                      recruitmentProcessId: item.recruitmentProcessId,
                      skillName: this.state.skillSetData || item.skillName,
                      recruitmentId: item.recruitmentId,
                      profileId: item.profileId,
                    });
                    this.props.getRecruiter(
                      this.state.skillSetData || item.skillName,
                      item.profileId,
                      this.props.opportunityId,



                    );
                    this.handleCandidateDataSet(item);
                    this.props.handleRecruiterModal(true);
                  }}
                >
                  {/* <FontAwesomeIcon icon={solid('person-circle-question')} /> */}
                  <PsychologyAltIcon/>
                </span>
              }
            </>
          )
        }
      },



      {
        title: "Talent",
        dataIndex: "candidateName",
        width: "12%",
        //  ...this.getColumnSearchProps('candidateName'),


      },
    //   {
    //     title: "Cost",
    //     dataIndex: "candidateBilling",
    //     width: "8%",
    //     render: (name, item, i) => {
    //       console.log(item);
    //       return (
    //         <>
    //           {item.candidateBilling} {item.currency}
    //         </>
    //       );
    //     },
    //     //  ...this.getColumnSearchProps('candidateName'),


    //   },

      // {
      //   //title: "Candidate",
      //   title: <
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

      {
        title: "",
        dataIndex: "callType",
        width: "7%",
        render: (text, item) => {
          return (
            <>
              <RecruitmentSwitch
                contactId={item.contactId}
                profileId={item.profileId}
                opportunityId={item.opportunityId}
                recruitmentId={item.recruitmentId}
                candidateInd={item.candidateInd}
                approveInd={item.approveInd}
                rejectInd={item.rejectInd}
              />
            </>
          );
        },
      },
    //   {
    //     //title: "Sponsor",
    //     title:"Sponsors"
    //     />,
    //     dataIndex: "callType",
    //     width: "7%",
    //     render: (text, item) => {
    //       return (
    //         <>
    //           <RecruitmentSwitchSponsor
    //             sponserId={item.sponserId}
    //             profileId={item.profileId}
    //             opportunityId={item.opportunityId}
    //             recruitmentId={item.recruitmentId}
    //             sponserInd={item.sponserInd}
    //             candidateId={item.contactId}
    //             approveInd={item.approveInd}
    //             rejectInd={item.rejectInd}
    //             handleError={this.handleError}
    //           />
    //         </>
    //       );
    //     },
    //   },
      // {
      //   title: "",
      //   width: "2%",
      //   render: (name, item, i) => {
      //     return (
      //       <Tooltip
      //         //title={"Copy"}
      //         title=Copy"
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

          return (
            <>
              {item.candidateName ? (
                <>
                  {close ? (
                    <Tooltip //title="Close Details"
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
                      <Tooltip 
                      title="Access Details"
                      >
                        <VisibilityIcon
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
          );
        },
      },

      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() =>
                this.props.deleteRequirementData(
                  item.profileId,
                  item.recruitmentId,

                )
              }
            >
              {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
              <DeleteOutlineIcon type="delete"
                // onClick={() =>
                //   this.props.deleteRequirementData(
                //     item.profileId,
                //    item.recruitmentId,
                //     // item.candidateId,
                //     // item.stageList
                //   )
                // }
                style={{ cursor: "pointer", color: "red" }}
              />
              {/* )} */}
            </StyledPopconfirm>
          );
        },
      },
      // {
      //   title: "",
      //   render: (name, item, i) => {
      //     return (
      //       <>
      //         {item.approveInd || item.rejectInd ? null : (
      //           <Icon
      //             type="edit"
      //             style={{ cursor: "pointer" }}
      //             onClick={() => {
      //               this.props.setCurrentRecruitMentData(item);
      //                this.handleEditModal(true);

      //             }}
      //           />
      //         )}
      //       </>
      //     );
      //   },
      // },
    ];

    if (this.props.fetchingRecruitToRecruiter) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <>
        {/* {callsListByOpportunityId && ( */}
        <StyledTable
          // rowKey={(record) =>record.profileId}
          rowKey="profileId"
          //   rowSelection={{
          //     type: "radio",
          //     ...rowSelection
          // }}
          // rowSelection={rowSelection}
          // scroll={{ y: 220 }}
          scroll={{ y: tableHeight }}
          // pagination={{
          //   defaultPageSize: 15,
          //   showSizeChanger: true,
          //   pageSizeOptions: ["15", "25", "40", "50"],
          // }}
          pagination={false}
          columns={columns}
          dataSource={this.props.recruitByRecruiterId}
          onChange={console.log("call onChangeHere...")}
        // expandedRowRender={(record) => {
        //   return (
        //     <div style={{ height: "20vh", overflow: "scroll" }}>
        //       <p style={{ fontWeight: "bold", margin: 0 }}>Type</p>
        //       <p>{`${record.type}`}</p>

        //       <p style={{ fontWeight: "bold", margin: 0 }}>Workflow</p>
        //       <p>{` ${record.processName}`}</p>

        //       <p style={{ fontWeight: "bold", margin: 0 }}>Sponsor</p>
        //       <p style={{ margin: 0 }}>{` ${record.sponserName || ""}`}</p>
        //       <p style={{ fontWeight: "bold", margin: 0 }}>
        //         Sponsor Approved on
        //       </p>
        //       <p>{`${record.sponserInd
        //         ? dayjs(record.sponserOfferDate).format("lll")
        //         : ""
        //         }`}</p>
        //       <p style={{ fontWeight: "bold", margin: 0 }}>
        //         Candidate Approved on
        //       </p>
        //       <p>{`${record.candidateOfferAccept} ${record.candidateInd
        //         ? dayjs(record.candidateOfferDate).format("lll")
        //         : ""
        //         }`}</p>
        //       <p style={{ fontWeight: "bold", margin: 0 }}>Description</p>
        //       <p>{record.description}</p>
        //     </div>
        //   );
        // }}
        />
        {/* )} */}
        {this.state.show && (
          <RecruitmentDetails
            candidateId={this.state.candidateId}
            candidate={this.props.candidate}
            profileId={this.state.profileId}
            stageList={this.state.stageList}
          />
        )}

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
            candidatePostData={this.state.candidatePostData}
            opportunityId={this.props.opportunityId}
            recruiterId={this.props.userId}
          //  skillSetData ={this.state.skillSetData}
          //  profileId={item.profileId}
          //  opportunityId=
          // {this.props.opportunityId}

          />
        </Suspense>
        <Suspense fallback={"Loading..."}>
          {this.setshow && (
            <AddRequirementModal
              handleAddRequirementModal={this.props.handleAddRequirementModal}
              addRequirementModal={this.props.addRequirementModal}
            //  requirementName={this.props.requirementName}


            />
          )}
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity, contact, auth, candidate }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  recruitByRecruiterId: opportunity.recruitByRecruiterId,
  //  recruitmentId:recruitByOpportunityId.opportunity.recruitmentId,
  fetchingRecruitToRecruiter: opportunity.fetchingRecruitToRecruiter,
  topicsByCandidateId: candidate.topicsByCandidateId,
  fetchingSkillSetList: opportunity.fetchingSkillSetList,
  candidate: candidate.candidate,
  recruiterId: auth.userDetails.userId,
  recruiter: opportunity.recruiter,
  fetchingRecruiter: opportunity.fetchingRecruiter,
  skillsCount: opportunity.skillsCount,
  SkillList: opportunity.SkillList,
  organizationId: auth.userDetails.organizationId,
  addSponsorModal: opportunity.addSponsorModal,
  addRecruiterModal: opportunity.addRecruiterModal,
  addRequirementModal: opportunity.addRequirementModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRecruitProProfile,
      getRecruitByRecruiterId,
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
      //setCurrentRecruitMentData,
      setCurrentRecruiterData,
      handleRecruiterModal,
      deleteRequirementData,
      //setCurrentRecruitMentData,

      emailSendStage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DemandTable);
