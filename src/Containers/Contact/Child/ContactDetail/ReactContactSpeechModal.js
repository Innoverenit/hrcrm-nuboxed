import React from "react";
import { StyledModal } from "../../../../Components/UI/Antd";
import ReactContactSpeeech from "./ReactContactSpeeech"

const ReactContactSpeechModal = props => {
  const { addContactSpeechModal, handleContactReactSpeechModal } = props;
  console.log("speech",props.handleSetCurrentContactId);
  return (
    <>
      <StyledModal
        title="Click to start Recording"
        // title={<FormattedMessage
        //   id="app.linkdelivery"
        //   defaultMessage="Link Delivery"
        // />}
        width="40vw"
        visible={addContactSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{marginTop:"5rem"}}
        // mask={false}
        // zIndex={1002}
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleContactReactSpeechModal(false)}
        footer={null}
      >
        <ReactContactSpeeech
        contactId={props.contactId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
       
        />
      </StyledModal>
    </>
  );
};
export default ReactContactSpeechModal;
