import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";

import { FormattedMessage } from "react-intl";
const TaskThisMonthGanttChart = lazy(()=>import("../Child/TaskThisMonthGanttChart"));
const TaskGanttChart = lazy(()=>import("../Child/TaskGanttChart"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class GantChartTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

//   componentDidMount() {
//     const { getTodosCount, userId, startDate, endDate } = this.props;
//     getTodosCount(userId, startDate, endDate);
//   }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper className="w-wk">
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1 font-semibold">
                  <FormattedMessage
              id="app.openTasks"
              defaultMessage="Open Tasks"
            />
                    </span>

                
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TaskGanttChart 
                // style={{ overflow: "scroll" }} 
                />
              </Suspense>
            </TabPane>


            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1 font-semibold">
                  <FormattedMessage
              id="app.tasksThisMonth"
              defaultMessage="Tasks-This Month"
            />
                   </span>

                
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <TaskThisMonthGanttChart 
                // style={{ overflow: "scroll" }} 
                />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <TipsAndUpdatesIcon style={{fontSize:"1.1rem"}}/>

                  <span class=" ml-1">Actions</span>

                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ActionNotification />
              </Suspense>
            </TabPane> */}
          
          

            {/* <TabPane
              tab={
                <>
                 
               
                 <FontAwesomeIcon icon={solid('bullseye')} />
                    <span style={{ marginLeft: "0.25em" }}>Pareto</span>
                  
                  {activeKey === "3" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <Example/>
         
              </Suspense>
            </TabPane> */}

            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}></Suspense>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth,customer}) => ({
//   todosCount:dashboard.todosCount,
//   userId: auth.userDetails.userId,
//   endDate: dashboard.endDate,
//   startDate: dashboard.startDate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    // getTodosCount
},
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GantChartTab);
