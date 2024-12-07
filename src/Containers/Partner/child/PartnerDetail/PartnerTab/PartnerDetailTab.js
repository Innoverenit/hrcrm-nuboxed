import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlePartnerReactSpeechModal } from "../../../PartnerAction";
import { Tooltip } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../Components/UI/Antd";
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
import { handlePartnerContactModal } from "../../../PartnerAction";
import { handlePartnerOpportunityModal } from "../../../PartnerAction";
import AddPartnerContactModal from "./ContactTab/AddPartnerContactModal";
import LinkedPartnerContact from "./ContactTab/LinkedPartnerContact";
import CommercialsForm from "./Commercials/CommercialsForm";
import ReactPartnerSpeechModal from "../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/ReactPartnerSpeechModal";


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
                     Contacts
                      </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      {/* {this.props.user.contactCreateInd === true && ( */}
                      <Tooltip title="Create">
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          
                          onClick={() => {
                            handlePartnerContactModal(true);
                          }}
                       
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
                    Documents
                  </span>
                  {activeKey === "3" && (
                    <>
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        tooltipTitle="Upload Document"
                         
                        onClick={() => handleDocumentUploadModal(true)}
                      />
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments /> */}
              </Suspense>
            </TabPane>

          
             <TabPane
              tab={
                <>
                <span>
                <NoteAltIcon   style={{fontSize:"1.1rem"}}/>
                &nbsp;
                  Notes
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
                {/* <LinkedPartnerNotes />{" "} */}
              </Suspense>
            </TabPane>


          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          {/* <AddDocumentModal
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          /> */}

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
