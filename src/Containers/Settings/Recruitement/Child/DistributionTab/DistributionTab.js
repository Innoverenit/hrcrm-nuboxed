import React, { lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContactAutomateTab from "../DistributionTab/ContactAutomateTab"

const WebsiteTab = lazy(() => import("./WebsiteTab"));
const WebsiteOrderForm = lazy(() => import("../DistributionTab/WebsiteOrderForm"));





const TabPane = StyledTabs.TabPane;

function DistributionTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Leads`} key="1">
                    <div class=" mt-[10px]" >
                        <WebsiteTab/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Order`} key="2">
                    <div class=" mt-[10px]" >
                        <WebsiteOrderForm/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Contact`} key="3">
                    <div class=" mt-[10px]" >
                        <ContactAutomateTab/>
                        </div>
                    </TabPane>
                 
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributionTab);


