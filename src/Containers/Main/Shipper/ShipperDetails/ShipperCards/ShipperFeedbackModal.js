import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledModal } from "../../../../../Components/UI/Antd";
const FeedBackFrom = lazy(() => import("./FeedBackFrom"));

const ShipperFeedbackModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title={<FormattedMessage id="app.feedback" defaultMessage="Feedback"/>}
        width="55vw"
        visible={props.feedbackModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleFeedbackModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <FeedBackFrom />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default ShipperFeedbackModal;
