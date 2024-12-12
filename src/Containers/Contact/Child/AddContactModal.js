import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactForm = lazy(() => import("./ContactForm"));

const AddContactModal = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "50%";
  const { addContactModal, handleContactModal, ...formProps } = props;
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [ 
         "73", //  Contact",//0
         
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
        destroyOnClose
        visible={addContactModal}
        onClose={() => handleContactModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactForm {...formProps}
          
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactModal;
