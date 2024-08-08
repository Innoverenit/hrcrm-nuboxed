import React, { Component,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getDistributorOfferHistory, handleUpdateDistributorOfferModal, setEditDistributorOffer } from "../../ProductAction";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
const UpdateDistributorOfferModal =lazy(()=>import("./UpdateDistributorOfferModal"));

class DistributorOfferHistory extends Component {
    componentDidMount() {
        this.props.getDistributorOfferHistory(this.props.productId);
    }
    componentDidUpdate(prvP, prvS) {
        console.log(prvP)
        if (this.props.productId !== prvP.productId) {
            this.props.getDistributorOfferHistory(this.props.productId);
        }
    }
    render() {
        const columns = [
            {
                title: "",
                width: "2%",
            },
            {
                title: "Offer Item",
                dataIndex: "productFullName",
                width: "20%",
            },
            {
                title: "Units",
                dataIndex: "distributorProductQty",

                width: "8%",
            },
            {
                title: "To Get",
                dataIndex: "distributorOfferProductFullName",
                // render: (name, item, i) => {
                //     return (
                //         <span>
                //             {item.discountSubType === "Amount" ?
                //                 <CurrencySymbol currencyType={"INR"} />
                //                 : "%"}

                //             {item.allowedDiscount}

                //         </span>
                //     );
                // },
                width: "20%",
            },
            {
                title: "Units",
                dataIndex: "distributorOfferProductQty",
                width: "8%",
            },
            {
                title: "Start",
                render: (text, item) => {
                    const startDate = dayjs(item.distributorStartDate).format("lll");
                    return <span>{startDate}</span>;
                },
                width: "15%",
            },

            {
                title: "End",
                render: (text, item) => {
                    const endDate = dayjs(item.distributorEndDate).format("lll");
                    return <span>{endDate}</span>;
                },
                width: "15%",
            },

            {
                title: "",
                dataIndex: "documentId",
                width: "2%",
                render: (name, item, i) => {
                    //debugger
                    return (
                        <>
                            <Tooltip title="Edit">
                                <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                    onClick={() => {
                                        this.props.setEditDistributorOffer(item);
                                        this.props.handleUpdateDistributorOfferModal(true);
                                    }}
                                />
                            </Tooltip>

                        </>
                    );
                },
            },

        ];
        // if (this.props.fetchingDiscountHistoryError) {
        //     return <APIFailed />
        // }
        return (
            <>
                <StyledTable
                    rowKey=""
                    columns={columns}
                    dataSource={this.props.distributorOfferHistory}
                    loading={this.props.fetchingDiscountHistory}
                    scroll={{ y: 320 }}
                    pagination={false}
                />
                <Suspense fallback={"Loading"}>
                <UpdateDistributorOfferModal
                    handleUpdateDistributorOfferModal={this.props.handleUpdateDistributorOfferModal}
                    updateDistributorOfferModal={this.props.updateDistributorOfferModal}
                />
                </Suspense>
            </>
        );
    }
}

const mapStateToProps = ({ product, auth }) => ({
    distributorOfferHistory: product.distributorOfferHistory,
    fetchingDistributorOfferHistory: product.fetchingDistributorOfferHistory,
    updateDistributorOfferModal: product.updateDistributorOfferModal,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorOfferHistory,
            handleUpdateDistributorOfferModal,
            setEditDistributorOffer

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorOfferHistory);
