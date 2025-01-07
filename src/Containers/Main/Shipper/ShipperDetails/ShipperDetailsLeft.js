import React, { Component, lazy, Suspense } from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../Components/UI/Antd";
import { FlexContainer, TabsWrapper } from "../../../../Components/UI/Layout";
import ShipperActivityTable from "./ShipperDetailsTab/ShipperActivityTab/ShipperActivityTable";
import AddShipperActivityModal from "./ShipperDetailsTab/ShipperActivityTab/AddShipperActivityModal";
import { handleShipperActivityModal } from "../ShipperAction";
import ActivityListData from "../../../Activity/ActivityListData";
import { handleCallActivityModal } from "../../../Activity/ActivityAction";
const ShipperOverViewCard =lazy(()=>import("./ShipperCards/ShipperOverViewCard"));
const ShipperDetailCard =lazy(()=>import("./ShipperCards/ShipperDetailCard"));
// const ShipperOverViewDetailCard =lazy(()=>import("./ShipperCards/ShipperOverViewDetailCard"));

const TabPane = StyledTabs.TabPane;
class ShipperDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { shipper,
      callActivityModal,
      handleCallActivityModal,
     } = this.props;
    const { activeKey } = this.state;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <Suspense fallback={"Loading..."}>
          <ShipperOverViewCard  shipper={shipper}
 translateText={this.props.translateText}
 selectedLanguage={this.props.selectedLanguage}
 translatedMenuItems={this.props.translatedMenuItems}
          />
          <ShipperDetailCard shipper={shipper} 
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
       uniqueId={this.props.shipper.shipperId}
       type={"shipper"}
       shipper={this.props.shipper}
           shipperId={this.props.shipper.shipperId}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
          /> 
              </Suspense>
            </TabPane>
                  </StyledTabs>
                  </TabsWrapper>
          {/* <ShipperOverViewDetailCard shipper={shipper}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  translatedMenuItems={this.props.translatedMenuItems}
           /> */}
           </Suspense>
        </FlexContainer>
        
        <AddShipperActivityModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
         callActivityModal={callActivityModal}
         handleCallActivityModal={handleCallActivityModal}
                    defaultValue={[{ label: this.props.shipper.name, value: this.props.shipper.shipperId }]}
                    shipperId={{ value: this.props.shipper.shipperId }}
                    uniqueId={this.props.shipper.shipperId}
                    shipper={this.props.shipper}
                  name={this.props.shipper.name}
                  
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
export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetailLeft);
