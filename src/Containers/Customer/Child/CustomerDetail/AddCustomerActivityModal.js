import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ActivityForm from "../../../Activity/ActivityForm";



const TabPane = StyledTabs.TabPane;

const AddCustomerActivityModal = (props) => {
  const { callActivityModal, handleCallActivityModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule"
        />}
        width={drawerWidth}
        visible={callActivityModal}
        onClose={() => handleCallActivityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CallTaskForm
          rowdata={props.rowdata}
          /> */}
          <ActivityForm
           defaultValue={props.defaultValue}
           customerId={props. customerId }
           uniqueId={props.uniqueId}
           
           name={props.name}
          customer={props.customer}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
          {/* <LeadsActivityTab 
           defaultCustomers={props.defaultCustomers}
           customerId={props. customerId }
          customer={props.customer}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          /> */}

        </Suspense>
      </StyledDrawer>
    </>
  );
  // function LeadsActivityTab (props) {
  //   const { addCallTaskModal, handleLeadCallModal } = props;
  //     const { ...formProps } = props;
  //     console.log(props.rowdata)
  //     return (
  //       <>
  //         <TabsWrapper style={{ height:"80vh"}}>
  //           <StyledTabs
  //             defaultActiveKey="1"
  //             style={{ overflow: "visible", padding: "4px" ,scrollbar:"thin"}}
  //             animated={false}
  //           >
  //             <TabPane
  //               tab={
  //                 <span>
  //               <VolumeUpIcon        
  //             className='!text-icon mr-1'
  //             />
  //                   Calls
  //                 </span>
  //               }
  //               key="1"
  //             >
  //               <Suspense fallback={"loading ..."}>
  //                 <CustomerCallActivityForm 
  //                    defaultCustomers={props.defaultCustomers}
  //                    customerId={props. customerId }
  //                 customer={props.customer} {...formProps}
  //                 translateText={props.translateText}
  //                 selectedLanguage={props.selectedLanguage}
  //               translatedMenuItems={props.translatedMenuItems}
  //                 />
  //               </Suspense>
  //             </TabPane>
          
  //             <TabPane
  //               tab={
  //                 <span>
  //                    <EventAvailableIcon
  //             className='!text-icon mr-1 '
  //             />
  //                   Events
  //                 </span>
  //               }
  //               key="2"
  //             >
  //               <Suspense fallback={"loading ..."}>
  //                 <CustomerEventActivityForm 
  //                   defaultCustomers={props.defaultCustomers}
  //                   customerId={props. customerId }
  //                 customer={props.customer} {...formProps}
  //                 translateText={props.translateText}
  //                 selectedLanguage={props.selectedLanguage}
  //               translatedMenuItems={props.translatedMenuItems}
  //                 />
  //               </Suspense>
  //             </TabPane>
  //             <TabPane
  //               tab={
  //                 <span>
  //                    <FactCheckIcon
  //             className='!text-icon mr-1 '
  //             />
  //                   Tasks
  //                 </span>
  //               }
  //               key="3"
  //             >
  //               <Suspense fallback={"loading ..."}>
  //                 <CustomerTaskActivityForm 
  //                   defaultCustomers={props.defaultCustomers}
  //                   customerId={props. customerId }
  //                 customer={props.customer} {...formProps}
  //                 translateText={props.translateText}
  //                 selectedLanguage={props.selectedLanguage}
  //               translatedMenuItems={props.translatedMenuItems}
  //                 />
  //               </Suspense>
  //             </TabPane>
  //           </StyledTabs>
  //         </TabsWrapper>
  //         {/* <AddCallTaskModal
  //         rowdata={props.rowdata}
  //           addCallTaskModal={addCallTaskModal}
  //           handleLeadCallModal={handleLeadCallModal}
  //         /> */}
  //       </>
  //     );
  // }
};

export default AddCustomerActivityModal;
