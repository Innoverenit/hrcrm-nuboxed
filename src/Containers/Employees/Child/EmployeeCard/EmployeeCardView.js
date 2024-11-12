import React , { useEffect,useState} from 'react';
import { Tabs } from 'antd';
import ExternalUserData from "../EmployeeCard/ExternalUserData"
import InternalUserdata from "../EmployeeCard/InternalUserdata"

const { TabPane } = Tabs;

const InternalExternalTabs = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
         "989",
         "990"      
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
  // Function to render the content based on the active tab
  const renderTabContent = (key) => {
    switch (key) {
      case '1':
        return (
          <div>
            <InternalUserdata
            filteredData={props.filteredData}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            />
            {/* <h3>Internal Content</h3>
            <p>This is the content for the Internal tab.</p> */}
          </div>
        );
      case '2':
        return (
          <div>
            <ExternalUserData
              filteredData={props.filteredData}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
            {/* <h3>External Content</h3>
            <p>This is the content for the External tab.</p> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={translatedMenuItems[0]} key="1">
        {renderTabContent('1')}
      </TabPane>
      <TabPane tab={translatedMenuItems[1]} key="2">
        {renderTabContent('2')}
      </TabPane>
    </Tabs>
  );
};

export default InternalExternalTabs;
