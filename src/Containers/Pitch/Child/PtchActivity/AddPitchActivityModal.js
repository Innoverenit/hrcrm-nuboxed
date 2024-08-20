import React, { Suspense,lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const PitchCallForm =lazy(()=>import("./PitchCallForm"));
const PitchTaskForm =lazy(()=>import("./PitchTaskForm"));
const PitchEventForm =lazy(()=>import("./PitchEventForm"));





const TabPane = StyledTabs.TabPane;

const AddPitchActivityModal = (props) => {
  const { addPitchactivityModal, handlePitchActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  console.log("rowdata",props.rowdata)
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedule"
          defaultMessage="Schedule"
        />}
        width={drawerWidth}
        visible={addPitchactivityModal}
        onClose={() => handlePitchActivityModal(false)}

      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <LeadsActivityTab   rowdata={props.rowdata}/>

        </Suspense>
      </StyledDrawer>
    </>
  );
  function LeadsActivityTab (props) {
    const { addPitchactivityModal, handlePitchActivityModal } = props;
      const { ...formProps } = props;
      console.log(props.rowdata)
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
                   <FormattedMessage
                        id="app.calls"
                        defaultMessage="Calls"
                      />
                    
                  </span>
                }
                key="1"
              >
                <Suspense fallback={"loading ..."}>
                  <PitchCallForm  rowdata={props.rowdata} {...formProps} />
                </Suspense>
              </TabPane>
          
              <TabPane
                tab={
                  <span>
                    <i class="fas fa-tasks"></i>&nbsp;
                    <FormattedMessage
                        id="app.events"
                        defaultMessage="Events"
                      />
                    
                  </span>
                }
                key="2"
              >
                <Suspense fallback={"loading ..."}>
                  <PitchEventForm rowdata={props.rowdata}
                  //  {...formProps}
                   />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i class="far fa-calendar-check"></i>&nbsp;
                    <FormattedMessage
                        id="app.tasks"
                        defaultMessage="Tasks"
                      />
                    
                  </span>
                }
                key="3"
              >
                <Suspense fallback={"loading ..."}>
                  <PitchTaskForm rowdata={props.rowdata} {...formProps}/>
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          <AddPitchActivityModal
          rowdata={props.rowdata}
          addPitchactivityModal={addPitchactivityModal}
            handlePitchActivityModal={handlePitchActivityModal}
          />
        </>
      );
  }
};

export default AddPitchActivityModal;
