import React, { Suspense,lazy } from "react";

import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import PromotionForm from "./PromotionForm";



const AddpromotionModal = (props) => {
  const { addingpromotionModal, handlePromotionsDrawer, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "50%";
  return (
    <>
      <StyledDrawer
        title="Promotion"
        width={drawerWidth}
        visible={addingpromotionModal}
        onClose={() => handlePromotionsDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <PromotionForm 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddpromotionModal;
