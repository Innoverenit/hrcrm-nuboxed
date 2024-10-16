import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AddAccountOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.quotation" defaultMessage="Quotation" />
        }
        width="90%"
        visible={props.addAccountOpportunityModal}
        onClose={() => props.handleAccountOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOpportunityStepper {...formProps}     RowData={props.RowData}    distributorId={props.RowData.distributorId}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddAccountOpportunityModal;
