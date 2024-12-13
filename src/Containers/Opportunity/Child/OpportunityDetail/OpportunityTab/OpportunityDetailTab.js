import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { bindActionCreators } from "redux";
import RecruitmentDeletedTable from "../../OpportunityDetail/OpportunityTab/Recruitment/RecruitmentDeletedTable"
import {Tooltip,Badge } from "antd";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PieChartIcon from '@mui/icons-material/PieChart';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { handleContactModal,handleLinkContactModal } from "../../../../Contact/ContactAction";
import RecruitmentClosedTable from "../OpportunityTab/RecruitmentClosedTable"
// import {handleReactSpeechModal} from "../../../OpportunityAction"
import {handleCustomerContactModal} from "../../../../Customer/CustomerAction"
import {
    getContactListByOpportunityId,
    clearReducerState,
  handleDocumentUploadModal,
     linkContactsCheckToOpportunity,
  handleRecruitModal,
  handleTagProfileModal,
  getRecruitByOpportunityId,
  
} from "../../../OpportunityAction";
import LockIcon from '@mui/icons-material/Lock';
import { BundleLoader } from "../../../../../Components/Placeholder";
// import ReactSpeechModal from "./ReactSpeechModal";
import AddDocumentModals from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/AddDocumentModals";
import AddCustomerContactModal from "../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerContactModal";
import LinkedContact from "../../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/LinkedContact";
import LinkedDocuments from "../../../../Customer/Child/CustomerDetail/CustomerTab/Document/LinkedDocuments";
const RecruitmentTable = lazy(() => import("./Recruitment/RecruitmentTable"));
const AddRecruitModal = lazy(() => import("./Recruitment/AddRecruitModal"));
const AddTagProfileModal = lazy(() => import("./Recruitment/AddTagProfileModal"));
const RecruitProJumpstart = lazy(() => import("../../RecruitProJumpstart/RecruitProJumpstart"));
const SummaryTable = lazy(() => import("./Recruitment/Child/SummaryTable"));
const AddDocumentModal = lazy(() => import("./Document/AddDocumentModal"));
const AddContactModal = lazy(() => import("../../../../Contact/Child/AddContactModal"));
const LinkContactModal = lazy(() => import("../../../../Contact/Child/LinkContactModal"));

