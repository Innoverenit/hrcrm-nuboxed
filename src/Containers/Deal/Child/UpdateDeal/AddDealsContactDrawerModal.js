import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import LinkedDealContact from "./LinkedDealContact";
class AddDealsContactDrawerModal extends Component {
  render() {
     

    return (
      <div>
        <StyledDrawer
          title={this.props.currentItem.opportunityName}
          width="65%"
          visible={this.props.addDrawerDealsContactsModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleDealContactsDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedDealContact currentItem={this.props.currentItem} 
            invOpportunityId={this.props.currentItem.invOpportunityId} 
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
)(AddDealsContactDrawerModal);
