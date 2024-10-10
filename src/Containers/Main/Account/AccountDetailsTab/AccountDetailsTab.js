import React, { lazy, Suspense, useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import ReceiptIcon from '@mui/icons-material/Receipt';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
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
} from "../AccountAction";
import LayersIcon from '@mui/icons-material/Layers';// salesmap
import DistributorChart from "../AccountDetailsTab/DistributorChart"
import { handleSupplierDocumentUploadModal } from "../../Suppliers/SuppliersAction"
import { handleSupplierContactModal } from "../../Suppliers/SuppliersAction";
import { Tooltip, Badge } from "antd";
import AddIcon from '@mui/icons-material/Add';
import ContactsIcon from '@mui/icons-material/Contacts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { BundleLoader } from '../../../../Components/Placeholder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { HistoryOutlined } from "@ant-design/icons";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ShopIcon from '@mui/icons-material/Shop'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import OrderTableC from "./OrderTableC";
import ProcureCommerceShippedOrder from "./AccountOrderTab/ProcureCommerceShippedOrder";

const CompleteOrderTable= lazy(() =>import("./AccountOrderTab/CompleteOrderTable"));
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
const AccountCreditMemos =lazy(()=>import("./AccountCreditMemo/AccountCreditMemos"));

const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {
 
    const [activeKey, setactiveKey] = useState("1")
    const [breadCumb, setBreadCumb] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHistory, setSelectedHistory] = useState("completed");

    const [clickSideIcon,setclickSideIcon]=useState(false);

    
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
   "203", // 'Production', // 0
   "661", // 'Repair', // 1
   "666", // ' Procure', // 2
    "213",// 'Quotation', // 3
    "1165",// ' Activity', // 4
    "316",// 'Notes', // 5
   "138", // ' Documents',6
   "1167", // 'Sales Map',7
    "1168",// 'Summary',8
    "73",// 'Contact ',9
    "1169",// 'Invoice',//10
    "104",// 'Create',11
   "1212", //  'Commerce', //12              
   "1213", // 'Add Commerce',//13
   '1357',// Memo 14
     "202",       //    Order
     "667",      //    Completed Orders
     "1475",       //    Add Order
 "1474",       //    Add Contact
 "660"
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
        setOpenOrder(true);
    };
    const handleClickSideIcon = (type) => {
        setclickSideIcon(true);
        setSelectedHistory(type);
    };
    // const handleTabChange = (key) => setactiveKey(key);
    // console.log(props.productionInd)
    // console.log(props.activeKey)

    const handleTabChange = (key) => {
        setactiveKey(key);
    
        if (key === "4") {
            // Resetting states for the commerce tab
            setclickSideIcon(false);
            setSelectedHistory("completed"); // Set to a default history type if needed
        } else {
            // Reset states when leaving commerce tab
            setclickSideIcon(false);
            setSelectedHistory(null); // Or whatever default you want when leaving the commerce tab
        }
    };

    const renderTabContent = (key) => {
        switch (key) {
          case "1":
            return     <div> 
                   <LinkedOpportunityTable distributorData={props.distributorData} 
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}/>
                </div>;
          case "2":
            return  <div> <AccountOrder1Table distributorId={props.distributorData.distributorId} 
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText} /></div>;
            case "3":
                return  <div>  {openOrder === true &&
                    <CompleteOrderTable distributorId={props.distributorData.distributorId} type="complete" 
                    selectedLanguage={props.selectedLanguage}
                  translateText={props.translateText} /> }
                  {openOrder === false &&
                    <AccountOrderTable distributorId={props.distributorData.distributorId} type="incomplete" 
                    selectedLanguage={props.selectedLanguage}
                  translateText={props.translateText}
                  
                  />
                }</div>;
                case "4":
                    return  <div>  
                        {clickSideIcon  && selectedHistory === "shipped" ? (
                <ProcureCommerceShippedOrder 
                    distributorId={props.distributorData.distributorId} 
                    selectedLanguage={props.selectedLanguage}
                    translateText={props.translateText}
                />
            ) : (
                <CustomerProcurementTable 
                    distributorId={props.distributorData.distributorId} 
                    selectedLanguage={props.selectedLanguage}
                    translateText={props.translateText}
                />
            )}</div>;
                     case "5":
                        return  <div><AccountActivityTable distributorId={props.distributorData.distributorId} 
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}/></div>;
                        case "6":
                        return  <div>  
                            <ErpNote
                        type="distributor"
                        id={props.distributorData.distributorId}
                        selectedLanguage={props.selectedLanguage}
                             translateText={props.translateText}
                       /></div>;
                       case "7":
                        return  <div>  
                            <DistributorDocumentTable
                                distributorId={props.distributorData.distributorId}
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                            />
                            </div>;
                            case "9":
                        return  <div>  
                            <SalesMapTable
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                            /></div>;
                            case "10":
                                return  <div>  
                                   <AccountContactTable distributorId={props.distributorData.distributorId} 
                              selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}/></div>;
                              case "11":
                                return  <div>  
                                 <AccountInvoiceTable    distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} /></div>;
                            case "12":
                                return  <div>  
                                 <AccountCreditMemos
                            distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} /></div>;
                            case "13":
                                return  <div>  
                                 <OrderTableC
                            distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} /></div>;

                            case "14":
                                return  <div>  
                                 <DistributorChart
                            distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} /></div>;

          default:
            return null;
        }
      };


    console.log("opIND",clickSideIcon)  
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>

                    {props.productionAccessInd &&  props.user.moduleMapper.productionInd &&
                    <TabPane
                        tab={
                            <>
                                <span onClick={() => handleOrderCreateClick(false)}>
                                    <PrecisionManufacturingIcon className=" !text-icon text-[#049a8f]" />
                                    <span class="ml-1 !text-tab font-poppins ">
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
                        {/* <Suspense fallback={"Loading ..."}>
                            <AccountOrder1Table distributorId={props.distributorData.distributorId} 
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} />
                        </Suspense> */}
                    </TabPane>
}

                    {props.user.repairInd && props.user.moduleMapper.repairInd && <TabPane
                        tab={
                            <>
                             <span onClick={() => handleOrderClick(false)}>
                                        <Tooltip title={translatedMenuItems[15]}>
                                            <OnDeviceTrainingIcon
                                                className="!text-icon text-[#81968f] cursor-pointer"
                                            />
                                            <span class="ml-1 !text-tab font-poppins ">
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
                                    <Tooltip title={translatedMenuItems[16]}>
                                        <HistoryOutlined
                                            fontSize="small"
                                            onClick={handleOpenOrder}
                                        />
                                    </Tooltip>
                                )}
                                &nbsp;
                                {activeKey === "3" && (
                                    <>
                                        <Tooltip title={translatedMenuItems[17]}>
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[1]}
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

                        {/* <Suspense fallback={"Loading ..."}>
                            {openOrder ?
                                <CompleteOrderTable distributorId={props.distributorData.distributorId} type="complete" 
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText} /> :
                                <AccountOrderTable distributorId={props.distributorData.distributorId} type="incomplete" 
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                              
                              />
                            }
                        </Suspense> */}
                    </TabPane>}
                    { props.user.moduleMapper.ecomModInd &&
                   <TabPane
                        tab={
                            <>
                             <Tooltip title={translatedMenuItems[12]}>
                                            <ShopIcon
                                                className="!text-icon text-[#78a1bb] cursor-pointer"
                                            />
                                            <span class=" ml-1 !text-tab font-poppins " onClick={() => {
                                                    setclickSideIcon(false); 
                                                    setSelectedHistory("completed"); 
                                                   }}>
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
                                &nbsp;  
                             
                                {activeKey === "4" && (
                                    <>
                                     <Tooltip title="Shipped Order">
                                        <HistoryOutlined
                                            fontSize="small"
                                            onClick={() => handleClickSideIcon("shipped")}
                                        />
                                    </Tooltip>
                                        <Tooltip title={translatedMenuItems[13]}>
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[11]}
                                                onClick={() => {
                                                    props.handleLinkCustomerProcurementModal(true);
                                                }}
                                                className="!text-icon cursor-pointer "
                                            />
                                        </Tooltip>
                                    </>
                                )}

                            </>
                        }
                        key="4"
                    >

                        <Suspense fallback={"Loading ..."}>
                       
                                {/* <CustomerProcurementTable distributorId={props.distributorData.distributorId} 
                                selectedLanguage={props.selectedLanguage}
                                translateText={props.translateText}
                                 /> */}

                          
                        </Suspense>
                    </TabPane>
}
                    <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon className="!text-icon text-[#bfa89e]" />
                    <span class=" !text-tab font-poppins ">
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
              {/* <Suspense fallback={"Loading ..."}>
                {" "}
                <LinkedOpportunityTable distributorData={props.distributorData} 
                selectedLanguage={props.selectedLanguage}
                translateText={props.translateText}/>
              </Suspense> */}
            </TabPane>
            <TabPane
                        tab={
                            <>
                                <span class="!text-tab font-poppins ">
                                <SummarizeIcon className="!text-icon text-[#55d6c2] mr-1"/>
                                    
                                    {translatedMenuItems[19]}
                                    
                                       
                                </span>

                            </>
                        }
                        key="13"
                    >
                    </TabPane>
            <TabPane
                        tab={
                            <>
                            <span class= "!text-tab font-poppins " >
                                   <ReceiptIcon className="!text-icon text-[#a9d8b8] mr-1"/>
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
                        {/* <Suspense fallback={"Loading ..."}>
                            <AccountInvoiceTable    distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} />
                        </Suspense> */}
                    </TabPane> 
                    <TabPane
                        tab={
                            <>
                            <span  class= "!text-tab font-poppins ">
                                   <CreditCardIcon className="!text-icon text-[#edd382] mr-1"/>
                                   {translatedMenuItems[14]}
                                </span>
                            <Badge
            size="small"
            // count={( props.invoiceCount.paymentCount) || 0}
            // overflowCount={999}
            offset={[ 0, -16]}
          >
                                
                                </Badge>
                                {activeKey === "12" && (
                                    <>  
                                    </>
                                )}
                                
                            </>
                        }
                        key="12"
                    >
                        {/* <Suspense fallback={"Loading ..."}>
                            <AccountCreditMemos
                            distributorId={props.distributorData.distributorId}
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText} />
                        </Suspense> */}
                    </TabPane> 
                    <TabPane
                        tab={
                            <>

                                <span>
                                <HourglassFullIcon className="text-[#edf67d] !text-icon" />
                                    <span class="ml-1 !text-tab font-poppins ">
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
                        {/* <Suspense fallback={"Loading ..."}>
                            <AccountActivityTable distributorId={props.distributorData.distributorId} 
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}/>
                        </Suspense> */}
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span class="!text-tab font-poppins ">
                               <ContactsIcon className="!text-icon text-[#96bdc6] mr-1" />
                                    {translatedMenuItems[9]}
                                    
                                    {/* Contact */}
                                </span>
                                {activeKey === "10" && (
                                    <>
                                        <Tooltip title={translatedMenuItems[18]}>
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle={translatedMenuItems[11]}
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
                        {/* <Suspense fallback={"Loading ..."}>
                            <AccountContactTable distributorId={props.distributorData.distributorId} 
                              selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}/>
                        </Suspense> */}
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i className="fa fa-sticky-note text-[#b6465f]"   aria-hidden="true"></i>
                                    <span class="ml-1 !text-tab font-poppins ">
                                    {translatedMenuItems[5]}
                                    {/* Notes */}
                                        </span>
                                </span>
                            </>
                        }
                        key="6"
                    >
                        {/* <Suspense fallback={"Loading ..."}>
                        <ErpNote
                         type="distributor"
                         id={props.distributorData.distributorId}
                         selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                        />
                        </Suspense> */}
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
                                    <i class="far fa-file text-[#41ead4]"></i>
                                    <span class="ml-1 !text-tab font-poppins ">
                                    {translatedMenuItems[6]}
                                    {/* Documents */}
                                        </span>
                                </span>
                                {activeKey === "7" && (
                                    <>
                                        <Tooltip title={translatedMenuItems[11]}>
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
                        {/* <Suspense fallback={"Loading ..."}>
                            <DistributorDocumentTable
                                distributorId={props.distributorData.distributorId}
                                selectedLanguage={props.selectedLanguage}
                              translateText={props.translateText}
                            />
                        </Suspense> */}
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                <LayersIcon className="!text-icon text-[#f49097] ml-1"/>
                                    <span class="ml-1 !text-tab font-poppins ">
                                    {translatedMenuItems[7]}
                                    {/* Sales Map */}
                                        </span>
                                     
                                </span>

                            </>
                        }
                        key="8"
                    >
                       
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span class="!text-tab font-poppins ">
                                <SummarizeIcon className="!text-icon text-[#55d6c2] mr-1"/>
                                    
                                    {translatedMenuItems[8]}
                                    {/* Summary */}
                                       
                                </span>

                            </>
                        }
                        key="9"
                    >
                        {/* <Suspense fallback={"Loading ..."}>
                            <SalesMapTable
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                            />
                            <SummaryTable
                               
                            />
                        </Suspense> */}
                    </TabPane>
                  
                    
                  
                    <TabPane
                        tab={
                            <>
                                <span class="!text-tab font-poppins ">
                                <SummarizeIcon className="!text-icon text-[#55d6c2] mr-1"/>
                                    
                                   Bar Chart
                                    {/* Summary */}
                                       
                                </span>

                            </>
                        }
                        key="14"
                    >
                        {/* <Suspense fallback={"Loading ..."}>
                            <SalesMapTable
                            selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                            />
                            <SummaryTable
                               
                            />
                        </Suspense> */}
                    </TabPane>

                </StyledTabs>
                <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                {renderTabContent(activeKey)}
              </Suspense>
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
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
