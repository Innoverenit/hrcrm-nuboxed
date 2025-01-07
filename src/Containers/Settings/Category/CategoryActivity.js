
import React, { Component, Suspense, lazy } from "react";
import { bindActionCreators } from "redux";
import {  Badge } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { connect } from "react-redux";
const Event = lazy(() => import("../Event/Event"));
const Task = lazy(() => import("../Task/Task"));
const TabPane = StyledTabs.TabPane;

class CategoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  renderTabContent = (key) => {
    switch (key) {
      case "1":
        return <Event />;
      case "2":
        return <Task />;
      default:
        return null;
    }
  };

  render() {
    const { activeKey } = this.state;

    return (
      <div className="flex flex-nowrap">
        <div class=" w-[100%]">
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey={activeKey}
              onChange={this.handleTabChange}
            >
              <TabPane
                tab={
                  <>
                    <i className="far fa-calendar-check"></i>
                    <span className="ml-1 !text-tab font-poppins text-sm">Event 
                    {/* <span className="text-red-500 font-bold">{this.props.eventCount.EventTypeCount}</span> */}
                    </span>
                    <Badge
                count={this.props.eventCount.EventTypeCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                   
                    </Badge>
                  </>
                }
                key="1"
              />
              <TabPane
                tab={
                  <>
                   <FactCheckIcon className="!text-icon"/>
                    <span className="!text-tab ml-1 font-poppins text-sm">Task 
                    {/* <span className="text-red-500 font-bold">{this.props.taskCount.TaskTypeCount}</span> */}
                    </span>
                    <Badge
                count={this.props.taskCount.TaskTypeCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                   
                    </Badge>
                  </>
                }
                key="2"
              />
            </StyledTabs>
            <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
              {this.renderTabContent(activeKey)}
            </Suspense>
          </TabsWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({events,tasks}) => ({
  eventCount:events.eventCount,
  taskCount:tasks.taskCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryActivity);
