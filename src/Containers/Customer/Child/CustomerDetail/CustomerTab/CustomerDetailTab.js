import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import CampaignIcon from '@mui/icons-material/Campaign';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import {
  handleDocumentUploadModal,
  getContactListByCustomerId,
  getOpportunityListByCustomerId,
  handleCustomerOpportunityModal,
  handleCustomerProjectDrawer,
  handleCustomerContactModal,
  handleRecruitModal,
  handlefileRecruitModal,
  handleTagProfileModal,
  handleInvoiceModal,
  getProspectContactCount,
  handleCustomerReactSpeechModal,
  handleCampaignDrawer,
} from "../../../CustomerAction";
import {handleCallActivityModal} from "../../../../Activity/ActivityAction"
import CustomerMapTable from "./CustomerMapTable";
import ActivityListData from "../../../../Activity/ActivityListData";
import RecruitmentTable from "./Recruitment/RecruitmentTable";
import MainNotes from "../../../../CustomNote/MainNotes";
const ReactCustomerSpeechModal = lazy(() => import("../ReactCustomerSpeechModal"));
const AddProjectDrawer = lazy(() => import("./ProjectTab/AddProjectDrawer"));
const AddCustomerActivityModal = lazy(() => import("../AddCustomerActivityModal"));
const CustomerActivityTable = lazy(() => import("../CustomerActivityTable"));
const LinkedDocuments = lazy(() => import("./Document/LinkedDocuments"));
const AddDocumentModals = lazy(() => import("./Document/AddDocumentModals"));
const AddCustomerContactModal = lazy(() =>
  import("../CustomerTab/ContactTab/AddCustomerContactModal")
);
const AddCustomerOpportunityModal = lazy(() =>
  import("./OpportunityTab/AddCustomerOpportunityModal")
);
const LinkedOpportunity = lazy(() =>
  import("./OpportunityTab/LinkedOpportunity")
);
const LinkedContact = lazy(() => import("./ContactTab/LinkedContact"));
const AddRecruitModal = lazy(() => import("./Recruitment/AddRecruitModal"));
const AddTagProfileModal = lazy(() =>
  import("./Recruitment/AddTagProfileModal")
);
const AddInvoiceModal = lazy(() => import("./Invoice/AddInvoiceModal"));
const LinkedInvoice = lazy(() => import("./Invoice/LinkedInvoice"));
const CampaignDrawer = lazy(() => import("./Campaign/CampaignDrawer"));
const CampaignCardView=lazy(()=>import("./Campaign/CampaignCardView"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
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
      file: false,
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
    this.props.getProspectContactCount(this.props.customer.customerId,"customer")
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
       "213", // "Quotation",//0
       "73", // "Contact",//1
       "1166", // "Documents",//2
       "1165", // "Activity",//3
       "1169", // "Invoice",//4
        "1304",// "Campaign",//5
        "1168",// "Summary"//6
          "104",  // "Create" 7
          "1325",  // "Upload Document"8
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  handleRecriutmentdashboard = () => {
    this.setState({ recriutmentdashboard: true });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ file: true });
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
      customer: { customerId, name },
      handleDocumentUploadModal,
      documentUploadModal,
      handleCustomerReactSpeechModal,
      addCustomerSpeechModal,
      handleCustomerContactModal,
      addCustomerContactModal,
      handleCustomerOpportunityModal,
      handleCustomerProjectDrawer,
      addCustomerOpportunityModal,
      addCustomerProjectDrawer,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      addInvoiceModal,
      callActivityModal,
      handleInvoiceModal,
      handleCallActivityModal,
    } = this.props;
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                 <LinkedOpportunity customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </div>;
        case "2":
          return  <div> <LinkedContact  defaultCustomers={[{ label: name, value: customerId }]}
          uniqueId={this.props.customer.customerId}
          type={"customer"}
          customerId={ customerId }
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          /> </div>;
          case "3":
              return  <div>   <LinkedDocuments
              uniqueId={this.props.customer.customerId}
              type={"customer"}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
             /> </div>;
              case "4":
                  return  <div> 
                    <ActivityListData
