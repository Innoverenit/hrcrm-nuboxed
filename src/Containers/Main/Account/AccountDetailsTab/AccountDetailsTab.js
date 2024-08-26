import React, { lazy, Suspense, useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
    handleLinkDistributorOrderConfigureModal,
    handleLinkCustomerProcurementModal,
    handleDistributorContactModal,
    handleDistributorActivityModal,
    handleDistributorDocumentUploadModal,
    handleOrderGenerateModal,
    handleAddOrderModal,
    getOrderRecords,
    handleAccountOpportunityModal,
    getInvoiceCount
} from "../AccountAction";
import { handleSupplierDocumentUploadModal } from "../../Suppliers/SuppliersAction"
import { handleSupplierContactModal } from "../../Suppliers/SuppliersAction";
import { Tooltip, Badge } from "antd";
import AddIcon from '@mui/icons-material/Add';
import ContactsIcon from '@mui/icons-material/Contacts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { BundleLoader } from '../../../../Components/Placeholder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { HistoryOutlined } from "@ant-design/icons";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ShopIcon from '@mui/icons-material/Shop'

const CompleteOrderTable= lazy(() => import("./AccountOrderTab/CompleteOrderTable"));
const AddSupplierContactModal   = lazy(() => import("../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierContactTab/AddSupplierContactModal"));
const SalesMapTable  = lazy(() => import("./AccountDocumentTab/SalesMapTable"));
const AddSupplierDocumentModal = lazy(() => import("../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierDocumentTab/AddSupplierDocumentModal"));
const AddCustomerProcurementModal = lazy(() => import("./AccountOrderTab/AddCustomerProcurementModal"));
const AccountInvoiceTable = lazy(() => import("./AccountInvoiceTable"));
const ErpNote = lazy(() => import("../../ErpNote/ErpNote"));
const AddAccountOpportunityModal = lazy(() => import("./AddAccountOpportunityModal"));
const LinkedOpportunityTable = lazy(() => import("./LinkedOpportunityTable"));
const CustomerProcurementTable = lazy(() => import("./AccountOrderTab/CustomerProcurementTable"));
const AccountOrder1Table = lazy(() => import("./AccountOrder1Tab/AccountOrder1Table"));
const AccountOrderTable = lazy(() => import("./AccountOrderTab/AccountOrderTable"));
const AddAccountModal = lazy(() => import("./AccountOrderTab/AddAccountModal"));
const AccountActivityModal = lazy(() => import("./AccountActivityTab/AccountActivityModal"));
const DistributorDocumentTable = lazy(() => import("./AccountDocumentTab/DistributorDocumentTable"));
const CatalogueOrderModal = lazy(() => import("./AccountOrder1Tab/CatalogueOrderModal"));
const AccountContactTable = lazy(() => import("./AccountContactTab/AccountContactTable"))
const AccountActivityTable = lazy(() => import("./AccountActivityTab/AccountActivityTable"));

