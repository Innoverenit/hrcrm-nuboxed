import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getOrderDetailsById } from "../../Main/Account/AccountAction";
import { CurrencySymbol } from "../../../Components/Common";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";


class DistributorProductTable extends Component {

    componentDidMount() {
        this.props.getOrderDetailsById(this.props.orderId);
    }
    componentDidUpdate(prvP, prvS) {
        console.log(prvP)
        debugger;
        if (this.props.orderId !== prvP.orderId) {
            debugger;
            this.props.getOrderDetailsById(this.props.orderId);
        }
    }
    render() {
        const columns = [
            {
                title: "",
                width: "2%",
            },
            {
                title: "Category",
                dataIndex: "categoryName",
                width: "12%",
            },
            {
                title: "Sub-category",
                dataIndex: "subCategoryName",
                width: "12%",
            },

            {
                title: "Attribute",
                dataIndex: "attributeName",
                width: "10%",
            },

            {
                title: "Sub-Attribute",
                dataIndex: "subAttributeName",
                width: "12%",
            },
            {
                title: "Name",
                dataIndex: "name",
                width: "18%",
            },
            {
                title: "Units",
                dataIndex: "quantity",
                width: "6%",
            },
            {
                title: "Price",
                dataIndex: "price",
                render: (name, item, i) => {
                    return (
                        <span>
                            <CurrencySymbol currencyType={"INR"} />
                            {item.price}
                        </span>
                    );
                },
                width: "10%",
            },


        ];

        if (this.props.fetchingOrderDetailsByIdError) {
            return <NodataFoundPage />
        }

        return (
            <>
                {true && (
                    <StyledTable
                        rowKey=""
                        columns={columns}
                        dataSource={this.props.orderByOrderId}
                        loading={this.props.fetchingOrderDetailsById || this.props.fetchingOrderDetailsByIdError}
                        scroll={{ y: 320 }}
                        pagination={false}
                    />
                )}

            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    orderByOrderId: distributor.orderByOrderId,
    fetchingOrderDetailsById: distributor.fetchingOrderDetailsById,
    fetchingOrderDetailsByIdError: distributor.fetchingOrderDetailsByIdError,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOrderDetailsById,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorProductTable);
