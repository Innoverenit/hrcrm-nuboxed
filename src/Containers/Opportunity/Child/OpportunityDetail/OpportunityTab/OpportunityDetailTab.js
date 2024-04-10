import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { bindActionCreators } from "redux";
import RecruitmentDeletedTable from "../../OpportunityDetail/OpportunityTab/Recruitment/RecruitmentDeletedTable"
import {Tooltip, } from "antd";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { FormattedMessage } from "react-intl";
import PieChartIcon from '@mui/icons-material/PieChart';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import { LinkOutlined, PlusOutlined, 
} from '@ant-design/icons';
import { handleContactModal,handleLinkContactModal } from "../../../../Contact/ContactAction";
import RecruitmentClosedTable from "../OpportunityTab/RecruitmentClosedTable"
import {handleReactSpeechModal} from "../../../OpportunityAction"
import {handleCustomerContactModal} from "../../../../Customer/CustomerAction"
import {
    getContactListByOpportunityId,
    clearReducerState,
  handleDocumentUploadModal,
     linkContactsCheckToOpportunity,
  handleRecruitModal,
  handleTagProfileModal,
  getRecruitByOpportunityId,
  
} from "../../../OpportunityAction";
import LockIcon from '@mui/icons-material/Lock';
import { BundleLoader } from "../../../../../Components/Placeholder";
import ReactSpeechModal from "./ReactSpeechModal";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import AddCustomerContactModal from "../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerContactModal";
const RecruitmentTable = lazy(() => import("./Recruitment/RecruitmentTable"));
const AddRecruitModal = lazy(() => import("./Recruitment/AddRecruitModal"));
const AddTagProfileModal = lazy(() => import("./Recruitment/AddTagProfileModal"));
const RecruitProJumpstart = lazy(() => import("../../RecruitProJumpstart/RecruitProJumpstart"));
const SummaryTable = lazy(() => import("./Recruitment/Child/SummaryTable"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const LinkedContact = lazy(() => import("./LinkedContact"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));
const AddContactModal = lazy(() => import("../../../../Contact/Child/AddContactModal"));
const LinkContactModal = lazy(() => import("../../../../Contact/Child/LinkContactModal"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class OpportunityDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      closedPopover:false,
      deletePopover:false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      recruitmentboard:false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleRecriutmentdashboard = () => {
    this.setState({ 
      recriutmentdashboard: true,
      breadCumb:false,
      closedPopover:false
     });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ 
      closedPopover:false,
      breadCumb:true,
      recriutmentdashboard: false,
     });
  };

  componentWillUnmount() {
    this.props.clearReducerState();
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
    handleClosedPopoverVisibleChange = () =>
    this.setState({ 
      closedPopover: true,
      recriutmentdashboard:false,
      breadCumb:false
     });

     handledeletedPopoverVisibleChange = () =>
     this.setState({ 
       deletePopover: true,
       closedPopover: false,
       recriutmentdashboard:false,
       breadCumb:false
      });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
      user: {
        metaData: {  },
      },
      opportunity: { opportunityId, opportunityName, accountId },
      user,
      fetchingOpportunityDetailsById,
      addContactModal,
      addCustomerContactModal,
      handleContactModal,
      handleCustomerContactModal,
      linkContactsCheckToOpportunity,
      getContactListByOpportunityId,
      handleLinkContactModal,
      linkContactsToOpportunity,
      handleDocumentUploadModal,
      handleReactSpeechModal,
      opportunity,
      addSpeechModal,
      documentUploadModal,
    } = this.props;
    const { deliveryInd, stageName } = this.props;
    if(fetchingOpportunityDetailsById){
return  <BundleLoader />
    }
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            {user.requirementAccessInd === true && user.recruitProInd === true ? (
             <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <TransferWithinAStationIcon 
                  style={{fontSize:"1.1rem"}}
                   />
                    <span style={{ marginLeft: '0.25em' }}>RecruitPro</span>
                  </span>
                  {activeKey === "1" && (
                    <>

                      <>
                     
                        <Tooltip title="Add Requirement">
                        {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Add Requirement"
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
                        
                        {/* <Tooltip //title="Tag Position"
                          title={<FormattedMessage
                            id="app.tagposition"
                            defaultMessage="Tag Position"
                          />}

                        >
                           {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                          <Icon
                            type="link"
                            onClick={() => {
                              this.handlepartnerPopoverVisibleChange();
                              handleTagProfileModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-5px",
                              verticalAlign: "center",
                            }}
                          />
                           )}
                        </Tooltip> */}

                        <Tooltip title="Summary">
                      <span
                       style={{marginLeft:"-4px"}}
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleRecriutmentdashboard();
                          }}
                          size="0.875em"                         
                          >
                          {/* <i class="fas fa-chart-line"></i> */}
                          {/* <i class="fas-solid fa-chart-pie"></i> */}
                          <PieChartIcon  style={{fontSize:"1.1rem"}} />
                          </span>
                        </Tooltip>

                        <Tooltip title="Close">
                         <span
                     
                      style={{marginLeft:"4px"}}
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleClosedPopoverVisibleChange();
                          }}
                          size="0.8em"                         
                          >
                             <LockIcon style={{fontSize:"1.1rem"}} />
                            
                          
                          </span>
                      
                        </Tooltip>

                        <Tooltip title="Close">
                         <span
                     
                      style={{marginLeft:"4px"}}
                          type="area-chart"
                          // tooltipTitle="Summary"
                          // onClick={() => {
                          //   this.handleClosedPopoverVisibleChange();
                          // }}
                          size="0.8em"                         
                          >
                            <DeleteIcon  style={{fontSize:"1.1rem"}}
                            onClick={() => {
                            this.handledeletedPopoverVisibleChange();
                          }}
                            />
                            
                          
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
              ) :this.state.closedPopover ? 
              (
                <Suspense fallback={"Loading ..."}>
                <RecruitmentClosedTable  opportunityId={opportunityId}/>
                </Suspense>
              ):this.state.deletePopover ? 
                 
                (
                  <Suspense fallback={"Loading ..."}>
                  <RecruitmentDeletedTable  opportunityId={opportunityId}/>
                  </Suspense>
                ):(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitmentTable  opportunityId={opportunityId}/>
                  </Suspense>
                  
                )}
                  
            </TabPane>
            ):null}
             <TabPane
              tab={
                <>
                  <span>
                    <ContactsIcon   style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: '0.25em' }}>
                      <FormattedMessage
                        id="app.contacts"
                        defaultMessage="Contacts"
                      />
                    </span>
                  </span>
                
                  {activeKey === "2" && (
                    <>
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.create"
                          defaultMessage="Create"
                        />}
                      >
                         {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Create"
                          onClick={() => {
                            this.handleContactPopoverVisibleChange();
                            //handleContactModal(true);
                            handleCustomerContactModal(true);
                          }}
                          size="0.875em"
                          style={{ verticalAlign: "center", marginLeft: "0.125em" }}
                        />
                         )}
                         
                      </Tooltip>
                      <Tooltip 
                          title={<FormattedMessage
                            id="app.tagexisting"
                            defaultMessage="Tag Existing"
                          />}
                      >
                        <LinkOutlined
                            type="link"
                            onClick={() => {
                              this.handleContactPopoverVisibleChange();
                              handleLinkContactModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "-0.31em",
                              verticalAlign: "center",
                            }}
                          />

                     </Tooltip>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContact/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon   style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.documents"
                        defaultMessage="Documents"
                      />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <Tooltip 
                        title={<FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />}
                      >
                        <PlusOutlined
                          type="plus"
                          tooltiptitle={<FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />}
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
                          size="0.875em"
                          style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments opportunity={opportunity} />
              </Suspense>
            </TabPane>

              <TabPane
              tab={
                <>
                  <DynamicFeedIcon   style={{fontSize:"1.1rem"}}/>
                    <span style={{ marginLeft: "0.25em" }}>
                      <FormattedMessage
                        id="app.order"
                        defaultMessage="Order"
                      />
                  </span>
               
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments opportunity={opportunity} /> */}
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{fontSize:"1.1rem"}}/>
                    &nbsp;
                    <FormattedMessage
                      id="app.notes"
                      defaultMessage="Notes"
                    />
                    &nbsp;
                    {activeKey === "4" && (
                      <>
                        <Tooltip title="Voice to Text">
                      <span                       
                   onClick={()=>handleReactSpeechModal(true)}>
                  <MicIcon
                  style={{fontSize:"1.1rem"}}
                 />
                  
                  </span>
                  </Tooltip>
                  </>
                    )}
                  </span>
                </>
              }
              key="4">
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedNotes />
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>

          <AddRecruitModal
           opportunity={this.props.opportunity}
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />

          {/* <AddContactModal
            addContactModal={addContactModal}
            handleContactModal={handleContactModal}
            callback={() => getContactListByOpportunityId(opportunityId)}
            linkContact
          /> */}
          <AddCustomerContactModal
          handleCustomerContactModal={handleCustomerContactModal}
            addCustomerContactModal={addCustomerContactModal}
            opportunityId={opportunityId}
            // defaultCustomers={[{ label: name, value: customerId }]}
            // customerId={{ value: customerId }}
            // callback={() => getContactListByCustomerId(customerId)}
          />

          <LinkContactModal
            opportunityId={{ value: opportunityId }}
            linkAction={linkContactsToOpportunity}
            linkContactsCheckToOpportunity={linkContactsCheckToOpportunity}
            defaultOpportunities={[
              { label: opportunityName, value: opportunityId },
            ]}
            linkType="opportunity"
          />

<AddDocumentModals
opportunityId={opportunityId}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <ReactSpeechModal
          opportunityId={opportunityId}
          handleReactSpeechModal={handleReactSpeechModal}
          addSpeechModal={addSpeechModal}
          />
      
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
  customer
}) => ({
  fetchingOpportunityDetailsById:opportunity.fetchingOpportunityDetailsById,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  opportunityId: opportunity.opportunity.opportunityId,
  // organizationId: auth.userDetails.organizationId,
  opportunity: opportunity.opportunity,
  addCustomerContactModal: customer.addCustomerContactModal,
  addContactModal: contact.addContactModal,
  linkContactModal:contact.linkContactModal,
  addSpeechModal:opportunity.addSpeechModal, 
  addRecruitModal: opportunity.addRecruitModal,
  addTagProfileModal: opportunity.addTagProfileModal,
  documentUploadModal: opportunity.documentUploadModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearReducerState,
      handleContactModal,
      handleCustomerContactModal,
      handleLinkContactModal,
      handleReactSpeechModal,
      handleDocumentUploadModal,
      getContactListByOpportunityId,
       linkContactsCheckToOpportunity,
      handleRecruitModal,
      handleTagProfileModal,
      getRecruitByOpportunityId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailTab);
