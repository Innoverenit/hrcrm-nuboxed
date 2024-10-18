import React, { lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WebsiteContactForm from "../DistributionTab/WebsiteContactForm"





const TabPane = StyledTabs.TabPane;

function ContactAutomateTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Outreach`} key="1">
                        <div class="!text-tab mt-[10px]" >
                        <WebsiteContactForm/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactAutomateTab);


