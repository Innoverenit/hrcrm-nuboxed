import React, { Component,Suspense,lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { handleCustomerDrawerModal } from "../Customer/CustomerAction";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../Components/UI/Antd";
const CustomerWordCloud =lazy(()=> import("./CustomerWordCloud"));
const CustomerDocumentView =lazy(()=> import("./CustomerDocumentView"));
const Customerbutton =lazy(()=> import("./Customerbutton"));
 
class AddCustomerDrawerModal extends Component {

 
  render() {
    const {
      customerDrawerProps: { name,  },
      handleCustomerDrawerModal,
      opportunityDrawerVisible
    } = this.props;
   
    return (
      <div className="pulse-background">
 <StyledDrawer 
          title={name}
          width={400}
          visible={this.props.addDrawerCustomerModal}
        onClose={() =>
          this.props.handleCustomerDrawerModal(this.props.customerDrawerProps, false)
        }
        
        >
          <Suspense fallback={<BundleLoader />}>

          <CustomerDocumentView
          customer={this.props.customerDrawerProps}
          />
          <CustomerWordCloud
          customer={this.props.customerDrawerProps}
          // customerKeySkill={this.props.customerKeySkill}
          />
          <Customerbutton
         
         
          />
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ customer }) => ({
  customerDrawerProps: customer.customerDrawerProps,
  addDrawerCustomerModal:customer.addDrawerCustomerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerDrawerModal);