import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reinstateToggleForInvestor } from "./InvestorAction";

function ReInstateInvestor(props) {
   

    function handleToggleReinstate(item) {
        props.reinstateToggleForInvestor(
            {
                investorId: props.investorId,
            },
            props.investorId,

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
            reinstateToggleForInvestor
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ReInstateInvestor);
