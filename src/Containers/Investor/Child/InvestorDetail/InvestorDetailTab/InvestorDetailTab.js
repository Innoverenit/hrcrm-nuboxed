// import React, { Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Badge, Tooltip } from "antd";
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import { FormattedMessage } from "react-intl";
// import { PlusOutlined } from "@ant-design/icons";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import ContactsIcon from '@mui/icons-material/Contacts';
// import {getContactListByInvestorId,handleInvestorContactModal,  handleActivityModal,  handleDealModal} from "../../../InvestorAction";
// import {  handleDocumentUploadModal,handleCustomerContactModal} from "../../../../Customer/CustomerAction";
// import { BundleLoader } from "../../../../../Components/Placeholder";

// const InvestorActivityModal=lazy(()=>import("../InvestorActivity/InvestorActivityModal"));
// const InvestorTimeLine=lazy(()=>import("../InvestorActivity/InvestorTimeLine"));
// const CreateDealModal=lazy(()=>import("../../../../Deal/Child/CreateDealModal"));
// const InvestorDeals=lazy(()=>import("./InvestorDeals"));
// const AddDocumentModals=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals"));
// const AddCustomerContactModal=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerContactModal"));
// const InvestorLinkedContact =lazy(()=>import("./InvestorContact/InvestorLinkedContact"));
// const InvestorLinkedDocuments =lazy(()=>import("./InvestorDoc/InvestorLinkedDocuments"));
// const AddInvestorContactModal=lazy(()=>import("./InvestorContact/AddInvestorContactModal"));

// const TabPane = StyledTabs.TabPane;



// class InvestorDetailTab extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeKey: "1",
//       contactPopover: false,
//       partnerPopover: false,
//       quotProPopover: false,
//       deliveryProPopover: false,
//       breadCumb: false,
//       visibleModal: false,
//       recriutmentdashboard: false,
//       currentTabName: "",
//       currentTabId: "",
//       customField: [],
//       translatedMenuItems: [],
//       ganttChart: false,
//       costId: "",
//       file: false,
//     };
//   }
//   handleRecriutmentdashboard = () => {
//     this.setState({ recriutmentdashboard: true });

//     console.log(this.state.breadCumb);
//   };

//   handleRecruitClick = () => {
//     this.setState({ file: true });
//   };

//   componentDidMount() {
//     this.props.
// getContactListByInvestorId(this.props.investorDetails.investorId);
// this.fetchMenuTranslations();
//   }

//   componentWillUnmount() {
//     this.setState({ breadCumb: false });
//   }
//   handleContactPopoverVisibleChange = () =>
//     this.setState({ contactPopover: !this.state.contactPopover });
//   handlepartnerPopoverVisibleChange = () =>
//     this.setState({ partnerPopover: !this.state.partnerPopover });
//   handleTabChange = (key) => {
//     this.setState({ activeKey: key });

//   };
//   async fetchMenuTranslations() {
//     try {
//       this.setState({ loading: true });
//       const itemsToTranslate = [
//      "73",//1
// "1166",//2
// "1165",//3
// "490"//4
//       ];
//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations ,loading: false});
     
//     } catch (error) {
//       this.setState({ loading: false });
//       console.error('Error translating menu items:', error);
//     }
//   }
//   render() {
//     const { activeKey } = this.state;
//     const {
//       investorDetails: { investorId, name },
//       handleDocumentUploadModal,
//       documentUploadModal,
//       handleActivityModal,
//       opendocumentUploadModal,
//       opencreateDealModal,
//       investorActivityModal,
//       handleCustomerReactSpeechModal,
//       addCustomerSpeechModal,
//       handleInvestorContactModal,
//       handleCustomerContactModal,
//       addCustomerContactModal,
//       handleCustomerOpportunityModal,
//       handleCustomerProjectDrawer,
//       addCustomerOpportunityModal,
//       addCustomerProjectDrawer,
//       openInvestorContactModal,
//       getContactListByInvestorId,
//       getOpportunityListByCustomerId,
//       addInvoiceModal,
//       handleInvoiceModal,
//       handleDealModal,
//     } = this.props;
//     const {loading,translatedMenuItems } = this.state;
//     if (loading) {
//       return <div><BundleLoader/></div>;
//     } 
//     return (
//       <>
//         <TabsWrapper style={{height:"85vh"}}>
//           <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
           

