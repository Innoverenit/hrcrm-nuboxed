import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import CustrOpenOpportunityJumpstartCardList from "./CustrOpenOpportunityJumpstartCardList";

class AddCustomerOpenOppJumpstartModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Sales"
           title={this.props.customer.name}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addCustomerOpenOppJumpstartModal}
          onClose={() => this.props.handleCustomerOpenOpportunityJumpstartModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <CustrOpenOpportunityJumpstartCardList 
          customer={this.props.customer} 
           
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
)(AddCustomerOpenOppJumpstartModal);
