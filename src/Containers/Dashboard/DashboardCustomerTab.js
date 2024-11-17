import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Tooltip, Popover, Icon } from "antd";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { StyledModal, StyledTabs } from "../../Components/UI/Antd";
import { FlexContainer, TabsWrapper } from "../../Components/UI/Layout";
import PieChartIcon from "@mui/icons-material/PieChart";

import StackedSummaryChart from "../Dashboard/SatckedSummaryChart";

// import { getTimeLineDataByOpportunityId } from "../../../OpportunityAction";
import { ActionIcon } from "../../Components/Utils";
import { AddPopover } from "../../Components/Common";
import DashboardTable from "../Dashboard/Child/DashboardTable";
import DashboardTable2 from "../Dashboard/Child/DashboardTable2";
import DashBoardCommissionTable from "../Dashboard/Child/DashBoardCommissionTable";
// import { handleLinkPartnerModal } from "../../../../Partner/PartnerAction";
import { BundleLoader } from "../../Components/Placeholder";

import { Breadcrumb, Alert } from "antd";
import StackedChart from "./StackedChart";
import ParetoChart from "./ParetoChart";
import Example from "./ParetoChart";
import StackedAllChart from "./StackedAllChart";
import StackedAllSummaryChart from "./StackedAllSummaryChart";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashboardCustomerTab extends Component {
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
                  <PieChartIcon style={{ fontSize: "1.1rem" }} />
                  <span class=" ml-1">Summary</span>

                  {activeKey === "1" && <></>}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {this.props.viewType === "ME" ? (
                  <StackedAllChart />
                ) : (
                  <StackedChart />
                )}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <DashboardIcon style={{ fontSize: "1.1rem" }} />
                  <span class=" ml-1">Top</span>

                  {activeKey === "2" && <></>}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {this.props.viewType === "ME" ? (
                  <StackedAllSummaryChart />
                ) : (
                  <StackedSummaryChart />
                )}
              </Suspense>
            </TabPane>

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
const mapStateToProps = ({

}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCustomerTab);
