import React from "react";
import { Switch, Popconfirm, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProcessNwTask } from "./RefurbishAction";

function QcTaskNwToggle(props) {

    function handlenwclick(item) {
        props.updateProcessNwTask(
            {
                noNeedTaskInd: props.item.noNeedTaskInd ? false : true,
                // completeTaskUserId: props.userId
            },
            props.item.phoneTaskId,
        );
    }
    // const handlenwclick  = () => {
    //     let data = {
    //         noNeedTaskInd: true
    //     };
    //     props.updateProcessNwTask(data);
    //   };
    return (
        <>
            <div>
                <Popconfirm
                    title="Do you want to change ?"
                    onConfirm={() => handlenwclick()}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Button
                               
      disabled={props.RowData.repairStatus === "To Start" || props.RowData.repairStatus === "Complete" || (props.item.completeTaskInd === true && props.item.noNeedTaskInd === false)}
    >
      {props.item.noNeedTaskInd ? "Required" : "Not Required"}
    </Button>
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
            updateProcessNwTask
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(QcTaskNwToggle);
