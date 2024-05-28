import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import OrderOpenList from "./OrderOpenList"
// import OrderClosedList from "./OrderClosedList"
// import OrderCancelled from "./OrderCancelled"
// import OrderAddedList from "./OrderAddedList"
import { StyledDrawer } from "../../../../Components/UI/Antd";

 
class OrdersOpenModal extends Component {

 
  render() {
    // const {
    //   customerDrawerProps: { name,  },
    //   handleCustomerDrawerModal,
    //   opportunityDrawerVisible
    // } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title="Orders Closed"
          width="90em"
          destroyOnClose
          closable
          visible={this.props.orderOpenModal}
        onClose={() =>
          this.props.handleOrderOpenModal(this.props.customerDrawerProps, false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>
{/* <OrderAddedList/> */}
{/* <OrderCancelled/> */}
{/* <OrderClosedList/> */}
<OrderOpenList/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersOpenModal);