import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlePartnerReactSpeechModal } from "../../../PartnerAction";
import { Tooltip } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {
  handleDocumentUploadModal,
  getContactListByPartnerId,
  getOpportunityListByPartnerId,
} from "../../../PartnerAction";
import ContactsIcon from '@mui/icons-material/Contacts';
import MicIcon from '@mui/icons-material/Mic';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LinkedDocuments from "./DocumentTab/LinkedDocuments";
import AddDocumentModal from "./DocumentTab/AddDocumentModal";
import { handlePartnerContactModal } from "../../../PartnerAction";
import { handlePartnerOpportunityModal } from "../../../PartnerAction";
import AddPartnerContactModal from "./ContactTab/AddPartnerContactModal";
import AddPartnerOpportunityModal from "./OpportunityTab/AddPartnerOpportunityModal";
import LinkedPartnerNotes from "./NotesTab/LinkedPartnerNotes";
import LinkedPartnerOpportunity from "./OpportunityTab/LinkedPartnerOpportunity";
import LinkedPartnerContact from "./ContactTab/LinkedPartnerContact";
import CommercialsForm from "./Commercials/CommercialsForm";
import ReactPartnerSpeechModal from "../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/ReactPartnerSpeechModal";
import LinkedNotes from "../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/LinkedNotes";

const TabPane = StyledTabs.TabPane;

class ContactDetailTab extends Component {
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
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ recriutmentdashboard: false });
  };

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
      partner: { partnerId, partnerName },
      handleDocumentUploadModal,
      documentUploadModal,
      user,
      handlePartnerContactModal,
      addPartnerContactModal,
      handlePartnerOpportunityModal,
      addPartnerOpportunityModal,
      getContactListByPartnerId,
      addPartnerSpeechModal,
      getOpportunityListByPartnerId,
      handlePartnerReactSpeechModal,
    } = this.props;
    console.log(partnerId);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            
          <TabPane
              tab={
                <>
                  <span>
                    <ContactsIcon   style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      <FormattedMessage
                              id="app.contacts"
                              defaultMessage="Contacts"
                            />
                      </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      {/* {this.props.user.contactCreateInd === true && ( */}
                      <Tooltip title="Create">
                      <PlusOutlined
                          type="plus"
                          tooltipTitle={
                            <FormattedMessage
                              id="app.create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handlePartnerContactModal(true);
                          }}
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                     
                    
                      </Tooltip>
                      
                     
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedPartnerContact partnerId={partnerId} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>  
                  <MonetizationOnIcon 
                    style={{fontSize:"1.1rem"}}
                  />              
                  <span class=" ml-1">                  
                   Commercials
                  </span>                 
                </>
              }
              key="2"
            >
             <CommercialsForm/>
             
            </TabPane>
            <TabPane
              tab={
                <>
                     <InsertDriveFileIcon 
                       style={{fontSize:"1.1rem"}}
                  />
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
                        tooltipTitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="14px"
                        style={{ marginLeft: "5px", verticalAlign: "center" }}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments />
              </Suspense>
            </TabPane>

          
             <TabPane
              tab={
                <>
                <span>
                <NoteAltIcon   style={{fontSize:"1.1rem"}}/>
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
                   onClick={()=>handlePartnerReactSpeechModal(true)}>
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
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                <LinkedPartnerNotes />{" "}
              </Suspense>
            </TabPane>


          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />

          <AddPartnerContactModal
            addPartnerContactModal={addPartnerContactModal}
            handlePartnerContactModal={handlePartnerContactModal}
            defaultPartners={[{ label: partnerName, value: partnerId }]}
            partnerId={{ value: partnerId }}
            callback={() => getContactListByPartnerId(partnerId)}
          />
          <ReactPartnerSpeechModal
          partnerId={partnerId}
          handlePartnerReactSpeechModal={handlePartnerReactSpeechModal}
          addPartnerSpeechModal={addPartnerSpeechModal}
          />

        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ partner, opportunity }) => ({
  documentUploadModal: partner.documentUploadModal,
  addPartnerContactModal: partner.addPartnerContactModal,
  addPartnerOpportunityModal: partner.addPartnerOpportunityModal,
  partnerId: partner.partnerId,
  addPartnerSpeechModal:partner.addPartnerSpeechModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handlePartnerContactModal,
      handlePartnerOpportunityModal,
      getContactListByPartnerId,
      getOpportunityListByPartnerId,
      handlePartnerReactSpeechModal,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
