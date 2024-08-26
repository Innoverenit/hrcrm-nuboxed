import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category';
import {
  TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import {
  handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder,
  handleSuppleirSuppliesDrawer, handleSupplierContactModal,
  handleSupplierDocumentUploadModal, handleSupplierInventoryImportModal,handleSuppliersActivityModal,handleSupplierExcleUploadModal
} from "../../../SuppliersAction";
import ContactsIcon from '@mui/icons-material/Contacts';
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const AddPoModal = lazy(() => import("./AddPoModal"));
const AddSupplierInventoryImportModal = lazy(() => import("./SuppliersActivityTab/SuppliersActivityTable"));
const PurchaseOrderTable = lazy(() => import("./PurchaseOrderTable"));
const SupplierSuppliesDrawer = lazy(() => import("./SupplierSupplies/SupplierSuppliesDrawer"));
const InventoryTable = lazy(() => import("./InventoryTable"));
const AddSupplierExcleModal = lazy(() => import("./SupplierDocumentTab/AddSupplierExcleModal"));
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
      translatedMenuItems: [],
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  componentDidMount() {
    this.props.getTodayPurchaseOrder(this.props.supplier.supplierId)
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
       
        "Purchase Order",
        "Inventory",
        "Materials",
        "Contact",
        "Documents",
        "Activity" 
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      // this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
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
                   <div className="max-xl:text-[0.65rem]">
                   {this.state.translatedMenuItems[0]}
                   {/* Purchase Order */}
                   </div>
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
                <PurchaseOrderTable supplier={this.props.supplier} 
                translateText={this.props.translateText}

                />
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                  <i class="far fa-share-square"></i>&nbsp;
                   <div className="max-xl:text-[0.65rem]">{this.state.translatedMenuItems[1]}</div>
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
                <InventoryTable 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>

                  <CategoryIcon className="!text-icon"/>
                  <span className="max-xl:text-[0.65rem] ml-1" >{this.state.translatedMenuItems[2]}</span>
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                <SupplierSuppliesCardTable
                  supplier={this.props.supplier}
                  translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                  <ContactsIcon className="!text-icon "/>
                  <span className="max-xl:text-[0.65rem] ml-1">{this.state.translatedMenuItems[3]}</span>

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
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file"></i>
                    <span className="max-xl:text-[0.65rem] ml-1">{this.state.translatedMenuItems[4]}</span>
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
                <SupplierDocumentTable supplier={this.props.supplier} 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file"></i>
                    <span className="max-xl:text-[0.65rem] ml-1">{this.state.translatedMenuItems[5]}</span>
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
        <Suspense fallback={<BundleLoader />}>
        <AddPoModal
          supplier={this.props.supplier}
          addLinkSuppliersOrderConfigureModal={this.props.addLinkSuppliersOrderConfigureModal}
          handleLinkSuppliersOrderConfigureModal={this.props.handleLinkSuppliersOrderConfigureModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
        <SupplierSuppliesDrawer
          supplier={this.props.supplier}
          supplierSuppliesdrwr={this.props.supplierSuppliesdrwr}
          handleSuppleirSuppliesDrawer={this.props.handleSuppleirSuppliesDrawer}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
        <AddSupplierContactModal
          type="supplier"
          id={this.props.supplier.supplierId}
          addSupplierContactModal={this.props.addSupplierContactModal}
          handleSupplierContactModal={this.props.handleSupplierContactModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
        <AddSupplierDocumentModal
          supplier={this.props.supplier}
          supplierDocumentUploadModal={this.props.supplierDocumentUploadModal}
          handleSupplierDocumentUploadModal={
            this.props.handleSupplierDocumentUploadModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />

<AddSupplierExcleModal
          // supplier={this.props.supplier}
          supplierExcleUploadModal={this.props.supplierExcleUploadModal}
          handleSupplierExcleUploadModal={this.props.handleSupplierExcleUploadModal
          }
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />

        <AddSuppliersActivityModal
          supplier={this.props.supplier}
          addSuppliersActivityModal={this.props.addSuppliersActivityModal}
          handleSuppliersActivityModal={this.props.handleSuppliersActivityModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
        <AddSupplierInventoryImportModal
        handleSupplierInventoryImportModal={this.props.handleSupplierInventoryImportModal}
        addSupplierInventoryImportModal={this.props.addSupplierInventoryImportModal}
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
        />
         </Suspense>
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
