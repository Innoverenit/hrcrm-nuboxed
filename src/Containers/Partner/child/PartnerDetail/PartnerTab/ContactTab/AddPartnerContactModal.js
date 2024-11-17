import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const PartnerContactForm = lazy(() => import("./PartnerContactForm"));

const AddContactModal = (props) => {
  const {
    addPartnerContactModal,
    handlePartnerContactModal,
    ...formProps
  } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.contact" defaultMessage="Contact" />}
        width="55%"
        visible={addPartnerContactModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handlePartnerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <PartnerContactForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactModal;
