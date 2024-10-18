import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from '../../../../../Components/Placeholder';
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import AccountStepperNewForm from "./AccountStepperNewForm";
import { Modal } from "antd";





class AddOpenNewModal extends Component {
    render() {
        const { addNewModal, handleOpenNewModal } = this.props;
        return (
            <div>
                <Modal
                    title="Add Items"
                    width="60%"
                    visible={addNewModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onCancel={() => handleOpenNewModal(false)}
                    // footer={null}
                >
                     <Suspense fallback={<BundleLoader />}>
                    <AccountStepperNewForm distributorId={this.props.distributorId} />
                    </Suspense>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddOpenNewModal);
