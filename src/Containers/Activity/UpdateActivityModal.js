import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
import UpdateActivityForm from "./UpdateActivityForm"

//import AccountOpportunityStepper from "./AccountOpportunityStepper";

const UpdateActivityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
       title="Notes"
        width="75%"
        destroyOnClose
        visible={props.addActivityUpdateModal}
        onClose={() => props.handleActivityUpdateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
    <UpdateActivityForm
      uniqueId={props.uniqueId}
      selectedStatus={props.selectedStatus}
      type={props.type}
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
    />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateActivityModal;
