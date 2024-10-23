import React from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RecruitCommunicationTab from "./RecruitCommunicationTab";
import RecruitSourcingTab from "./RecruitSourcingTab";

const TabPane = StyledTabs.TabPane;

function RecruitTab(props) {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
        <TabPane tab={`Sourcing`} key="1">
            <div className="mt-10">
              <RecruitSourcingTab />
            </div>
          </TabPane>
          <TabPane tab={`Selection`} key="2">
            <div style={{ marginTop: 10 }}>
              <RecruitCommunicationTab />
            </div>
          </TabPane>
          {/* <TabPane tab={`Distribution`} key="2">
           
          </TabPane> */}
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecruitTab);
