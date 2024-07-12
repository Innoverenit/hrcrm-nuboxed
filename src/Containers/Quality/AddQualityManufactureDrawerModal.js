import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
//import OpportunityInitiativeForm from "./OpportunityInitiativeForm";
import { bindActionCreators } from "redux";
import QualityManufacureList from "../Quality/QualityManufacureList"
//import OpportunityJumpstartBox from "../OpportunityTable/OpportunityJumpstartBox";
import { StyledDrawer } from "../../Components/UI/Antd";
// import OpportunitySummaryTable from "./OpportunitySummaryTable";
// import OpportunityForecastForm from "./Opportunityforecastform";

class AddQualityManufactureDrawerModal extends Component {
  render() {
    //console.log("dom", this.props.opportunityInitiativesSkillsDetails);

    return (
      <div>
        <StyledDrawer
          title="Manufacture"
          width="76em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addQualityManufactureDrawerModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleQualityManufactureModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
         <QualityManufacureList
           currentManufacture={this.props.currentManufacture}
         />
          
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQualityManufactureDrawerModal);
