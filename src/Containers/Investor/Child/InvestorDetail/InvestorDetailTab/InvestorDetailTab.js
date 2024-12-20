
import React, { useState, useEffect, useCallback ,lazy, Suspense} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge, Tooltip } from "antd";
import CreateInvestorDealModal from "./CreateInvestorDealModal"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import ContactsIcon from '@mui/icons-material/Contacts';
import {getContactListByInvestorId,handleInvestorContactModal,  handleActivityModal,  handleDealModal} from "../../../InvestorAction";
import {handleCallActivityModal} from "../../../../Activity/ActivityAction"
import {  handleDocumentUploadModal,handleCustomerContactModal,getProspectContactCount} from "../../../../Customer/CustomerAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ActivityListData from '../../../../Activity/ActivityListData';
import LinkedContact from '../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/LinkedContact';
import LinkedDocuments from '../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments';
import MainNotes from '../../../../CustomNote/MainNotes';
const InvestorActivityModal=lazy(()=>import("../InvestorActivity/InvestorActivityModal"));
const InvestorTimeLine=lazy(()=>import("../InvestorActivity/InvestorTimeLine"));
const CreateDealModal=lazy(()=>import("../../../../Deal/Child/CreateDealModal"));
const InvestorDeals=lazy(()=>import("./InvestorDeals"));
const AddDocumentModals=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals"));
const AddCustomerContactModal=lazy(()=>import("../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerContactModal"));
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
    getProspectContactCount(props.investorDetails.investorId,"investor")
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
  const renderTabContent = (key) => {
    switch (key) {
      case "1":
        return     <div> 
          <LinkedContact 
          uniqueId={props.investorDetails.investorId}
          type={"investor"}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
            </div>;
      case "2":
        return  <div>
         <LinkedDocuments
              uniqueId={props.investorDetails.investorId}
              type={"investor"}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
             /> 
        </div>;
    case "3":
      return  <div>
         {/* <InvestorTimeLine

investorDetails={props.investorDetails}
              /> */}
                                  <ActivityListData
uniqueId={props.investorDetails.investorId}
type={"investor"}
investor={props.investorDetails}
translateText={props.translateText}
selectedLanguage={props.selectedLanguage}
//translatedMenuItems={this.props.translatedMenuItems}
/> 
      </div>;
         case "4":
          return  <div>
              <InvestorDeals
            investorDetails={props.investorDetails}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}       />
          </div>;
          case "5":
            return  <div>
                <MainNotes
                uniqueId={props.investorDetails.investorId}
                type={"investor"}
              investorDetails={props.investorDetails}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}       />
            </div>;
      default:
        return null;
    }
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
      <TabsWrapper style={{height:"87vh"}}>
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
                <Badge
                                    size="small"
                                    count={(props.contactCount.CustomerContactDetails) || 0}
                                    overflowCount={999}
                                    offset={[ 0, -16]}
                                ></Badge>
                {activeKey === "1" && (
                  <>
                    <Tooltip 
                      title="Create"
                    >
                      {/* {this.props.user.contactCreateInd === true && ( */}
                      
                        
                 
                    
                   <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          onClick={() => {
                           // handleInvestorContactModal(true);
                           handleCustomerContactModal(true);
                          }}
                      
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
                <Badge
                count={props.documentsByCount.CustomerDocumentDetails}
                overflowCount={999}
              > 
                   </Badge>
                {activeKey === "2" && (
                  <>
                  
                  
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                      title="Upload Document"
                       
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
             
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
               <HourglassFullIcon className="text-blue-500  !text-icon" />
                <Badge
              count={props.investorActivityCount.count}
              overflowCount={999}
            > 
             </Badge>
                <span class="!text-tab font-poppins ">
                {translatedMenuItems[2]}  
                  {/* Activity */}
                </span>
               
                {activeKey === "3" && (
                  <>
                    
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                      title="Create"
                       
                       onClick={() => props.handleCallActivityModal(true)}
                     
                    />
                  </>
                )}
              
              </>
            }
            key="3"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
              {/* <InvestorTimeLine

investorDetails={props.investorDetails}
              /> */}
            </Suspense>
          </TabPane>

          <TabPane
            tab={
              <>
                <CurrencyExchangeIcon className="!text-icon text-[#fce762]"/>
                <span class="!text-tab font-poppins ml-1">
                {translatedMenuItems[3]}  
                  {/* Deals */}
                </span>
                {activeKey === "4" && (
                  <>
                  <Tooltip 
                      title="Create"
                       
                    >
                    
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                      title="Create"
                        
                       onClick={() => handleDealModal(true)}
                     
                     
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
            
            </Suspense>
          </TabPane>
          <TabPane
            tab={
              <>
                   <NoteAltIcon
                className=" !text-icon cursor-pointer text-green-800 "
              />
                <span class="!text-tab font-poppins ml-1">
                {/* {translatedMenuItems[3]}   */}
                  Notes
                </span>
                {activeKey === "" && (
                  <>
                  <Tooltip 
                      title="Create"
                       
                    >
                    
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                      title="Create"
                        
                       onClick={() => handleDealModal(true)}
                     
                     
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
            
            </Suspense>
          </TabPane>
         
        </StyledTabs>
        <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
      </TabsWrapper>
      <Suspense fallback={null}>
      <AddInvestorContactModal
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
        investorDetails={props.investorDetails}
          openInvestorContactModal={openInvestorContactModal}
          defaultInvestor={[{ label: name, value: investorId }]}
          investorId={{ value: investorId }}
          id={props.investorDetails.investorId}
          callback={() => getContactListByInvestorId(investorId)}
      />
        <AddDocumentModals
        investorId={investorId}
        uniqueId={investorId}
        type={"investor"}
          documentUploadModal={documentUploadModal}
          handleDocumentUploadModal={handleDocumentUploadModal}
          translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
        />
        <AddCustomerContactModal
        name={props.investorDetails.name}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
        handleCustomerContactModal={handleCustomerContactModal}
          addCustomerContactModal={addCustomerContactModal}
          investorId={investorId}
          id={investorId}
        />
        <CreateInvestorDealModal 
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
          investorDetails={props.investorDetails}
                     opencreateDealModal={opencreateDealModal}
                     handleDealModal={handleDealModal}
                     />
           <InvestorActivityModal
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
            customerId={props. customerId }
            customer={props.customer}
             defaultValue={[{ label: name, value: investorId }]}
             investorId={{ value: investorId }}
             uniqueId={props.investorDetails.investorId}
       investorDetails={props.investorDetails}
       name={props.investorDetails.name}
       investor={props.investorDetails}
       callActivityModal={props.callActivityModal}
       handleCallActivityModal={props.handleCallActivityModal}
        />

       
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ auth, investor,activity, customer, opportunity,deal }) => ({
  opendocumentUploadModal: investor.opendocumentUploadModal,
  user: auth.userDetails,
  documentUploadModal: customer.documentUploadModal,
  userId: auth.userDetails.userId,
  callActivityModal:activity.callActivityModal,
  addCustomerContactModal: customer.addCustomerContactModal,
  investorActivityCount:investor.investorActivityCount,
  investorActivityModal:investor.investorActivityModal,
contactsbyInvestorId:investor.contactsbyInvestorId,
opencreateDealModal:investor.opencreateDealModal,
contactCount:customer.contactCount,
documentsByCount:customer.documentsByCount
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       
      handleActivityModal,
      handleDealModal,
      handleInvestorContactModal,
      handleCustomerContactModal,
      getProspectContactCount,
      // handleCustomerOpportunityModal,
getContactListByInvestorId,
handleDocumentUploadModal,
handleCallActivityModal
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

