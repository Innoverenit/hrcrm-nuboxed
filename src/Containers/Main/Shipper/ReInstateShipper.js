import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForShipper } from "../Shipper/ShipperAction";

function ReInstateShipper(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false);

    function handleToggleReinstate(item) {
        props.reinstateToggleForShipper(
            {
                shipperId: props.shipperId,
            },
            props.shipperId
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
            reinstateToggleForShipper
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReInstateShipper);
