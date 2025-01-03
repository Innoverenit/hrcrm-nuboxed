import React , { useEffect,useState, lazy, Suspense} from 'react';
import { Tabs } from 'antd';
const ExternalUserData = lazy(() => import("../EmployeeCard/ExternalUserData"));
const InternalUserdata = lazy(() => import("../EmployeeCard/InternalUserdata"));
const { TabPane } = Tabs;

const InternalExternalTabs = (props) => {
  // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchMenuTranslations = async () => {
  //     try {
  //       setLoading(true); 
  //       const itemsToTranslate = [
  //        "989",
  //        "990"      
  //       ];

  //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
  //       setTranslatedMenuItems(translations);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error translating menu items:', error);
  //     }
  //   };

  //   fetchMenuTranslations();
  // }, [props.selectedLanguage]);
  // Function to render the content based on the active tab
  const renderTabContent = (key) => {
    switch (key) {
      case '1':
        return (
          <div>
            <Suspense>
            <InternalUserdata
            filteredData={props.filteredData}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}            
            translatedMenuItems={props.translatedMenuItems}
            /></Suspense>
       
          </div>
        );
      case '2':
        return (
          <div>
             <Suspense>
            <ExternalUserData
              filteredData={props.filteredData}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
              translatedMenuItems={props.translatedMenuItems}
            /></Suspense>
       
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={props.translatedMenuItems[0]} key="1">
        {renderTabContent('1')}
      </TabPane>
      <TabPane tab={props.translatedMenuItems[1]} key="2">
        {renderTabContent('2')}
      </TabPane>
    </Tabs>
  );
};

export default InternalExternalTabs;
