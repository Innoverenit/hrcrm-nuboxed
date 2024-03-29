import React from "react";
import { Switch,  Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProcessTask } from "./RefurbishAction";

function QCPhoneTaskToggle(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false)

console.log(props.phoneTaskId)

    function handleToggleCollection(item) {
        props.updateProcessTask(
            {
                completeTaskInd: true,
                
            },
            props.phoneTaskId,  
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
                        checked={props.paymentCollection || paymentCollection}
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
            updateProcessTask
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(QCPhoneTaskToggle);
