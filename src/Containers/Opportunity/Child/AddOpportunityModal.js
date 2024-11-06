import React, { useState,  Suspense, useEffect } from 'react';
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import OpportunityForm from "./OpportunityForm";

const AddOpportunityModal = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addOpportunityModal, handleOpportunityModal, ...formProps } = props;

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [ 
         "213", //  Quotation",//0
         
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
        width="60%"
        visible={addOpportunityModal}
        onClose={() => handleOpportunityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <OpportunityForm {...formProps}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}/>
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

export default AddOpportunityModal;
