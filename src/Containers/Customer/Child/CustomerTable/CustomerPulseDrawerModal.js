import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const CustomerPulseJumpstart =lazy(()=> import("./CustomerPulseJumpstart"));



class CustomerPulseDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="65%"
          destroyOnClose
          closable
          visible={this.props.addDrawerCustomerPulseModal}
          onClose={() => this.props.handleCustomerPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <CustomerPulseJumpstart 
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
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
)(CustomerPulseDrawerModal);
