import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import OrderAddedList from "./OrderAddedList"
import { StyledDrawer } from "../../../../Components/UI/Antd";

 
class OrdersAddedModal extends Component {

 
  render() {
    // const {
    //   customerDrawerProps: { name,  },
    //   handleCustomerDrawerModal,
    //   opportunityDrawerVisible
    // } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title="Orders Added"
          width="90em"
          destroyOnClose
          closable
          visible={this.props.orderAddedModal}
        onClose={() =>
          this.props.handleOrderAddedModal(this.props.customerDrawerProps, false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>
<OrderAddedList/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersAddedModal);