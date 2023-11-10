import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateValidationInReceive } from "../../../InventoryAction"
import moment from "moment";

function ReceiveValidationToggle(props) {

    function onChange() {
        props.updateValidationInReceive({
            receivePhoneInd: true,
            mismatchInd: false,
            receivePhoneUser: props.userId,
            receivePhoneDate: moment(),
            orderPhoneId: props.orderPhoneId
        },
            props.phoneId,
            props.orderPhoneId,
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Received ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.inspectionInd !== 1}
                        checked={props.receivePhoneInd}
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
            updateValidationInReceive,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReceiveValidationToggle);
