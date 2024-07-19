import React, { Suspense,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationForm=lazy(()=> import("./LocationForm"));


const AddMileageModal = (props) => {
  const { addlocationModal, handleLocationModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.addLocations"
          defaultMessage="Add Locations"
        />}
        width={drawerWidth}
        visible={addlocationModal}
        onClose={() => handleLocationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationForm 
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddMileageModal;
