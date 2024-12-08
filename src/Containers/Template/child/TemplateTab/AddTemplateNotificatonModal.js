import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
const NotificationForm = lazy(() => import("../TemplateTab/Template/NotificationForm"));

const AddTemplateNotificatonModal = (props) => {
  return (
    <>
      <StyledDrawer
        //title="Template"
        title="Notificaton"
      
        width="60%"
        visible={props.addTemplateNotificatonModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "3rem" }}
        onClose={() => props.handleTemplateNotificatonModal(false)}
        footer={null}
      >
         
          <>
            <Suspense fallback={<BundleLoader />}>
              <NotificationForm />
            </Suspense>
          </>
  
  
      </StyledDrawer>
    </>
  );
};

export default AddTemplateNotificatonModal;
