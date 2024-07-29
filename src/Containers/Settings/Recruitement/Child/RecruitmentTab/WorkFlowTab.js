// import React,{lazy} from "react";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import SupplierOnboardingTab from "./SupplierOnboarding/SupplierOnboardingTab";
// const ProductionTab = lazy(() => import("./ProductionTab/ProductionTab"));
// const OnboardingTab = lazy(() => import("./OnboardingTab/OnboardingTab"));
// const HiringTab = lazy(() => import("./HiringTab"));
// const TaskTab = lazy(() => import("../Configure/TaskTab"));
// const DealsTab = lazy(() => import("./Deals/DealsTab"));
// const RepairTab = lazy(() => import("./RepairTab/RepairTab"));


// const TabPane = StyledTabs.TabPane;

// function WorkFlow(props) {
//   return (
//     <>
//       <TabsWrapper>
//         <StyledTabs defaultActiveKey="1" type="card">
//           {/* <TabPane tab={`Hiring`} key="1">
//             <div style={{ marginTop: 10 }}>
//               <RecruitmentTab />
//             </div>
//           </TabPane> */}
//           <TabPane tab={`Quotation`} key="2">
//             <div  class=" mt-[10px]" >
//               <HiringTab />
//             </div>
//           </TabPane>
//           <TabPane tab={`Task`} key="3">
//           <div  class=" mt-[10px]" >
//             <TaskTab />
//             </div>
//           </TabPane>
//           <TabPane tab={`Deals`} key="4">
//           <div  class=" mt-[10px]" >
//             <DealsTab />
//             </div>
//           </TabPane>
//           <TabPane tab={`User-Onboarding`} key="5">
//           <div  class=" mt-[10px]" >
//             <OnboardingTab />
//             </div>
//           </TabPane>
//           <TabPane tab={`Supplier-Onboarding`} key="6">
//           <div  class=" mt-[10px]" >
//             <SupplierOnboardingTab />
//             </div>
//           </TabPane>
//           <TabPane tab={`Production`} key="7">
//           <div  class=" mt-[10px]" >
//             <ProductionTab />
//             </div>
//           </TabPane>

//           <TabPane tab={`Repair`} key="8">
//           <div  class=" mt-[10px]" >
//             <RepairTab />
//             </div>
//           </TabPane>

//         </StyledTabs>
//       </TabsWrapper>
//     </>
//   );
// }

// const mapStateToProps = ({ settings }) => ({});

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow);





import React,{lazy,Suspense,useEffect,useState} from "react";
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
    label={tab.name} 
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

