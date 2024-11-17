import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
const TemplateForm = lazy(() => import("./TemplateForm"));


const AddTemplateModal = (props) => {
  return (
    <>
      <StyledDrawer
        //title="Template"
        title={<FormattedMessage
          id="app.Template"
          defaultMessage="Template"
        />}
        width="60%"
        visible={props.addTemplateModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "3rem" }}
        onClose={() => props.handleTemplateModal(false)}
        footer={null}
      >
         
          <>
            <Suspense fallback={<BundleLoader />}>
              <TemplateForm />
            </Suspense>
          </>
  
  
      </StyledDrawer>
    </>
  );
};

export default AddTemplateModal;
