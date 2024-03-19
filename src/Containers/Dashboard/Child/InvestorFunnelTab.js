import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const FunnelChartInvestor = lazy(()=>import("./FunnelChartInvestor"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class InvestorFunnelTab extends Component {
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
        <TabsWrapper style={{height:"44vh"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <ListAltIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                  <FormattedMessage
              id="app.funnel"
              defaultMessage="Funnel"
            />
                    </span>

                
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <FunnelChartInvestor/>
              </Suspense>
            </TabPane>


       
        
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

export default connect(mapStateToProps, mapDispatchToProps)(InvestorFunnelTab);
