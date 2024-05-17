import React, {  Suspense ,lazy} from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const StatusMileageForm = lazy(() => import("./StatusMileageForm"));



const StatusMileageDrawer = (props) => {
  const { updateStatusMileageModal, handleStatusMileageModal,voucherId, ...formProps } = props;
  console.log("voucherId",voucherId);
  return (
    <>
      <StyledDrawer
  title={`Status - ${voucherId}`}
        // title={<FormattedMessage
        //   id="app.applyforleaves"
        //   defaultMessage="Status "
        // />}
        width="60%"
        destroyOnClose
        closable
        visible={updateStatusMileageModal}
        onClose={() => handleStatusMileageModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <StatusMileageForm voucherId={voucherId} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default StatusMileageDrawer;
