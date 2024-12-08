import React, { Component, useState,useEffect } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateValidationInReceive } from "../../../InventoryAction"
import dayjs from "dayjs";

function ReceiveValidationToggle(props) {

    const[data,setData]=useState(props.phoneListById)
    useEffect(()=>{
      setData(props.phoneListById)
    },[props.phoneListById])

    function onChange() {
        props.updateValidationInReceive({
            receivePhoneInd: true,
            mismatchInd: false,
            receivePhoneUser: props.userId,
            receivePhoneDate: dayjs(),
            orderPhoneId: props.orderPhoneId
        },
            props.phoneId,
            props.orderPhoneId,
        );
        props.onReceiveToggleChange(props.phoneId, true);
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
    phoneListById: inventory.phoneListById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateValidationInReceive,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReceiveValidationToggle);
