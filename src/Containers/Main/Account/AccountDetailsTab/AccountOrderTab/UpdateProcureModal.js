import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import UpdateProcureStepper from "./UpdateProcureStepper";
// import UpdateOrderStepper from "./UpdateOrderStepper";


class UpdateProcureModal extends Component {
    render() {
        const { updateProcureDetailModal, handleUpdateProcureDetailModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Procure"
                    width="60%"
                    visible={updateProcureDetailModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleUpdateProcureDetailModal(false)}
                    footer={null}
                >
                    <UpdateProcureStepper
                        distributorId={this.props.distributorId}
                        particularRowData={this.props.particularRowData} />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProcureModal);
