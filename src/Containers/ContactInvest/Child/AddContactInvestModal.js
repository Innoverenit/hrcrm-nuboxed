import React, { useState, lazy, Suspense, useEffect } from 'react';
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactInvestForm = lazy(() => import("./ContactInvestForm"));

function AddContactInvestModal (props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [setLoading] = useState(true);
  const { addContactInvestModal, handleContactInvestModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [ 
           "517", //  ContactInvest",//0
           
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
        visible={addContactInvestModal}
        closable
        destroyOnClose
        onClose={() => handleContactInvestModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactInvestForm {...formProps} 
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactInvestModal;
