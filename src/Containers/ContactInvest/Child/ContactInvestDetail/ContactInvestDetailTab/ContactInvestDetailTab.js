import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleCallActivityModal} from "../../../../Activity/ActivityAction"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {handleContactInvestActivityModal} from "../../../ContactInvestAction"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import {
  handleContactOpportunityModal,
  handleContactReactSpeechModal,
  handleDocumentUploadModal,
} from "../../../../Contact/ContactAction";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import ActivityListData from "../../../../Activity/ActivityListData";
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
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "490",//0"Deals"
        "1166",//1"Documents"
        "1325",//2"Upload Document"
        "1165",//3"Activity"
       "104", // "Create"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

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
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                 <LinkedDealTable contactInVestDetail={this.props.contactInVestDetail}
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/>
              </div>;
        case "2":
          return  <div>    <LinkedContactInvestDocuments contactInVestDetail={this.props.contactInVestDetail}
          selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}
       /></div>;
          case "3":
              return  <div>  
                {/* <ContactInvestTimeLine
              contactInVestDetail={this.props.contactInVestDetail}
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
      /> */}
        <ActivityListData
                      uniqueId={this.props.contactInVestDetail.contactId}
                      type={"contact"}
                      />
      </div>;
        default:
          return null;
      }
    };
    return (
      <>
        <TabsWrapper style={{height:"87vh"}}>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                 
                 <CurrencyExchangeIcon className="!text-icon  text-[#fce762]"/>
                    <span class=" ml-1 !text-tab text-sm">
                    {this.state.translatedMenuItems[0]}
                  
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
                {/* <LinkedDealTable contactInVestDetail={this.props.contactInVestDetail}
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/> */}
              </Suspense>
            </TabPane>       
            <TabPane
              tab={
                <>
                <i 
                  class="far fa-file  !text-icon text-[#41ead4]"
                  ></i>
                  <span class=" ml-1 !text-tab text-sm">
                  {this.state.translatedMenuItems[1]}
                  
                  </span>
                  {activeKey === "2" && (
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                    
                        // tooltipTitle="Upload Document"
                        tooltiptitle={this.state.translatedMenuItems[2]}
                        onClick={() => handleDocumentUploadModal(true)}
                       
                      />
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedContactInvestDocuments contactInVestDetail={this.props.contactInVestDetail}
                   selectedLanguage={this.props.selectedLanguage}
                   translateText={this.props.translateText}
                /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
               <HourglassFullIcon className="text-blue-500  !text-icon" />
                  <span class=" text-sm !text-tab">
                    
                      {this.state.translatedMenuItems[3]}
                    
                    {/* Documents */}
                  </span>
                  {activeKey === "3" && (
                    <>
                       <AddBoxIcon className=" !text-icon text-sm  ml-1 items-center text-[#6f0080ad]"
                  
                        title={this.state.translatedMenuItems[4]}
                         onClick={() => this.props.handleCallActivityModal(true)}
                       
                      />
                    </>
                  )}
                
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <ContactInvestTimeLine
                        contactInVestDetail={this.props.contactInVestDetail}
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                /> */}
              </Suspense>
            </TabPane>
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
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
                contact={this.props.contactInVestDetail.contactId}
        type="contact"
        callActivityModal={this.props.callActivityModal}
        handleCallActivityModal={this.props.handleCallActivityModal}
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
const mapStateToProps = ({ contact,contactinvest,activity }) => ({
    documentUploadModal: contact.documentUploadModal,
    contactId:contact.contact.contactId,
    callActivityModal:activity.callActivityModal,
    contactInvestorActivityModal:contactinvest.contactInvestorActivityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleContactOpportunityModal,
      handleContactInvestActivityModal,
      handleContactReactSpeechModal,
      handleCallActivityModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInvestDetailTab);
