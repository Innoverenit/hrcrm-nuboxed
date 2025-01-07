import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const UpdateEmployeeForm =lazy(()=>import("./UpdateEmployeeForm"));

const UpdateEmployeeModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateEmployeeModal, handleUpdateEmployeeModal,currentEmployeeId, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={currentEmployeeId.fullName}
        width={drawerWidth}
        visible={updateEmployeeModal}
        closable
        destroyOnClose
        onClose={() =>handleUpdateEmployeeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateEmployeeForm 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
             currentEmployeeId={currentEmployeeId}
             userData={props.userData}
             translatedMenuItems={props.translatedMenuItems}
            />
    </Suspense>
      </StyledDrawer>
    </>
  );
};



export default UpdateEmployeeModal;

