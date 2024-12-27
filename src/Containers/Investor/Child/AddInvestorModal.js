import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const InvesterForm = lazy(() => import("./InvesterForm"));

const AddInvestorModal = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "50%";
  const handleClose = () => {
    window.location.reload(true);
 
  };
     useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [ 
           "511", //  investor",//0
           
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
  return (
    <>
      <StyledDrawer
           title={translatedMenuItems[0]}  
        width={drawerWidth}
        visible={props.addInvestorModal}
        onClose={() => {
          // handleClose();
          props.handleInvestorModal(false)}}
      >
        <Suspense fallback={<BundleLoader />}>
          <InvesterForm    
     translateText={props.translateText}
     selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddInvestorModal;
