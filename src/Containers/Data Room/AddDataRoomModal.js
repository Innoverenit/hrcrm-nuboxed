import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer, StyledTabs } from "../../Components/UI/Antd";
import DataRooForm from "./DataRooForm";
const TabPane = StyledTabs.TabPane;

class AddDataRoomModal extends Component {
  render() {
    const { addDataroomModal, handleDataroomModal, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const handleClose = () => {
      window.location.reload(true);
    };
    return (
      <>
        <StyledDrawer
          title="Data Room"
          width={drawerWidth}
          destroyOnClose
          visible={addDataroomModal}
          onClose={() =>{
            // handleClose();
            handleDataroomModal(false)}}
        
        >
        <Suspense fallback={<BundleLoader />}>
          <DataRooForm
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
export default AddDataRoomModal;
