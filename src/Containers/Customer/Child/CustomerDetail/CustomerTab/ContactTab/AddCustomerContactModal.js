import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {handleCustomerContactModal} from "../../../../CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CustomerContactForm = lazy(() =>
  import("../ContactTab/CustomerContactForm")
);

const AddCustomerContactModal = (props) => {
  const {
    addCustomerContactModal,
    handleCustomerContactModal,
    ...formProps
  } = props;
  console.log(props.customerId)
  return (
    <>
      <StyledDrawer
      title="Contact"
        // title={`${props.translatedMenuItems[1]}`}
        width="50%"
        visible={addCustomerContactModal}
        onClose={() => handleCustomerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerContactForm {...formProps} 
          name={props.name}
          customer={props.customer}
          customerId={props.customerId}
          id={props.id}
          opportunityId={props.opportunityId}
          investorId={props.investorId}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ customer}) => ({
  addCustomerContactModal:customer.addCustomerContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCustomerContactModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerContactModal);
