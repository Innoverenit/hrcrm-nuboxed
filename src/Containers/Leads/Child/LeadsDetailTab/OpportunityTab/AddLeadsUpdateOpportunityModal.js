import React, { Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import UpdateLeadsOpportunityForm from "./UpdateLeadsOpportunityForm";

const AddLeadsUpdateOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Update Opportunity" 
        width="45%"
        visible={props.addUpdateLeadsOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"5rem" }}
        onClose={() => props.handleUpdateLeadsOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeadsOpportunityForm leadsId={props.leadsId} /> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddLeadsUpdateOpportunityModal;
