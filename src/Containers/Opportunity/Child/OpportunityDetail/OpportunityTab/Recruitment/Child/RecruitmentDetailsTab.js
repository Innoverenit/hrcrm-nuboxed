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
// const AddCandidateEducationModal = lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Education/AddCandidateEducationModal"));
// const AddCandidateTrainingModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Training/AddCandidateTrainingModal"));
// const AddCandidateEmploymentModal =lazy(()=>import("../../../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateDetailTab/Employment/AddCandidateEmploymentModal"));
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
                     
                      
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                           tooltipTitle="Tag Feedback"
                           onClick={() => handleSentimentModal(true)}
                        />
                       
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

           
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        {/* <AddCandidateEducationModal
            addCandidateEducationModal={addCandidateEducationModal}
            handleCandidateEducationModal={handleCandidateEducationModal}
          /> */}
            <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                        handleRemarksModal={handleRemarksModal}
                        stageList={this.props.stageList}
                        profileId={this.props.profileId}
                        candidateId={this.props.candidateId}
                      />
          {/* <AddCandidateTrainingModal
            addCandidateTrainingModal={addCandidateTrainingModal}
            handleCandidateTrainingModal={handleCandidateTrainingModal}
          /> */}
            <AddSentimentModal
            addSentimentModal={addSentimentModal}
            handleSentimentModal={handleSentimentModal}
            handleRemarksModal={handleRemarksModal}
          />
            {/* <AddCandidateEmploymentModal
            addCandidateEmploymentModal={addCandidateEmploymentModal}
            handleCandidateEmploymentModal={handleCandidateEmploymentModal}
          /> */}
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
