import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { updateDispatchInspectionButton } from "../../../InventoryAction"

function DispatchPackedToggle(props) {

    function onChange() {
        props.updateDispatchInspectionButton({
            dispatchInspectionInd: 3,
            packedUserId: props.userId,
            packedDate: dayjs()
        },
            props.item.orderPhoneId,
            props.locationDetailsId
        )
    };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do You Want To Pack ?"
                    onCancel={null}
                    onConfirm={onChange}
                    okText="Yes"
                    cancelText="No"
                >
                    <Switch
                        disabled={
                            props.item.dispatchInspectionInd === 3 ||
                            props.item.dispatchInspectionInd === 4}
                        checked={props.item.dispatchInspectionInd === 3 || props.item.dispatchInspectionInd === 4}
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
            updateDispatchInspectionButton,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchPackedToggle);
