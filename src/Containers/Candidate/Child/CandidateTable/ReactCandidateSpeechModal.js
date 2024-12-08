import React from "react";
import { StyledModal } from "../../../../Components/UI/Antd";
import CandidateReactSpeechForm from "../../../../Components/CandidateReactSpeech/CandidateReactSpeechForm";
const ReactCandidateSpeechModal = props => {
  const { addCandidateSpeechModal, handleCandidateReactSpeechModal } = props;
  console.log(props.candidate.candidateId);
  return (
    <>
      <StyledModal
        title="Click to start Recording"
      
        width="60%"
        visible={addCandidateSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{marginTop:"3rem"}}
        // mask={false}
        // zIndex={1002}
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleCandidateReactSpeechModal(false)}
        footer={null}
      >
        <CandidateReactSpeechForm
        candidate={props.candidate}
        />
      </StyledModal>
    </>
  );
};
export default ReactCandidateSpeechModal;
