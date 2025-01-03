import React, { Component ,lazy,Suspense} from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../Components/UI/Antd";
import { handleCallActivityModal } from "../../../Activity/ActivityAction";
import AddcontactActivityModal from "./ContactTab/AddcontactActivityModal";
import ActivityListData from "../../../Activity/ActivityListData";
const ContactOverViewCard=lazy(()=> import("./ContactCards/ContactOverViewCard"));
const ContactDetailCard=lazy(()=> import("./ContactCards/ContactDetailCard"));

const TabPane = StyledTabs.TabPane;
class ContactDetailsLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { contact: { contactId},contact,callActivityModal,
      handleCallActivityModal, } = this.props;
    const { activeKey } = this.state;
    return (
      <>
        <div  class=" flex flex-col">
          <ContactOverViewCard contact={contact}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
          <ContactDetailCard contact={contact} 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
           <TabsWrapper>
                  <StyledTabs>
                  <TabPane
              tab={
                <>
                  <span className="!text-tab">
                  <HourglassFullIcon className="text-blue-500   !text-tab" />&nbsp;
                  Activity
                 
                                </span>
                  {activeKey === "1" && (
                    <>
                <Tooltip                                       >
                                            <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                               
                                                tooltipTitle="Create"
                                                onClick={() =>
                                                  handleCallActivityModal(true)
                                                } />
                                        </Tooltip>
                    </>
                  )}
                </>
              }
              // key="1"
            >
              <Suspense fallback={"Loading ..."}>
  <ActivityListData
      uniqueId={contactId}
      type={"contact"}
       contact={this.props.contact}
           shipperId={this.props.contact.contactId}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
          /> 
              </Suspense>
            </TabPane>
                  </StyledTabs>
                  </TabsWrapper>
      </div>
       <AddcontactActivityModal
               translateText={this.props.translateText}
               selectedLanguage={this.props.selectedLanguage}
               callActivityModal={callActivityModal}
               handleCallActivityModal={handleCallActivityModal}
                          defaultValue={[{ label: this.props.contact.name, value: this.props.contact.contactId }]}
                          contactId={ contactId }
                          uniqueId={contactId}
                          type={"contact"}
                        name={this.props.contact.name}
                        
                        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth, activity }) => ({
  userId: auth.userDetails.userId,
  ownerId: shipper.shipperDetailsByShipperId.userId,
  callActivityModal:activity.callActivityModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      handleCallActivityModal,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsLeft);