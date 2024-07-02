import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const LeadsForm = lazy(() => import("../Child/LeadsForm"));
const TabPane = StyledTabs.TabPane;

class AddLeadsModal extends Component {
  render() {
    const { addLeadsModal, handleLeadsModal, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const handleClose = () => {
      window.location.reload(true);
    };
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.leads"
            defaultMessage="Add Leads"
          />}
          width={drawerWidth}
          destroyOnClose
          visible={addLeadsModal}
          onClose={() =>{
            // handleClose();
             handleLeadsModal(false)}}
        
        >
        <Suspense fallback={<BundleLoader />}>
          <LeadsForm 
 translateText={this.props.translateText}
 selectedLanguage={this.props.selectedLanguage}
translatedMenuItems={this.props.translatedMenuItems}
          />{" "}
        </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddLeadsModal;
