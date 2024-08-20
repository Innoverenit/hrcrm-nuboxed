import React from "react";
import { StyledModal } from "../../../../../Components/UI/Antd";
import ReactSpeeech from "../../../../../Components/ReactSpeech/ReactSpeech"

const ReactSpeechModal = props => {
  const { addSpeechModal, handleReactSpeechModal } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        title="Click to start Recording"
        width="40vw"
        visible={addSpeechModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleReactSpeechModal(false)}
        footer={null}
      >
        <ReactSpeeech
        opportunityId={props.opportunityId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
        />
      </StyledModal>
    </>
  );
};
export default ReactSpeechModal;
