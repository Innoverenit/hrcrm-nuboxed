import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProcessTask } from "./RefurbishAction";

function QCPhoneTaskToggle(props) {

    function handleToggleCollection(item) {
        props.updateProcessTask(
            {
                completeTaskInd: props.item.completeTaskInd ? false : true,
                completeTaskUserId: props.userId
            },
            props.item.phoneTaskId,
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
                        checked={props.item.completeTaskInd}
                        isLoading={true}
                        checkedChildren="Completed"
                        unCheckedChildren="Not Completed"
                        disabled={ props.RowData.repairStatus === "To Start" || props.RowData.repairStatus === "Complete" || (props.item.completeTaskInd === false && props.item.noNeedTaskInd === true)}
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
            updateProcessTask
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(QCPhoneTaskToggle);
