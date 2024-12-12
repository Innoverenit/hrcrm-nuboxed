import React, { useState,  Suspense, useEffect } from 'react';
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import PlacementDetails from "./PlacementDetails"

const AddPlacementPulseModal = (props) => {
  


  return (
    <>
      <StyledDrawer
      title="Reamrk"  
        width="60%"
        visible={props.updatePlacementModal}
        onClose={() => props.handlePlacementPulseModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <PlacementDetails
                 candidateId={props.candidateId}
            stageList={props.stageList}
            profileId={props.profileId}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            />
          {/* <OpportunityStepper
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
          /> */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddPlacementPulseModal;
