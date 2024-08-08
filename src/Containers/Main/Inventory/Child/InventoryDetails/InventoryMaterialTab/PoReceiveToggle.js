import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateReceivedDamagedUnit } from "../../../InventoryAction"
import dayjs from "dayjs";

function ReceiveValidationToggle(props) {

    function onChange() {
        props.updateReceivedDamagedUnit({
            poReceivedInd: true,
            userId: props.userId
        },
            props.poSupplierDetailsId,
            props.suppliesId
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
                        disabled={props.unitReceiveInd}
                        checked={props.poReceivedInd}
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
            updateReceivedDamagedUnit,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReceiveValidationToggle);
