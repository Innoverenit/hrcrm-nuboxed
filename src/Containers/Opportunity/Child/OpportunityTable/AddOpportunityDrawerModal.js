import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import OpportunityInitiativeForm from "./OpportunityInitiativeForm";
import { bindActionCreators } from "redux";
import OpportunityJumpstartBox from "../OpportunityTable/OpportunityJumpstartBox";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import OpportunitySummaryTable from "./OpportunitySummaryTable";
import OpportunityForecastForm from "./Opportunityforecastform";

class AddOpportunityDrawerModal extends Component {
  render() {
    console.log("dom", this.props.opportunityInitiativesSkillsDetails);

    return (
      <div>
        <StyledDrawer
          title={this.props.opportunityName}
          width="55em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerOpportunityModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleOpportunityDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <OpportunityJumpstartBox
              allRecruitmentByOppId={this.props.allRecruitmentByOppId}
              allRecruitmentPositionFilledByOppId={
                this.props.allRecruitmentPositionFilledByOppId
              }
              allRecruitmentAvgTimeByOppId={
                this.props.allRecruitmentAvgTimeByOppId
              }
              allRecruitmentPositionByOppId={
                this.props.allRecruitmentPositionByOppId
              }
            />
            <OpportunityInitiativeForm
              opportunityInitiativesSkillsDetails={
                this.props.opportunityInitiativesSkillsDetails
              }
              opportunitySkills={this.props.opportunitySkills}
              item={this.props.item}
            />

            <OpportunitySummaryTable
              allRecruitmentDetailsByOppId={
                this.props.allRecruitmentDetailsByOppId
              }
              opportunityId={this.props.opportunityId}
            />
            <OpportunityForecastForm
              item={this.props.item}
              opportunityForecast={this.props.opportunityForecast}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
  opportunityId: opportunity.opportunity.opportunityId,
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOpportunityDrawerModal);
