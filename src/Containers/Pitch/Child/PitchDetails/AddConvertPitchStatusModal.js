import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const PitchConvertStatusForm =lazy(()=>import("./PitchConvertStatusForm"));

const AddConvertPitchStatusModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.convertasInvestor"
          defaultMessage="Convert as Investor"
        />}
        width={drawerWidth}
        visible={props.addPitchConvertModal}
        closable
        destroyOnClose
        onClose={() => props.handlePitchConvertModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* helooo */}
          <PitchConvertStatusForm  rowdata={props.rowdata}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

  
  export default AddConvertPitchStatusModal;


