import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";


const LeadsCallForm = lazy(() => import("./LeadsCallForm"));
const LeadsEventForm = lazy(() =>import("./LeadsEventForm"));
const LeadsTaskForm = lazy(() => import("./LeadsTaskForm"));

const TabPane = StyledTabs.TabPane;

const AddCallTaskModal = (props) => {
  const { addCallTaskModal, handleLeadCallModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";

  return (
    <>
      <StyledDrawer
        title="Schedule"
     
        width={drawerWidth}
        visible={addCallTaskModal}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleLeadCallModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsActivityTab   rowdata={props.rowdata}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
          />

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
              // style={{ overflow: "visible", width: "52vw", padding: "5px" }}
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
                  <LeadsCallForm  rowdata={props.rowdata} {...formProps}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
                  />
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
                  <LeadsEventForm rowdata={props.rowdata} {...formProps}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
                  />
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
                  <LeadsTaskForm rowdata={props.rowdata} {...formProps}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          <AddCallTaskModal
          rowdata={props.rowdata}
            addCallTaskModal={addCallTaskModal}
            handleLeadCallModal={handleLeadCallModal}
            translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}
                   translatedMenuItems={props.translatedMenuItems}
          />
        </>
      );
  }
};

export default AddCallTaskModal;






