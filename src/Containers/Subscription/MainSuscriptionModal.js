import React, { Suspense,lazy } from "react";
import { StyledDrawer, } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import AddSuscriptionForm from "./AddSuscriptionForm";




const MainSuscriptionModal = (props) => {
  const { addingSuscrpitionModal, handleSuscrptionModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Add Suscrption"
        width={drawerWidth}
        visible={addingSuscrpitionModal}
        onClose={() => handleSuscrptionModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <AddSuscriptionForm 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MainSuscriptionModal;
