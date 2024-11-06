import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
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
  console.log(props.opportunityId)
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="60%"
        visible={addCustomerContactModal}
        onClose={() => handleCustomerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerContactForm {...formProps} 
          customer={props.customer}
          customerId={props.customerId}
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
