import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddchartIcon from '@mui/icons-material/Addchart'; 
import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import {getContactListByInvestorId,handleInvestorContactModal,
  handleActivityModal,
  handleDealModal
} from "../../../InvestorAction";
import {
  handleDocumentUploadModal,
} from "../../../../Customer/CustomerAction";
import InvestorActivityModal from "../InvestorActivity/InvestorActivityModal";
import InvestorTimeLine from "../InvestorActivity/InvestorTimeLine";
import CreateDealModal from "../../../../Deal/Child/CreateDealModal";
import InvestorDeals from "./InvestorDeals";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
const InvestorLinkedContact =lazy(()=>import("./InvestorContact/InvestorLinkedContact"));
const InvestorLinkedDocuments =lazy(()=>import("./InvestorDoc/InvestorLinkedDocuments"));
const AddInvestorContactModal=lazy(()=>import("./InvestorContact/AddInvestorContactModal"));

const TabPane = StyledTabs.TabPane;

function handleRefreshPage() {
  window.location.reload();
}

class InvestorDetailTab extends Component {
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
    this.props.
getContactListByInvestorId(this.props.investorDetails.investorId);
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
      investorDetails: { investorId, name },
      handleDocumentUploadModal,
      documentUploadModal,
      handleActivityModal,
      opendocumentUploadModal,
      opencreateDealModal,
      investorActivityModal,
      handleCustomerReactSpeechModal,
      addCustomerSpeechModal,
      handleInvestorContactModal,
      addCustomerContactModal,
      handleCustomerOpportunityModal,
      handleCustomerProjectDrawer,
      addCustomerOpportunityModal,
      addCustomerProjectDrawer,
      openInvestorContactModal,
      getContactListByInvestorId,
      getOpportunityListByCustomerId,
      addInvoiceModal,
      handleInvoiceModal,
      handleDealModal,
    } = this.props;

    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {/* <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon  style={{fontSize:"1.1rem"}}/>
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
                <LinkedOpportunity />
              </Suspense>
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <span>
 <ContactsIcon style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      <FormattedMessage
                        id="app.contacts"
                        defaultMessage="Contacts"
                      />
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip 
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {/* {this.props.user.contactCreateInd === true && ( */}
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
                              handleInvestorContactModal(true);
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
                <InvestorLinkedContact investorDetails={this.props.investorDetails}/>
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
                  style={{fontSize:"1.1rem"}}
                  />
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
                        title={
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
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <InvestorLinkedDocuments investorDetails={this.props.investorDetails}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <AddchartIcon style={{fontSize:"1.1rem"}}/>
                  <Badge
                count={this.props.investorActivityCount.count}
                overflowCount={999}
              > 
                  <span class=" ml-1">
                    {
                      <FormattedMessage
                        id="app.activity"
                        defaultMessage="Activity"
                      />
                    }
                    {/* Documents */}
                  </span>
                  </Badge>
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
                         onClick={() => handleActivityModal(true)}
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
                <InvestorTimeLine

investorDetails={this.props.investorDetails}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <CurrencyExchangeIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                    {
                      <FormattedMessage
                        id="app.Deals"
                        defaultMessage="Deals"
                      />
                    }
                    {/* Documents */}
                  </span>
                  {activeKey === "4" && (
                    <>
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
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                         onClick={() => handleDealModal(true)}
                        size="0.875em"
                       
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
                <InvestorDeals

investorDetails={this.props.investorDetails}
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
                <InvestorLinkedNotes investorDetails={this.props.investorDetails} />
              </Suspense>
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <ReceiptIcon style={{fontSize:"1.1rem"}}/>
                  <span class=" ml-1">
                    {
                      <FormattedMessage
                        id="app.invoice"
                        defaultMessage="Invoice"
                      />
                    }
                  
                  </span>
                  {activeKey === "7" && (
                    <>
                      <PlusOutlined
                        type="plus"
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                        onClick={() => handleInvoiceModal(true)}
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
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <InvestorLinkedInvoice investorDetails={this.props.investorDetails}/>
              </Suspense>
            </TabPane> */}
           
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <AddInvestorContactModal
          investorDetails={this.props.investorDetails}
            openInvestorContactModal={openInvestorContactModal}
            defaultInvestor={[{ label: name, value: investorId }]}
            investorId={{ value: investorId }}
            callback={() => getContactListByInvestorId(investorId)}
        />
          <AddDocumentModals
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
          />
          <CreateDealModal 
            investorDetails={this.props.investorDetails}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}/>
             <InvestorActivityModal
            
              customerId={this.props. customerId }
              customer={this.props.customer}
               defaultInvestor={[{ label: name, value: investorId }]}
               investorId={{ value: investorId }}
         investorDetails={this.props.investorDetails}
         investorActivityModal={investorActivityModal}
            handleActivityModal={handleActivityModal}
          />

          {/* <AddRecruitModal
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
          />
          <AddInvoiceModal
            addInvoiceModal={addInvoiceModal}
            handleInvoiceModal={handleInvoiceModal}
          />
          <ReactCustomerSpeechModal
            customerId={customerId}
            handleCustomerReactSpeechModal={handleCustomerReactSpeechModal}
            addCustomerSpeechModal={addCustomerSpeechModal}
          />
          <AddCustomerOpportunityModal
            addCustomerOpportunityModal={addCustomerOpportunityModal}
            handleCustomerOpportunityModal={handleCustomerOpportunityModal}
            defaultCustomers={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            callback={() => getOpportunityListByCustomerId(customerId)}
          />
                 <AddProjectDrawer
            addCustomerProjectDrawer={addCustomerProjectDrawer}
            handleCustomerProjectDrawer={handleCustomerProjectDrawer}
          /> */}
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({ auth, investor, customer, opportunity,deal }) => ({
  opendocumentUploadModal: investor.opendocumentUploadModal,
  user: auth.userDetails,
  documentUploadModal: customer.documentUploadModal,
  userId: auth.userDetails.userId,
  investorActivityCount:investor.investorActivityCount,
  investorActivityModal:investor.investorActivityModal,
contactsbyInvestorId:investor.contactsbyInvestorId,
opencreateDealModal:investor.opencreateDealModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      handleActivityModal,
      handleDealModal,
      handleInvestorContactModal,
      // handleCustomerOpportunityModal,
getContactListByInvestorId,
handleDocumentUploadModal
      // getOpportunityListByCustomerId,
      // handleRecruitModal,
      // handlefileRecruitModal,
      // handleTagProfileModal,
      // handleInvoiceModal,
      // handleCustomerProjectDrawer,
      // handleCustomerReactSpeechModal,
      //handleCustomerCommercialsModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDetailTab);
