import React, { lazy, Component,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";

import { BundleLoader } from "../../../Components/Placeholder";
const EmployeeForm = lazy(() => import("../Child/EmployeeForm"));

class AddEmployeeModal extends Component {
  render() {
    const { addEmployeeModal, handleEmployeeModal, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "50%";
    return (
      <>
        <StyledDrawer
          title="New Joinee"
       
          width={drawerWidth}
          visible={addEmployeeModal}
          onClose={() => handleEmployeeModal(false)}
          footer={null}
        >

              <div class="mt-5 ">
                <Suspense fallback={<BundleLoader/>}>
                <EmployeeForm
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage} />
                </Suspense>
              </div>

        </StyledDrawer>
      </>
    );
  }
}

export default AddEmployeeModal;
