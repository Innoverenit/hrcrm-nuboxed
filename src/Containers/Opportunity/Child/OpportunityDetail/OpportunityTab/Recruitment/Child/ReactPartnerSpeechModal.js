import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import PartnerReactSpeechForm from "../../../../../../../Components/PartnerSpeech/PartnerSpeechForm";
import { handlePartnerReactSpeechModal } from "../../../../../../Partner/PartnerAction";
const ReactPartnerSpeechModal = props => {
  const { addPartnerSpeechModal,handlePartnerReactSpeechModal } = props;
  console.log(props);
  return (
    <>
      <StyledDrawer
        title="Click to start Recording"
        width="40vw"
        visible={addPartnerSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{marginTop:"5rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handlePartnerReactSpeechModal(false)}
        footer={null}
      >
         <Suspense fallback={<BundleLoader />}>
        <PartnerReactSpeechForm
        partnerId={props. partnerId}
        />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default ReactPartnerSpeechModal;
