import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import UpdateActivityCallForm from "./UpdateActivityCallForm"
import UpdateActivityEventForm from "./UpdateActivityEventForm"
import UpdateActivityTaskForm from "./UpdateActivityTaskForm"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FactCheckIcon from '@mui/icons-material/FactCheck';


const TabPane = StyledTabs.TabPane;

function UpdateActivityForm (props) {
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
                {props.selectedStatus.category==="Call"&&(
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
    <UpdateActivityCallForm 
      uniqueId={props.uniqueId}
      type={props.type}
      selectedStatus={props.selectedStatus}
  //   contact={props.contact}
  //   type={props.type}
  //    uniqueId={props.uniqueId}
  //    investor={props.investor}
  //    name={props.name}
  //    defaultValue={props.defaultValue}
  //      defaultCustomers={props.defaultCustomers}
  //      customerId={props. customerId}
  //   customer={props.customer} 
  //   distributorId={props. distributorId}
  //   distributor={props.distributor}
  //   supplierId={props. supplierId}
  //   supplier={props.supplier}
  //   shipper={props.shipper}
  //   shipperId={props. shipperId}
  //   {...formProps}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  </Suspense>
</TabPane>
                )}
            
            {props.selectedStatus.category==="Event"&&(
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
                  <UpdateActivityEventForm 
                    uniqueId={props.uniqueId}
                    type={props.type}
                    selectedStatus={props.selectedStatus}
                //    contact={props.contact}
                //    type={props.type}
                //    uniqueId={props.uniqueId}
                //    defaultValue={props.defaultValue}
           
                //    name={props.name}
                //    investor={props.investor}
                //     defaultCustomers={props.defaultCustomers}
                //     customerId={props. customerId }
                //   customer={props.customer}
                //   distributorId={props. distributorId}
                //   distributor={props.distributor}
                //   supplierId={props. supplierId}
                //   supplier={props.supplier}
                //   shipper={props.shipper}
                //   shipperId={props. shipperId}
                //    {...formProps}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
              </TabPane>
            )}
            {props.selectedStatus.category==="Task"&&(
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
                  <UpdateActivityTaskForm 
                    uniqueId={props.uniqueId}
                    type={props.type}
                    selectedStatus={props.selectedStatus}
                //    contact={props.contact}
                //    type={props.type}
                //    defaultValue={props.defaultValue}
                //    uniqueId={props.uniqueId}
                //    investor={props.investor}
                //    name={props.name}
                //     defaultCustomers={props.defaultCustomers}
                //     customerId={props. customerId }
                //   customer={props.customer}        
                //    distributorId={props. distributorId}
                //   distributor={props.distributor}
                //   supplierId={props. supplierId}
                //   supplier={props.supplier}
                //   shipper={props.shipper}
                //   shipperId={props. shipperId}
                //   {...formProps}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
              </TabPane>
            )}
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



export default UpdateActivityForm;