import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import {
    TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import { handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder ,handleSuppleirSuppliesDrawer} from "../../../SuppliersAction"
import AddPoModal from "./AddPoModal";
import PurchaseOrderTable from "./PurchaseOrderTable"
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import SupplierSuppliesDrawer from "./SupplierSupplies/SupplierSuppliesDrawer";
const SupplierSuppliesCardTable =lazy(()=>import("./SupplierSupplies/SupplierSuppliesCardTable"));

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
            
                  {activeKey === "2" && (
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
                  )}
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
            </>
        );
    }
}
const mapStateToProps = ({ auth, suppliers }) => ({
    userId: auth.userDetails.userId,
    poBySupplier: suppliers.poBySupplier,
    addLinkSuppliersOrderConfigureModal: suppliers.addLinkSuppliersOrderConfigureModal,
    supplierSuppliesdrwr:suppliers.supplierSuppliesdrwr
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkSuppliersOrderConfigureModal,
            getTodayPurchaseOrder,
            handleSuppleirSuppliesDrawer
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsTab);
