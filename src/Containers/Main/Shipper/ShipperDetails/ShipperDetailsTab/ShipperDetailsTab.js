import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AddShipperCostModal from "../ShipperDetailsTab/AddShipperCostModal"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import { message, Tooltip } from "antd";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ContactsIcon from '@mui/icons-material/Contacts';
import {
  handleShipperCostModal,
  handleLinkShipperOrderConfigureModal,
  handleShipperSubscriptionConfigureModal,
  handleShipperActivityModal,
  generateOrderByShipperId,
  getShipperOrderByShipperId,
  handleShipperDocumentUploadModal,
  handleShipperContactModal,
} from "../../ShipperAction";
import { handleSupplierDocumentUploadModal } from "../../../Suppliers/SuppliersAction";
import { handleSupplierContactModal } from "../../../Suppliers/SuppliersAction";
import dayjs from "dayjs";
import AddSupplierContactModal from "../../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierContactTab/AddSupplierContactModal";
import AddSupplierDocumentModal from "../../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierDocumentTab/AddSupplierDocumentModal";
import ShipperAwbTable from "./ShipperActivityTab/ShipperAwbTable";
import ErpNote from "../../../ErpNote/ErpNote";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ShipperDocumentTable = lazy(() =>
  import("./ShipperDocumentTab/ShipperDocumentTable")
);
const ShipperCostTable = lazy (() =>
import ("./ShipperCostTab/ShipperCostTable")
);
const ShipperActivityTable = lazy(() => import("./ShipperActivityTab/ShipperActivityTable")
);

const ContactShipperTable = lazy(() =>
  import("./ShipperContactTab/ContactShipperTable")
);
const AddShipperDocumentModal = lazy(() =>
  import("./ShipperDocumentTab/AddShipperDocumentModal")
);

const TabPane = StyledTabs.TabPane;

class ShipperDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      breadCumb1: false,
      value: 1,
      dailyCustomInd: 1,
      showDel: false,
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       
       "1165",//Activity 0
       "1377",// "ship id" 1
       "316",// "Notes" 2
       "138",  // Document 3
       "73",  // Contact 4
       "1219",// Cost
       
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
  handleGenerateOrderInShipper = (data) => {
    console.log({
      shipperId: this.props.shipperShipperId,
      products: this.props.orderForGenerating,
      subscriptionStartDate: dayjs().toISOString(),
      subscriptionType: this.state.value === 1 ? "Subscription" : "OneTime",
      data,
    });

    this.props.generateOrderByShipperId(
      {
        shipperId: this.props.shipperShipperId,
        products: this.props.orderForGenerating,
        subscriptionStartDate: dayjs(data.startDate).toISOString(),
        subscriptionType: this.state.value === 1 ? "Subscription" : "OneTime",
        deliveryType: this.state.dailyCustomInd === 1 ? "Daily" : "Custom",
        noOfDays: data.frequency,
        alterDays: data.alterDays,
        createdBy: this.props.userId,
        userId: this.props.ownerId,
        orderValue: this.props.orderValue,
      },
      this.handleCallBack
    );
  };
  handleCallBack = (data) => {
    if (data === "success") {
      message.success("Order generated successfully");
      this.setState({ breadCumb: false });
      this.props.getShipperOrderByShipperId(this.props.shipperShipperId);
    } else {
      message.error("something went wrong");
    }
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  onChangeCustom = (e) => {
    debugger;
    this.setState({
      dailyCustomInd: e.target.value,
    });
  };
  handleOrderCreateClick = (data) => {
    this.setState({ breadCumb: data });
    this.setState({ breadCumb1: false });
    this.setState({ showDel: false });
  };

  handleDeleteOrderClick = (data) => {
    this.setState({ breadCumb1: data });
    this.setState({ breadCumb: false });
    this.setState({ showDel: true });
  };

  handleTabChange = (key) => this.setState({ activeKey: key });
  
  render() {
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                 <ShipperActivityTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                />
              </div>;
        case "2":
          return  <div>  <ShipperAwbTable
          shipperId={this.props.shipper.shipperId}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        /></div>;
          case "3":
              return  <div>  <ErpNote
              type="shipper"
              id={this.props.shipper.shipperId}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
             /> </div>;
              case "4":
                  return  <div> 
                   <ShipperDocumentTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                />
                      </div>;
                   case "5":
                      return  <div> <ContactShipperTable shipperId={this.props.shipper.shipperId}
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage}
                     /></div>;
                      case "6":
                      return  <div> 
                        <ShipperCostTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                /> 
                          </div>;
                  
        default:
          return null;
      }
    };
    const { activeKey } = this.state;
    const { orderForGenerating } = this.props;
    console.log(this.props.shipper.shipperId);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
       

            <TabPane
              tab={
                <>
                  <span className="!text-tab">
                  <HourglassFullIcon className="text-blue-500   !text-tab" />&nbsp;
                  {/* Activity */}
                    {this.state.translatedMenuItems[0]}

                  </span>
                  {activeKey === "1" && (
                    <>
                
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {/* <ShipperActivityTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                /> */}
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span className="!text-tab">
                    <RocketLaunchIcon className=" !text-tab text-[#bdd358] mr-1">          
                    {/* ship id */}
</RocketLaunchIcon>
{this.state.translatedMenuItems[1]} 
                  </span>
                  {activeKey === "2" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {/* <ShipperAwbTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                /> */}
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
              <span className="!text-tab">
                    <i  className=" fa fa-sticky-note !text-tab text-[#b6465f] " aria-hidden="true"></i>
                    &nbsp; {this.state.translatedMenuItems[2]}
                    {/* notes */}
                  </span>
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <ErpNote
                         type="shipper"
                         id={this.props.shipper.shipperId}
                         translateText={this.props.translateText}
                         selectedLanguage={this.props.selectedLanguage}
                        /> */}
              </Suspense>
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span>
                    <i class="fas fa-history"></i>
                    &nbsp; History
                  </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ShipperHistoryTable />
              </Suspense>
            </TabPane> */}
            <TabPane
              tab={
                <>
                  <span className="!text-tab">
                    <i class="far fa-file text-[#41ead4]"></i>
                    &nbsp;
                    {this.state.translatedMenuItems[3]}
                    {/* Document */}
                  </span>
                  {activeKey === "4" && (
                    <>
                      <Tooltip title="Create">
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          onClick={() =>
                            // this.props.handleShipperDocumentUploadModal(true)
                            this.props.handleSupplierDocumentUploadModal(true)
                          }
          
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <ShipperDocumentTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                /> */}
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span className="!text-tab">
                  <ContactsIcon className="!text-icon text-[#96bdc6] " />
                    &nbsp;
                    {this.state.translatedMenuItems[4]}
                    {/* Contact */}

                  </span>
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Create">
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          onClick={() =>
                            //this.props.handleShipperContactModal(true)
                            this.props.handleSupplierContactModal(true)
                          }
                   
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                {/* <ContactShipperTable shipperId={this.props.shipper.shipperId}
                 translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
                /> */}
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span className="!text-tab">
                  <RequestQuoteIcon className=" !text-icon "/>
                    &nbsp;
                    {this.state.translatedMenuItems[5]}
                    {/* Cost */}
                  </span>
                  {activeKey === "6" && (
                    <>
                      <Tooltip title="Create">
                         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                         
                          tooltipTitle="Create"
                          onClick={() =>
                            // this.props.handleShipperDocumentUploadModal(true)
                            this.props.handleShipperCostModal(true)
                          }
                 
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                
                 {/* <ShipperCostTable
                  shipperId={this.props.shipper.shipperId}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}
                />  */}
              </Suspense>
            </TabPane>
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
          {/* <LinkShipperOrderConfigureModal
            addLinkShipperOrderConfigureModal={
              this.props.addLinkShipperOrderConfigureModal
            }
            handleLinkShipperOrderConfigureModal={
              this.props.handleLinkShipperOrderConfigureModal
            }
          />
          <ShipperSubscriptionConfigureModal
            onChange={this.onChange}
            value={this.state.value}
            onChangeCustom={this.onChangeCustom}
            dailyCustomInd={this.state.dailyCustomInd}
            addShipperSubscriptionConfigureModal={
              this.props.addShipperSubscriptionConfigureModal
            }
            handleShipperSubscriptionConfigureModal={
              this.props.handleShipperSubscriptionConfigureModal
            }
            handleGenerateOrderInShipper={this.handleGenerateOrderInShipper}
          />
          <AddShipperActivityModal
            addShipperActivityModal={this.props.addShipperActivityModal}
            handleShipperActivityModal={this.props.handleShipperActivityModal}
          />*/}
          {/* <AddShipperDocumentModal
            shipperDocumentUploadModal={this.props.shipperDocumentUploadModal}
            handleShipperDocumentUploadModal={
              this.props.handleShipperDocumentUploadModal
            }
          />  */}
          <AddSupplierDocumentModal
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            shipperId={this.props.shipper.shipperId}
            supplierDocumentUploadModal={this.props.supplierDocumentUploadModal}
            handleSupplierDocumentUploadModal={
              this.props.handleSupplierDocumentUploadModal
              
            }
          />



<AddShipperCostModal
addLinkShipperCostModal={this.props.addLinkShipperCostModal}
handleShipperCostModal={this.props.handleShipperCostModal}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            shipperId={this.props.shipper.shipperId}
            
          />

          <AddSupplierContactModal
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            addSupplierContactModal={this.props.addSupplierContactModal}
            handleSupplierContactModal={this.props.handleSupplierContactModal}
            id={this.props.shipper.shipperId}
            type="shipper"
          />
        </Suspense>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleShipperCostModal,
      handleLinkShipperOrderConfigureModal,
      handleShipperSubscriptionConfigureModal,
      handleShipperActivityModal,
      generateOrderByShipperId,
      getShipperOrderByShipperId,
      handleShipperDocumentUploadModal,
      handleShipperContactModal,
      handleSupplierContactModal,
      handleSupplierDocumentUploadModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetailsTab);