const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class OpportunityDetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      closedPopover:false,
      deletePopover:false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      recruitmentboard:false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
      translatedMenuItems: [],
      loading: true
    };
  }

  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getDepartments();
    
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       '73', // 0 contacts
       '1166', // 1 Document
       '1255' // 'Version', // 2

      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }

  handleRecriutmentdashboard = () => {
    this.setState({ 
      recriutmentdashboard: true,
      breadCumb:false,
      closedPopover:false
     });

    console.log(this.state.breadCumb);
  };

  handleRecruitClick = () => {
    this.setState({ 
      closedPopover:false,
      breadCumb:true,
      recriutmentdashboard: false,
     });
  };

  componentWillUnmount() {
    this.props.clearReducerState();
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
    handleClosedPopoverVisibleChange = () =>
    this.setState({ 
      closedPopover: true,
      recriutmentdashboard:false,
      breadCumb:false
     });

     handledeletedPopoverVisibleChange = () =>
     this.setState({ 
       deletePopover: true,
       closedPopover: false,
       recriutmentdashboard:false,
       breadCumb:false
      });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
      user: {
        metaData: {  },
      },
      opportunity: { opportunityId, opportunityName, accountId },
      user,
      fetchingOpportunityDetailsById,
      addContactModal,
      addCustomerContactModal,
      handleContactModal,
      handleCustomerContactModal,
      linkContactsCheckToOpportunity,
      getContactListByOpportunityId,
      handleLinkContactModal,
      linkContactsToOpportunity,
      handleDocumentUploadModal,
      handleReactSpeechModal,
      opportunity,
      addSpeechModal,
      documentUploadModal,
    } = this.props;
    const { deliveryInd, stageName } = this.props;
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                  {this.state.recriutmentdashboard ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitProJumpstart />
                  <SummaryTable />
                </Suspense>
              ) :this.state.closedPopover ? 
              (
                <Suspense fallback={"Loading ..."}>
                <RecruitmentClosedTable  opportunityId={opportunityId}/>
                </Suspense>
              ):this.state.deletePopover ? 
                 
                (
                  <Suspense fallback={"Loading ..."}>
                  <RecruitmentDeletedTable  opportunityId={opportunityId}/>
                  </Suspense>
                ):(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitmentTable  opportunityId={opportunityId}/>
                  </Suspense>
                  
                )}
              </div>;
        case "2":
          return  <div>   <LinkedContact 
          uniqueId={opportunityId}
          type={"oppertunity"}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          /></div>;
         case "3":
          return  <div>     <LinkedDocuments
          uniqueId={opportunityId}
          type={"oppertunity"}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
         /> </div>;
          case "4":
            return  <div>    </div>;
        default:
          return null;
      }
    };
    if(fetchingOpportunityDetailsById){
return  <BundleLoader />
    }
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
    console.log(this.props.opportunity.customer)
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            {
            // user.requirementAccessInd === true && 
            user.recruitProInd === true ? (
             <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <TransferWithinAStationIcon 
                 className="!text-icon"
                   />
                    <span className="ml-[0.25rem]">RecruitPro</span>
                  </span>
                  {activeKey === "1" && (
                    <>

                      <>
                     
                        <Tooltip title="Add Requirement">
                        {user.userType !== "USER" && user.department !== "Recruiter" && ( 
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" 
                           
                            tooltipTitle="Add Requirement"
                            onClick={() =>
                              this.props.handleRecruitModal(true)
                            }
                                               
                          />
                        )}
                          </Tooltip>                                        

                        <Tooltip title="Summary">
                      <span className=" -ml-1"                   
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleRecriutmentdashboard();
                          }}
                          size="0.875em"                         
                          >
                       
                          <PieChartIcon className="!text-icon text-[#42858c]" />
                          </span>
                        </Tooltip>

                        <Tooltip title="Close">
                         <span
                         className=" ml-1 "
                  
                          type="area-chart"
                          // tooltipTitle="Summary"
                          onClick={() => {
                            this.handleClosedPopoverVisibleChange();
                          }}
                                           
                          >
                             <LockIcon className="!text-icon text-[#e4eb2f] " />
                            
                          
                          </span>
                      
                        </Tooltip>

                        <Tooltip title="Delete">
                         <span
                      className=" ml-1 !text-icon text-[#c42847]"
                      
                          type="area-chart"
                          // tooltipTitle="Summary"
                          // onClick={() => {
                          //   this.handleClosedPopoverVisibleChange();
                          // }}
                                          
                          >
                            <DeleteIcon
                      className=" ml-1 !text-icon "
                            onClick={() => {
                            this.handledeletedPopoverVisibleChange();
                          }}
                            />
                                                    
                          
                          </span>
                      
                        </Tooltip>
                      
                       
                      </>
                  
                    </>
                  )}
                </>
              }
              key="1"
            >
               
              {/* {this.state.recriutmentdashboard ? (
                <Suspense fallback={"Loading ..."}>
                  {" "}
                  <RecruitProJumpstart />
                  <SummaryTable />
                </Suspense>
              ) :this.state.closedPopover ? 
              (
                <Suspense fallback={"Loading ..."}>
                <RecruitmentClosedTable  opportunityId={opportunityId}/>
                </Suspense>
              ):this.state.deletePopover ? 
                 
                (
                  <Suspense fallback={"Loading ..."}>
                  <RecruitmentDeletedTable  opportunityId={opportunityId}/>
                  </Suspense>
                ):(
                  <Suspense fallback={"Loading ..."}>
                    {" "}
                    <RecruitmentTable  opportunityId={opportunityId}/>
                  </Suspense>
                  
                )}
                   */}
            </TabPane>
            ):null}
             <TabPane
              tab={
                <>
                  <span>
                  <ContactsIcon className="!text-icon text-[#96bdc6]" />
                    <span className="ml-[0.25rem] !text-tab">       
                    {translatedMenuItems[0]}           
                    </span>
                  </span>
                
                  {activeKey === "2" && (
                    <>
                      <Tooltip 
                        title="Create"
                        >
                         {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          onClick={() => {
                            this.handleContactPopoverVisibleChange();
                            //handleContactModal(true);
                            handleCustomerContactModal(true);
                          }}
                    
                        />
                         {/* )} */}
                         
                      </Tooltip>
                     
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedContact
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <i class="far fa-file text-[#41ead4]"></i>
              
                  <span class="ml-1 !text-tab font-poppins ">
                                    {translatedMenuItems[1]}
                                    {/* Documents */}
                                        </span>
                                        <Badge
                count={this.props.documentsByCount.OpportunityDocumentDetails}
                overflowCount={999}
              > 
                   </Badge>      
                  {activeKey === "3" && (
                    <>
                      <Tooltip 
                        title="Upload Document"
                        >
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltiptitle="Upload Document"
                          
                          onClick={() =>
                            handleDocumentUploadModal(true)
                          }
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
                {/* <LinkedDocuments opportunity={opportunity} 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
                /> */}
              </Suspense>
            </TabPane>

              <TabPane
              tab={
                <>
                  <DynamicFeedIcon  className="!text-icon"/>
                  <span className="ml-[0.25rem] !text-tab">
                  {translatedMenuItems[2]} 
                  </span>
               
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <LinkedDocuments opportunity={opportunity} /> */}
              </Suspense>
            </TabPane>

          
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </TabsWrapper>
        <Suspense fallback={null}>

          <AddRecruitModal
           opportunity={this.props.opportunity}
            addRecruitModal={this.props.addRecruitModal}
            handleRecruitModal={this.props.handleRecruitModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.state.translateText}
          />
          <AddTagProfileModal
            addTagProfileModal={this.props.addTagProfileModal}
            handleTagProfileModal={this.props.handleTagProfileModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.state.translateText}
          />

          {/* <AddContactModal
            addContactModal={addContactModal}
            handleContactModal={handleContactModal}
            callback={() => getContactListByOpportunityId(opportunityId)}
            linkContact
          /> */}
          <AddCustomerContactModal
          name={this.props.opportunity.customer}
          handleCustomerContactModal={handleCustomerContactModal}
            addCustomerContactModal={addCustomerContactModal}
            opportunityId={opportunityId}
            customerId={this.props.opportunity.customerId}
            id={this.props.opportunity.customerId}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.state.translatedMenuItems}
          customer={this.props.opportunity}
            // defaultCustomers={[{ label: name, value: customerId }]}
            // customerId={{ value: customerId }}
            // callback={() => getContactListByCustomerId(customerId)}
          />

          <LinkContactModal
            opportunityId={{ value: opportunityId }}
            linkAction={linkContactsToOpportunity}
            linkContactsCheckToOpportunity={linkContactsCheckToOpportunity}
            defaultOpportunities={[
              { label: opportunityName, value: opportunityId },
            ]}
            linkType="opportunity"
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
             translatedMenuItems={this.state.translatedMenuItems}
          />

<AddDocumentModals
opportunityId={opportunityId}
uniqueId={opportunityId}
type={"oppertunity"}
            documentUploadModal={documentUploadModal}
            handleDocumentUploadModal={handleDocumentUploadModal}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.state.translatedMenuItems}
          />
          {/* <ReactDescription
          opportunityId={opportunityId}
          handleReactSpeechModal={handleReactSpeechModal}
          addSpeechModal={addSpeechModal}
          translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.state.translatedMenuItems}
          /> */}
      
        </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  opportunity,
  call,
  event,
  task,
  partner,
  customeField,
  customer
}) => ({
  fetchingOpportunityDetailsById:opportunity.fetchingOpportunityDetailsById,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  opportunityId: opportunity.opportunity.opportunityId,
  // organizationId: auth.userDetails.organizationId,
  opportunity: opportunity.opportunity,
  addCustomerContactModal: customer.addCustomerContactModal,
  addContactModal: contact.addContactModal,
  linkContactModal:contact.linkContactModal,
  addSpeechModal:opportunity.addSpeechModal, 
  addRecruitModal: opportunity.addRecruitModal,
  addTagProfileModal: opportunity.addTagProfileModal,
  documentUploadModal: opportunity.documentUploadModal,
  documentsByCount:customer.documentsByCount
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearReducerState,
      handleContactModal,
      handleCustomerContactModal,
      handleLinkContactModal,
      handleDocumentUploadModal,
      getContactListByOpportunityId,
       linkContactsCheckToOpportunity,
      handleRecruitModal,
      handleTagProfileModal,
      getRecruitByOpportunityId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailTab);
