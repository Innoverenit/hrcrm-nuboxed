import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSpareReceive } from "../RefurbishAction";

function ReciveSpareItemToggle(props) {

    function handleToggleCollection(item) {
        props.updateSpareReceive(
            {

                spareCompleteUserId: props.userId

            },
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
                        checked={props.spareUseInd}
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
            updateSpareReceive
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReciveSpareItemToggle);
