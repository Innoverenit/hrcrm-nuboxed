import React, {  lazy,useEffect,Suspense,useState } from "react";
import { connect } from "react-redux";
import { Tabs, Badge } from 'antd';
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getApikey,} from "../../../SettingsAction";
const Logistictable = lazy(() => import("./Logistictable"));


const { TabPane } = Tabs;

const tabData=[
    {
        id:"1",
        tabName:"Logistics"
    },
    {
        id:"1",
        tabName:"Communication"
    },
    {
        id:"1",
        tabName:"Accounting"
    },
    {
        id:"1",
        tabName:"Payments"
    },




]
function ThirdPartytable(props) {

    const [activeKey, setActiveKey] = useState("")



    useEffect(() => {
        // Ensure the initial tab content is rendered on component mount
        
        if (tabData.length > 0) {
       
          setActiveKey(tabData[0]?.tabName);
        }
      }, [tabData]);





    useEffect(() => {
        if (activeKey) {
    props.getApikey(props.orgId, activeKey);
        }
      }, [activeKey]);
      useEffect(() => {
        // Ensure the initial tab content is rendered on component mount
        renderTabContent(activeKey);
        
      }, [activeKey]);


    const handleTabChange = (key) => {
        setActiveKey(key);
        //const selectedTypedata = type.find(type => type.workflowCategoryId === value);
      };
    
      const renderTabContent = (key) => {
        // const tab = props.workFlowCategory.find(tab => tab.workflowCategoryId === key);
        // console.log(tab)
        // if (!tab) return null;
    
        return <Logistictable 
        // label={tab.name} 
        activeKey={activeKey}
    apikey={props.apikey}

        //processForWorkflowData={props.processForWorkflowData}
    
        // count={countMapping[tab.name]} 
        />;
      };

    return (
        <> 
            
            <TabsWrapper>
      <Tabs type="card" defaultActiveKey={activeKey} onChange={handleTabChange}>
        {tabData.map(tab => (
          <TabPane
            tab={
              <>
                <span className="ml-1">{tab.tabName}</span>
                
              </>
            }
            key={tab.tabName}
          />
        ))}
      </Tabs>
      <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
        {renderTabContent(activeKey)}
      </Suspense>
    </TabsWrapper>
        </>
    );
};

const mapStateToProps = ({ auth,settings }) => ({
    userId: auth.userDetails.userId,
    user: auth.userDetails,
    orgId: auth.userDetails.organizationId,
    apikey:settings.apikey,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getApikey,
     
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartytable);
