import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const InvesterForm = lazy(() => import("./InvesterForm"));

const AddInvestorModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  const handleClose = () => {
    window.location.reload(true);
  };
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.investor"
          defaultMessage="Investor"
        />}
        width={drawerWidth}
        visible={props.addInvestorModal}
        onClose={() => {
          // handleClose();
          props.handleInvestorModal(false)}}
      >
        <Suspense fallback={<BundleLoader />}>
          <InvesterForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddInvestorModal;
