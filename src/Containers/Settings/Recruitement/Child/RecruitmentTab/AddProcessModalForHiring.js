import React, {  Suspense,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { handleProcessHiringModal } from "../../../SettingsAction";
const ProcessFormForHiring = lazy(() => import("./ProcessFormForHiring"));

const AddProcessModalForHiring = (props) => {
  const { addProcessHiringModal, handleProcessHiringModal, ...formProps } = props;
  console.log(props);
  return (
    <>
      <StyledDrawer
        title="Workflow"
       
        width="60%"
        visible={props.addProcessHiringModal}
        maskClosable={false}
        destroyOnClose
        style={{ marginTop: "3rem" }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleProcessHiringModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProcessFormForHiring {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addProcessHiringModal: settings.addProcessHiringModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleProcessHiringModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddProcessModalForHiring);