//             <TabPane
//               tab={
//                 <>
//                   <span>
//  <ContactsIcon  className="!text-icon text-[#a9d8b8]"/>
//                     <span class=" ml-1 !text-tab font-poppins">
//                     {translatedMenuItems[0]}  
//                     </span>
//                   </span>
//                   {activeKey === "1" && (
//                     <>
//                       <Tooltip 
//                         title={
//                           <FormattedMessage
//                             id="app.create"
//                             defaultMessage="Create"
//                           />
//                         }
//                       >
//                         {/* {this.props.user.contactCreateInd === true && ( */}
//                           <PlusOutlined
//                             type="plus"
//                             //tooltipTitle="Create"
//                             tooltiptitle={
//                               <FormattedMessage
//                                 id="app.Create"
//                                 defaultMessage="Create"
//                               />
//                             }
//                             onClick={() => {
//                              // handleInvestorContactModal(true);
//                              handleCustomerContactModal(true);
//                             }}
//                             size="0.875em"
//                           />
//                         {/* )} */}
//                       </Tooltip>
//                     </>
//                   )}
//                 </>
//               }
//               key="1"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorLinkedContact investorDetails={this.props.investorDetails}
//                  translateText={this.props.translateText}
//                  selectedLanguage={this.props.selectedLanguage}/>
//               </Suspense>
//             </TabPane>

//             {/* <TabPane
//               tab={
//                 <>
//                   <MonetizationOnIcon 
//                  style={{fontSize:"1.1rem"}}
//                   />
//                   <span class=" ml-1">Commercials</span>
//                 </>
//               }
//               key="9"
//             >
//               <CommercialsForm />
//             </TabPane> */}

//             <TabPane
//               tab={
//                 <>
//                   <i 
//                   class="far fa-file  !text-icon text-[#41ead4]"
//                   ></i>
//                   <span class=" ml-1 !text-tab font-poppins">
//                   {translatedMenuItems[1]}  
//                     {/* Documents */}
//                   </span>
//                   {activeKey === "2" && (
//                     <>
//                       <PlusOutlined
//                         type="plus"
//                         title={
//                           <FormattedMessage
//                             id="app.uploaddocument"
//                             defaultMessage="Upload Document"
//                           />
//                         }
//                         onClick={() => handleDocumentUploadModal(true)}
//                         size="0.875em"
//                         style={{
//                           marginLeft: "0.3125em",
//                           verticalAlign: "center",
//                         }}
//                       />
//                     </>
//                   )}
//                 </>
//               }
//               key="2"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorLinkedDocuments investorDetails={this.props.investorDetails}
//                  translateText={this.props.translateText}
//                  selectedLanguage={this.props.selectedLanguage}/>
//               </Suspense>
//             </TabPane>
//             <TabPane
//               tab={
//                 <>
//                   <i class="fab fa-connectdevelop text-[#8332ac] !text-icon"></i>
//                   <Badge
//                 count={this.props.investorActivityCount.count}
//                 overflowCount={999}
//               > 
//                   <span class="!text-tab font-poppins ml-1">
//                   {translatedMenuItems[2]}  
//                     {/* Documents */}
//                   </span>
//                   </Badge>
//                   {activeKey === "3" && (
//                     <>
//                       <PlusOutlined
//                         type="plus"
//                         title={
//                           <FormattedMessage
//                             id="app.create"
//                             defaultMessage="Create"
//                           />
//                         }
//                          onClick={() => handleActivityModal(true)}
//                         size="0.875em"
//                         style={{
//                           marginLeft: "0.3125em",
//                           verticalAlign: "center",
//                         }}
//                       />
//                     </>
//                   )}
                