const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {
 
    const [activeKey, setactiveKey] = useState("1")
    const [breadCumb, setBreadCumb] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
props.getInvoiceCount(props.distributorData.distributorId)
    }, []);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Production', // 0
    'Repair', // 1
    ' Procure', // 2
    'Quotation', // 3
    ' Activity', // 4
    'Notes', // 5
    ' Documents',
    'Sales Map',
    'Summary',
    'Contact ',
    'Invoice',//10
    'Create',
     'Commerce', //12              
    'Add Commerce',//13
          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    const handleOrderCreateClick = () => {
        setBreadCumb(true);
    };
    const handleOrderClick = () => {
        setBreadCumb(true);
        setOpenOrder(false)
    };


    const handleOpenOrder = () => {
        setBreadCumb(false);
        setOpenOrder(true)
    };
    const handleTabChange = (key) => setactiveKey(key);
    console.log(props.productionInd)
    console.log(props.activeKey)
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>

                    {props.productionInd && <TabPane
                        tab={
                            <>
                                <span onClick={() => handleOrderCreateClick(false)}>
                                    <PrecisionManufacturingIcon />
                                    <span class="ml-1">
                                    {translatedMenuItems[0]} {/* Production */}
                                        </span>
                                </span>
                                {activeKey === "2" && (
                                    <>
                                        <Tooltip title={translatedMenuItems[11]}>
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[11]}
                                                onClick={() => {
                                                    props.handleAddOrderModal(true);
                                                }}
                                                className="!text-icon  cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}</>}
                        key="2"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountOrder1Table distributorId={props.distributorData.distributorId} 
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} />
                        </Suspense>
                    </TabPane>}
                    {props.user.repairInd && <TabPane
                        tab={
                            <>
                             <span onClick={() => handleOrderClick(false)}>
                                        <Tooltip title="Orders">
                                            <DynamicFeedIcon
                                                className="!text-icon  cursor-pointer"
                                            />
                                            <span class="ml-1 text-xs">
                                            {translatedMenuItems[1]}   {/* Repair */}
                                                </span>
                                        </Tooltip>
                                    </span>
                                <Badge
                                    size="small"
                                    count={(props.orderRecordData.order) || 0}
                                    overflowCount={999}
                                    offset={[ 0, -16]}
                                ></Badge>
                                &nbsp;
                                {activeKey === "3" && (
                                    <Tooltip title="Completed Orders">
                                        <HistoryOutlined
                                            fontSize="small"
                                            onClick={handleOpenOrder}
                                        />
                                    </Tooltip>
                                )}
                                &nbsp;
                                {activeKey === "3" && (
                                    <>
                                        <Tooltip title="Add Order">
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[11]}
                                                onClick={() => {
                                                    props.handleLinkDistributorOrderConfigureModal(true);
                                                }}
                                                className="!text-icon  -ml-3 cursor-pointer "
                                            />
                                        </Tooltip>
                                    </>
                                )}

                            </>
                        }
                        key="3"
                    >

                        <Suspense fallback={"Loading ..."}>
                            {openOrder ?
                                <CompleteOrderTable distributorId={props.distributorData.distributorId} type="complete" 
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText} /> :
                                <AccountOrderTable distributorId={props.distributorData.distributorId} type="incomplete" 
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}/>
                            }
                        </Suspense>
                    </TabPane>}

                   <TabPane
                        tab={
                            <>
                             <Tooltip title={translatedMenuItems[12]}>
                                            <ShopIcon
                                                className="!text-icon  cursor-pointer"
                                            />
                                            <span class="ml-1 text-xs">
                                            {translatedMenuItems[12]}
                                            {/* Procure */}
                                                </span>
                                        </Tooltip>
                                <Badge
                                    size="small"
                                    count={(props.procureRecordData.order) || 0}
                                    overflowCount={999}
                                    offset={[ 0, -16]}
                                >
                              </Badge>
                                &nbsp;  &nbsp;
                            
                              
                                {activeKey === "4" && (
                                    <>
                                        <Tooltip title={translatedMenuItems[13]}>
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[11]}
                                                onClick={() => {
                                                    props.handleLinkCustomerProcurementModal(true);
                                                }}
                                                className="!text-icon  ml-3 cursor-pointer "
                                            />
                                        </Tooltip>
                                    </>
                                )}

                            </>
                        }
                        key="4"
                    >

                        <Suspense fallback={"Loading ..."}>
                       
                                <CustomerProcurementTable distributorId={props.distributorData.distributorId} 
                                selectedLanguage={props.selectedLanguage}
                                translateText={props.translateText} />

                          
                        </Suspense>
                    </TabPane>
                    <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon className="!text-icon" />
                    <span class=" ml-1">
                      {/* <FormattedMessage
                        id="app.quotation"
                        defaultMessage="Quotation"
                      /> */}
                     {translatedMenuItems[3]}

                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip 
                        title={translatedMenuItems[11]}
                        // {
                        //   <FormattedMessage
                        //     id="app.create"
                        //     defaultMessage="Create"
                        //   />
                        // }
                      >
                        {props.user.opportunityCreateInd === true && (
                          <PlusOutlined
                            type="plus"
                            
                            tooltiptitle={translatedMenuItems[11]}
                            //   <FormattedMessage
                            //     id="app.Create"
                            //     defaultMessage="Create"
                            //   />
                           
                            onClick={() => {
                              props.handleAccountOpportunityModal(true);
                            }}
                            size="0.875em"
                            style={{
                              marginLeft: "0.3125em",
                              verticalAlign: "center",
                            }}
                          />
                        )}
                      </Tooltip>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedOpportunityTable distributorData={props.distributorData} 
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}/>
              </Suspense>
            </TabPane>
                  
                    <TabPane
                        tab={
                            <>

                                <span>
                                    <i class="fab fa-connectdevelop"></i>
                                    <span class="ml-1">
                                    {translatedMenuItems[4]}
                                    {/* Activity */}
                                        </span>
                                </span>
                                {activeKey === "5" && (
                                    <>
                                        <Tooltip title= {translatedMenuItems[11]}                                        >
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle= {translatedMenuItems[11]}
                                                onClick={() => {
                                                    props.handleDistributorActivityModal(true);
                                                }}
                                                className="!text-icon  cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="5"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountActivityTable distributorId={props.distributorData.distributorId} 
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}/>
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i>
                                    <span class="ml-1">
                                    {translatedMenuItems[5]}
                                    {/* Notes */}
                                        </span>
                                </span>
                            </>
                        }
                        key="6"
                    >
                        <Suspense fallback={"Loading ..."}>
                        <ErpNote
                         type="distributor"
                         id={props.distributorData.distributorId}
                         selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                        />
                        </Suspense>
                    </TabPane>

                    {/* <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-history"></i>
                                    <span class="ml-1">History</span>
                                </span>
                            </>
                        }
                        key="5"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane> */}

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="far fa-file"></i>
                                    <span class="ml-1">
                                    {translatedMenuItems[6]}
                                    {/* Documents */}
                                        </span>
                                </span>
                                {activeKey === "7" && (
                                    <>
                                        <Tooltip title="{translatedMenuItems[11]}">
                                            <AddIcon
                                                // type="plus"
                                                // tooltipTitle="Create"
                                                onClick={() =>
                                                    // props.handleDistributorDocumentUploadModal(
                                                    //     true
                                                    // )
                                                    props.handleSupplierDocumentUploadModal(true)
                                                }
                                                className="!text-icon  cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="7"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <DistributorDocumentTable
                                distributorId={props.distributorData.distributorId}
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                            />
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    {/* <i class="far fa-file"></i> */}
                                    <span class="ml-1">
                                    {translatedMenuItems[7]}
                                    {/* Sales Map */}
                                        </span>
                                </span>

                            </>
                        }
                        key="8"
                    >
                        <Suspense fallback={"Loading ..."}>

                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                <SummarizeIcon className="!text-icon mr-1"/>
                                    
                                    {translatedMenuItems[8]}
                                    {/* Summary */}
                                       
                                </span>

                            </>
                        }
                        key="9"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <SalesMapTable
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                            />
                            {/* <SummaryTable
                               
                            /> */}
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                               <ContactsIcon className="!text-icon" />
                                    {translatedMenuItems[9]}
                                    
                                    {/* Contact */}
                                </span>
                                {activeKey === "10" && (
                                    <>
                                        <Tooltip title="Add Contact">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="{translatedMenuItems[11]}"
                                                onClick={() => {
                                                    //  props.handleDistributorContactModal(true);
                                                    props.handleSupplierContactModal(true)
                                                }}
                                                className="!text-icon  cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="10"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountContactTable distributorId={props.distributorData.distributorId} 
                              selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}/>
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                            <span>
                                   <ReceiptIcon className="!text-icon"/>
                                   {translatedMenuItems[10]}
                                </span>
                            <Badge
            size="small"
            count={( props.invoiceCount.paymentCount) || 0}
            overflowCount={999}
            offset={[ 0, -16]}
          >
                                
                                </Badge>
                                {activeKey === "11" && (
                                    <>  
                                    </>
                                )}
                                
                            </>
                        }
                        key="11"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountInvoiceTable    distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} />
                        </Suspense>
                    </TabPane>
                </StyledTabs>
            </TabsWrapper>
            {/* <AddDistributorDocumentModal
                distributorDocumentUploadModal={
                    props.distributorDocumentUploadModal
                }
                handleDistributorDocumentUploadModal={
                    props.handleDistributorDocumentUploadModal
                }
            /> */}
              <Suspense fallback={<BundleLoader />}>
            <AddSupplierDocumentModal
             selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                distributorId={props.distributorData.distributorId}
                supplierDocumentUploadModal={props.supplierDocumentUploadModal}
                handleSupplierDocumentUploadModal={props.handleSupplierDocumentUploadModal}
            />
            <AddAccountModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
                handleLinkDistributorOrderConfigureModal={props.handleLinkDistributorOrderConfigureModal}
                addLinkDistributorOrderConfigureModal={props.addLinkDistributorOrderConfigureModal}
                distributorId={props.distributorData.distributorId}
            />
               <AddAccountOpportunityModal
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}
                distributorId={props.distributorData.distributorId}
            addAccountOpportunityModal={props.addAccountOpportunityModal}
            handleAccountOpportunityModal={props.handleAccountOpportunityModal}
            // defaultCustomers={[{ label: name, value: customerId }]}
            // customerId={{ value: customerId }}
            // callback={() => getOpportunityListByCustomerId(customerId)}
          />

             <AddCustomerProcurementModal
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}
                handleLinkCustomerProcurementModal={props.handleLinkCustomerProcurementModal}
                addLinkCustomerProcurementModal={props.addLinkCustomerProcurementModal}
                distributorId={props.distributorData.distributorId}
            />

            <AddSupplierContactModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
                addSupplierContactModal={props.addSupplierContactModal}
                handleSupplierContactModal={props.handleSupplierContactModal}
                type="distributor"
                id={props.distributorData.distributorId}
            />
            <AccountActivityModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
                addDistributorActivityModal={props.addDistributorActivityModal}
                handleDistributorActivityModal={props.handleDistributorActivityModal} />
            <CatalogueOrderModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
                distributorId={props.distributorData.distributorId}
                handleAddOrderModal={props.handleAddOrderModal}
                addCatalogueOrderModal={props.addCatalogueOrderModal}
            />
            </Suspense>
            {/* <OrderGenerateModal
                generateOrderModal={props.generateOrderModal}
                handleOrderGenerateModal={props.handleOrderGenerateModal}
            /> */}
        </>
    );
}

