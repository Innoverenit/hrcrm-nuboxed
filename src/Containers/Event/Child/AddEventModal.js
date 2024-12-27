import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const EventForm = lazy(() => import("./EventForm"));
const AddEventModal = (props) => {
  const { addEventModal, handleEventModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "50%";
  return (
    <>
      <StyledDrawer
        title="Schedule Event"
        width={drawerWidth}
        visible={addEventModal}
        onClose={() => handleEventModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <EventForm {...formProps}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}  />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddEventModal;
