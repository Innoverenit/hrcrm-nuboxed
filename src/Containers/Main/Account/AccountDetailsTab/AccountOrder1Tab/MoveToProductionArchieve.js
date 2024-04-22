import React, { Component, useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { movetoProductionArchieve } from "../../AccountAction"

function MoveToProductionArchieve(props) {

    function onChange() {
        props.movetoProductionArchieve({
            dispatchInd: props.dispatchInd ? false : true,
            orderProductLinkId: props.orderProductLinkId,
            orderId: props.orderId
        }, props.productionProductId, props.orderId)
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to transfer to archieve ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        checked={props.dispatchInd}
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
            movetoProductionArchieve,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(MoveToProductionArchieve);
