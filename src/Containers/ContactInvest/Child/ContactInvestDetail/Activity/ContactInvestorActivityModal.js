import React, { lazy, Suspense,useEffect,useState } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
const ActivityForm  =lazy(()=>import("../../../../Activity/ActivityForm"));

const TabPane = StyledTabs.TabPane;

const ContactInvestorActivityModal = (props) => {
  const { handleContactInvestActivityModal, contactInvestorActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
      
          "70", // "Calls",//1
          "35" , // "Events",//2
          "105" , // "Tasks",//3
        
        
       
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
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <StyledDrawer
        title="Schedule"
       
        width={drawerWidth}
        visible={props.callActivityModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleCallActivityModal(false)}

        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <ActivityForm
           contact={props.contact}
           type={props.type}
          
           investorId={props. investorId }
           contactInVestDetail={props.contactInVestDetail}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
           />

        </Suspense>
      </StyledDrawer>
    </>
  );
  
};

export default ContactInvestorActivityModal;
