import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import NotificationTab from "./NotificationTab";

const Notificationdrawermodal = props => {
  // const { handlenotificationdrawer, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Notification"    
        width="35%"
        visible={props.Notificationdrawermodal}
        onClose={() => props.handlenotificationdrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <NotificationTab/>
          {/* hello */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default Notificationdrawermodal;
