import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const AddPartnerForm=lazy(()=>import ("./AddPartnerForm"));

const AddPartnerModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.vendor"
          defaultMessage="Vendor"
        />}
        width="60%"
        height="50%"
        visible={props.addPartnerModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handlePartnerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AddPartnerForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddPartnerModal;
