import React, { Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import LeadsOpportunityForm from "./LeadsOpportunityForm";

const AddLeadsOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Opportunity"
        width="45%"
        visible={props.addLeadsOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleLeadsOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsOpportunityForm 
        leadsId={props.lead.leadsId}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddLeadsOpportunityModal;
