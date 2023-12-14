import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../Components/UI/Antd";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {
  handleLeadsContactModal,
  handleLeadsOpportunityModal,
  getContactListByLeadsId,
  handleLeadsDocumentUploadModal,
  handleLeadsReactSpeechModal,
} from "../../LeadsAction";
import AddLeadsContactModal from "../LeadsDetailTab/LeadsContact/AddLeadsContactModal";
import AddLeadsOpportunityModal from "../LeadsDetailTab/OpportunityTab/AddLeadsOpportunityModal";
import LeadsOpportunity from "../LeadsDetailTab/OpportunityTab/LeadsOpportunity";
import AddLeadsDocumentModal from "../DocumentTab/AddLeadsDocumentModal";
import LeadsDocuments from "../DocumentTab/LeadsDocuments";
import ReactLeadsrSpeechModal from "../DocumentTab/ReactLeadsSpeechModal";

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class LeadDetailTab extends Component {
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
      file: false,
    };
  }
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
    this.props.getContactListByLeadsId(this.props.lead.leadsId);
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
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
      lead: { leadsId, name },
      handleLeadsDocumentUploadModal,
      leadsDocumentUploadModal,
      handleLeadsReactSpeechModal,
      addLeadsSpeechModal,
      handleLeadsContactModal,
      addLeadsContactModal,
      handleLeadsOpportunityModal,
      addLeadsOpportunityModal,
      getContactListByLeadsId,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon
                      style={{ fontSize: "1.1rem" }}
                    />
                    <span class=" ml-1">
                      <FormattedMessage
                        id="app.opportunity"
                        defaultMessage="Opportunity"
                      />
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {/* {this.props.user.opportunityCreateInd === true && ( */}
                        <PlusOutlined
                          type="plus"
                          //tooltipTitle="Create"
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handleLeadsOpportunityModal(true);
                          }}
                          size="0.875em"
                        />
                        {/* )} */}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LeadsOpportunity />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span>
                    <ContactsIcon style={{ fontSize: "1.1rem" }} />
                    <span class=" ml-1">
                      <FormattedMessage
                        id="app.contacts"
                        defaultMessage="Contacts"
                      />
                    </span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      &nbsp;
                      <Tooltip 
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        <PlusOutlined
                          type="plus"
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handleLeadsContactModal(true);
                          }}
                          size="0.875em"
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
                <LeadsContact />
              </Suspense>
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <FileCopyIcon style={{ fontSize: "1.1rem" }} />
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleLeadsDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LeadsDocuments />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{ fontSize: "1.1rem" }} />
                    &nbsp;
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    &nbsp;
                    {activeKey === "4" && (
                      <>
                        <Tooltip title="Voice to Text">
                          <span
                            onClick={() => handleLeadsReactSpeechModal(true)}
                          >
                            <MicIcon style={{ fontSize: "1.1rem" }} />
                          </span>
                        </Tooltip>
                      </>
                    )}
                  </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LeadsNotes />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <i class="fas fa-print" style={{ fontSize: "1.1rem" }}></i>
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.initiatives"
                      defaultMessage="Initiatives"
                    />
                  </span>
                </>
              }
              key="5"
            >
              <LeadsInitiativeForm lead={this.props.leadsId} />
            </TabPane> */}

          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
          <AddLeadsDocumentModal
            leadsDocumentUploadModal={leadsDocumentUploadModal}
            handleLeadsDocumentUploadModal={handleLeadsDocumentUploadModal}
          />

          <AddLeadsContactModal
            addLeadsContactModal={addLeadsContactModal}
            defaultLeads={[{ label: name, value: leadsId }]}
            leadsId={{ value: leadsId }}
            callback={() => getContactListByLeadsId(leadsId)}
          />

          <ReactLeadsrSpeechModal
            leadsId={leadsId}
            handleLeadsReactSpeechModal={handleLeadsReactSpeechModal}
            addLeadsSpeechModal={addLeadsSpeechModal}
          />
          <AddLeadsOpportunityModal
            addLeadsOpportunityModal={addLeadsOpportunityModal}
            handleLeadsOpportunityModal={handleLeadsOpportunityModal}
            lead={this.props.lead}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, leads, contact, opportunity }) => ({
  addLeadsContactModal: leads.addLeadsContactModal,
  addLeadsOpportunityModal: leads.addLeadsOpportunityModal,
  leadsId: leads.lead.leadsId,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  leadsDocumentUploadModal: leads.leadsDocumentUploadModal,
  addLeadsSpeechModal: leads.addLeadsSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadsContactModal,
      getContactListByLeadsId,
      handleLeadsOpportunityModal,
      handleLeadsDocumentUploadModal,
      handleLeadsReactSpeechModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailTab);
