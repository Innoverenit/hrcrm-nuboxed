import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";
import { message, Tooltip } from "antd";
import {
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
import {
  PlusOutlined,
} from "@ant-design/icons";
import AddSupplierContactModal from "../../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierContactTab/AddSupplierContactModal";
import AddSupplierDocumentModal from "../../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierDocumentTab/AddSupplierDocumentModal";
import ShipperAwbTable from "./ShipperActivityTab/ShipperAwbTable";
import ErpNote from "../../../ErpNote/ErpNote";

const ShipperDocumentTable = lazy(() =>
  import("./ShipperDocumentTab/ShipperDocumentTable")
);
const ShipperActivityTable = lazy(() => import("./ShipperActivityTab/ShipperActivityTable")
);

const ContactShipperTable = lazy(() =>
  import("./ShipperContactTab/ContactShipperTable")
);
const AddShipperDocumentModal = lazy(() =>
  import("./ShipperDocumentTab/AddShipperDocumentModal")
);

const LinkedShipperNotes = lazy(() =>
  import("../ShipperDetailsTab/ShipperNotetab/LinkedShipperNotes")
);
// const AddShipperActivityModal = lazy(() =>import(
//     "../ShipperDetailsTab/ShipperActivitytab/AddShipperActivityModal"
//   )
// );
// const ShipperSubscriptionConfigureModal = lazy(() =>
//   import(
//     "../ShipperDetailsTab/ShipperOrderTab/ShipperSubscriptionConfigureModal"
//   )
// );
// const ShipperOrderGeneratorTable = lazy(() =>
//   import("../ShipperDetailsTab/ShipperOrderTab/ShipperOrderGeneratorTable")
// );


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
    };
  }

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
    const { activeKey } = this.state;
    const { orderForGenerating } = this.props;
    console.log(this.props.shipper.shipperId);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {/* <TabPane
              tab={
                <>
                  <i class="far fa-share-square"></i>&nbsp; Dispatch
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <ShipperDispatchTable
                  shipperId={this.props.shipper.shipperId}
                />
              </Suspense>
            </TabPane> */}

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fab fa-connectdevelop"></i>&nbsp;
                    <FormattedMessage id="app.activity" defaultMessage="Activity" />

                  </span>
                  {activeKey === "2" && (
                    <>
                      {/* <Tooltip title="Create">
                        <PlusOutlined
                          onClick={() =>
                            this.props.handleShipperActivityModal(true)
                          }
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
                        />
                      </Tooltip> */}
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                <ShipperActivityTable
                  shipperId={this.props.shipper.shipperId}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fab fa-connectdevelop"></i>&nbsp;
                    <FormattedMessage id="app.awb" defaultMessage="AWB" />

                  </span>
                  {activeKey === "3" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                <ShipperAwbTable
                  shipperId={this.props.shipper.shipperId}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i className="fa fa-sticky-note" aria-hidden="true"></i>
                    &nbsp; <FormattedMessage id="app.notes" defaultMessage="Notes" />
                  </span>
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ErpNote
                         type="shipper"
                         id={this.props.shipper.shipperId}
                        />
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
                  <span>
                    <i class="far fa-file"></i>
                    &nbsp;
                    <FormattedMessage id="app.documents" defaultMessage="Documents" />
                  </span>
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Create"
                          onClick={() =>
                            // this.props.handleShipperDocumentUploadModal(true)
                            this.props.handleSupplierDocumentUploadModal(true)
                          }
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
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
                <ShipperDocumentTable
                  shipperId={this.props.shipper.shipperId}
                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <span>
                    <i class="fas fa-file-contract"></i>
                    &nbsp;
                    <FormattedMessage id="app.contact" defaultMessage="Contact" />

                  </span>
                  {activeKey === "6" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          type="plus"
                          tooltipTitle="Create"
                          onClick={() =>
                            //this.props.handleShipperContactModal(true)
                            this.props.handleSupplierContactModal(true)
                          }
                          size="14px"
                          style={{ verticalAlign: "center", marginLeft: "5px" }}
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
                <ContactShipperTable shipperId={this.props.shipper.shipperId} />
              </Suspense>
            </TabPane>
          </StyledTabs>
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
            shipperId={this.props.shipper.shipperId}
            supplierDocumentUploadModal={this.props.supplierDocumentUploadModal}
            handleSupplierDocumentUploadModal={
              this.props.handleSupplierDocumentUploadModal
            }
          />

          <AddSupplierContactModal
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
