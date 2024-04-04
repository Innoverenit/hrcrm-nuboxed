import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import AddchartIcon from '@mui/icons-material/Addchart'; 
import {handleContactInvestActivityModal} from "../../../ContactInvestAction"
import { PlusOutlined } from "@ant-design/icons";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import WorkIcon from "@mui/icons-material/Work";
import {
  handleContactOpportunityModal,
  handleContactReactSpeechModal,
  handleDocumentUploadModal,
} from "../../../../Contact/ContactAction";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
const ContactInvestTimeLine =lazy(()=>import("../Activity/ContactInvestTimeLine"));
const LinkedContactInvestDocuments =lazy(()=>import("./ContactInvestDocument/LinkedContactInvestDocuments"));
const ContactInvestorActivityModal =lazy(()=>import("../Activity/ContactInvestorActivityModal"));
const LinkedDealTable =lazy(()=>import("./ContactInvestDeal/LinkedDealTable"));
 const TabPane = StyledTabs.TabPane;

class ContactInvestDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const {
      contactInVestDetail: { contactId, firstName, middleName, lastName },
      handleDocumentUploadModal,
      documentUploadModal,
      handleContactInvestActivityModal,
      contactInvestorActivityModal,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                 
                 <WorkIcon style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">
                     <FormattedMessage
                      id="app.deals"
                      defaultMessage="Deals"
                    />
                  </span>
                  {activeKey === "1" && (
                    <>
                    {/* <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      /> */}
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDealTable contactInVestDetail={this.props.contactInVestDetail}/>
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
                    {activeKey === "2" && (
                      <>
                        <Tooltip title="Voice to Text">
                          <span
                            onClick={() => handleContactReactSpeechModal(true)}
                          >
                            <MicIcon style={{ fontSize: "1.1rem" }} />
                          </span>
                        </Tooltip>
                      </>
                    )}
                  </span>
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactInvestNotes contactInVestDetail={this.props.contactInVestDetail}/>
              </Suspense>
            </TabPane> */}
            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon style={{ fontSize: "1.1rem" }} />
                  <span class=" ml-1">
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "2" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{
                          marginLeft: "0.25em",
                          verticalAlign: "center",
                        }}
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactInvestDocuments contactInVestDetail={this.props.contactInVestDetail}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <AddchartIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                    {
                      <FormattedMessage
                        id="app.activity"
                        defaultMessage="Activity"
                      />
                    }
                    {/* Documents */}
                  </span>
                  {activeKey === "3" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                         onClick={() => handleContactInvestActivityModal(true)}
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
                <ContactInvestTimeLine

contactInVestDetail={this.props.contactInVestDetail}
                />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddDocumentModals
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
               <ContactInvestorActivityModal
             contactInVestDetail={this.props.contactInVestDetail}
             contactInvestorActivityModal={contactInvestorActivityModal}
       handleContactInvestActivityModal={handleContactInvestActivityModal}
        />
        {/*  <AddContactOpportunityModal
            addContactOpportunityModal={addContactOpportunityModal}
            handleContactOpportunityModal={handleContactOpportunityModal}
            defaultContacts={[
              {
                label: `${firstName || ""} ${middleName || ""} ${lastName ||
                  ""}`,
                value: contactId,
              },
            ]}
            contactId={{ value: contactId }}
            callback={() => getOpportunityListByContactId(contactId)}
          />
           <ReactContactSpeechModal
           contactId={ contactId }
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact,contactinvest }) => ({
  //   addContactSpeechModal:contact.addContactSpeechModal,
    documentUploadModal: contact.documentUploadModal,
    contactInvestorActivityModal:contactinvest.contactInvestorActivityModal,
  //   addContactOpportunityModal: contact.addContactOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleContactOpportunityModal,
      handleContactInvestActivityModal,
      handleContactReactSpeechModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInvestDetailTab);
