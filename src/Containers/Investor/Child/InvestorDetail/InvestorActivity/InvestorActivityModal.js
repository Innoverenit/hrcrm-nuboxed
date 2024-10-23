import React, { Suspense,lazy,useEffect,useState } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
const InvestorCallActivityForm=lazy(()=>import("./InvestorCallActivityForm"));
const InvestorEventActivityForm=lazy(()=>import("./InvestorEventActivityForm"));
const InvestorTaskActivityForm=lazy(()=>import("./InvestorTaskActivityForm"));




const TabPane = StyledTabs.TabPane;

const InvestorActivityModal = (props) => {
  const { handleActivityModal, investorActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          // "", //  "Schedule",//0
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
        // title=
        // {translatedMenuItems[0]}
        width={drawerWidth}
        visible={investorActivityModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleActivityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <InvestorActivityTab 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
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
              style={{ overflow: "visible", width: "52vw", padding: "5px" }}
              animated={false}
            >
              <TabPane
                tab={
                  <span>
                      <VolumeUpIcon        
              className='!text-icon'
              />
                   {translatedMenuItems[0]}
                    {/* Calls */}
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
                    <EventAvailableIcon
              className='!text-icon '
              />
                    {translatedMenuItems[1]}
                    {/* Events */}
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
                      <FactCheckIcon
              className='!text-icon'
              />
                    {translatedMenuItems[2]}
                    {/* Tasks */}
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
