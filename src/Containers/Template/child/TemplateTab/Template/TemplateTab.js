
import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { handleTemplateModal,handleTemplateNotificatonModal } from "../../../../Rules/RulesAction";
import TemplateTable from "./TemplateTable";
import { Tooltip } from "antd";
import DraftsIcon from '@mui/icons-material/Drafts';
import TemplateOrderTable from "./TemplateOrderTable";
import QuotationTemplate from "./QuotationTemplate";
import InvoiceTemplateTable from "./InvoiceTemplateTable";

const AddTemplateModal = lazy(() => import("./AddTemplateModal"));
const AddTemplateNotificatonModal = lazy(() => import("../AddTemplateNotificatonModal"));

const TabPane = StyledTabs.TabPane;

class TemplateTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      // contactPopover: false,
      // partnerPopover: false,
      // quotProPopover: false,
      // deliveryProPopover: false,
      // breadCumb: false,
      // visibleModal: false,
      // recriutmentdashboard: false,
      // currentTabName: "",
      // currentTabId: "",
      // customField: [],
      // ganttChart: false,
      // costId: "",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };

  render() {
    const { activeKey } = this.state;

    return(
      <>
       <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <DraftsIcon  />
                    <span class=" ml-[0.25em]" >Email</span>
                  </span>
                  {}
                  {activeKey === "1" && (
                    <>
                      <>                     
                        <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                        
                          />
                          </Tooltip>             
                       
                      </>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  <TemplateTable />
               </Suspense>             
            </TabPane>
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <ReceiptIcon className="!text-icon text-[#a9d8b8] mr-1"/>
                    <span class=" ml-[0.25em]" >Invoice</span>
                  </span>
                  {}
                  {activeKey === "2" && (
                    <>
                      <>                     
                        {/* <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                          </Tooltip>              */}
                       
                      </>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  <InvoiceTemplateTable />
               </Suspense>             
            </TabPane>
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <LightbulbIcon className="!text-icon text-[#bfa89e]" />
                    <span class=" ml-[0.25em]" >Quotation</span>
                  </span>
                  {}
                  {activeKey === "3" && (
                    <>
                      <>                     
                        {/* <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                          </Tooltip>              */}
                       
                      </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  <QuotationTemplate/>
               </Suspense>             
            </TabPane>
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <DraftsIcon  />
                    <span class=" ml-[0.25em]" >Order</span>
                  </span>
                  {}
                  {activeKey === "4" && (
                    <>
                      <>                     
                        {/* <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                          </Tooltip>              */}
                       
                      </>
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  <TemplateOrderTable />
               </Suspense>             
            </TabPane>
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <CreditCardIcon className="!text-icon text-[#edd382] mr-1"/>
                    <span class=" ml-[0.25em]" >Payment</span>
                  </span>
                  {}
                  {activeKey === "5" && (
                    <>
                      <>                     
                        {/* <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                          </Tooltip>              */}
                       
                      </>
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <TemplateTable /> */}
               </Suspense>             
            </TabPane>
            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <PrecisionManufacturingIcon className=" !text-icon text-[#049a8f]" />
                    <span class=" ml-[0.25em]" >Purchase Order</span>
                  </span>
                  {}
                  {activeKey === "6" && (
                    <>
                      <>                     
                        {/* <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />
                          </Tooltip>              */}
                       
                      </>
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <TemplateTable /> */}
               </Suspense>             
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <MessageIcon />
                    <span style={{ marginLeft: '0.25em' }}>Notification</span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      <>                     
                        <Tooltip title="Create">
                       
                           <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                           
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateNotificatonModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />                       
                          </Tooltip>
                       </>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                 
                  <NotificationTable />
               </Suspense>
             
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
            
                    <span style={{ marginLeft: '0.25em' }}>Action</span>
                  </span>
                  {activeKey === "3" && (
                    <>
                      <>                     
                        <Tooltip title="Create">
                       
                       
                          </Tooltip>
                       </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
              
                  <ActionTable />
               </Suspense>
             
            </TabPane> */}
            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={null}>
        <AddTemplateModal
        handleTemplateModal={this.props.handleTemplateModal}
        addTemplateModal={this.props.addTemplateModal}
        
     />
     <AddTemplateNotificatonModal
     handleTemplateNotificatonModal={this.props.handleTemplateNotificatonModal}
     addTemplateNotificatonModal={this.props.addTemplateNotificatonModal}
     />

        </Suspense>
  
      </>
    
    )

  }
}

const mapStateToProps = ({ rule }) => ({
  addTemplateModal: rule.addTemplateModal,
  addTemplateNotificatonModal:rule.addTemplateNotificatonModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ handleTemplateModal,handleTemplateNotificatonModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TemplateTab);
