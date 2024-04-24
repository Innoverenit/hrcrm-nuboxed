import React,{lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CurrencyCoversionForm = lazy(() => import("./CurrencyCoversionForm"));
const CurrencyCoversionForm2 = lazy(() => import("./CurrencyCoversionForm2"));
const OneTimeTable = lazy(() => import("./OneTimeTable"));


const TabPane = StyledTabs.TabPane;

function DistributionTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Currency`} key="1">
                        <div class=" mt-3">
                        <CurrencyCoversionForm/>
                        {/* <CurrencyCoversionForm2/> */}
                        <OneTimeTable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Fiscal`} key="2">
                       fiscla
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


