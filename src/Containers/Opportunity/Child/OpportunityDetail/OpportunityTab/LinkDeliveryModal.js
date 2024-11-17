import React from "react";
import { StyledModal } from "../../../../../Components/UI/Antd";
import LinkDeliveryForm from "./LinkDeliveryForm";


const LinkDeliveryModal = props => {
  const { visible, handleLinkDeliveryModal } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        //title="Link Delivery"
        title={<FormattedMessage
          id="app.linkdelivery"
          defaultMessage="Link Delivery"
        />}
        width="40vw"
        visible={visible}
        maskClosable={false}
        destroyOnClose
        style={{ top: 40 }}
        // mask={false}
        // zIndex={1002}
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleLinkDeliveryModal(false)}
        footer={null}
      >
        <LinkDeliveryForm />
      </StyledModal>
    </>
  );
};
export default LinkDeliveryModal;
