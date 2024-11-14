import React, {  lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
const Logistictable = lazy(() => import("./Logistictable"));
const Communicationtable = lazy(() => import("./Communicationtable"));
const Accountingtable = lazy(() => import("./Accountingtable"));
const TabPane = StyledTabs.TabPane;
function ThirdPartytable(props) {

    return (
        <> 
            
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Logistics`} key="1">
                        <div class=" mt-3">
                       <Logistictable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Communication`} key="2">
                        <div class=" mt-3">
                        <Communicationtable/>
                        
                    
                        </div>
                    </TabPane>
                    <TabPane tab={`Accounting`} key="3">
                        <div class=" mt-3">
                        <Accountingtable/>
                     
                        </div>
                    </TabPane>
                    {/* <TabPane tab={`Fiscal`} key="2">
                       fiscla
                    </TabPane> */}
                </StyledTabs>
            </TabsWrapper>
        </>
    );
};
export default ThirdPartytable;