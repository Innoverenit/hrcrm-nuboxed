import React, { lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import {
    handleLinkDistributorOrderConfigureModal,
    handleLinkCustomerProcurementModal,
    handleDistributorContactModal,
    handleDistributorActivityModal,
    handleDistributorDocumentUploadModal,
    handleOrderGenerateModal,
    handleAddOrderModal,
    getOrderRecords,
    handleAccountOpportunityModal
} from "../AccountAction";
import { handleSupplierDocumentUploadModal } from "../../Suppliers/SuppliersAction"
import { handleSupplierContactModal } from "../../Suppliers/SuppliersAction";
import { Tooltip, Badge } from "antd";
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CompleteOrderTable from "./AccountOrderTab/CompleteOrderTable";
import { HistoryOutlined } from "@ant-design/icons";
import AddSupplierContactModal from "../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierContactTab/AddSupplierContactModal";
import SalesMapTable from "./AccountDocumentTab/SalesMapTable";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AddSupplierDocumentModal from "../../Suppliers/Child/SupplierDetails/SupplierDetailTab/SupplierDocumentTab/AddSupplierDocumentModal";
import AddCustomerProcurementModal from "./AccountOrderTab/AddCustomerProcurementModal";
import CustomerProcurementTable from "./AccountOrderTab/CustomerProcurementTable";
import LinkedOpportunityTable from "./LinkedOpportunityTable";
import ShopIcon from '@mui/icons-material/Shop'
import AddAccountOpportunityModal from "./AddAccountOpportunityModal";
const AccountOrder1Table = lazy(() => import("./AccountOrder1Tab/AccountOrder1Table"));
const AccountOrderTable = lazy(() => import("./AccountOrderTab/AccountOrderTable"));
const AddAccountModal = lazy(() => import("./AccountOrderTab/AddAccountModal"));
const AccountActivityModal = lazy(() => import("./AccountActivityTab/AccountActivityModal"));
const DistributorDocumentTable = lazy(() => import("./AccountDocumentTab/DistributorDocumentTable"));
const LinkedDistributorNotes = lazy(() => import("./AccountNoteTab/LinkedDistributorNotes"));
const CatalogueOrderModal = lazy(() => import("./AccountOrder1Tab/CatalogueOrderModal"));
const AccountContactTable = lazy(() => import("./AccountContactTab/AccountContactTable"))
const AccountActivityTable = lazy(() => import("./AccountActivityTab/AccountActivityTable"));

const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {
    // useEffect(() => {
    //     props.getOrderRecords(props.distributorData.distributorId,"repair");
    //     props.getOrderRecords(props.distributorData.distributorId,"repair");

    // }, []);
    const [activeKey, setactiveKey] = useState("1")
    const [breadCumb, setBreadCumb] = useState(false)
    const [openOrder, setOpenOrder] = useState(false)

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
                                    <span class="ml-1">Production</span>
                                </span>
                                {activeKey === "2" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle="Create"
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
                            <AccountOrder1Table distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>}
                    {props.repairInd && <TabPane
                        tab={
                            <>
                                <Badge
                                    size="small"
                                    count={(props.orderRecordData.order) || 0}
                                    overflowCount={999}
                                >
                                    <span onClick={() => handleOrderClick(false)}>
                                        <Tooltip title="Orders">
                                            <DynamicFeedIcon
                                                className="!text-icon  cursor-pointer"
                                            />
                                            <span class="ml-1 text-sm">Repair</span>
                                        </Tooltip>
                                    </span>
                                </Badge>
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
                                                tooltipTitle="Create"
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
                                <CompleteOrderTable distributorId={props.distributorData.distributorId} type="complete" /> :
                                <AccountOrderTable distributorId={props.distributorData.distributorId} type="incomplete" />
                            }
                        </Suspense>
                    </TabPane>}

                   <TabPane
                        tab={
                            <>
                                <Badge
                                    size="small"
                                    count={(props.procureRecordData.order) || 0}
                                    overflowCount={999}
                                >
                                   
                                        <Tooltip title="Procure">
                                            <ShopIcon
                                                className="!text-icon  cursor-pointer"
                                            />
                                            <span class="ml-1 text-sm">Procure</span>
                                        </Tooltip>
                 
                              </Badge>
                                &nbsp;  &nbsp;
                            
                              
                                {activeKey === "4" && (
                                    <>
                                        <Tooltip title="Add Procure">
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleLinkCustomerProcurementModal(true);
                                                }}
                                                className="!text-icon  -ml-3 cursor-pointer "
                                            />
                                        </Tooltip>
                                    </>
                                )}

                            </>
                        }
                        key="4"
                    >

                        <Suspense fallback={"Loading ..."}>
                       
                                <CustomerProcurementTable distributorId={props.distributorData.distributorId}  />

                          
                        </Suspense>
                    </TabPane>
                    <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon  style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      <FormattedMessage
                        id="app.quotation"
                        defaultMessage="Quotation"
                      />
                    </span>
                  </span>
                  {activeKey === "1" && (
                    <>
                      <Tooltip 
                        title={
                          <FormattedMessage
                            id="app.create"
                            defaultMessage="Create"
                          />
                        }
                      >
                        {props.user.opportunityCreateInd === true && (
                          <PlusOutlined
                            type="plus"
                            
                            tooltiptitle={
                              <FormattedMessage
                                id="app.Create"
                                defaultMessage="Create"
                              />
                            }
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
                <LinkedOpportunityTable distributorData={props.distributorData} />
              </Suspense>
            </TabPane>
                  
                    <TabPane
                        tab={
                            <>

                                <span>
                                    <i class="fab fa-connectdevelop"></i>
                                    <span class="ml-1">Activity</span>
                                </span>
                                {activeKey === "5" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
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
                            <AccountActivityTable distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i>
                                    <span class="ml-1">Notes</span>
                                </span>
                            </>
                        }
                        key="6"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <LinkedDistributorNotes />
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
                                    <span class="ml-1">Documents</span>
                                </span>
                                {activeKey === "7" && (
                                    <>
                                        <Tooltip title="Create">
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
                            />
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    {/* <i class="far fa-file"></i> */}
                                    <span class="ml-1">Sales Map</span>
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
                                    {/* <i class="far fa-file"></i> */}
                                    <span class="ml-1">Summary</span>
                                </span>

                            </>
                        }
                        key="9"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <SalesMapTable

                            />
                            {/* <SummaryTable
                               
                            /> */}
                        </Suspense>
                    </TabPane>

                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-file-contract"></i>
                                    &nbsp; Contact
                                </span>
                                {activeKey === "10" && (
                                    <>
                                        <Tooltip title="Add Contact">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
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
                            <AccountContactTable distributorId={props.distributorData.distributorId} />
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
            <AddSupplierDocumentModal
                distributorId={props.distributorData.distributorId}
                supplierDocumentUploadModal={props.supplierDocumentUploadModal}
                handleSupplierDocumentUploadModal={props.handleSupplierDocumentUploadModal}
            />
            <AddAccountModal
                handleLinkDistributorOrderConfigureModal={props.handleLinkDistributorOrderConfigureModal}
                addLinkDistributorOrderConfigureModal={props.addLinkDistributorOrderConfigureModal}
                distributorId={props.distributorData.distributorId}
            />
               <AddAccountOpportunityModal
                distributorId={props.distributorData.distributorId}
            addAccountOpportunityModal={props.addAccountOpportunityModal}
            handleAccountOpportunityModal={props.handleAccountOpportunityModal}
            // defaultCustomers={[{ label: name, value: customerId }]}
            // customerId={{ value: customerId }}
            // callback={() => getOpportunityListByCustomerId(customerId)}
          />

<AddCustomerProcurementModal
                handleLinkCustomerProcurementModal={props.handleLinkCustomerProcurementModal}
                addLinkCustomerProcurementModal={props.addLinkCustomerProcurementModal}
                distributorId={props.distributorData.distributorId}
            />

            <AddSupplierContactModal
                addSupplierContactModal={props.addSupplierContactModal}
                handleSupplierContactModal={props.handleSupplierContactModal}
                type="distributor"
                id={props.distributorData.distributorId}
            />
            <AccountActivityModal
                addDistributorActivityModal={props.addDistributorActivityModal}
                handleDistributorActivityModal={props.handleDistributorActivityModal} />
            <CatalogueOrderModal
                distributorId={props.distributorData.distributorId}
                handleAddOrderModal={props.handleAddOrderModal}
                addCatalogueOrderModal={props.addCatalogueOrderModal}
            />
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
            handleAccountOpportunityModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
