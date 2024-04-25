import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import ProcurementStepper from "./ProcurementStepper";
// import AccountStepper from "./AccountStepper";

class AddCustomerProcurementModal extends Component {
    render() {
        const { addLinkCustomerProcurementModal, handleLinkCustomerProcurementModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Add Procurement"
                    width="60%"
                    visible={addLinkCustomerProcurementModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleLinkCustomerProcurementModal(false)}
                    footer={null}
                >
                    <ProcurementStepper distributorId={this.props.distributorId} />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerProcurementModal);
