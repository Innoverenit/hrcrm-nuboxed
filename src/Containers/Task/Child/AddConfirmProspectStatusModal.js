import React, { Suspense ,lazy} from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ProspectConfirmStatusForm = lazy(() => import("./ProspectConfirmStatusForm"));
const AddConfirmProspectStatusModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.convertasCustomer"
          defaultMessage="Convert as Customer"
        />}
        width={drawerWidth}
        visible={props.addProspectConfirmationModal}
        onClose={() => props.handleProspectConfirmationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* helooo */}
          <ProspectConfirmStatusForm  rowdata={props.rowdata}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

  
  export default AddConfirmProspectStatusModal;


