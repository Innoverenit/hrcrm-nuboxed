import React, {  Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import LeadsSubscriptionForm from "../../Child/LeadsTable/LeadsSubscriptionForm"
;

const AddSubscriptionModal = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Subscription"
        width="60%"
        visible={props.addDrawerLeadsSubscriptionModal}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
       
        onClose={() => props.handleLeadsSubscriptionModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <LeadsSubscriptionForm
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        item={props.item}
       />
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddSubscriptionModal;

