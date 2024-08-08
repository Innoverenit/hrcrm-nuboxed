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
        <TabsWrapper style={{height:"85vh"}}>
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
                <LinkedContactInvestDocuments contactInVestDetail={this.props.contactInVestDetail}
                
                />
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
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            contactId={contactId}
          />
               <ContactInvestorActivityModal
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}
                    translatedMenuItems={this.props.translatedMenuItems}
             contactInVestDetail={this.props.contactInVestDetail}
             contactInvestorActivityModal={contactInvestorActivityModal}
       handleContactInvestActivityModal={handleContactInvestActivityModal}
        />  
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact,contactinvest }) => ({
    documentUploadModal: contact.documentUploadModal,
    contactId:contact.contact.contactId,
    contactInvestorActivityModal:contactinvest.contactInvestorActivityModal,
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
