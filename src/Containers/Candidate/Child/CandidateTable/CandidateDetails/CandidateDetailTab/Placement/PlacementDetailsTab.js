import React, { Component, Suspense } from "react";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
import RemarksTable from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/RemarksTable";
 import { handleRemarksModal, } from "../../../../../../Opportunity/OpportunityAction";
import AddRemarksModal from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/AddRemarksModal";

const TabPane = StyledTabs.TabPane;
class PlacementDetailsTab extends Component {
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
      addRemarksModal
     

    } = this.props;
    // console.log(this.props.stageList);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>Remarks</span>
                  {activeKey === "1" && (
                    <>
                    
                      
                        <BorderColorIcon
                         
                           tooltipTitle="Tag Remarks"
                           onClick={() => handleRemarksModal(true)}                         
                           className=" !text-red-600 cursor-pointer !text-icon "
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

                        <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                         handleRemarksModal={handleRemarksModal}
                         stageList={this.props.stageList}
                        // profileId={this.props.profileId}
                      />
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
                />
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
    
      </>
    );
  }
}
const mappropsToProps = ({ opportunity,candidate }) => ({
   addRemarksModal: opportunity.addRemarksModal,
//   documentUploadModal: opportunity.documentUploadModal,
//   addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
//   addCandidateTrainingModal: candidate.addCandidateTrainingModal,
//   addCandidateEducationModal: candidate.addCandidateEducationModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       handleRemarksModal,
    //    handleDocumentUploadModal,
    //    handleCandidateEducationModal,
    //    handleCandidateTrainingModal,
    //    handleCandidateEmploymentModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(PlacementDetailsTab);
