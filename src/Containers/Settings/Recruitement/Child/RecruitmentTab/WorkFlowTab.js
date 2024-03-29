import React,{lazy} from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const OnboardingTab = lazy(() => import("./OnboardingTab/OnboardingTab"));
const HiringTab = lazy(() => import("./HiringTab"));
const TaskTab = lazy(() => import("../Configure/TaskTab"));
const DealsTab = lazy(() => import("./Deals/DealsTab"));


const TabPane = StyledTabs.TabPane;

function WorkFlow(props) {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          {/* <TabPane tab={`Hiring`} key="1">
            <div style={{ marginTop: 10 }}>
              <RecruitmentTab />
            </div>
          </TabPane> */}
          <TabPane tab={`Opportunity`} key="2">
            <div  class=" mt-[10px]" >
              <HiringTab />
            </div>
          </TabPane>
          <TabPane tab={`Task`} key="3">
          <div  class=" mt-[10px]" >
            <TaskTab />
            </div>
          </TabPane>
          <TabPane tab={`Deals`} key="4">
          <div  class=" mt-[10px]" >
            <DealsTab />
            </div>
          </TabPane>
          <TabPane tab={`User-Onboarding`} key="5">
          <div  class=" mt-[10px]" >
            <OnboardingTab />
            </div>
          </TabPane>
          <TabPane tab={`Supplier-Onboarding`} key="6">
          <div  class=" mt-[10px]" >
            {/* <OnboardingTab /> */}
            </div>
          </TabPane>

        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow);
