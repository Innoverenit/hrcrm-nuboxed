import React, { lazy, Suspense } from "react";

import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateMileageForm=lazy(()=>import("./UpdateMileageForm"));

const UpdateMileageModal = (props) => {
  const { updateMileageModal, handleUpdateMileageModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Mileage"
        title="Mileage"
 
        width="70%"
        visible={updateMileageModal}
        onCancel={() => handleUpdateMileageModal(false)}

        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateMileageForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateMileageModal;
