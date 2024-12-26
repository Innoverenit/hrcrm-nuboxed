import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CustomerForm = lazy(() => import("./CustomerForm"));

const AddCustomerModal = (props) => {
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
           "97", //  prospect",//0
           
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
        visible={props.addCustomerModal}
        destroyOnClose
        onClose={() => {
          // handleClose();
        
          props.handleCustomerModal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerModal;
