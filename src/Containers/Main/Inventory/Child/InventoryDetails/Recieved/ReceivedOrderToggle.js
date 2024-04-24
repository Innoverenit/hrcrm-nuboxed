import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateOrderReceiveToggle } from "../../../InventoryAction"

function ReceivedOrderToggle(props) {

    function onChange() {
        props.updateOrderReceiveToggle({
            inventoryReceiveInd: props.inventoryReceiveInd ? false : true,
            inventoryReceiveUserId: props.userId,
        },
            props.orderId,
            props.locationId,
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Order Received ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        checked={props.inventoryReceiveInd}
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
            updateOrderReceiveToggle,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReceivedOrderToggle);