uniqueId={this.props.customer.customerId}
type={"prospect"}
customer={this.props.customer}
translateText={this.props.translateText}
selectedLanguage={this.props.selectedLanguage}
translatedMenuItems={this.props.translatedMenuItems}
/> 
                      </div>;
                   case "5":
                      return  <div><LinkedInvoice 
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage}
                    translatedMenuItems={this.props.translatedMenuItems}
                     /></div>;
                      case "6":
                      return  <div> 
                        <CampaignCardView
                 customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> 
                          </div>;
                     case "7":
                      return  <div>  
                           <CustomerMapTable
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                              translatedMenuItems={this.props.translatedMenuItems}
                               />    
                          </div>;
                            case "8":
                              return  <div>  
                                  <RecruitmentTable/>
                                  </div>;
                                  case "9":
                                    return  <div>  
                                        <MainNotes
                                        uniqueId={this.props.customer.customerId}
                                        type={"prospect"}/>
                                        </div>;
        default:
          return null;
      }
    };
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span class="!text-tab">
                    <LightbulbIcon className="!text-icon text-[#a69658]"/>
                    <span class=" ml-1">
                    {this.state.translatedMenuItems[0]}
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip //title="Create"
                        title= {this.state.translatedMenuItems[7]}
                      >
                        {this.props.user.opportunityCreateInd === true && (
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                            tooltiptitle= {this.state.translatedMenuItems[7]}
                            onClick={() => {
                              handleCustomerOpportunityModal(true);
                            }}
                         
                          />
                        )}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon className="!text-icon text-[#4f7cac]"/>
                    <span class="!text-tab ml-1">
                      {/* Contacts */}
                      {this.state.translatedMenuItems[1]}
                    </span>
                  </span>
                  <Badge
                                    size="small"
                                    count={(this.props.contactCount.CustomerContactDetails) || 0}
                                    overflowCount={999}
                                    offset={[ 0, -16]}
                                ></Badge>
                                 &nbsp;
                  {activeKey === "2" && (
                    <>
               
                      <Tooltip //title="Create"
                        title= {this.state.translatedMenuItems[7]}
                      >
                        {this.props.user.contactCreateInd === true && (
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" 
                          
                            //tooltipTitle="Create"
                            tooltiptitle= {this.state.translatedMenuItems[7]}
                            onClick={() => {
                              handleCustomerContactModal(true);
                            }}
                      
                           
                          />
                        )}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
            
              </Suspense>
            </TabPane>
          
            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                 className="!text-icon text-[#41ead4]"
                  />
                  <span class="!text-tab ml-1">
                  {this.state.translatedMenuItems[2]}
                    {/* Documents */}
                  </span>
                  <Badge
                count={this.props.documentsByCount.CustomerDocumentDetails}
                overflowCount={999}
              > 
                   </Badge>
                  {activeKey === "3" && (
                    <>
                     <Tooltip //title="Create"
                        title=
                         {this.state.translatedMenuItems[8]}
                      >
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                        tooltiptitle= {this.state.translatedMenuItems[8]}
                        onClick={() => handleDocumentUploadModal(true)}
                       
                       
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
              
              </Suspense>
            </TabPane>      
                  <TabPane
              tab={
                <>
 <Badge
                count={this.props.customerActivityCount.count}
                overflowCount={999}
              > 
                   </Badge>
<HourglassFullIcon className="text-blue-500 !text-icon" />
                 
                
                  <span class="!text-tab ml-1">   
                          
                         {this.state.translatedMenuItems[3]}                 
          {/* Activity */}
                 
                  </span>            
                  {activeKey === "4" && (
                    <>
                      <Tooltip //title="Create"
                        title= {this.state.translatedMenuItems[7]}
                      >
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                       
                        title= {this.state.translatedMenuItems[7]}
                        onClick={() => handleCallActivityModal(true)}
                     
                       
                      />
                      </Tooltip>
                    </>
                  )}
                
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <CustomerActivityTable

                 customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <ReceiptIcon className="!text-icon text-[#b91372]"/>
                  <span class="!text-tab ml-1">
                    
                         {this.state.translatedMenuItems[4]}
                    {/* Invoice */}
                  </span>
                  {activeKey === "5" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedInvoice 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                  <CampaignIcon className="!text-icon text-[#f5f749]"/>
                  <Badge
                // count={this.props.customerActivityCount.count}
                // overflowCount={999}
              > 
                   </Badge>
                  <span class="!text-tab ml-1">
                    
                      {this.state.translatedMenuItems[5]}
                    
                 
                  </span>
           
                  {activeKey === "6" && (
                    <>
                        <Tooltip //title="Create"
                        title= {this.state.translatedMenuItems[7]}
                      >
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                
                        title= {this.state.translatedMenuItems[7]}
                        onClick={() => this.props.handleCampaignDrawer(true)}
                       
                      />
                      </Tooltip>
                    </>
                  )}
                
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
              
                {/* <CampaignCardView
                 customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>
           
            <TabPane
                        tab={
                            <>
                                <span>
                                    {/* <i class="far fa-file"></i> */}
                                    <span class="!text-tab ml-1">  
                                    <SummarizeIcon className="!text-icon text-[#55d6c2] mr-1"/>
                                       {this.state.translatedMenuItems[6]}
                                      {/* Summary */}
                                      </span>
                                </span>
                                
                            </>
                        }
                        key="7"
                    >
                        <Suspense fallback={"Loading ..."}>
                        {/* <CustomerMapTable
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                              translatedMenuItems={this.props.translatedMenuItems}
                               />                        */}
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span> 
                                    <span class="!text-tab ml-1">  
                                    <SummarizeIcon className="!text-icon text-[#55d6c2] mr-1"/>
                                    RecruitPro
                                      </span>
                                </span>
                                
                            </>
                        }
                        key="8"
                    >
                      
                        <Suspense fallback={"Loading ..."}>
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span> 
                                    <span class="!text-tab ml-1">  
                                    <NoteAltIcon
                className=" !text-icon cursor-pointer text-green-800 "
              />
                                   Notes
                                      </span>
                                </span>
                                
                            </>
                        }
                        key="9"
                    >
                       <Suspense fallback={"Loading ..."}>
                       </Suspense>
                    </TabPane>
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </TabsWrapper>
        <Suspense fallback={null}>
          <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
            selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}/>
          

     
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />

          <AddDocumentModals
           customerId={customerId}
           uniqueId={this.props.customer.customerId}
           type={"customer"}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />

          <AddCustomerContactModal
          customer={this.props.customer}
          name={this.props.customer.name}
          handleCustomerContactModal={handleCustomerContactModal}
            addCustomerContactModal={addCustomerContactModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            id={this.props.customer.customerId}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
            translatedMenuItems={this.state.translatedMenuItems}
            // callback={() => getContactListByCustomerId(customerId)}
          />

       
          <AddInvoiceModal
            addInvoiceModal={addInvoiceModal}
            handleInvoiceModal={handleInvoiceModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />
          <ReactCustomerSpeechModal
            customerId={customerId}
            handleCustomerReactSpeechModal={handleCustomerReactSpeechModal}
            addCustomerSpeechModal={addCustomerSpeechModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />
          <AddCustomerOpportunityModal
            addCustomerOpportunityModal={addCustomerOpportunityModal}
            handleCustomerOpportunityModal={handleCustomerOpportunityModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
            // callback={() => getOpportunityListByCustomerId(customerId)}
          />
                 <AddProjectDrawer
            addCustomerProjectDrawer={addCustomerProjectDrawer}
            handleCustomerProjectDrawer={handleCustomerProjectDrawer}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />
          
          <AddCustomerActivityModal
           defaultValue={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            uniqueId={this.props.customer.customerId}
          customer={this.props.customer}
          name={this.props.customer.name}
          // callback={() => getContactListByCustomerId(customerId)}
            callActivityModal={callActivityModal}
            handleCallActivityModal={handleCallActivityModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          /> 
          <CampaignDrawer
          customer={this.props.customer}
           openCampaigndrwr={this.props.openCampaigndrwr}
           handleCampaignDrawer={this.props.handleCampaignDrawer}
           selectedLanguage={this.props.selectedLanguage}
           translateText={this.props.translateText}
          />
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer,activity }) => ({
  documentUploadModal: customer.documentUploadModal,
  customerActivityCount:customer.customerActivityCount,
  addCustomerContactModal: customer.addCustomerContactModal,
  addCustomerOpportunityModal: customer.addCustomerOpportunityModal,
  customerId: customer.customer.customerId,
  user: auth.userDetails,
  addCustomerProjectDrawer:customer.addCustomerProjectDrawer,
  userId: auth.userDetails.userId,
  addCustomerSpeechModal: customer.addCustomerSpeechModal,
  customer: customer.customer,
  addRecruitModal: customer.addRecruitModal,
  addFileRecruitModal: customer.addFileRecruitModal,
  addTagProfileModal: customer.addTagProfileModal,
  addInvoiceModal: customer.addInvoiceModal,
  callActivityModal:activity.callActivityModal,
  openCampaigndrwr:customer.openCampaigndrwr,
  contactCount:customer.contactCount,
  documentsByCount:customer.documentsByCount
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      handleCustomerContactModal,
      handleCustomerOpportunityModal,
      getContactListByCustomerId,
      getOpportunityListByCustomerId,
      handleRecruitModal,
      handlefileRecruitModal,
      handleTagProfileModal,
      handleInvoiceModal,
      handleCallActivityModal,
      handleCustomerProjectDrawer,
      handleCustomerReactSpeechModal,
      getProspectContactCount,
      //handleCustomerCommercialsModal,
      handleCampaignDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
