import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import OppPulseData from "../OpportunityTable/OppPulseData"
//const EmailForm = lazy(() => import("../Email/EmailForm"));

class AddOppPulseModal extends Component {
  render() {
    //const { addEmailModal, handleEmailModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Pulse"
          width="60%"
          visible={this.props.updatePulseModal}
          onClose={() => this.props.handleOpportunityPulseModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <OppPulseData 
            />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddOppPulseModal;
