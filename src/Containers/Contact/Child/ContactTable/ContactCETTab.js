import React, { lazy,Suspense,useEffect } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { Badge, Tooltip } from "antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { handleCETactivityContactModal,getContactActivityRecords} from "../../ContactAction";
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
                              title={
                                <FormattedMessage
                                  id="app.create"
                                  defaultMessage="Create"
                                />
                              }
                            >
                          
                               <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                                                       
                                tooltiptitle={
                                  <FormattedMessage
                                    id="app.Create"
                                    defaultMessage="Create"
                                  />
                                }
                                onClick={() => {
                                    handleCETactivityContactModal(true);
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
                      <ContactCETcard
                        currentContact={props.currentContact}
                      />
                    </Suspense>
                  </TabPane>
                
                </StyledTabs>
              </TabsWrapper>
              <Suspense fallback={<BundleLoader/>}>
              <ContactCETdr
              currentContact={props.currentContact}
                clickCETcontactActivity={clickCETcontactActivity}
                handleCETactivityContactModal={handleCETactivityContactModal}
              />
              </Suspense>
            </>
          );
      }
const mapStateToProps = ({ contact }) => ({
    clickCETcontactActivity:contact.clickCETcontactActivity,
    contactActivityCount:contact.contactActivityCount
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleCETactivityContactModal,
    getContactActivityRecords
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCETTab);
