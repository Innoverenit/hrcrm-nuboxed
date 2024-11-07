import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {handleInvestorContactModal} from "../../../../InvestorAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const InvestorContactForm = lazy(() =>
  import("./InvestorContactForm")
);

const AddInvestorContactModal = (props) => {
  const {
    openInvestorContactModal,
    handleInvestorContactModal,
    investorDetails,
    ...formProps
  } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contact"
          defaultMessage="Contact"
        />}
        width="60%"
        visible={openInvestorContactModal}
        closable
        maskClosable={false}
        destroyOnClose
        onClose={() => handleInvestorContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <InvestorContactForm 
          id={props.id}  
          investorDetails={investorDetails} {...formProps} />{" "}
    
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ investor}) => ({
  openInvestorContactModal:investor.openInvestorContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleInvestorContactModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddInvestorContactModal);
