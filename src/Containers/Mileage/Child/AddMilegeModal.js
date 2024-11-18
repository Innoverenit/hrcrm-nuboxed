import React, { lazy, Suspense } from "react";

import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const MileageForm=lazy(()=>import("./MileageForm"));

const AddMileageModal = (props) => {
  const { addMileageModal, handleMileageModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Add Voucher"
        width={drawerWidth}
        visible={addMileageModal}
        onClose={() => handleMileageModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddMileageModal;
