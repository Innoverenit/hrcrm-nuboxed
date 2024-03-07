import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { handleDocumentUploadModal } from "../../../ContactAction";
import { handleContactOpportunityModal,handleContactReactSpeechModal } from "../../../ContactAction";
import { getOpportunityListByContactId } from "../../../ContactAction";
const AddDocumentModal =lazy(()=>import("./Document/AddDocumentModal"));
const LinkedDocuments =lazy(()=>import("./Document/LinkedDocuments"));
const ReactContactSpeechModal =lazy(()=>import("../ReactContactSpeechModal"));
const AddContactOpportunityModal =lazy(()=>import("../../../Child/ContactDetail/ContactTab/Opportunity/AddContactOpportunityModal"));

const TabPane = StyledTabs.TabPane;

class ContactDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState(  key );
  render() {
    const { activeKey } = this.state;
    const {
      contact: { contactId, firstName, middleName, lastName },
      handleDocumentUploadModal,
      documentUploadModal,
      handleContactOpportunityModal,
      addContactOpportunityModal,
      handleContactReactSpeechModal,
      addContactSpeechModal,
      getOpportunityListByContactId,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
          {/* <TabPane
              tab={
                <>
                 
                 <WorkIcon style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">
                     <FormattedMessage
                      id="app.orders"
                      defaultMessage="Orders"
                    />
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
                <OpportunityTable />
              </Suspense>
            </TabPane> */}
            
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
                    {activeKey === "2" && (
                      <>
                      
                        <Tooltip title="Voice to Text">
                      <span                       
                    onClick={()=>handleContactReactSpeechModal(true)}
                   >
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
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedContactNotes />
              </Suspense>
            </TabPane> */}
            <TabPane
              tab={
                <>
                 <InsertDriveFileIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                   
                    <FormattedMessage
                      id="app.documents"
                      defaultMessage="Documents"
                    />
                    {/* Documents */}
                  </span>
                  {activeKey === "1" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={<FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />}
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddDocumentModal
                  contactId={ contactId }
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <AddContactOpportunityModal
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
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact }) => ({
  addContactSpeechModal:contact.addContactSpeechModal,
  documentUploadModal: contact.documentUploadModal,
  addContactOpportunityModal: contact.addContactOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleContactOpportunityModal,
      getOpportunityListByContactId,
      handleContactReactSpeechModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
