
// import React, { Component,lazy,  Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import SupplierConfigureForm from "./SupplierConfigureForm"
// import LeadsConfigureForm from "./LeadsConfigureForm"
// import ShipperConfigureForm from "./ShipperConfigureForm"
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import InvestorConfigureForm from "./InvestorConfigureForm";
// const CustomerConfigureForm = lazy(() => import("./CustomerConfigureForm"));
// const TabPane = StyledTabs.TabPane;

// class Form extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeKey: "1",
      
//     };
//   }
//   handleTabChange = (key) => {
//     this.setState({ activeKey: key });
 
    
//   };

//   render() {
//     const { activeKey } = this.state;

//     return(
//       <>
//        <TabsWrapper>
//           <StyledTabs
//             defaultActiveKey="1"
//             onChange={this.handleTabChange}
//             forceRender={true}
//           >
//             <TabPane
//               tab={
//                 <>
//                   <span onClick={this.handleRecruitClick}>
//                   {/* <DraftsIcon  /> */}
//                     <span class=" ml-[0.25em]" >Customer</span>
//                   </span>
//                   {}
                 
//                 </>
//               }
//               key="1"
//             >
//               <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   {/* <TemplateTable /> */}
//                   <CustomerConfigureForm/>
//                </Suspense>             
//             </TabPane>


//             <TabPane
//               tab={
//                 <>
//                   <span onClick={this.handleRecruitClick}>
//                   {/* <DraftsIcon  /> */}
//                     <span class=" ml-[0.25em]" >Leads</span>
//                   </span>
//                   {}
                 
//                 </>
//               }
//               key="2"
//             >
//               <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   {/* <TemplateTable /> */}
//                   <LeadsConfigureForm
//                   translateText={this.props.translateText}
//                   selectedLanguage={this.props.selectedLanguage}
//                   />
//                </Suspense>             
//             </TabPane>



//             <TabPane
//               tab={
//                 <>
//                   <span onClick={this.handleRecruitClick}>
//                   {/* <DraftsIcon  /> */}
//                     <span class=" ml-[0.25em]" >Shipper</span>
//                   </span>
//                   {}
                 
//                 </>
//               }
//               key="3"
//             >
//               <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   {/* <TemplateTable /> */}
//                   <ShipperConfigureForm
//                   translateText={this.props.translateText}
//                   selectedLanguage={this.props.selectedLanguage}
//                   />
//                </Suspense>             
//             </TabPane>



//             <TabPane
//               tab={
//                 <>
//                   <span onClick={this.handleRecruitClick}>
//                   {/* <DraftsIcon  /> */}
//                     <span class=" ml-[0.25em]" >Supplier</span>
//                   </span>
//                   {}
                 
//                 </>
//               }
//               key="4"
//             >
//               <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   {/* <TemplateTable /> */}
//                   <SupplierConfigureForm
//                   translateText={this.props.translateText}
//                   selectedLanguage={this.props.selectedLanguage}
//                   />
//                </Suspense>             
//             </TabPane>




//             <TabPane
//               tab={
//                 <>
//                   <span onClick={this.handleRecruitClick}>
//                   {/* <DraftsIcon  /> */}
//                     <span class=" ml-[0.25em]" >Investor</span>
//                   </span>
//                   {}
                 
//                 </>
//               }
//               key="5"
//             >
//               <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   {/* <TemplateTable /> */}
//                   <InvestorConfigureForm
//                   translateText={this.props.translateText}
//                   selectedLanguage={this.props.selectedLanguage}
//                   />
                 
//                </Suspense>             
//             </TabPane>
          
//           </StyledTabs>
//         </TabsWrapper>
       
  
//       </>
    
//     )

//   }
// }

// const mapStateToProps = ({ rule }) => ({
// //   addTemplateModal: rule.addTemplateModal,
// //   addTemplateNotificatonModal:rule.addTemplateNotificatonModal
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ 

//  }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Form);



import React, { useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContactConfigureForm from "./ContactConfigureForm"
import SupplierConfigureForm from "./SupplierConfigureForm";
import LeadsConfigureForm from "./LeadsConfigureForm";
import ShipperConfigureForm from "./ShipperConfigureForm";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import InvestorConfigureForm from "./InvestorConfigureForm";
const CustomerConfigureForm = lazy(() => import("./CustomerConfigureForm"));
const TabPane = StyledTabs.TabPane;

const Form = (props) => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const renderTabContent = (key) => {
    switch (key) {
      case "1":
        return (
          <Suspense fallback={"Loading..."}>
            <CustomerConfigureForm />
          </Suspense>
        );
      case "2":
        return (
          <Suspense fallback={"Loading..."}>
            <LeadsConfigureForm
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
          </Suspense>
        );
      case "3":
        return (
          <Suspense fallback={"Loading..."}>
            <ShipperConfigureForm
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
          </Suspense>
        );
      case "4":
        return (
          <Suspense fallback={"Loading..."}>
            <SupplierConfigureForm
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
          </Suspense>
        );
      case "5":
        return (
          <Suspense fallback={"Loading..."}>
            <InvestorConfigureForm
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
            />
          </Suspense>
        );
        case "6":
          return (
            <Suspense fallback={"Loading..."}>
              <ContactConfigureForm
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
              />
            </Suspense>
          );
      default:
        return null;
    }
  };

  return (
    <TabsWrapper>
      <StyledTabs defaultActiveKey={activeKey} onChange={handleTabChange} >
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className=" !text-tab ml-[0.25em]">Customer</span>
              </span>
            </>
          }
          key="1"
        >
          {/* {renderTabContent("1")} */}
        </TabPane>
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className=" !text-tab ml-[0.25em]">Leads</span>
              </span>
            </>
          }
          key="2"
        >
          {/* {renderTabContent("2")} */}
        </TabPane>
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className="!text-tab ml-[0.25em]">Shipper</span>
              </span>
            </>
          }
          key="3"
        >
          {/* {renderTabContent("3")} */}
        </TabPane>
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className="!text-tab ml-[0.25em]">Supplier</span>
              </span>
            </>
          }
          key="4"
        >
          {/* {renderTabContent("4")} */}
        </TabPane>
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className="!text-tab ml-[0.25em]">Investor</span>
              </span>
            </>
          }
          key="5"
        >
          {/* {renderTabContent("5")} */}
        </TabPane>

        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className="!text-tab ml-[0.25em]">Contact</span>
              </span>
            </>
          }
          key="6"
        >
          {/* {renderTabContent("5")} */}
        </TabPane>
      </StyledTabs>
      <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
    </TabsWrapper>
  );
};

const mapStateToProps = ({ rule }) => ({
  // addTemplateModal: rule.addTemplateModal,
  // addTemplateNotificatonModal: rule.addTemplateNotificatonModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Add your actions here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form);

