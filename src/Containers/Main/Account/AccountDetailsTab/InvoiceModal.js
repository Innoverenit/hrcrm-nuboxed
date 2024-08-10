import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvouiceSTable from "./InvouiceSTable";




class InvoiceModal extends Component {
    render() {
        const { invoiceO, handleInvoiceModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Order"
                    width="60%"
                    visible={invoiceO}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleInvoiceModal(false)}
                    footer={null}
                >
                    <InvouiceSTable
                          rowData={this.props.rowData}
                          selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText} />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceModal);