const mapStateToProps = ({ distributor, auth, suppliers,customer }) => ({
    orderRecordData: distributor.orderRecordData,
    user: auth.userDetails,
    addLinkCustomerProcurementModal:distributor.addLinkCustomerProcurementModal,
    addLinkDistributorOrderConfigureModal: distributor.addLinkDistributorOrderConfigureModal,
    distributorContactModal: distributor.distributorContactModal,
    distributorDocumentUploadModal: distributor.distributorDocumentUploadModal,
    addDistributorActivityModal: distributor.addDistributorActivityModal,
    generateOrderModal: distributor.generateOrderModal,
    addCatalogueOrderModal: distributor.addCatalogueOrderModal,
    productionInd: auth.userDetails.productionInd,
    repairInd: auth.userDetails.repairInd,
    addSupplierContactModal: suppliers.addSupplierContactModal,
    supplierDocumentUploadModal: suppliers.supplierDocumentUploadModal,
    procureRecordData:distributor.procureRecordData,
    addAccountOpportunityModal: distributor.addAccountOpportunityModal,
    invoiceCount: distributor.invoiceCount
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkDistributorOrderConfigureModal,
            handleLinkCustomerProcurementModal,
            handleDistributorContactModal,
            handleDistributorActivityModal,
            handleDistributorDocumentUploadModal,
            handleOrderGenerateModal,
            handleSupplierDocumentUploadModal,
            handleAddOrderModal,
            handleSupplierContactModal,
            getOrderRecords,
            handleAccountOpportunityModal,
            getInvoiceCount
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
