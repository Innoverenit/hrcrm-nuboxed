import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
import { handleProcessModal } from "../SettingsAction";

const ProcessFormForRecruit = lazy(() => import("./ProcessFormForRecruit"));

const AddProcessModal = (props) => {
  const { addProcessModal, handleProcessModal, ...formProps } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        // title="Workflow"
        title={<FormattedMessage
          id="app.workflow"
          defaultMessage="Workflow"
        />}
        width="30%"
        visible={props.addProcessModal}
        maskClosable={false}
        destroyOnClose
        style={{ top: 40 }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => props.handleProcessModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProcessFormForRecruit {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addProcessModal: settings.addProcessModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleProcessModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddProcessModal);
