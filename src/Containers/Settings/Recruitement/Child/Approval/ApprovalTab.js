import React, { lazy,useState,Suspense,useEffect} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tabs, Badge } from 'antd';
import { getApproveData } from "../../../SettingsAction";
const ApproveForm = lazy(() => import("./ApproveForm"));




const TabPane = StyledTabs.TabPane;
const tabData=[
    {
        tabName:"Leave",
        id:"1"
    },
     {
        tabName:"Mileage",
        id:"2"
    },
     {
        tabName:"Expense",
        id:"3"
    },
     {
        tabName:"Customer Contact To User",
        id:"4"
    },
      {
        tabName:"Supplier Contact To User",
        id:"5"
    },
     {
        tabName:"Repair",
        id:"6"
    },
     {
        tabName:"Prospect to Customer",
        id:"7"
    },
     {
        tabName:"Prospect to Customer",
        id:"8"
    },
      {
        tabName:"Prospect Contact to User",
        id:"9"
    },
    ]

function ApprovalTab(props) {
    const [activeKey, setActiveKey] = useState(" ")
   
      useEffect(() => {
        
        renderTabContent(activeKey);
        
      }, [activeKey]);
      useEffect(() => {
           
            
        if (tabData.length > 0) {
       
          setActiveKey(tabData[0]?.tabName);
        }
      }, [tabData]);
      useEffect(() => {
        if (activeKey) {
            props.getApproveData(activeKey)
        }
      }, [activeKey]);
      const handleTabChange = (key) => {
        setActiveKey(key);
       
      };
 

        const renderTabContent = (key) => {
            const tab = tabData.find(tab => tab.tabName === key);
            console.log(tab)
            if (!tab) return null;
        
            return<ApproveForm
            label={tab.tabName} 
            activeKey={activeKey}
            approvalData={props.approvalData}
            // processForWorkflowData={props.processForWorkflowData}
        
            // count={countMapping[tab.name]} 
            />;
          };
       
        

    return (
        <>
            <TabsWrapper>
                {/* <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leaves`} key="1">
                        <div class=" mt-4" >
                        <ApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Mileage`} key="2">
                    <div class=" mt-4" >
                        <MileageApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Expense`} key="3">
                        <div style={{ marginTop: 10 }}>
                        <ExpenseApproveForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Customer Contact To User`} key="4">
                        <div style={{ marginTop: 10 }}>
                        <ContactUserForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Supplier Contact To User`} key="5">
                        <div style={{ marginTop: 10 }}>
                        <SupplierContactuserForm/>
                        </div>
                    </TabPane>
                    {props.user.repairInd === true && (
                    <TabPane tab={`Repair`} key="6">
                        <div style={{ marginTop: 10 }}>
                        <PhonesPairApproveForm/>
                        </div>
                    </TabPane>
                    )}
                      <TabPane tab={`Prospect to Customer`} key="7">
                        <div style={{ marginTop: 10 }}>
                        <ProspectCustomerForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Prospect Contact to User`} key="8">
                        <div style={{ marginTop: 10 }}>
                        <ProspectContactToUserForm/>
                        </div>
                    </TabPane>
                    
                </StyledTabs> */}

 <Tabs type="card"  defaultActiveKey={activeKey}  onChange={handleTabChange}>
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
}

const mapStateToProps = ({ settings, auth }) => ({
    user: auth.userDetails,
    approvalData: settings.approvalData ,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getApproveData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTab);


