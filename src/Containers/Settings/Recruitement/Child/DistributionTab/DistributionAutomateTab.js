// import React, { lazy } from "react";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";





// const TabPane = StyledTabs.TabPane;

// function DistributionAutomateTab(props) {

//     return (
//         <>
//             <TabsWrapper>
//                 <StyledTabs defaultActiveKey="1" type="card">
//                     <TabPane tab={`Leads`} key="1">
//                         <div class="!text-tab mt-[10px]" >
//                         {/* <WebsiteForm/> */}
//                         </div>
                        
//                     </TabPane>
//                     <TabPane tab={`Prospect`} key="2">
//             <div class="!text-tab mt-[10px]" >
//               {/* <LeadsAgingForm /> */}
//             </div>
//           </TabPane>

//           <TabPane tab={`Customer`} key="3">
//             <div class="!text-tab mt-[10px]" >
//               {/* <OutreachForm /> */}
            
//             </div>
//           </TabPane>
                 
                 
//                 </StyledTabs>
//             </TabsWrapper>
//         </>
//     );
// }

// const mapStateToProps = ({ settings, auth }) => ({

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({

//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(DistributionAutomateTab);


import React, { lazy,useState,Suspense,useEffect} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {
   
    getDistributionAutomation,
  
  } from "../../../../Settings/SettingsAction";
import DistributedAutomatedForm from "../DistributionTab/DistributedAutomatedForm"
import { bindActionCreators } from "redux";

const TabPane = StyledTabs.TabPane;

function DistributionAutomateTab(props) {
    const [activeKey, setActiveKey] = useState(" ")
    // Dynamic tabs array, can be passed from props or defined here
    const tabData = [
        { key: "1", label: "Leads", 
            
            },
        { key: "2", label: "Prospect", 
        },
        { key: "3", label: "Customer", 
            },
    ];


    useEffect(() => {
        
        renderTabContent(activeKey);
        
      }, [activeKey]);

    useEffect(() => {
           
            
        if (tabData.length > 0) {
       
          setActiveKey(tabData[0]?.label);
        }
      }, [tabData]);


    useEffect(() => {
        if (activeKey) {
            props.getDistributionAutomation(props.orgId,activeKey);
        }
      }, [activeKey]);
    const handleTabChange = (key) => {
        setActiveKey(key);
       
      };
 


    const renderTabContent = (key) => {
        const tab = tabData.find(tab => tab.label === key);
        console.log(tab)
        if (!tab) return null;
    
        return<DistributedAutomatedForm
        label={tab.tabName} 
        activeKey={activeKey}
        distributionAutomation={props.distributionAutomation}
        // processForWorkflowData={props.processForWorkflowData}
    
        // count={countMapping[tab.name]} 
        />;
      }

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey={activeKey} 
                 onChange={handleTabChange}
                type="card">
                    {tabData.map((tab) => (
                        <TabPane 
                        tab={tab.label} 
                        key={tab.label}
                        >
                             {renderTabContent(activeKey)}
                            {/* {tab.content} */}
                           {/* <DistributedAutomatedForm/> */}
                        </TabPane>
                    ))}
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({
    orgId: auth.userDetails.organizationId,
    distributionAutomation: settings.distributionAutomation,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDistributionAutomation

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributionAutomateTab);



