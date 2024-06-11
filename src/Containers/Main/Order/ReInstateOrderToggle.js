import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleOfOrder } from "../Order/OrderAction";

function ReInstateOrderToggle(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false);

    function handleToggleReinstate(item) {
        props.reinstateToggleOfOrder(
            {
                orderId: props.item.orderId,
            },
            props.item.orderId,
            props.userId
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
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            reinstateToggleOfOrder
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReInstateOrderToggle);
