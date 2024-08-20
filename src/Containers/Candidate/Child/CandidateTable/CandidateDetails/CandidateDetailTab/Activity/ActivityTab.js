import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";

const CandidateCallForm = lazy(() =>
  import("../Activity/CandidateActivityForm/CandidateCallForm")
);
const CandidateEventForm = lazy(() =>
  import("../Activity/CandidateActivityForm/CandidateEventForm")
);
const CandidateTaskForm = lazy(() =>
  import("../Activity/CandidateActivityForm/CandidateTaskForm")
);

const TabPane = StyledTabs.TabPane;

export class DistributorActivityTab extends Component {
  render() {
    const { ...formProps } = this.props;
    // console.log("...this.props.formProps...", this.props.formProps);
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            style={{ overflow: "visible", width: "56vw", padding: "5px" }}
            animated={false}
          >
            <TabPane
              tab={
                <span>
                 <i class="fas fa-phone-square"></i>&nbsp;
                  Calls
                </span>
              }
              key="1"
            >
              <Suspense fallback={"loading ..."}>
                <CandidateCallForm {...formProps} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="fas fa-tasks"></i>&nbsp;
                  Events
                </span>
              }
              key="2"
            >
              <Suspense fallback={"loading ..."}>
                <CandidateEventForm {...formProps}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="far fa-calendar-check"></i>&nbsp;
                  Tasks
                </span>
              }
              key="3"
            >
              <Suspense fallback={"loading ..."}>
                <CandidateTaskForm {...formProps}/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorActivityTab);
