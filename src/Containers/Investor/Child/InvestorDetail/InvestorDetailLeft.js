import React, {useState,lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ActivityListData from "../../../Activity/ActivityListData";
import InvestorActivityModal from "./InvestorActivity/InvestorActivityModal";
import { handleCallActivityModal } from "../../../Activity/ActivityAction";
const InvestorOverviewCard =lazy(()=> import("./InvestorCards/InvestorOverviewCard"));
const InvestorExtraDetailCard =lazy(()=> import("./InvestorCards/InvestorExtraDetailCard"));
const InvestorDetailCard =lazy(()=> import("./InvestorCards/InvestorDetailCard"));

const TabPane = StyledTabs.TabPane;
function InvestorDetailLeft(props) {
    const { investorDetails } = props;
    
      const [activeKey, setActiveKey] = useState("1");
    const handleTabChange = (key) => {
      setActiveKey(key);
    };
    const {  investorDetails: { investorId, name }
  } = props;
    return (
      <>
        <div class=" flex flex-col">
        < Suspense fallback={"Loading..."}>
           <InvestorOverviewCard investorDetails={investorDetails}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage} />
       <InvestorExtraDetailCard investorDetails={investorDetails} 
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}/>         
          {/* <InvestorDetailCard investorDetails={investorDetails}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage} />  */}
             <TabsWrapper >
              <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>
              <TabPane
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
                       
                       onClick={() => props.handleCallActivityModal(true)}
                     
                    />
                  </>
                )}
              
              </>
            }
            key="1"
          >
              
                <Suspense fallback={"loading ..."}>
                    <ActivityListData
                 uniqueId={props.investorDetails.investorId}
                 type={"investor"}
                 investor={props.investorDetails}
                 translateText={props.translateText}
                 selectedLanguage={props.selectedLanguage}
                 //translatedMenuItems={this.props.translatedMenuItems}
                 /> 
                </Suspense>
              </TabPane>
              </StyledTabs>
             </TabsWrapper>
                          
                        <InvestorActivityModal
                            translateText={props.translateText}
                            selectedLanguage={props.selectedLanguage}
                         customerId={props. customerId }
                         customer={props.customer}
                          defaultValue={[{ label: name, value: investorId }]}
                          investorId={{ value: investorId }}
                          uniqueId={props.investorDetails.investorId}
                    investorDetails={props.investorDetails}
                    name={props.investorDetails.name}
                    investor={props.investorDetails}
                    callActivityModal={props.callActivityModal}
                    handleCallActivityModal={props.handleCallActivityModal}
                     />
           </Suspense>
        </div>
      </>
    );
  
}
const mapStateToProps = ({ auth, investor,activity, customer, opportunity,deal }) => ({
 
  userId: auth.userDetails.userId,
  callActivityModal:activity.callActivityModal,
  addCustomerContactModal: customer.addCustomerContactModal,
  investorActivityCount:investor.investorActivityCount,
  investorActivityModal:investor.investorActivityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
handleCallActivityModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDetailLeft);
