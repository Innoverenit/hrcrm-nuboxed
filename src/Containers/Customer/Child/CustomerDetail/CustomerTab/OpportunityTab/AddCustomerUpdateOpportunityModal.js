import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const UpdateCustomerOpportunityForm = lazy(() => import("./UpdateCustomerOpportunityForm"));

const AddCustomerUpdateOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.updateQuotation" defaultMessage="Update Quotation" />
        }
        width="60%"
        visible={props.addUpdateCustomerOpportunityModal}
        onClose={() => props.handleUpdateCustomerOpportunityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerOpportunityForm opportunityId={props.opportunityId} {...formProps}/> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerUpdateOpportunityModal;
