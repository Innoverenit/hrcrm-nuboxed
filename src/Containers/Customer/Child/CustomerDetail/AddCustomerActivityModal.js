import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import ActivityForm from "../../../Activity/ActivityForm";
const TabPane = StyledTabs.TabPane;

const AddCustomerActivityModal = (props) => {
  const { callActivityModal, handleCallActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Schedule"    
        width={drawerWidth}
        visible={callActivityModal}
        onClose={() => handleCallActivityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <ActivityForm
           defaultValue={props.defaultValue}
           customerId={props. customerId }
           uniqueId={props.uniqueId}           
           name={props.name}
          customer={props.customer}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
 
};

export default AddCustomerActivityModal;
