import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { FormattedMessage } from "react-intl";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
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
  handleCallActivityModal,
  handleCustomerReactSpeechModal,
  handleCampaignDrawer,
} from "../../../CustomerAction";
import CustomerMapTable from "./CustomerMapTable";
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
        "Quotation",//0
        "Contact",//1
        "Documents",//2
        "Activity",//3
        "Invoice",//4
        "Campaign",//5
        "Summary"//6
      
        
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

  // componentDidMount() {
  //   this.props.getContactListByCustomerId(this.props.customer.customerId);
  // }

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

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon className="!text-icon"/>
                    <span class=" ml-1">
                    {this.state.translatedMenuItems[0]}
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
                        {this.props.user.opportunityCreateInd === true && (
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
                              handleCustomerOpportunityModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
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
                <LinkedOpportunity customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon className="!text-icon"/>
                    <span class=" ml-1">
                      {/* Contacts */}
                      {this.state.translatedMenuItems[1]}
                    </span>
                  </span>
                  {activeKey === "2" && (
                    <>
               
                      <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {this.props.user.contactCreateInd === true && (
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
                              handleCustomerContactModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
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
                <LinkedContact  defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
            />
              </Suspense>
            </TabPane>

            {/* <TabPane
              tab={
                <>
                  <MonetizationOnIcon 
                 style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">Commercials</span>
                </>
              }
              key="9"
            >
              <CommercialsForm />
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <InsertDriveFileIcon 
                 className="!text-icon"
                  />
                  <span class=" ml-1">
                  {this.state.translatedMenuItems[2]}
                    {/* Documents */}
                  </span>
                  {activeKey === "5" && (
                    <>
                     <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                          id="app.uploaddocument"
                          defaultMessage="Upload Document"
                        />
                        }
                      >
                      <PlusOutlined
                        type="plus"
                        //tooltipTitle="Upload Document"
                        tooltiptitle={
                          <FormattedMessage
                            id="app.uploaddocument"
                            defaultMessage="Upload Document"
                          />
                        }
                        onClick={() => handleDocumentUploadModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                       
                      />
                     </Tooltip>
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedDocuments
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span>
                    <NoteAltIcon style={{fontSize:"1.1rem"}}/>
           
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
            
                    {activeKey === "6" && (
                      <>
                        <Tooltip title="Voice to Text">
                          <span
                            onClick={() => handleCustomerReactSpeechModal(true)}
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
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedNotes />
              </Suspense>
            </TabPane> */}
                  <TabPane
              tab={
                <>

                  <ReceiptIcon className="!text-icon"/>
                  <Badge
                count={this.props.customerActivityCount.count}
                overflowCount={999}
              > 
                   </Badge>
                  <span class=" ml-1">                   
                         {this.state.translatedMenuItems[3]}                 
          {/* Activity */}
                 
                  </span>            
                  {activeKey === "7" && (
                    <>
                      <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                        onClick={() => handleCallActivityModal(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                      </Tooltip>
                    </>
                  )}
                
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <CustomerActivityTable

                 customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <ReceiptIcon className="!text-icon"/>
                  <span class=" ml-1">
                    
                         {this.state.translatedMenuItems[4]}
                    {/* Invoice */}
                  </span>
                  {activeKey === "8" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedInvoice 
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                  <ReceiptIcon className="!text-icon"/>
                  <Badge
                // count={this.props.customerActivityCount.count}
                // overflowCount={999}
              > 
                   </Badge>
                  <span class=" ml-1">
                    
                      {this.state.translatedMenuItems[5]}
                    
                 
                  </span>
           
                  {activeKey === "9" && (
                    <>
                        <Tooltip //title="Create"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                        onClick={() => this.props.handleCampaignDrawer(true)}
                        size="0.875em"
                        style={{
                          marginLeft: "0.3125em",
                          verticalAlign: "center",
                        }}
                      />
                      </Tooltip>
                    </>
                  )}
                
                </>
              }
              key="9"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
              
                <CampaignCardView
                 customer={this.props.customer}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
               translatedMenuItems={this.props.translatedMenuItems}
                />
              </Suspense>
            </TabPane>
           
            <TabPane
                        tab={
                            <>
                                <span>
                                    {/* <i class="far fa-file"></i> */}
                                    <span class="ml-1">   {this.state.translatedMenuItems[6]}
                                      {/* Summary */}
                                      </span>
                                </span>
                                
                            </>
                        }
                        key="10"
                    >
                        <Suspense fallback={"Loading ..."}>
                        <CustomerMapTable
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                              translatedMenuItems={this.props.translatedMenuItems}
                               />                       
                        </Suspense>
                    </TabPane>

          </StyledTabs>
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
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          />

          <AddCustomerContactModal
          handleCustomerContactModal={handleCustomerContactModal}
            addCustomerContactModal={addCustomerContactModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
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
           defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
          customer={this.props.customer}
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
const mapStateToProps = ({ auth, customer, }) => ({
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
  callActivityModal:customer.callActivityModal,
  openCampaigndrwr:customer.openCampaigndrwr
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
      //handleCustomerCommercialsModal,
      handleCampaignDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailTab);
