import React, { Suspense,lazy } from "react";
import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationForm=lazy(()=> import("./LocationForm"));
const AddMileageModal = (props) => {
  const { addlocationModal, handleLocationModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "50%";
  return (
    <>
      <StyledDrawer
        title="Add Locations"
     
        width={drawerWidth}
        visible={addlocationModal}
        onClose={() => handleLocationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationForm 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddMileageModal;