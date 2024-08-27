import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvouiceOrderTable from "./InvouiceOrderTable";
import { StyledDrawer } from "../../../../Components/UI/Antd";



class InvoiceOrderModal extends Component {
    render() {
        const { invoiceOrders, handlenvoiceOrderModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Order"
                    width="60%"
                    visible={invoiceOrders}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handlenvoiceOrderModal(false)}
                    footer={null}
                >
                    <InvouiceOrderTable
                          particularRowData={this.props.particularRowData}
                          selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText} />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceOrderModal);
