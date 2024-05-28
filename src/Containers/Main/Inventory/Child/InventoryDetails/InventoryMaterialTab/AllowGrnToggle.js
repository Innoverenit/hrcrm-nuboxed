import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { trnasferGrnItemToStock } from "../../../InventoryAction"

function AllowGrnToggle(props) {

    function onChange() {
        props.trnasferGrnItemToStock({
            grnStockInd: props.grnStockInd,
            allowGrnInd: true,
            poSupplierSuppliesId: props.poSupplierSuppliesId
        },
            props.poSupplierSuppliesId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Change Status?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.allowGrnInd}
                        checked={props.allowGrnInd}
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
            trnasferGrnItemToStock,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AllowGrnToggle);
