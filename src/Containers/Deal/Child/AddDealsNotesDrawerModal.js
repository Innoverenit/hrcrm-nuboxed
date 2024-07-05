import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import MainNotes from "../../CustomNote/MainNotes";

class AddDealsNotesDrawerModal extends Component {
  render() {
     

    return (
      <div>
        <StyledDrawer
          title={this.props.currentItem.opportunityName}
          width="60%"
          visible={this.props.addDrawerDealsNotesModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleDealsNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
             <MainNotes
             type="deals"
             uniqueId={this.props.currentItem.invOpportunityId}
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
)(AddDealsNotesDrawerModal);
