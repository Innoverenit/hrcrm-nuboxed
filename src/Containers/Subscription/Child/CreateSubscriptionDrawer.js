import React, { lazy, Component,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
// const EmployeeForm = lazy(() => import("../Child/EmployeeForm"));

class CreateSubscriptionDrawer extends Component {
  render() {
    const { createSubscriptiondrawer, handleCreateSubscriptionDrawer, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.subscription"
            defaultMessage="Subscription"
          />}

          width={drawerWidth}
          visible={createSubscriptiondrawer}
          onClose={() => handleCreateSubscriptionDrawer(false)}
          footer={null}
        >

              
                <Suspense fallback={<BundleLoader/>}>
               hello
                </Suspense>
      

        </StyledDrawer>
      </>
    );
  }
}

export default CreateSubscriptionDrawer;
