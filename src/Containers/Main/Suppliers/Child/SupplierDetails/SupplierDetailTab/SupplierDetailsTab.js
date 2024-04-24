import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import {
  TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import {
  handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder,
  handleSuppleirSuppliesDrawer, handleSupplierContactModal,
  handleSupplierDocumentUploadModal, handleSuppliersActivityModal
} from "../../../SuppliersAction"
import AddPoModal from "./AddPoModal";
import PurchaseOrderTable from "./PurchaseOrderTable";
import ContactsIcon from '@mui/icons-material/Contacts';
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import SupplierSuppliesDrawer from "./SupplierSupplies/SupplierSuppliesDrawer";
const SupplierSuppliesCardTable = lazy(() => import("./SupplierSupplies/SupplierSuppliesCardTable"));
const AddSupplierContactModal = lazy(() => import("./SupplierContactTab/AddSupplierContactModal"));
const SupplierContactTable = lazy(() => import("./SupplierContactTab/SupplierContactTable"));
const SupplierDocumentTable = lazy(() => import("./SupplierDocumentTab/SupplierDocumentTable"));
const AddSupplierDocumentModal = lazy(() => import("./SupplierDocumentTab/AddSupplierDocumentModal"));
const AddSuppliersActivityModal = lazy(() => import("./SuppliersActivityTab/AddSuppliersActivityModal"));
const SuppliersActivityTable = lazy(() => import("./SuppliersActivityTab/SuppliersActivityTable"));

const TabPane = StyledTabs.TabPane;

class SupplierDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  componentDidMount() {
    this.props.getTodayPurchaseOrder(this.props.supplier.supplierId)
  }
  render() {
    const { activeKey } = this.state
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <i class="far fa-share-square"></i>&nbsp; Purchase Order
                  {activeKey === "1" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          onClick={() => this.props.handleLinkSuppliersOrderConfigureModal(true)}
                          size="14px"
                          style={{
                            verticalAlign: "center",
                            marginLeft: "0.25em",
                          }}
                        />
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <PurchaseOrderTable supplier={this.props.supplier} />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>

                  <i class="fab fa-connectdevelop"></i>
                  <span style={{ marginLeft: "0.25em" }}>Materials</span>

                  {/* {activeKey === "2" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          onClick={() =>
                            this.props.handleSuppleirSuppliesDrawer(
                              true
                            )
                          }
                          size="14px"
                          style={{
                            verticalAlign: "center",
                            marginLeft: "0.25em",
                          }}
                        />
                      </Tooltip>
                    
                    </>
                  )} */}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                <SupplierSuppliesCardTable
                  supplier={this.props.supplier}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                  <ContactsIcon className="!text-base " />
                  <span style={{ marginLeft: "0.25em" }}>Contact</span>

                  {activeKey === "3" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          onClick={() =>
                            this.props.handleSupplierContactModal(
                              true
                            )
                          }
                          size="14px"
                          style={{
                            verticalAlign: "center",
                            marginLeft: "0.25em",
                          }}
                        />
                      </Tooltip>

                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                <SupplierContactTable
                  supplier={this.props.supplier}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file"></i>
                    <span style={{ marginLeft: "0.25em" }}>Documents</span>
                  </span>
                  {activeKey === "4" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          // type="plus"
                          // tooltipTitle="Create"
                          onClick={() =>
                            this.props.handleSupplierDocumentUploadModal(true)
                          }
                          size="14px"
                          style={{
                            verticalAlign: "center",
                            marginLeft: "0.25em",
                          }}
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
                <SupplierDocumentTable supplier={this.props.supplier} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file"></i>
                    <span style={{ marginLeft: "0.25em" }}>Activity</span>
                  </span>
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined
                          // type="plus"
                          // tooltipTitle="Create"
                          onClick={() =>
                            this.props.handleSuppliersActivityModal(true)
                          }
                          size="14px"
                          style={{
                            verticalAlign: "center",
                            marginLeft: "0.25em",
                          }}
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
                <SuppliersActivityTable supplier={this.props.supplier} />
              </Suspense>
            </TabPane>
          </StyledTabs>

        </TabsWrapper>
        <AddPoModal
          supplier={this.props.supplier}
          addLinkSuppliersOrderConfigureModal={this.props.addLinkSuppliersOrderConfigureModal}
          handleLinkSuppliersOrderConfigureModal={this.props.handleLinkSuppliersOrderConfigureModal}
        />
        <SupplierSuppliesDrawer
          supplier={this.props.supplier}
          supplierSuppliesdrwr={this.props.supplierSuppliesdrwr}
          handleSuppleirSuppliesDrawer={this.props.handleSuppleirSuppliesDrawer}
        />
        <AddSupplierContactModal
          type="supplier"
          id={this.props.supplier.supplierId}
          addSupplierContactModal={this.props.addSupplierContactModal}
          handleSupplierContactModal={this.props.handleSupplierContactModal}
        />
        <AddSupplierDocumentModal
          supplier={this.props.supplier}
          supplierDocumentUploadModal={this.props.supplierDocumentUploadModal}
          handleSupplierDocumentUploadModal={
            this.props.handleSupplierDocumentUploadModal
          }
        />
        <AddSuppliersActivityModal
          supplier={this.props.supplier}
          addSuppliersActivityModal={this.props.addSuppliersActivityModal}
          handleSuppliersActivityModal={
            this.props.handleSuppliersActivityModal
          }
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  poBySupplier: suppliers.poBySupplier,
  addLinkSuppliersOrderConfigureModal: suppliers.addLinkSuppliersOrderConfigureModal,
  supplierSuppliesdrwr: suppliers.supplierSuppliesdrwr,
  addSupplierContactModal: suppliers.addSupplierContactModal,
  supplierDocumentUploadModal: suppliers.supplierDocumentUploadModal,
  addSuppliersActivityModal: suppliers.addSuppliersActivityModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLinkSuppliersOrderConfigureModal,
      getTodayPurchaseOrder,
      handleSuppleirSuppliesDrawer,
      handleSupplierContactModal,
      handleSupplierDocumentUploadModal,
      handleSuppliersActivityModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsTab);
