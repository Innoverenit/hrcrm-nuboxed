import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LinkedOpportunity from "../ContactTab/Opportunity/LinkedOpportunity"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { handleDocumentUploadModal } from "../../../ContactAction";
import { handleContactReactSpeechModal,handleContactOpportunityModal } from "../../../ContactAction";
import { getOpportunityListByContactId } from "../../../ContactAction";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { BundleLoader } from "../../../../../Components/Placeholder";
import LinkedDocuments from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments";
import RecruitProContact from "./RecruitProContact";

const ReactContactSpeechModal =lazy(()=>import("../ReactContactSpeechModal"));
const AddContactOpportunityModal =lazy(()=>import("../../../Child/ContactDetail/ContactTab/Opportunity/AddContactOpportunityModal"));

const TabPane = StyledTabs.TabPane;

class ContactDetailTab extends Component {
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

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       '1166', //   Documents 0
       '213',// Quotation 1


      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                <LinkedDocuments
              uniqueId={contactId}
              type={"contact"}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
             /> 
              </div>;
        case "2":
          return  <div>   <LinkedOpportunity
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
         /></div>;
         case "3":
          return  <div> 
            <RecruitProContact/>
          </div>;
        default:
          return null;
      }
    };
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

    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    }
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
         
            <TabPane
              tab={
                <>
                 <InsertDriveFileIcon className="!text-icon"/>
                    <span class=" ml-1">
                    {this.state.translatedMenuItems[0]} 
                    {/* Documents */}
                  </span>
                  <Badge
                count={this.props.documentsByCount.document}
                overflowCount={999}
              > 
                   </Badge>
                  {activeKey === "1" && (
                    <>
                 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
              
                     tooltipTitle="Upload Document"
                      
                        onClick={() => handleDocumentUploadModal(true)}                      
                      />
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>


            <TabPane
              tab={
                <>
            <LightbulbIcon className="!text-icon text-[#84a59d]"/>
                    <span class=" ml-1">
                    {this.state.translatedMenuItems[1]}            
                    {/* Quotation */}
                  </span>
                  {/* {activeKey === "2" && ( */}
                    <>
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                  
                        onClick={() => {
                          handleContactOpportunityModal(true);
                        }}
                      
                      />
                    </>
                  {/* )} */}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedOpportunity
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
            <LightbulbIcon className="!text-icon text-[#84a59d]"/>
                    <span class=" ml-1">
                    RecruitPro
                  </span>
                    <>
                     
                    </>
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
              </Suspense>
            </TabPane>
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddDocumentModals
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            contactId={ contactId }
            uniqueId={contactId}
            type={"contact"}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
          <AddContactOpportunityModal
           contactId={ contactId }
            addContactOpportunityModal={addContactOpportunityModal}
            handleContactOpportunityModal={handleContactOpportunityModal}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.state.translatedMenuItems}
            // defaultContacts={[
            //   {
            //     label: `${firstName || ""} ${middleName || ""} ${lastName ||
            //       ""}`,
            //     value: contactId,
            //   },
            // ]}
            // contactId={{ value: contactId }}
            // callback={() => getOpportunityListByContactId(contactId)}
          />
           <ReactContactSpeechModal
           contactId={ contactId }
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ contact ,customer}) => ({
  addContactSpeechModal:contact.addContactSpeechModal,
  documentUploadModal: contact.documentUploadModal,
  addContactOpportunityModal: contact.addContactOpportunityModal,
  documentsByCount:customer.documentsByCount
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
