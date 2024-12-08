import React, { lazy,Suspense,useEffect } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";

import { Badge, Tooltip } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {handleCallActivityModal} from "../../../Activity/ActivityAction"
import { handleCETactivityContactModal,getContactActivityRecords} from "../../ContactAction";
import ActivityListData from "../../../Activity/ActivityListData";
const ContactCETdr =lazy(()=>import("./ContactCETdr"));
const ContactCETcard =lazy(()=>import("./ContactCETcard"));

const TabPane = StyledTabs.TabPane;


 
function ContactCETTab (props) {

      
      useEffect(() => {
        props.getContactActivityRecords(props.currentContact.contactId);
      }, []);
        const { clickCETcontactActivity, handleCETactivityContactModal } = props;
          const { ...formProps } = props;

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
                      <>
              
                        <span>
                        <Badge
                count={props.contactActivityCount.count}
                overflowCount={999}
              > 
                             <i class="fas fa-phone-square mr-1"></i>
                        Activity
                     </Badge>
                        </span>
                     
                          <>
                            <Tooltip 
                              title="Create"
                               
                            >
                          
                               <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                                                       
                                tooltiptitle="Create"
                                  
                                onClick={() => {
                                    props.handleCallActivityModal(true);
                                }}
                              
                              />
                             
                            </Tooltip>
                          </>
                       
                      </>
                    }
                    key="1"
                  >
                    <Suspense fallback={"Loading ..."}>
                      {" "}
                      {/* <ContactCETcard
                        currentContact={props.currentContact}
                      /> */}
                      <ActivityListData
                      uniqueId={props.contact}
                      type={props.type}
                      />
                    </Suspense>
                  </TabPane>
                
                </StyledTabs>
              </TabsWrapper>
              <Suspense fallback={<BundleLoader/>}>
              <ContactCETdr
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
                       contact={props.contact}
                       type={props.type}
              currentContact={props.currentContact}
              callActivityModal={props.callActivityModal}
              handleCallActivityModal={props.handleCallActivityModal}
              />
              </Suspense>
            </>
          );
      }
const mapStateToProps = ({ contact,activity }) => ({
    clickCETcontactActivity:contact.clickCETcontactActivity,
    callActivityModal:activity.callActivityModal,
    contactActivityCount:contact.contactActivityCount
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleCETactivityContactModal,
    handleCallActivityModal,
    getContactActivityRecords
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCETTab);
