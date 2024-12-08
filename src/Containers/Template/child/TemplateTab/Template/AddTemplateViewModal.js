import React, {  Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import TemplateView from "./TemplateView";

const AddTemplateViewModal = props => {
  const { templateViewModal, handleTemplateViewModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
         title="Template"
       
        width="60%"
        visible={templateViewModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "3rem" }}
        onClose={() => handleTemplateViewModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
              <TemplateView
              templateId={props.templateId}
              template={props.template}
              type={props.type}
              currentEmail={props.currentEmail}
            />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddTemplateViewModal;
