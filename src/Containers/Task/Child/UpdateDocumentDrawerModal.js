import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import UpdateImportForm from "../Child/UpdateImportForm"
import { StyledDrawer } from "../../../Components/UI/Antd";
//const FeedBackFrom = lazy(() => import("./FeedBackFrom"));

const UpdateDocumentDrawerModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Add Document"
        width="55vw"
        visible={props.addUpdatedocumentTaskModal}
        closable
        placement="right"
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleUpdateDocumentDrawerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <FeedBackFrom /> */}
         <UpdateImportForm
          currentNameId={props.currentNameId}
         />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateDocumentDrawerModal;
