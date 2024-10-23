import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  EyeInvisibleOutlined, PlusOutlined,

  
} from '@ant-design/icons';
import PieChartIcon from '@mui/icons-material/PieChart';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Button, message, Tooltip, Popover, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import { StyledModal, StyledTabs } from "../../../Components/UI/Antd";
import {
 
  TabsWrapper,
} from "../../../Components/UI/Layout";
import { ActionIcon } from "../../../Components/Utils";
import { AddPopover } from "../../../Components/Common";
import {
handleRecruitModal,
handleTagProfileModal,
} from "../../Opportunity/OpportunityAction";
import DemandTable from "./DemandTable";
// const RequirementRecruitTable = lazy(() => import("./RequirementRecruitTable"));
// const  RecruitmentTable = lazy(() => import("../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruiterTable"));
const AddRecruitModal = lazy(() => import("../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddRecruitModal"));
const AddTagProfileModal = lazy(() => import("../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/AddTagProfileModal"));
const RecruitProJumpstart = lazy(() => import("../../Opportunity/Child/RecruitProJumpstart/RecruitProJumpstart"));
const SummaryTable = lazy(() => import("../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/SummaryTable"));
const RecruitmentTable = lazy(() => import("../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentTable"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}

class DemandTab extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeKey: "1",
        recriutmentdashboard: false,
        contactPopover: false,
        partnerPopover: false,
      }

    }
    handleRecriutmentdashboard = () => {
        this.setState({ recriutmentdashboard: true });
    
        console.log(this.state.breadCumb);
      };
    
      handleRecruitClick = () => {
        this.setState({ recriutmentdashboard: false });
      };
      handleContactPopoverVisibleChange = () =>
      this.setState({ contactPopover: !this.state.contactPopover });
    handlepartnerPopoverVisibleChange = () =>
      this.setState({ partnerPopover: !this.state.partnerPopover });
    render() {
        const { activeKey } = this.state;
        const {
          // user: {
          //   metaData: { productStatus },
          // },
          opportunity: { recruiterId,opportunityId, opportunityName, accountId },
         
          user,
          handleTagProfileModal,
        } = this.props;

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
                    <span onClick={this.handleRecruitClick}>
                    <TransferWithinAStationIcon 
                    // icon={solid('people-arrows-left-right')}
                     />
                      <span style={{ marginLeft: '0.25em' }}>RecruitPro</span>
                    </span>
                    {activeKey === "1" && (
                      <>
  
                        <>
                       
                          <Tooltip title="Add Demand">
                          {user.userType !== "USER" && user.department !== "Customer" &&user.department !== "Recruiter"&& (
                           <PlusOutlined
                              type="plus"
                              //tooltipTitle="Add Demand"
                              onClick={() =>
                                this.props.handleRecruitModal(true)
                              }
                              size="0.875em"
                              style={{
                                marginLeft: "0.125em",
                                verticalAlign: "center",
                              }}
                            />
                          )}
                  
                            </Tooltip>
                          
                        
  
                          <Tooltip title="Summary">
                        <span
                            type="area-chart"
                            // tooltipTitle="Summary"
                            onClick={() => {
                              this.handleRecriutmentdashboard();
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "4px",
                              verticalAlign: "center",
                            }}
                            >
                             <PieChartIcon />
                            </span>
                          </Tooltip>
                        
                         
                        </>
                      </>
                    )}
                  </>
                }
                key="1"
              >
                {this.state.recriutmentdashboard ? (
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitProJumpstart />
                    <SummaryTable />
                  </Suspense>
                ) : (
                    <Suspense fallback={"Loading ..."}>
                      {" "}
                      <DemandTable opportunityId={opportunityId}/>
                      {/* <RequirementRecruitTable  recruiterId={recruiterId}/> */}
                    </Suspense>
                  )}
              </TabPane>
              </StyledTabs>
              </TabsWrapper>

              <Suspense fallback={null}>
      
                <AddRecruitModal
                  addRecruitModal={this.props.addRecruitModal}
                  handleRecruitModal={this.props.handleRecruitModal}
                />
  <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />
                </Suspense>
             </>
    );
 }
}
const mapStateToProps = ({auth,opportunity}) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    role: auth.userDetails.role,
    department: auth.userDetails.department,
    // recruiterId:auth.userDetails.userId,
    opportunityId: opportunity.opportunity.opportunityId,
    opportunity: opportunity.opportunity,
    addRecruitModal: opportunity.addRecruitModal,
    addTagProfileModal: opportunity.addTagProfileModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
     handleRecruitModal,
      handleTagProfileModal,
 
    
    },
    dispatch
  );
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DemandTab);
