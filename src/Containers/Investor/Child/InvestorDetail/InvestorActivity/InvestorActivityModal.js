import React, { Suspense,lazy,useEffect,useState } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ActivityForm from "../../../../Activity/ActivityForm";





const TabPane = StyledTabs.TabPane;

const InvestorActivityModal = (props) => {
  const { handleCallActivityModal, callActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          // "", //  "Schedule",//0
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
        // title=
        // {translatedMenuItems[0]}
        width={drawerWidth}
        visible={callActivityModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleCallActivityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
            <ActivityForm
            defaultValue={props.defaultValue}
          //  defaultCustomers={props.defaultCustomers}
           customerId={props. customerId }
           uniqueId={props.uniqueId}
           
           name={props.name}
          customer={props.customer}
          investor={props.investor}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
          {/* <InvestorActivityTab 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           customerId={props. customerId }
           customer={props.customer}
           defaultInvestor={props.defaultInvestor}
           investorId={props. investorId }
           investorDetails={props.investorDetails}/> */}

        </Suspense>
      </StyledDrawer>
    </>
  );
 
};

export default InvestorActivityModal;