//                 </>
//               }
//               key="3"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorTimeLine

// investorDetails={this.props.investorDetails}
//                 />
//               </Suspense>
//             </TabPane>

//             <TabPane
//               tab={
//                 <>
//                   <CurrencyExchangeIcon className="!text-icon text-[#fce762]"/>
//                   <span class="!text-tab font-poppins ml-1">
//                   {translatedMenuItems[3]}  
//                     {/* Documents */}
//                   </span>
//                   {activeKey === "4" && (
//                     <>
//                     <Tooltip 
//                         title={
//                           <FormattedMessage
//                             id="app.create"
//                             defaultMessage="Create"
//                           />
//                         }
//                       >
//                       <PlusOutlined
//                         type="plus"
//                         title={
//                           <FormattedMessage
//                             id="app.create"
//                             defaultMessage="Create"
//                           />
//                         }
//                          onClick={() => handleDealModal(true)}
//                         size="0.875em"
                       
//                       />
//                       </Tooltip>
//                     </>
//                   )}
                
//                 </>
//               }
//               key="4"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorDeals
//               investorDetails={this.props.investorDetails}
//               translateText={this.props.translateText}
//               selectedLanguage={this.props.selectedLanguage}       />
//               </Suspense>
//             </TabPane>
//             {/* <TabPane
//               tab={
//                 <>
//                   <span>
//                     <NoteAltIcon style={{fontSize:"1.1rem"}}/>
           
//                     <FormattedMessage id="app.notes" defaultMessage="Notes" />
            
//                     {activeKey === "6" && (
//                       <>
//                         <Tooltip title="Voice to Text">
//                           <span
//                             onClick={() => handleCustomerReactSpeechModal(true)}
//                           >
//                             <MicIcon 
//                             style={{fontSize:"1.1rem"}}
//                              />
//                           </span>
//                         </Tooltip>
//                       </>
//                     )}
//                   </span>
//                 </>
//               }
//               key="6"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorLinkedNotes investorDetails={this.props.investorDetails} />
//               </Suspense>
//             </TabPane> */}
//             {/* <TabPane
//               tab={
//                 <>
//                   <ReceiptIcon style={{fontSize:"1.1rem"}}/>
//                   <span class=" ml-1">
//                     {
//                       <FormattedMessage
//                         id="app.invoice"
//                         defaultMessage="Invoice"
//                       />
//                     }
                  
//                   </span>
//                   {activeKey === "7" && (
//                     <>
//                       <PlusOutlined
//                         type="plus"
//                         title={
//                           <FormattedMessage
//                             id="app.create"
//                             defaultMessage="Create"
//                           />
//                         }
//                         onClick={() => handleInvoiceModal(true)}
//                         size="0.875em"
//                         style={{
//                           marginLeft: "0.3125em",
//                           verticalAlign: "center",
//                         }}
//                       />
//                     </>
//                   )}
//                 </>
//               }
//               key="7"
//             >
//               <Suspense fallback={"Loading ..."}>
//                 {" "}
//                 <InvestorLinkedInvoice investorDetails={this.props.investorDetails}/>
//               </Suspense>
//             </TabPane> */}
           
