import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import CategoryIcon from '@mui/icons-material/Category';
import {
  TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import {
  handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder,
  handleSuppleirSuppliesDrawer, handleSupplierContactModal,
  handleSupplierDocumentUploadModal, handleSupplierInventoryImportModal,handleSuppliersActivityModal,handleSupplierExcleUploadModal
} from "../../../SuppliersAction"
import AddPoModal from "./AddPoModal";
import AddSupplierInventoryImportModal from "../AddSupplierInventoryImportModal"
import PurchaseOrderTable from "./PurchaseOrderTable";
import ContactsIcon from '@mui/icons-material/Contacts';
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import SupplierSuppliesDrawer from "./SupplierSupplies/SupplierSuppliesDrawer";
import InventoryTable from "./InventoryTable";
import AddSupplierExcleModal from "./SupplierDocumentTab/AddSupplierExcleModal";
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
                  <i class="far fa-share-square"></i>&nbsp;
                   <label className="max-xl:text-[0.65rem]">Purchase Order</label>
                  {activeKey === "1" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined className=" !text-icon  ml-1 items-center"
                          onClick={() => this.props.handleLinkSuppliersOrderConfigureModal(true)}                                  
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
                  <i class="far fa-share-square"></i>&nbsp;
                   <label className="max-xl:text-[0.65rem]">Inventory</label>
                  {activeKey === "2" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined className=" !text-icon  ml-1 items-center"
                          onClick={() => this.props.handleSupplierExcleUploadModal(true)}                                               
                        />
                      </Tooltip>
                      <FileExcelOutlined
                       onClick={() => this.props.handleSupplierInventoryImportModal(true)}
                       //onClick={() => this.props.handleSupplierInventoryImportModal(true)}
                      />                     
                    </>
                  )}                 
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                <InventoryTable />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>

                  <CategoryIcon className="!text-icon"/>
                  <span className="max-xl:text-[0.65rem] ml-1" >Materials</span>
                </>
              }
              key="3"
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

                  <ContactsIcon className="!text-icon "/>
                  <span className="max-xl:text-[0.65rem] ml-1">Contact</span>

                  {activeKey === "4" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined className=" !text-icon  ml-1 items-center"
                          onClick={() =>
                            this.props.handleSupplierContactModal(
                              true
                            )
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
                    <span className="max-xl:text-[0.65rem] ml-1">Documents</span>
                  </span>
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined className=" !text-icon  ml-1 items-center"                     
                          onClick={() =>
                            this.props.handleSupplierDocumentUploadModal(true)
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
                <SupplierDocumentTable supplier={this.props.supplier} />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file"></i>
                    <span className="max-xl:text-[0.65rem] ml-1">Activity</span>
                  </span>
                  {activeKey === "6" && (
                    <>
                      <Tooltip title="Create">
                        <PlusOutlined className=" !text-icon  ml-1 items-center"
                          // type="plus"
                          // tooltipTitle="Create"
                          onClick={() =>
                            this.props.handleSuppliersActivityModal(true)
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

<AddSupplierExcleModal
          // supplier={this.props.supplier}
          supplierExcleUploadModal={this.props.supplierExcleUploadModal}
          handleSupplierExcleUploadModal={
            this.props.handleSupplierExcleUploadModal
          }
        />

        <AddSuppliersActivityModal
          supplier={this.props.supplier}
          addSuppliersActivityModal={this.props.addSuppliersActivityModal}
          handleSuppliersActivityModal={
            this.props.handleSuppliersActivityModal
          }
        />
        <AddSupplierInventoryImportModal
        handleSupplierInventoryImportModal={this.props.handleSupplierInventoryImportModal}
        addSupplierInventoryImportModal={this.props.addSupplierInventoryImportModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  poBySupplier: suppliers.poBySupplier,
  addSupplierInventoryImportModal:suppliers.addSupplierInventoryImportModal,
  addLinkSuppliersOrderConfigureModal: suppliers.addLinkSuppliersOrderConfigureModal,
  supplierSuppliesdrwr: suppliers.supplierSuppliesdrwr,
  addSupplierContactModal: suppliers.addSupplierContactModal,
  supplierDocumentUploadModal: suppliers.supplierDocumentUploadModal,
  addSuppliersActivityModal: suppliers.addSuppliersActivityModal,
  supplierExcleUploadModal:suppliers.supplierExcleUploadModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSupplierInventoryImportModal,
      handleLinkSuppliersOrderConfigureModal,
      getTodayPurchaseOrder,
      handleSuppleirSuppliesDrawer,
      handleSupplierContactModal,
      handleSupplierDocumentUploadModal,
      handleSupplierExcleUploadModal,
      handleSuppliersActivityModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsTab);
