import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForLocCell } from "../Location/LocationAction";

function ReInstateLocCellToggle(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false);

    function handleToggleReinstate(item) {
        props.reinstateToggleForLocCell(
            {
                cellId: props.cellId,
            },
            props.cellId
        );
    }

    return (
        <>
            <div>
                <Popconfirm
                    title="Do you change state?"
                    onConfirm={() => handleToggleReinstate()}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                        // checked={props.paymentCollection || paymentCollection}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, collection }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            reinstateToggleForLocCell
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReInstateLocCellToggle);
