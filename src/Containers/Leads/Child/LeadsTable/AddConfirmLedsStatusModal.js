import React, { Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import LeadsConfirmStatusForm from "./LeadsConfirmStatusForm";

const AddConfirmLedsStatusModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.convertasProspect"
          defaultMessage="Convert as Prospect"
        />}
        width={drawerWidth}
        visible={props.addLeadsConfirmationModal}
        onClose={() => props.handleLeadsConfirmationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* helooo */}
          <LeadsConfirmStatusForm  rowdata={props.rowdata}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

  
  export default AddConfirmLedsStatusModal;


