import React, { Component,lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ActivityListData from "../../../Activity/ActivityListData";
import { handleCallActivityModal } from "../../../Activity/ActivityAction";
import AddCustomerActivityModal from "./AddCustomerActivityModal";
const CustomerOverviewCard =lazy(()=> import("./CustomerCards/CustomerOverViewCard"));
const CustomerDetailCard =lazy(()=> import("./CustomerCards/CustomerDetailCard"));
const CustomerExtraDetailCard =lazy(()=> import("./CustomerCards/CustomerExtraDetailCard"));
const TabPane = StyledTabs.TabPane;
class CustomerDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { customer,
      customer: { customerId, name },
      callActivityModal,
      handleCallActivityModal,
     } = this.props;
    const { activeKey } = this.state;
    return (
      <>
        <div class=" flex flex-col">
          <CustomerOverviewCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />
          {/* <CustomerTopicOfIntrest customer={customer} /> */}
          <CustomerExtraDetailCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />         
          {/* <CustomerDetailCard customer={customer}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} /> */}
               <TabsWrapper >
               <StyledTabs>  <TabPane
            tab={
              <>
               <HourglassFullIcon className="text-blue-500  !text-icon" />
                
                <span class="!text-tab font-poppins ">
              
                  Activity
                </span>
               
                {activeKey === "1" && (
                  <>
                    
 <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                      title="Create"
                       
                       onClick={() => handleCallActivityModal(true)}
                     
                    />
                  </>
                )}
              
              </>
            }
            key="1"
          >
            <Suspense fallback={"Loading ..."}>
              {" "}
                          <ActivityListData
          uniqueId={this.props.customer.customerId}
          type={"prospect"}
          customer={this.props.customer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          /> 
            </Suspense>
          </TabPane>
          </StyledTabs>
          </TabsWrapper>
          <AddCustomerActivityModal
           defaultValue={[{ label: name, value: customerId }]}
            customerId={{ value: customerId }}
            uniqueId={this.props.customer.customerId}
          customer={this.props.customer}
          name={this.props.customer.name}
          // callback={() => getContactListByCustomerId(customerId)}
            callActivityModal={callActivityModal}
            handleCallActivityModal={handleCallActivityModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          /> 
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer,activity }) => ({
  userId: auth.userDetails.userId,
  callActivityModal:activity.callActivityModal,
  customerId: customer.customer.customerId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallActivityModal
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailLeft);
