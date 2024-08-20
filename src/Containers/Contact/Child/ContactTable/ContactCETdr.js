import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

const ContactCallForm = lazy(() => import("./ContactCallForm"));
const ContactEventForm = lazy(() =>import("./ContactEventForm"));
const ContactTaskForm = lazy(() => import("./ContactTaskForm"));

const TabPane = StyledTabs.TabPane;

const ContactCETdr = (props) => {
  const { clickCETcontactActivity, handleCETactivityContactModal, ...formProps } = props;
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
        visible={clickCETcontactActivity}
        onClose={() => handleCETactivityContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactActivityTab currentContact={props.currentContact}/>

        </Suspense>
      </StyledDrawer>
    </>
  );
  function ContactActivityTab (props) {
    const { clickCETcontactActivity, handleCETactivityContactModal } = props;
      const { ...formProps } = props;

      return (
        <>
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey="1"
              style={{ overflow: "visible", width: "56vw", padding: "5px" }}
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
                  <ContactCallForm  currentContact={props.currentContact} {...formProps} />
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
                  <ContactEventForm currentContact={props.currentContact} {...formProps}/>
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
                  <ContactTaskForm currentContact={props.currentContact} {...formProps}/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          <ContactCETdr
          currentContact={props.currentContact}
            clickCETcontactActivity={clickCETcontactActivity}
            handleCETactivityContactModal={handleCETactivityContactModal}
          />
        </>
      );
  }
};

export default ContactCETdr;
