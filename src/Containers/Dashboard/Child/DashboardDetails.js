import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {  StyledTabs } from "../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import DnsIcon from '@mui/icons-material/Dns';

const OpportunityRequirementBoard = lazy(() => import("./OpportunityRequirementBoard"));
const Details = lazy(() => import("./Details"));


const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashboardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      candidateRequirement:"",
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
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        {/* <OpportunityStatsCard opportunity={opportunity} /> */}
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >

              <TabPane
              tab={
                <>


                
          
                            <ListAltIcon  />
                    <span class=" ml-[0.25em]" >
                 Kanban
                      </span>
                  
                  {activeKey === "1" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="1"
            >
                <Suspense fallback={<BundleLoader />}>
        
                <OpportunityRequirementBoard
                  candidateRequirement={this.props.candidateRequirement}
                  item={this.props.item}
                  />{" "}
        </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                 <DnsIcon/>
   
                 <span class=" ml-[0.25em]" >
                   Details
                      </span>
                  
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
               
            <Details
             candidateRequirement={this.props.candidateRequirement}
           detail={this.props.detail}
           item={this.props.item}
            />                   
    
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
                  </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  opportunity,
  call,
  event,
  task,
  partner,
  customeField,
}) => ({
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetails);
