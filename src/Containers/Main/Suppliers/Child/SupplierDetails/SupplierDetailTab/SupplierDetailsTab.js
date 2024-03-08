import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import {
    TabsWrapper,
} from "../../../../../../Components/UI/Layout";
import { handleLinkSuppliersOrderConfigureModal, getTodayPurchaseOrder } from "../../../SuppliersAction"
import AddPoModal from "./AddPoModal";
import PurchaseOrderTable from "./PurchaseOrderTable"
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

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
                    </StyledTabs>
                </TabsWrapper>
                <AddPoModal
                    supplier={this.props.supplier}
                    addLinkSuppliersOrderConfigureModal={this.props.addLinkSuppliersOrderConfigureModal}
                    handleLinkSuppliersOrderConfigureModal={this.props.handleLinkSuppliersOrderConfigureModal}
                />
            </>
        );
    }
}
const mapStateToProps = ({ auth, suppliers }) => ({
    userId: auth.userDetails.userId,
    poBySupplier: suppliers.poBySupplier,
    addLinkSuppliersOrderConfigureModal: suppliers.addLinkSuppliersOrderConfigureModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            handleLinkSuppliersOrderConfigureModal,
            getTodayPurchaseOrder
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetailsTab);
