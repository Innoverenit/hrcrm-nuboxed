import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import StripeCheckoutForm from "./StripeCheckoutForm";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";

const StripePaymentModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Stripe"
        visible={props.addStripeModal}
        maskClosable={false}
        destroyOnClose
        onCancel={() => props.handleStripeModal(false)}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
         {/* <StripeCheckoutForm
            handleStripeModal={props.handleStripeModal}
           
          />  */}
          hii
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ leads, auth }) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StripePaymentModal)