//           </StyledTabs>
//         </TabsWrapper>
//         <Suspense fallback={null}>
//         <AddInvestorContactModal
//           investorDetails={this.props.investorDetails}
//             openInvestorContactModal={openInvestorContactModal}
//             defaultInvestor={[{ label: name, value: investorId }]}
//             investorId={{ value: investorId }}
//             callback={() => getContactListByInvestorId(investorId)}
//         />
//           <AddDocumentModals
//           investorId={investorId}
//             documentUploadModal={documentUploadModal}
//             handleDocumentUploadModal={handleDocumentUploadModal}
//             translateText={this.props.translateText}
//                  selectedLanguage={this.props.selectedLanguage}
//           />
//           <AddCustomerContactModal
//            translateText={this.props.translateText}
//            selectedLanguage={this.props.selectedLanguage}
//           handleCustomerContactModal={handleCustomerContactModal}
//             addCustomerContactModal={addCustomerContactModal}
//             investorId={investorId}
//           />
//           <CreateDealModal 
//             investorDetails={this.props.investorDetails}
//                        opencreateDealModal={opencreateDealModal}
//                        handleDealModal={handleDealModal}
//                        translateText={this.props.translateText}
//                        selectedLanguage={this.props.selectedLanguage}   />
//              <InvestorActivityModal
            
//               customerId={this.props. customerId }
//               customer={this.props.customer}
//                defaultInvestor={[{ label: name, value: investorId }]}
//                investorId={{ value: investorId }}
//          investorDetails={this.props.investorDetails}
//          investorActivityModal={investorActivityModal}
//             handleActivityModal={handleActivityModal}
//           />

         
//         </Suspense>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ auth, investor, customer, opportunity,deal }) => ({
//   opendocumentUploadModal: investor.opendocumentUploadModal,
//   user: auth.userDetails,
//   documentUploadModal: customer.documentUploadModal,
//   userId: auth.userDetails.userId,
//   addCustomerContactModal: customer.addCustomerContactModal,
//   investorActivityCount:investor.investorActivityCount,
//   investorActivityModal:investor.investorActivityModal,
// contactsbyInvestorId:investor.contactsbyInvestorId,
// opencreateDealModal:investor.opencreateDealModal
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
      
//       handleActivityModal,
//       handleDealModal,
//       handleInvestorContactModal,
//       handleCustomerContactModal,
//       // handleCustomerOpportunityModal,
// getContactListByInvestorId,
// handleDocumentUploadModal
//       // getOpportunityListByCustomerId,
//       // handleRecruitModal,
//       // handlefileRecruitModal,
//       // handleTagProfileModal,
//       // handleInvoiceModal,
//       // handleCustomerProjectDrawer,
//       // handleCustomerReactSpeechModal,
//       //handleCustomerCommercialsModal,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(InvestorDetailTab);



import React, { useState, useEffect, useCallback ,lazy, Suspense} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import {getContactListByInvestorId,handleInvestorContactModal,  handleActivityModal,  handleDealModal} from "../../../InvestorAction";
import {  handleDocumentUploadModal,handleCustomerContactModal} from "../../../../Customer/CustomerAction";
import { BundleLoader } from "../../../../../Components/Placeholder";

const InvestorActivityModal=lazy(()=>import("../InvestorActivity/InvestorActivityModal"));
const InvestorTimeLine=lazy(()=>import("../InvestorActivity/InvestorTimeLine"));
const CreateDealModal=lazy(()=>import("../../../../Deal/Child/CreateDealModal"));
const InvestorDeals=lazy(()=>import("./InvestorDeals"));
const AddDocumentModals=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals"));
const AddCustomerContactModal=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerContactModal"));
const InvestorLinkedContact =lazy(()=>import("./InvestorContact/InvestorLinkedContact"));
const InvestorLinkedDocuments =lazy(()=>import("./InvestorDoc/InvestorLinkedDocuments"));
const AddInvestorContactModal=lazy(()=>import("./InvestorContact/AddInvestorContactModal"));

const TabPane = StyledTabs.TabPane;

