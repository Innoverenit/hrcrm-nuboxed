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
    const { shipper } = this.props;
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
                                                onClick={() => {
                                                    this.props.handleShipperActivityModal(true);
                                                }}
                                              
                                            />
                                        </Tooltip>
                    </>
                  )}
                </>
              }
              // key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <ShipperActivityTable
                  // shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
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
                    addShipperActivityModal={this.props.addShipperActivityModal}
                    handleShipperActivityModal={this.props.handleShipperActivityModal}
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
const mapStateToProps = ({ shipper, auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  ownerId: shipper.shipperDetailsByShipperId.userId,
  addLinkShipperOrderConfigureModal: shipper.addLinkShipperOrderConfigureModal,
  addShipperSubscriptionConfigureModal:
    shipper.addShipperSubscriptionConfigureModal,
    addLinkShipperCostModal:shipper.addLinkShipperCostModal,
  addShipperActivityModal: shipper.addShipperActivityModal,
  orderForGenerating: shipper.orderForGenerating,
  shipperShipperId: shipper.shipperDetailsByShipperId.shipperId,
  shipperDocumentUploadModal: shipper.shipperDocumentUploadModal,
  shipperContactModal: shipper.shipperContactModal,
  addSupplierContactModal: suppliers.addSupplierContactModal,
  supplierDocumentUploadModal: suppliers.supplierDocumentUploadModal,
  documentCountSupplierId:suppliers.documentCountSupplierId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      handleShipperActivityModal,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetailLeft);
