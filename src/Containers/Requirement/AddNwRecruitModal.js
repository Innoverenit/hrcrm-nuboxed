import React, { useState, useEffect, lazy, Suspense} from "react";
import RecruitNwForm from "./RecruitNwForm";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";


const AddNwRecruitModal = (props) => {

   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
       
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
  return (
    <>
      <StyledDrawer
        title="Requirement"
        width="58%"
        visible={props.addNwRecruitModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleNwRecruitModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitNwForm
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddNwRecruitModal;
