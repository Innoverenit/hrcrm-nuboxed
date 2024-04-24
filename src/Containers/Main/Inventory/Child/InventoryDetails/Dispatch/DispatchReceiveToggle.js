import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateDispatchReceivePhone } from "../../../InventoryAction"
import moment from "moment";

function DispatchReceiveToggle(props) {

    function onChange() {
        props.updateDispatchReceivePhone({
            dispatchPhoneInd: true,
            dispatchMismatchInd: false,
            dispatchPhoneUser: props.userId,
            dispatchPhoneDate: moment()
        },
            props.phoneId,
            props.orderPhoneId,
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Inspected ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.dispatchInspectionInd === 0 ||
                            props.dispatchInspectionInd === 2 ||
                            props.dispatchInspectionInd === 3}
                        checked={props.dispatchPhoneInd}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>

        </>
    );
}

const mapStateToProps = ({ auth, inventory }) => ({
    userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateDispatchReceivePhone,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchReceiveToggle);
