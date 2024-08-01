import React, { Component,lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import MainNotes from "../../../CustomNote/MainNotes";


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
          destroyOnClose
          closable
          placement="right"
          onClose={() => this.props.handleOpportunityNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           
             <MainNotes
             type="opportunity"
             uniqueId={this.props.opportunityData.opportunityId}
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