const InvestorDetailTab = (props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [contactPopover, setContactPopover] = useState(false);
  const [partnerPopover, setPartnerPopover] = useState(false);
  const [quotProPopover, setQuotProPopover] = useState(false);
  const [deliveryProPopover, setDeliveryProPopover] = useState(false);
  const [breadCumb, setBreadCumb] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [recriutmentdashboard, setRecriutmentdashboard] = useState(false);
  const [currentTabName, setCurrentTabName] = useState("");
  const [currentTabId, setCurrentTabId] = useState("");
  const [customField, setCustomField] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [ganttChart, setGanttChart] = useState(false);
  const [costId, setCostId] = useState("");
  const [file, setFile] = useState(false);
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    getContactListByInvestorId(props.investorDetails.investorId);
    return () => {
      setBreadCumb(false);
    };
  }, []);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "73", //1
          "1166", //2
          "1165", //3
          "490", //4
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const handleRecriutmentdashboard = () => {
    setRecriutmentdashboard(true);
    console.log(breadCumb);
  };

  const handleRecruitClick = () => {
    setFile(true);
  };

  const handleContactPopoverVisibleChange = () => {
    setContactPopover(prev => !prev);
  };

  const handlepartnerPopoverVisibleChange = () => {
    setPartnerPopover(prev => !prev);
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  if (loading) {
    return <div><BundleLoader /></div>;
  }
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
          handleCustomerContactModal,
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
  } = props;
  return (
    <>
      <TabsWrapper style={{height:"85vh"}}>
        <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
         

          <TabPane
            tab={
              <>
                <span>
<ContactsIcon  className="!text-icon text-[#a9d8b8]"/>
                  <span class=" ml-1 !text-tab font-poppins">
                  {translatedMenuItems[0]}  
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
                           // handleInvestorContactModal(true);
                           handleCustomerContactModal(true);
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
              <InvestorLinkedContact investorDetails={props.investorDetails}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
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
                <i 
                class="far fa-file  !text-icon text-[#41ead4]"
                ></i>
                <span class=" ml-1 !text-tab font-poppins">
                {translatedMenuItems[1]}  
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
              <InvestorLinkedDocuments investorDetails={props.investorDetails}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                <i class="fab fa-connectdevelop text-[#8332ac] !text-icon"></i>
                <Badge
              count={props.investorActivityCount.count}
              overflowCount={999}
            > 
                <span class="!text-tab font-poppins ml-1">
                {translatedMenuItems[2]}  
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

investorDetails={props.investorDetails}
              />
            </Suspense>
          </TabPane>

          <TabPane
            tab={
              <>
                <CurrencyExchangeIcon className="!text-icon text-[#fce762]"/>
                <span class="!text-tab font-poppins ml-1">
                {translatedMenuItems[3]}  
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
            investorDetails={props.investorDetails}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}       />
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
        investorDetails={props.investorDetails}
          openInvestorContactModal={openInvestorContactModal}
          defaultInvestor={[{ label: name, value: investorId }]}
          investorId={{ value: investorId }}
          callback={() => getContactListByInvestorId(investorId)}
      />
        <AddDocumentModals
        investorId={investorId}
          documentUploadModal={documentUploadModal}
          handleDocumentUploadModal={handleDocumentUploadModal}
          translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
        />
        <AddCustomerContactModal
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
        handleCustomerContactModal={handleCustomerContactModal}
          addCustomerContactModal={addCustomerContactModal}
          investorId={investorId}
        />
        <CreateDealModal 
          investorDetails={props.investorDetails}
                     opencreateDealModal={opencreateDealModal}
                     handleDealModal={handleDealModal}
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}   />
           <InvestorActivityModal
          
            customerId={props. customerId }
            customer={props.customer}
             defaultInvestor={[{ label: name, value: investorId }]}
             investorId={{ value: investorId }}
       investorDetails={props.investorDetails}
       investorActivityModal={investorActivityModal}
          handleActivityModal={handleActivityModal}
        />

       
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ auth, investor, customer, opportunity,deal }) => ({
  opendocumentUploadModal: investor.opendocumentUploadModal,
  user: auth.userDetails,
  documentUploadModal: customer.documentUploadModal,
  userId: auth.userDetails.userId,
  addCustomerContactModal: customer.addCustomerContactModal,
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
      handleCustomerContactModal,
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

