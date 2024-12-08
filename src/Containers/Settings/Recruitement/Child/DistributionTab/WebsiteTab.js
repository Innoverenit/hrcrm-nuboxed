import React, { lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OutreachForm from "../DistributionTab/OutreachForm"
const WebsiteForm = lazy(() => import("./WebsiteForm"));
const LeadsAgingForm = lazy(() => import("../../../LeadsConfig/LeadsAgingForm"));




const TabPane = StyledTabs.TabPane;

function WebsiteTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Distribution`} key="1">
                        <div class="!text-tab mt-[10px]" >
                        <WebsiteForm/>
                        </div>
                        
                    </TabPane>
                    <TabPane tab={`Ageing`} key="2">
            <div class="!text-tab mt-[10px]" >
              <LeadsAgingForm />
            </div>
          </TabPane>

          <TabPane tab={`Outreach`} key="3">
            <div class="!text-tab mt-[10px]" >
              <OutreachForm />
            
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

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteTab);


