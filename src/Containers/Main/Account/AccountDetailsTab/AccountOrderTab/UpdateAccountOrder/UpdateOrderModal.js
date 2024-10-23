import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from '../../../../../../Components/Placeholder';

const UpdateOrderStepper = lazy(() => import('./UpdateOrderStepper'));

class UpdateOrderModal extends Component {
    render() {
        const { updateOrderModal, handleUpdateOrder } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Update Order"
                    width="60%"
                    visible={updateOrderModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handleUpdateOrder(false)}
                    footer={null}
                >
                 <Suspense fallback={<BundleLoader />}>
                    <UpdateOrderStepper
                        distributorId={this.props.distributorId}
                        particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderModal);
