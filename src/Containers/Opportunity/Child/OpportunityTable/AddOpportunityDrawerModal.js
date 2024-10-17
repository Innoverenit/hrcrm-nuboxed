import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import OpportunityInitiativeForm from "./OpportunityInitiativeForm";
import { bindActionCreators } from "redux";
import OpportunityJumpstartBox from "../OpportunityTable/OpportunityJumpstartBox";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import OpportunityForecastForm from "./Opportunityforecastform";

class AddOpportunityDrawerModal extends Component {
  render() {
    console.log("dom", this.props.opportunityInitiativesSkillsDetails);

    return (
      <div>
        <StyledDrawer
          title={this.props.opportunityName}
          width="60%"
          visible={this.props.addDrawerOpportunityModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleOpportunityDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <OpportunityJumpstartBox
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}
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
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
              opportunityInitiativesSkillsDetails={
                this.props.opportunityInitiativesSkillsDetails
              }
              opportunitySkills={this.props.opportunitySkills}
              item={this.props.item}
            />
            <OpportunityForecastForm
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.props.translatedMenuItems}
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
