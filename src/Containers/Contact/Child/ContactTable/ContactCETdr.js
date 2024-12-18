import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";

import ActivityForm from "../../../Activity/ActivityForm";



const TabPane = StyledTabs.TabPane;

const ContactCETdr = (props) => {
  const { clickCETcontactActivity, handleCETactivityContactModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";

  return (
    <>
      <StyledDrawer
        title="Schedule"
       
        width={drawerWidth}
        visible={props.callActivityModal}
        onClose={() => props.handleCallActivityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <ActivityForm
          contact={props.contact}
          type={props.type}
          //  defaultValue={props.defaultValue}
          //  customerId={props. customerId }
          //  uniqueId={props.uniqueId}
           
          //  name={props.name}
          // customer={props.customer}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
          {/* <ContactActivityTab currentContact={props.currentContact}/> */}

        </Suspense>
      </StyledDrawer>
    </>
  );
 
};

export default ContactCETdr;
