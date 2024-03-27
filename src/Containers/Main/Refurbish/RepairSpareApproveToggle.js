import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSpareItem } from "../Account/AccountAction";

function RepairSpareApproveToggle(props) {

    function handleToggleCollection(item) {
        props.updateSpareItem(
            {
                spareUseInd: props.item.spareUseInd ? false : true,

            },
            props.item.phoneSpareId,
        );
    }

    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to change ?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                        checked={props.item.spareUseInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateSpareItem
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(RepairSpareApproveToggle);
