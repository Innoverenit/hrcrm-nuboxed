import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {  StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
const FunnelChartCustomer = lazy(()=>import("../Child/FunnelChartCustomer"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class FunnelTab extends Component {
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
        <TabsWrapper style={{height:"44vh", width:"-webkit-fill-available"}}>
        
              <div>
              <ListAltIcon className="!text-icon"/><span class=" ml-1 font-bold font-poppins text-base ">Funnel</span>

                
              <Suspense fallback={"Loading ..."}>
                {" "}
               <FunnelChartCustomer/>
              </Suspense>
           


            </div>    
        
        
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

export default connect(mapStateToProps, mapDispatchToProps)(FunnelTab);
