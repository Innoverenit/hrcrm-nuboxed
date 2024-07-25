
import React, { Component,lazy,  Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SupplierConfigureForm from "./SupplierConfigureForm"
import LeadsConfigureForm from "./LeadsConfigureForm"
import ShipperConfigureForm from "./ShipperConfigureForm"
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import InvestorConfigureForm from "./InvestorConfigureForm";
const CustomerConfigureForm = lazy(() => import("./CustomerConfigureForm"));
const TabPane = StyledTabs.TabPane;

class Form extends Component {
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
                  {/* <DraftsIcon  /> */}
                    <span class=" ml-[0.25em]" >Customer</span>
                  </span>
                  {}
                 
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <CustomerConfigureForm/>
               </Suspense>             
            </TabPane>


            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  {/* <DraftsIcon  /> */}
                    <span class=" ml-[0.25em]" >Leads</span>
                  </span>
                  {}
                 
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <LeadsConfigureForm
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                  />
               </Suspense>             
            </TabPane>



            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  {/* <DraftsIcon  /> */}
                    <span class=" ml-[0.25em]" >Shipper</span>
                  </span>
                  {}
                 
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <ShipperConfigureForm
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                  />
               </Suspense>             
            </TabPane>



            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  {/* <DraftsIcon  /> */}
                    <span class=" ml-[0.25em]" >Supplier</span>
                  </span>
                  {}
                 
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <SupplierConfigureForm
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                  />
               </Suspense>             
            </TabPane>




            <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  {/* <DraftsIcon  /> */}
                    <span class=" ml-[0.25em]" >Investor</span>
                  </span>
                  {}
                 
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <InvestorConfigureForm
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                  />
                 
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
                       
                          <PlusOutlined
                            type="plus"
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
       
  
      </>
    
    )

  }
}

const mapStateToProps = ({ rule }) => ({
//   addTemplateModal: rule.addTemplateModal,
//   addTemplateNotificatonModal:rule.addTemplateNotificatonModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 

 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
