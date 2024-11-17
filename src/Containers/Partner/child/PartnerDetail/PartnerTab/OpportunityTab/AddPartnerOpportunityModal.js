import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const PartnerOpportunityForm = lazy(() => import("./PartnerOpportunityForm"));

const AddPartnerOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledModal
        // title="Opportunity"
        title={
          <FormattedMessage id="app.opportunity" defaultMessage="Opportunity" />
        }
        width="45%"
        visible={props.addPartnerOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handlePartnerOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <PartnerOpportunityForm {...formProps} />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddPartnerOpportunityModal;
