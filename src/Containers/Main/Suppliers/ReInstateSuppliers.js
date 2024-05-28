import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForSupplier } from "../Suppliers/SuppliersAction";

function ReInstateSuppliers(props) {
    const [paymentCollection, setPaymentCollection] = React.useState(false);

    function handleToggleReinstate(item) {
        props.reinstateToggleForSupplier(
            {
                supplierId: props.supplierId,
            },
            props.supplierId,
            props.orgId,
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
    orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            reinstateToggleForSupplier
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReInstateSuppliers);
