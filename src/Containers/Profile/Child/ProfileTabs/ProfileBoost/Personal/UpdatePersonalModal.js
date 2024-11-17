import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const UpdatePersonalForm = lazy(() => import("../Personal/UpdatePersonalForm"));
class UpdatePersonalModal extends Component {
  render() {
    const {
      updatePersonalModal,
      handleUpdatePersonalModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Emergency Contact "
          title={
            <FormattedMessage
              id="app.emergencycontact"
              defaultMessage="Emergency Contact"
            />
          }
          width="35%"
          visible={updatePersonalModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdatePersonalModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdatePersonalForm 
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdatePersonalModal;
