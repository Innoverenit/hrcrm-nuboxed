import React, { Component, useState } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { trnasferGrnItemToStock } from "../../../InventoryAction"

function TransferToStock(props) {

    function onChange() {
        props.trnasferGrnItemToStock({
            grnReceivedInd: true,
            grnStockInd: true,
            allowGrnInd: props.allowGrnInd,
            poSupplierSuppliesId: props.poSupplierSuppliesId
        },
            props.poSupplierSuppliesId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to transfer to stock ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={props.grnStockInd}
                        checked={props.grnStockInd}
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
export default connect(mapStateToProps, mapDispatchToProps)(TransferToStock);
