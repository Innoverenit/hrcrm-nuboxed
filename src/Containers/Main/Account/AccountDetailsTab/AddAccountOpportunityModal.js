import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AccountOpportunityForm from "./AccountOpportunityForm";
import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AddAccountOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.quotation" defaultMessage="Quotation" />
        }
        width="80%"
        visible={props.addAccountOpportunityModal}
        onClose={() => props.handleAccountOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOpportunityStepper {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddAccountOpportunityModal;
