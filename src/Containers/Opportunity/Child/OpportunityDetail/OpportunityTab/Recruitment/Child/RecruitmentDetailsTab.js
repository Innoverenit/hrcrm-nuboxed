import React, { Component, lazy, Suspense } from "react";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleCandidateEducationModal,handleCandidateTrainingModal,handleCandidateEmploymentModal } from "../../../../../../Candidate/CandidateAction";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
import RemarksTable from "../Child/RemarksTable";
import AddSentimentModal from "../Child/AddSentimentModal" 
 import { handleRemarksModal,handleDocumentUploadModal ,handleSentimentModal} from "../../../../../OpportunityAction";
import AddRemarksModal from "../Child/AddRemarksModal";
import AddBoxIcon from '@mui/icons-material/AddBox';
const AddCandidateEducationModal = lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Education/AddCandidateEducationModal"));
const AddCandidateTrainingModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Training/AddCandidateTrainingModal"));
const AddCandidateEmploymentModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Employment/AddCandidateEmploymentModal"));
const TabPane = StyledTabs.TabPane;

class RecruitmentDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const { 
      handleRemarksModal,
      handleDocumentUploadModal,
      handleCandidateEducationModal,
      addCandidateEducationModal,
      handleCandidateEmploymentModal,
      addCandidateEmploymentModal,
      addingEmail, 
      addSentimentModal,
      handleSentimentModal,

      addRemarksModal,
      documentUploadModal ,
      handleCandidateTrainingModal,
      addCandidateTrainingModal

    } = this.props;
    console.log(this.props.stageList);
    console.log("Detail11",this.props.candidateId)
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Feedback</span>
                  {activeKey === "1" && (
                    <>
                      {/* <Tooltip //title="Tag Remarks"
                        title={<FormattedMessage
                          id="app.tagremarks"
                          defaultMessage="tagremarks"
                        />} */}
                      
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                           tooltipTitle="Tag Feedback"
                           onClick={() => handleSentimentModal(true)}
                        />
                        {/* <AddSentimentModalModal

                        /> */}

                        {/* <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                      /> */}
                      {/* </Tooltip> */}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <RemarksTable 
                profileId={this.props.profileId} 
                stageList={this.props.stageList}
                />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <span>
                 
                    <FormattedMessage
                      id="app.sdcuments"
                      defaultMessage="Documents"
                    />
                  
                  </span>
                  {activeKey === "3" && (
                    <>
            
             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                        
                         
                          tooltipTitle="Tag Document"
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
                          size="1em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

               <AddDocumentModal
              documentUploadModal={documentUploadModal}
              handleDocumentUploadModal={handleDocumentUploadModal}
               />
                     
                    </>
                  )}
                </>
              }
              key="3"
            >
            

              <Suspense fallback={"Loading ..."}>
                 <LinkedDocuments candidate={this.props.candidate} /> 
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <i class="fa fa-graduation-cap"></i>
                    &nbsp;Education
                  </span>
                  {activeKey === "5" && (
                    <>
                      {addingEmail ? (
                        <></>
                      ) : (
                        <>
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Add"
                            handleIconClick={() =>
                              handleCandidateEducationModal(true)
                            }
                            size="1em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
                            }}
                          />
       
                        </>
                      )}
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEducationTable />
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <SubscriptionsIcon type="customer-service" />
                    Training
                  </span>
                  {activeKey === "6" && (
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle="Add"
                        handleIconClick={() =>
                          handleCandidateTrainingModal(true)
                        }
                        size="1em"
                        style={{ marginLeft:"0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateTrainingTable />
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span>
                    <BankOutlined type="bank" />
                   Employment
                  </span>
                  {activeKey === "7" && (
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle="Add"
                        handleIconClick={() =>
                          handleCandidateEmploymentModal(true)
                        }
                        size="1em"
                        style={{ marginLeft: "0.3125em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CandidateEmploymentTable />
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddCandidateEducationModal
            addCandidateEducationModal={addCandidateEducationModal}
            handleCandidateEducationModal={handleCandidateEducationModal}
          />
            <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                        candidateId={this.props.candidateId}
                      />
          <AddCandidateTrainingModal
            addCandidateTrainingModal={addCandidateTrainingModal}
            handleCandidateTrainingModal={handleCandidateTrainingModal}
          />
            <AddSentimentModal
            addSentimentModal={addSentimentModal}
            handleSentimentModal={handleSentimentModal}
            handleRemarksModal={handleRemarksModal}
          />
            <AddCandidateEmploymentModal
            addCandidateEmploymentModal={addCandidateEmploymentModal}
            handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          />
        </Suspense>
      </>
    );
  }
}
const mappropsToProps = ({ opportunity,candidate }) => ({
  addRemarksModal: opportunity.addRemarksModal,
  addSentimentModal:opportunity.addSentimentModal,
  documentUploadModal: opportunity.documentUploadModal,
  addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
  addCandidateTrainingModal: candidate.addCandidateTrainingModal,
  addCandidateEducationModal: candidate.addCandidateEducationModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       handleRemarksModal,
       handleSentimentModal,
       handleDocumentUploadModal,
       handleCandidateEducationModal,
       handleCandidateTrainingModal,
       handleCandidateEmploymentModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(RecruitmentDetailsTab);
