import React, { lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import {
    handleLinkDistributorOrderConfigureModal,
    handleDistributorContactModal,
    handleDistributorActivityModal,
    handleDistributorDocumentUploadModal,
    handleOrderGenerateModal,
    handleAddOrderModal
} from "../AccountAction";
import { Tooltip, Badge } from "antd";
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
const AccountOrder1Table = lazy(() => import("./AccountOrder1Tab/AccountOrder1Table"));
const AccountOrderTable = lazy(() => import("./AccountOrderTab/AccountOrderTable"));
const AddAccountModal = lazy(() => import("./AccountOrderTab/AddAccountModal"));
const AccountActivityModal = lazy(() => import("./AccountActivityTab/AccountActivityModal"));
const AddDistributorDocumentModal = lazy(() => import("./AccountDocumentTab/AddDistributorDocumentModal"));
const DistributorDocumentTable = lazy(() => import("./AccountDocumentTab/DistributorDocumentTable"));
const LinkedDistributorNotes = lazy(() => import("./AccountNoteTab/LinkedDistributorNotes"));
// const OrderGenerateModal = lazy(() => import("./AccountOrder1Tab/OrderGenerateModal"));
const CatalogueOrderModal = lazy(() => import("./AccountOrder1Tab/CatalogueOrderModal"));
const AccountContactTable = lazy(() => import("./AccountContactTab/AccountContactTable"))
const AddAccountContact = lazy(() => import("./AccountContactTab/AddAccountContact"))
const AccountActivityTable = lazy(() => import("./AccountActivityTab/AccountActivityTable"));

const TabPane = StyledTabs.TabPane;

function AccountDetailsTab(props) {
    useEffect(() => {
        // props.getOrderRecords(props.distributorData.distributorId);

    }, []);
    const [activeKey, setactiveKey] = useState("1")
    const [breadCumb, setBreadCumb] = useState(false)

    const handleOrderCreateClick = (data) => {
        setBreadCumb(data);
    };

    const handleTabChange = (key) => setactiveKey(key);

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" onChange={handleTabChange}>

                    {props.orderCreatProductionInd && <TabPane
                        tab={
                            <>
                                <span onClick={() => handleOrderCreateClick(false)}>
                                    <i class="fas fa-shopping-bag"></i>
                                    <span class="ml-1">Order</span>
                                </span>
                                {activeKey === "1" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleAddOrderModal(true);
                                                }}
                                                className="!text-base cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}</>}
                        key="1"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountOrder1Table distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>}
                    {props.orderCreatRepairInd && <TabPane
                        tab={
                            <>
                                <Badge
                                    size="small"
                                    count={(props.orderRecordData.order) || 0}
                                    overflowCount={999}
                                >
                                    <span >
                                        <DynamicFeedIcon
                                            className="!text-base cursor-pointer"
                                        />
                                        <span class="ml-1">Repair</span>
                                    </span>
                                </Badge>
                                {activeKey === "2" && (
                                    <>
                                        <Tooltip title="Add Order">
                                            <AddShoppingCartIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleLinkDistributorOrderConfigureModal(true);
                                                }}
                                                className="!text-base cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="2"
                    >

                        <Suspense fallback={"Loading ..."}>
                            <AccountOrderTable distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>}
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fas fa-file-contract"></i>
                                    &nbsp; Contact
                                </span>
                                {activeKey === "3" && (
                                    <>
                                        <Tooltip title="Add Contact">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleDistributorContactModal(true);
                                                }}
                                                className="!text-base cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="3"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <AccountContactTable distributorId={props.distributorData.distributorId} />
                        </Suspense>
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>
                                    <i class="fab fa-connectdevelop"></i>
                                    <span class="ml-1">Activity</span>
                                </span>
                                {activeKey === "4" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddIcon
                                                type="plus"
                                                tooltipTitle="Create"
                                                onClick={() => {
                                                    props.handleDistributorActivityModal(true);
                                                }}
                                                className="!text-base cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="4"
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
                        key="5"
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
                                {activeKey === "6" && (
                                    <>
                                        <Tooltip title="Create">
                                            <AddIcon
                                                // type="plus"
                                                // tooltipTitle="Create"
                                                onClick={() =>
                                                    props.handleDistributorDocumentUploadModal(
                                                        true
                                                    )
                                                }
                                                className="!text-base cursor-pointer ml-1"
                                            />
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        }
                        key="6"
                    >
                        <Suspense fallback={"Loading ..."}>
                            <DistributorDocumentTable
                                distributorId={props.distributorData.distributorId}
                            />
                        </Suspense>
                    </TabPane>


                </StyledTabs>
            </TabsWrapper>
            <AddDistributorDocumentModal
                distributorDocumentUploadModal={
                    props.distributorDocumentUploadModal
                }
                handleDistributorDocumentUploadModal={
                    props.handleDistributorDocumentUploadModal
                }
            />
            <AddAccountModal
                handleLinkDistributorOrderConfigureModal={props.handleLinkDistributorOrderConfigureModal}
                addLinkDistributorOrderConfigureModal={props.addLinkDistributorOrderConfigureModal}
                distributorId={props.distributorData.distributorId}
            />
            <AddAccountContact
                handleDistributorContactModal={props.handleDistributorContactModal}
                distributorContactModal={props.distributorContactModal}
                distributorId={props.distributorData.distributorId}
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

const mapStateToProps = ({ distributor, auth }) => ({
    orderRecordData: distributor.orderRecordData,
    addLinkDistributorOrderConfigureModal: distributor.addLinkDistributorOrderConfigureModal,
    distributorContactModal: distributor.distributorContactModal,
    distributorDocumentUploadModal: distributor.distributorDocumentUploadModal,
    addDistributorActivityModal: distributor.addDistributorActivityModal,
    generateOrderModal: distributor.generateOrderModal,
    addCatalogueOrderModal: distributor.addCatalogueOrderModal,
    orderCreatProductionInd: auth.userDetails.orderCreatProductionInd,
    orderCreatRepairInd: auth.userDetails.orderCreatRepairInd,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkDistributorOrderConfigureModal,
            handleDistributorContactModal,
            handleDistributorActivityModal,
            handleDistributorDocumentUploadModal,
            handleOrderGenerateModal,
            handleAddOrderModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsTab);
