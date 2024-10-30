import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import {
  handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder,
  handleSuppleirSuppliesDrawer, handleSupplierContactModal,
  handleSupplierDocumentUploadModal, handleSupplierInventoryImportModal,handleSuppliersActivityModal,handleSupplierExcleUploadModal
} from "../../../SuppliersAction";
import ContactsIcon from '@mui/icons-material/Contacts';
import { FileExcelOutlined,  } from "@ant-design/icons";
import { Tooltip } from "antd";
import Shop2Icon from '@mui/icons-material/Shop2'; 
import InventoryIcon from '@mui/icons-material/Inventory';
const AddPoModal = lazy(() => import("./AddPoModal"));
const AddSupplierInventoryImportModal = lazy(() => import("./SuppliersActivityTab/SuppliersActivityTable"));
const PurchaseOrderTable = lazy(() => import("./PurchaseOrderTable"));//1
const SupplierSuppliesDrawer = lazy(() => import("./SupplierSupplies/SupplierSuppliesDrawer"));
const InventoryTable = lazy(() => import("./InventoryTable"));//2
const AddSupplierExcleModal = lazy(() => import("./SupplierDocumentTab/AddSupplierExcleModal"));
const SupplierSuppliesCardTable = lazy(() => import("./SupplierSupplies/SupplierSuppliesCardTable"));//3
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
       
       "831", // "Purchase Order",
       "880",// "Inventory",
       "1235",// "Materials",
       "73",  // "Contact",
       "138",  // "Document",
       "1165", // "Activity" 
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
  render() {
    const { activeKey } = this.state
    const renderTabContent = (key) => {
      switch (key) {
        case "1":
          return     <div> 
                  <PurchaseOrderTable supplier={this.props.supplier}           
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/>
              </div>;
        case "2":
          return  <div>   <InventoryTable 
          supplier={this.props.supplier}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}/></div>;
          case "3":
              return  <div>  <SupplierSuppliesCardTable
              supplier={this.props.supplier}
              translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
            /></div>;
              case "4":
                  return  <div> 
                  <SupplierContactTable
                  supplier={this.props.supplier}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>
                      </div>;
                   case "5":
                      return  <div> <SupplierDocumentTable supplier={this.props.supplier} 
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage}/></div>;
                      case "6":
                      return  <div> 
                       <SuppliersActivityTable supplierId={this.props.supplier && this.props.supplier.supplierId } 
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}/>
                          </div>;
                  
        default:
          return null;
      }
    };
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                <div className="flex items-center">
                <Shop2Icon className="!text-icon text-[#96bdc6] mr-1 "/>
                   <div className="max-xl:text-[0.65rem] !text-tab font-poppins text-sm">
                   {this.state.translatedMenuItems[0]}
                   {/* Purchase Order */}
                   </div>
                  
                  {activeKey === "1" && (
                    <>
                      <Tooltip title="Create">
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                          onClick={() => this.props.handleLinkSuppliersOrderConfigureModal(true)}                                  
                        />
                      </Tooltip>
                    </>
                  )}
                   </div>
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {/* <PurchaseOrderTable supplier={this.props.supplier}           
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/> */}
                
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>
                <div className="flex items-center">
                  <InventoryIcon className="!text-icon mr-1 text-[#ef8354]"/>
                   <div className="max-xl:text-[0.65rem] !text-tab  mr-1 font-poppins text-sm">{this.state.translatedMenuItems[1]}</div>
                  {activeKey === "2" && (
                    <>
                      <Tooltip title="Create">
                       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                          onClick={() => this.props.handleSupplierExcleUploadModal(true)}                                               
                        />
                      </Tooltip>
                      <FileExcelOutlined
                       onClick={() => this.props.handleSupplierInventoryImportModal(true)}
                       //onClick={() => this.props.handleSupplierInventoryImportModal(true)}
                      />                     
                    </>
                  )} 
                  </div>                
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {/* <InventoryTable 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/> */}
              </Suspense>
            </TabPane>

            <TabPane
              tab={
                <>

                  <CategoryIcon className="!text-icon text-[#42bfdd]"/>
                  <span className="max-xl:text-[0.65rem] !text-tab font-poppins text-sm ml-1" >{this.state.translatedMenuItems[2]}</span>
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {/* <SupplierSuppliesCardTable
                  supplier={this.props.supplier}
                  translateText={this.props.translateText}
                 selectedLanguage={this.props.selectedLanguage}
                /> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>

                  <ContactsIcon className="!text-icon text-[#96bdc6] "/>
                  <span className="max-xl:text-[0.65rem] ml-1 font-poppins !text-tab text-sm">{this.state.translatedMenuItems[3]}</span>

                  {activeKey === "4" && (
                    <>
                      <Tooltip title="Create">
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
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
                {/* <SupplierContactTable
                  supplier={this.props.supplier}
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    <i class="far fa-file text-[#96bdc6]"></i>
                    <span className="max-xl:text-[0.65rem] ml-1 !text-tab font-poppins text-sm ">{this.state.translatedMenuItems[4]}</span>
                  </span>
                  {activeKey === "5" && (
                    <>
                      <Tooltip title="Create">
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"                     
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
                {/* <SupplierDocumentTable supplier={this.props.supplier} 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}/> */}
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                  <HourglassFullIcon className="text-blue-500  !text-icon" />
                    <span className="max-xl:text-[0.65rem] !text-tab ml-1 font-poppins text-sm ">{this.state.translatedMenuItems[5]}</span>
                  </span>
                  {activeKey === "6" && (
                    <>
                      <Tooltip title="Create">
                        <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                          //
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
                {/* <SuppliersActivityTable supplierId={this.props.supplier && this.props.supplier.supplierId } 
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}/> */}
                
              </Suspense>
            </TabPane>
          
          </StyledTabs>
          <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
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
