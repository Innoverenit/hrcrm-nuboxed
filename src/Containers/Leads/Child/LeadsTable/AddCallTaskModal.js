import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

const LeadsCallForm = lazy(() => import("./LeadsCallForm"));
const LeadsEventForm = lazy(() =>import("./LeadsEventForm"));
const LeadsTaskForm = lazy(() => import("./LeadsTaskForm"));

const TabPane = StyledTabs.TabPane;

const AddCallTaskModal = (props) => {
  const { addCallTaskModal, handleLeadCallModal, ...formProps } = props;
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
        visible={addCallTaskModal}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleLeadCallModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsActivityTab   rowdata={props.rowdata}/>

        </Suspense>
      </StyledDrawer>
    </>
  );
  function LeadsActivityTab (props) {
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
                  <LeadsCallForm  rowdata={props.rowdata} {...formProps} />
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
                  <LeadsEventForm rowdata={props.rowdata} {...formProps}/>
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
                  <LeadsTaskForm rowdata={props.rowdata} {...formProps}/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          <AddCallTaskModal
          rowdata={props.rowdata}
            addCallTaskModal={addCallTaskModal}
            handleLeadCallModal={handleLeadCallModal}
          />
        </>
      );
  }
};

export default AddCallTaskModal;
