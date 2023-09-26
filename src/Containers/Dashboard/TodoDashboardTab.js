import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import ActionNotification from "../Dashboard/ActionNotification";
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {getTodosCount} from "./DashboardAction";
import DashboardTodo from "./Child/DashboardTodo";
import UpcomingEvents from "./Child/UpcomingEvents";
import { Badge } from "antd";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class TodoDashboardTab extends Component {
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

  componentDidMount() {
    const { getTodosCount, userId, startDate, endDate } = this.props;
    getTodosCount(userId, startDate, endDate);
  }
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
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                  {/* <Badge
                count={props.opportunityRecord.Event}
                overflowCount={999}
              >  */}
               <span class=" ml-1">ToDo</span>
               {/* </Badge> */}

                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashboardTodo style={{ overflow: "scroll" }} />
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
            {this.props.userFullListInd ? (
            <TabPane
              tab={
                <>
                  <UpcomingIcon style={{fontSize:"1.1rem"}}/>

                  <span class=" ml-1">UpComing Events</span>

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
                <UpcomingEvents />
              </Suspense>
            </TabPane>
) : null}
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
  todosCount:dashboard.todosCount,
  userId: auth.userDetails.userId,
  endDate: dashboard.endDate,
  startDate: dashboard.startDate,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {getTodosCount},
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboardTab);
