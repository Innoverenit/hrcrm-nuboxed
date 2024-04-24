import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import { LinkOutlined, PlusOutlined, 
} from '@ant-design/icons';
import { BundleLoader } from "../../../../../Components/Placeholder";
import {handleDealContactModal,handleDocumentUploadModal} from "../../../DealAction";
import LinkedDocuments from "./Document/LinkedDocuments";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
const LinkedDealContact = lazy(() => import("./DealContact/LinkedDealContact"));
const DealContactModal = lazy(() => import("./DealContact/DealContactModal"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DealDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "2",
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
    // this.props.clearReducerState();
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
      dealDetailsbyID: { invOpportunityId, opportunityName, accountId },
      user,
      fetchDealdetails,
      openDealContactModal,
      handleDealContactModal,
      handleDocumentUploadModal,
      linkContactsCheckToOpportunity,
      getContactListByOpportunityId,
      handleLinkContactModal,
      linkContactsToOpportunity,
  
      handleReactSpeechModal,
      dealDetailsbyID,
      addSpeechModal,
      documentUploadModal,
    } = this.props;
    const { deliveryInd, stageName } = this.props;
    if(fetchDealdetails){
return  <BundleLoader />
    }
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="2"
            onChange={this.handleTabChange}
            forceRender={true}
          >
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
                      {/* <Tooltip 
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
                            handleDealContactModal(true);
                          }}
                          size="0.875em"
                          style={{ verticalAlign: "center", marginLeft: "0.125em" }}
                        />
                         )}
                         
                      </Tooltip> */}
                      <span class=" ml-2">
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
                     </span>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDealContact dealDetailsbyID={this.props.dealDetailsbyID}/>
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
                <LinkedDocuments dealDetailsbyID={this.props.dealDetailsbyID} />
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
            
              </Suspense>
            </TabPane> */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <DealContactModal
            openDealContactModal={openDealContactModal}
            handleDealContactModal={handleDealContactModal}
            // callback={() => getContactListByOpportunityId(opportunityId)}
            linkContact
          />
          {/* <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
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
            <ReactSpeechModal
          opportunityId={opportunityId}
          handleReactSpeechModal={handleReactSpeechModal}
          addSpeechModal={addSpeechModal}
          />
*/}
         <AddDocumentModals
         invOpportunityId={invOpportunityId}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
         
      
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  opportunity,
  deal,
}) => ({
  fetchDealdetails:deal.fetchDealdetails,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  opportunityId: opportunity.opportunity.opportunityId,
  // organizationId: auth.userDetails.organizationId,
  opportunity: opportunity.opportunity,
  openDealContactModal: deal.openDealContactModal,
  linkContactModal:contact.linkContactModal,
  addSpeechModal:opportunity.addSpeechModal, 
  addRecruitModal: opportunity.addRecruitModal,
  addTagProfileModal: opportunity.addTagProfileModal,
  documentUploadModal: deal.documentUploadModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDealContactModal,
      handleDocumentUploadModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailTab);
