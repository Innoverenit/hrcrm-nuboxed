import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";

import ActivityCallForm from "./ActivityCallForm"
import ActivityEventForm from "./ActivityEventForm"
import ActivityTaskForm from "./ActivityTaskForm"

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FactCheckIcon from '@mui/icons-material/FactCheck';


const TabPane = StyledTabs.TabPane;

function ActivityForm (props) {
    const { addCallTaskModal, handleLeadCallModal } = props;
      const { ...formProps } = props;
      console.log(props.rowdata)
      return (
        <>
          <TabsWrapper style={{ height:"80vh"}}>
            <StyledTabs
              defaultActiveKey="1"
              style={{ overflow: "visible", padding: "4px" ,scrollbar:"thin"}}
              animated={false}
            >
              <TabPane
                tab={
                  <span>
                <VolumeUpIcon        
              className='!text-icon mr-1'
              />
                    Calls
                  </span>
                }
                key="1"
              >
                <Suspense fallback={"loading ..."}>
                  <ActivityCallForm 
                  contact={props.contact}
                  type={props.type}
                   uniqueId={props.uniqueId}
                   investor={props.investor}
                   name={props.name}
                   defaultValue={props.defaultValue}
                     defaultCustomers={props.defaultCustomers}
                     customerId={props. customerId }
                  customer={props.customer} {...formProps}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
              </TabPane>
          
              <TabPane
                tab={
                  <span>
                     <EventAvailableIcon
              className='!text-icon mr-1 '
              />
                    Events
                  </span>
                }
                key="2"
              >
                <Suspense fallback={"loading ..."}>
                  <ActivityEventForm 
                   contact={props.contact}
                   type={props.type}
                   uniqueId={props.uniqueId}
                   defaultValue={props.defaultValue}
           
                   name={props.name}
                   investor={props.investor}
                    defaultCustomers={props.defaultCustomers}
                    customerId={props. customerId }
                  customer={props.customer} {...formProps}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <span>
                     <FactCheckIcon
              className='!text-icon mr-1 '
              />
                    Tasks
                  </span>
                }
                key="3"
              >
                <Suspense fallback={"loading ..."}>
                  <ActivityTaskForm 
                   contact={props.contact}
                   type={props.type}
                   defaultValue={props.defaultValue}
                   uniqueId={props.uniqueId}
                   investor={props.investor}
                   name={props.name}
                    defaultCustomers={props.defaultCustomers}
                    customerId={props. customerId }
                  customer={props.customer} {...formProps}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
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



export default ActivityForm;