import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateEventForm = lazy(() => import("./UpdateEventForm"));
const UpdateEventModal = (props) => {
  const { updateEventModal, handleUpdateEventModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Update Event"
        width={drawerWidth}
        visible={updateEventModal}
        onClose={() => handleUpdateEventModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateEventForm {...formProps}
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateEventModal;
