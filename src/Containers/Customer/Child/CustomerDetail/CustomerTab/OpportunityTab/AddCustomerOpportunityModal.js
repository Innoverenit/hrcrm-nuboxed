import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CustomerOpportunityForm = lazy(() => import("./CustomerOpportunityForm"));

const AddOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.quotation" defaultMessage="Quotation" />
        }
        width="60%"
        visible={props.addCustomerOpportunityModal}
        onClose={() => props.handleCustomerOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerOpportunityForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;
