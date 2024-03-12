import React, { Component,lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const LinkedNotes = lazy(() => import("../OpportunityDetail/OpportunityTab/LinkedNotes"));

class AddOpportunityNotesDrawerModal extends Component {
  render() {
      console.log("data5", this.props.opportunityData.opportunityName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.opportunityData.opportunityName}
          width="64%"
          visible={this.props.addDrawerOpportunityNotesModal}
          onClose={() => this.props.handleOpportunityNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedNotes opportunityData={this.props.opportunityData} 
            opportunityId={this.props.opportunityData.opportunityId} 
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOpportunityNotesDrawerModal);
