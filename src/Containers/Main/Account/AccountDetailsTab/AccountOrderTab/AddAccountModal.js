import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import AccountStepper from "./AccountStepper";

class AddAccountModal extends Component {
    render() {
        const { addLinkDistributorOrderConfigureModal, handleLinkDistributorOrderConfigureModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Add Order"
                    width="60%"
                    visible={addLinkDistributorOrderConfigureModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleLinkDistributorOrderConfigureModal(false)}
                    // footer={null}
                >
                    <AccountStepper distributorId={this.props.distributorId} />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountModal);
