import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import CustomerAddedList from "./CustomerAddedList";

 
class CustomerAddedModal extends Component {

 
  render() {
    // const {
    //   customerDrawerProps: { name,  },
    //   handleCustomerDrawerModal,
    //   opportunityDrawerVisible
    // } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title="Customer Added"
          width="80rem"
          destroyOnClose
          closable
          visible={this.props.customerAddedModal}
        onClose={() =>
          this.props.handleCustomerAddedModal(false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>
<CustomerAddedList/>
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
//   customerDrawerProps: customer.customerDrawerProps,
//   addDrawerCustomerModal:customer.addDrawerCustomerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   handleCustomerDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddedModal);