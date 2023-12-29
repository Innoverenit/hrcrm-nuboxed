import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CallForm =lazy(()=>import("../../Call/Child/CallForm"));
const EventForm =lazy(()=>import("../../Event/Child/EventForm"));
const TaskForm =lazy(()=>import("../../Task/Child/TaskForm"));
const LeaveForm =lazy(()=>import("../../Leave/Child/Tab/LeaveForm"));
const ProjectForm =lazy(()=>import("../../Project/ProjectForm"));
const HourForm =lazy(()=>import("../Child/HourForm"));

const TabPane = StyledTabs.TabPane;

export class PlannerTab extends Component {
  render() {
    const {
      plannerStartDate,
      plannerEndDate,
      plannerStartTime,
      plannerEndTime,
    } = this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="2"
            style={{ overflow: "visible", width: "53vw", padding: "0.9375em" }}
            animated={false}
          >
            <TabPane
              tab={
                <span>
                  <PhoneIcon/>
                  Calls
                </span>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <CallForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <CalendarMonthIcon/>
                  Events
                </span>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                <EventForm
                  // startDate={plannerStartDate}
                  // endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  {/* <Icon type="edit" /> */}
                  <i class="fas fa-tasks"></i> &nbsp;
                  Tasks
                </span>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                <TaskForm
                // startDate={plannerStartDate}
                // endDate={plannerEndDate}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="fas fa-luggage-cart"></i>&nbsp;
                  Hours
                </span>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                <HourForm
                
                />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <span>
                  <Icon type="luggage-cart" />
                  Travel
                </span>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                <LeaveForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane> */}

{/* 
            <TabPane
              tab={
                <span>
                  <ProjectOutlined type="project" />
                  Projects
                </span>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                <ProjectForm
                  startDate={plannerStartDate}
                  endDate={plannerEndDate}
                  startTime={plannerStartTime}
                  endTime={plannerEndTime}
                />
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
      </>
    );
  }
}

const mapStateToProps = ({ planner }) => ({
  plannerStartDate: planner.plannerStartDate,
  plannerEndDate: planner.plannerEndDate,
  plannerStartTime: planner.plannerStartTime,
  plannerEndTime: planner.plannerEndTime,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlannerTab);
