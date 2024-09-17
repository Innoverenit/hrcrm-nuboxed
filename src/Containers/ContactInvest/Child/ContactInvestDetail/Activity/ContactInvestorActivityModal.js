import React, { lazy, Suspense,useEffect,useState } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const ContactInvestorCallActivityForm =lazy(()=>import("./ContactInvestorCallActivityForm"));
const ContactInvestorEventActivityForm =lazy(()=>import("./ContactInvestorEventActivityForm"));
const ContactInvestorTaskActivityForm =lazy(()=>import("./ContactInvestorTaskActivityForm"));

const TabPane = StyledTabs.TabPane;

const ContactInvestorActivityModal = (props) => {
  const { handleContactInvestActivityModal, contactInvestorActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
      
          "70", // "Calls",//1
          "35" , // "Events",//2
          "105" , // "Tasks",//3
        
        
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule"
        />}
        width={drawerWidth}
        visible={contactInvestorActivityModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleContactInvestActivityModal(false)}

        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <ContactInvestorActivityTab 
          
           investorId={props. investorId }
           contactInVestDetail={props.contactInVestDetail}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
           />

        </Suspense>
      </StyledDrawer>
    </>
  );
  function ContactInvestorActivityTab (props) {
    const { addCallTaskModal, handleLeadCallModal } = props;
      const { ...formProps } = props;
      console.log(props.rowdata)
      return (
        <>
          <TabsWrapper>
            <StyledTabs
              defaultActiveKey="1"
              style={{ overflow: "visible", width: "50vw", padding: "4px" }}
              animated={false}
            >
              <TabPane
                tab={
                  <span>
                   <i class="fas fa-phone-square"></i>&nbsp;
                   {translatedMenuItems[0]}
                   {/* Calls */}
                  </span>
                }
                key="1"
              >
                <Suspense fallback={"loading ..."}>
                  <ContactInvestorCallActivityForm 
                    investorId={props. investorId }
                    contactInVestDetail={props.contactInVestDetail}{...formProps} />
                </Suspense>
              </TabPane>
          
              <TabPane
                tab={
                  <span>
                    <i class="fas fa-tasks"></i>&nbsp;
                    {translatedMenuItems[1]}
                    {/* events  */}
                  </span>
                }
                key="2"
              >
                <Suspense fallback={"loading ..."}>
                  <ContactInvestorEventActivityForm
                   investorId={props. investorId }
                   contactInVestDetail={props.contactInVestDetail} {...formProps}/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i class="far fa-calendar-check"></i>&nbsp;
                    {translatedMenuItems[2]}
                    {/* Calls */}
                  </span>
                }
                key="3"
              >
                <Suspense fallback={"loading ..."}>
                  <ContactInvestorTaskActivityForm 
                   investorId={props. investorId }
                   contactInVestDetail={props.contactInVestDetail} {...formProps}/>
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

export default ContactInvestorActivityModal;
