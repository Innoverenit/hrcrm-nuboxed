import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import CustomerAddedList from "./CustomerAddedList";
import ContactAddedList from "./ContactAddedList";

 
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
          title="Contact Added"
          width="80rem"
          destroyOnClose
          closable
          visible={this.props.contactAddedModal}
        onClose={() =>
          this.props.handleContactAddedModal(false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>
<ContactAddedList/>
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