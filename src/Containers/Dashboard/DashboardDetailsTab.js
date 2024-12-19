import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../Components/UI/Layout";
import {handleBillableCandidateModal} from "../Dashboard/DashboardAction"
import DnsIcon from '@mui/icons-material/Dns';

const DashboardAllTable2 = lazy(()=>import("../Dashboard/DashboardAllTable2"));
const DashboardTable2 = lazy(()=>import("../Dashboard/Child/DashboardTable2"));
const AddCandidateBillableModal = lazy(()=>import("./Child/BillableCandidate/AddCandidateBillableModal"));


const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashboardDetailsTab extends Component {
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
    const {
      handleBillableCandidateModal,
      billableCandidateModal
    }=this.props;
    return (
      <>
        <TabsWrapper style={{height:"70vh",overflow: "scroll"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >

          <TabPane
              tab={
                <>
                  <DnsIcon 
                   style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">
                  Open Requirements
                        </span>
                  
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
                
                {this.props.viewType==="ME"?(
                   <DashboardAllTable2/>
     
          
            ) : (
              <DashboardTable2
      />
          )}
              </Suspense>
    </TabPane>
          
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddCandidateBillableModal
            billableCandidateModal={billableCandidateModal}
            handleBillableCandidateModal={handleBillableCandidateModal}
          />
                  </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  dashboard
}) => ({
 
  billableCandidateModal:dashboard.billableCandidateModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
 
      handleBillableCandidateModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsTab);
