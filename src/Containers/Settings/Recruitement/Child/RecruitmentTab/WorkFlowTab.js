





import React,{Suspense,useEffect,useState} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { Tabs, Badge } from 'antd';
import { bindActionCreators } from "redux";
import {
  getWorkFlowCategory,
  getProcessForWorkFlowData
  
} from "../../../SettingsAction";
import TabContentComponent from "../RecruitmentTab/TabContentComponent"
import LanguageIcon from '@mui/icons-material/Language';



const { TabPane } = Tabs;

const WorkFlow = (props) => {
  


  const [activeKey, setActiveKey] = useState("")
  useEffect(() => {
    props.getWorkFlowCategory(); 
  //  props.getSectorCount(props.orgId) 
}, [])






useEffect(() => {
  // Ensure the initial tab content is rendered on component mount
  renderTabContent(activeKey);
  
}, [activeKey]);




useEffect(() => {
  // Ensure the initial tab content is rendered on component mount
  
  if (props.workFlowCategory.length > 0) {
 
    setActiveKey(props.workFlowCategory[0]?.workflowCategoryId);
  }
}, [props.workFlowCategory]);


useEffect(() => {
  if (activeKey) {
    props.getProcessForWorkFlowData(props.orgId, activeKey);
  }
}, [activeKey]);
  

  const handleTabChange = (key) => {
    setActiveKey(key);
    //const selectedTypedata = type.find(type => type.workflowCategoryId === value);
  };

  const renderTabContent = (key) => {
    const tab = props.workFlowCategory.find(tab => tab.workflowCategoryId === key);
    console.log(tab)
    if (!tab) return null;

    return <TabContentComponent 
    label={tab.navType} 
    activeKey={activeKey}
    processForWorkflowData={props.processForWorkflowData}

    // count={countMapping[tab.name]} 
    />;
  };

  return (
    <TabsWrapper>
      <Tabs type="card" defaultActiveKey={activeKey} onChange={handleTabChange}>
        {props.workFlowCategory.map(tab => (
          <TabPane
            tab={
              <>
                <span className="ml-1">{tab.name}</span>
                 {tab.globalInd && <LanguageIcon style={{ marginLeft: 8 }} />}
                {/* <Badge count={countMapping[tab.name]} overflowCount={999} /> */}
              </>
            }
            key={tab.workflowCategoryId}
          />
        ))}
      </Tabs>
      <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
        {renderTabContent(activeKey)}
      </Suspense>
    </TabsWrapper>
  );
};
const mapStateToProps = ({ settings,auth }) => ({
  workFlowCategory: settings.workFlowCategory,
  processForWorkflowData:settings.processForWorkflowData,
  orgId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getWorkFlowCategory,
  getProcessForWorkFlowData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow);


// export default Workflow;

