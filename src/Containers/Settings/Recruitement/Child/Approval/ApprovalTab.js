import React, { lazy,useState,Suspense,useEffect} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tabs, Badge } from 'antd';
import ProspectCustomerForm from "./ProspectCustomerForm";
import SupplierContactuserForm from "./SupplierContactuserForm";
import ProspectContactToUserForm from "./ProspectContactToUserForm"
const ApproveForm = lazy(() => import("./ApproveForm"));
const MileageApproveForm = lazy(() => import("./MileageApproveForm"));
const ExpenseApproveForm = lazy(() => import("./ExpenseApproveForm"));
const ContactUserForm = lazy(() => import("./ContactUserForm"));
const PhonesPairApproveForm = lazy(() => import("./PhonesPairApproveForm"));



const TabPane = StyledTabs.TabPane;

function ApprovalTab(props) {
    const [activeKey, setActiveKey] = useState(" ")
    const handleTabChange = (key) => {
        setActiveKey(key);
        //const selectedTypedata = type.find(type => type.workflowCategoryId === value);
      };
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

        const renderTabContent = (key) => {
            const tab = tabData.find(tab => tab.id === key);
            console.log(tab)
            if (!tab) return null;
        
            return<ApproveForm
            label={tab.tabName} 
            activeKey={activeKey}
            // processForWorkflowData={props.processForWorkflowData}
        
            // count={countMapping[tab.name]} 
            />;
          };
          useEffect(() => {
            // Ensure the initial tab content is rendered on component mount
            
            if (tabData.length > 0) {
           
              setActiveKey(tabData[0]?.id);
            }
          }, [tabData]);
          useEffect(() => {
            // Ensure the initial tab content is rendered on component mount
            renderTabContent(activeKey);
            
          }, [activeKey]);

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

<Tabs type="card" defaultActiveKey={activeKey} onChange={handleTabChange}>
        {tabData.map(tab => (
          <TabPane
            tab={
              <>
                <span className="ml-1">{tab.tabName}</span>
                

                {/* <Badge count={countMapping[tab.name]} overflowCount={999} /> */}
              </>
            }
            key={tab.id}
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
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTab);


