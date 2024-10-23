import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateInvestorForm = lazy(() => import("./UpdateInvestorForm.js"));

const UpdateInvestorModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateInvestorModal, handleUpdateInvestorModal,RowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={RowData.name}
        width={drawerWidth}
        visible={updateInvestorModal}
        onClose={() => handleUpdateInvestorModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateInvestorForm RowData={RowData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};


export default UpdateInvestorModal;

