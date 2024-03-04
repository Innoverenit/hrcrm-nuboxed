import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const AccountPulseForm = lazy(() => import("./AccountPulseForm"));


class AccountPulseModal extends Component {
    render() {
        return (
            <div>
                <StyledDrawer
                    // title="Notes"
                    title={`${this.props.RowData.name}`}
                    width="60%"
                    visible={this.props.showPulseModal}
                    onClose={() => this.props.handleAccountPulse(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountPulseForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPulseModal);
