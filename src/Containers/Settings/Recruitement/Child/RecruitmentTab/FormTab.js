
import React, { useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QuotationConfigureForm from "./QuotationConfigureForm"
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

          case "7":
            return (
              <Suspense fallback={"Loading..."}>
                <QuotationConfigureForm
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
       {props.user.moduleMapper.crmInd ?
       <>
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className=" !text-tab ml-[0.25em]">Prospect</span>
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
        </>
        :""}
        {props.user.moduleMapper.logisticsInd && props.user.moduleMapper.erpInd ?
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
        </TabPane>:""}
        {props.user.moduleMapper.erpInd ?
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
        </TabPane>:""}
        {props.user.moduleMapper.imInd ?
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
        </TabPane>:""}

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

        {props.user.moduleMapper.erpInd || props.user.moduleMapper.crmInd ?
        <TabPane
          tab={
            <>
              <span onClick={props.handleRecruitClick}>
                <span className="!text-tab ml-[0.25em]">Quotation</span>
              </span>
            </>
          }
          key="7"
        >
          {/* {renderTabContent("5")} */}
        </TabPane>:""}
      </StyledTabs>
      <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
    </TabsWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  // addTemplateModal: rule.addTemplateModal,
  // addTemplateNotificatonModal: rule.addTemplateNotificatonModal
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Add your actions here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form);

