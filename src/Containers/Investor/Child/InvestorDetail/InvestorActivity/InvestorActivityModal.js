import React, { Suspense,lazy } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const InvestorCallActivityForm=lazy(()=>import("./InvestorCallActivityForm"));
const InvestorEventActivityForm=lazy(()=>import("./InvestorEventActivityForm"));
const InvestorTaskActivityForm=lazy(()=>import("./InvestorTaskActivityForm"));




const TabPane = StyledTabs.TabPane;

const InvestorActivityModal = (props) => {
  const { handleActivityModal, investorActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule"
        />}
        width={drawerWidth}
        visible={investorActivityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleActivityModal(false)}
        style={{marginTop:"5rem"}}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <InvestorActivityTab 
           customerId={props. customerId }
           customer={props.customer}
           defaultInvestor={props.defaultInvestor}
           investorId={props. investorId }
           investorDetails={props.investorDetails}/>

        </Suspense>
      </StyledDrawer>
    </>
  );
  function InvestorActivityTab (props) {
    const { addCallTaskModal, handleLeadCallModal } = props;
      const { ...formProps } = props;
      console.log(props.rowdata)
      return (
        <>
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey="1"
              style={{ overflow: "visible", width: "53vw", padding: "15px" }}
              animated={false}
            >
              <TabPane
                tab={
                  <span>
                   <i class="fas fa-phone-square"></i>&nbsp;
                    Calls
                  </span>
                }
                key="1"
              >
                <Suspense fallback={"loading ..."}>
                  <InvestorCallActivityForm 
                   customerId={props. customerId }
                   customer={props.customer}
                       defaultInvestor={props.defaultInvestor}
                       investorId={props. investorId }
                     investorDetails={props.investorDetails} {...formProps} />
                </Suspense>
              </TabPane>
          
              <TabPane
                tab={
                  <span>
                    <i class="fas fa-tasks"></i>&nbsp;
                    Events
                  </span>
                }
                key="2"
              >
                <Suspense fallback={"loading ..."}>
                  <InvestorEventActivityForm 
                   customerId={props. customerId }
                   customer={props.customer}
                       defaultInvestor={props.defaultInvestor}
                       investorId={props. investorId }
                    investorDetails={props.investorDetails} {...formProps}/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i class="far fa-calendar-check"></i>&nbsp;
                    Tasks
                  </span>
                }
                key="3"
              >
                <Suspense fallback={"loading ..."}>
                  <InvestorTaskActivityForm 
                   customerId={props. customerId }
                   customer={props.customer}
                      defaultInvestor={props.defaultInvestor}
                      investorId={props. investorId }
                    investorDetails={props.investorDetails} {...formProps}/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          {/* <AddCallTaskModal
          rowdata={props.rowdata}
            addCallTaskModal={addCallTaskModal}
            handleLeadCallModal={handleLeadCallModal}
          /> */}
        </>
      );
  }
};

export default InvestorActivityModal;
