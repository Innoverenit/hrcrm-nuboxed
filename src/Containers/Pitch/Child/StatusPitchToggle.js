import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    convertPitchStatus,
} from "../PitchAction";


function StatusPitchToggle(props) {
    console.log("abc",props.leadsId);
    const [toggle, setToggle] = React.useState(props.convertInd)

    function handleToggleCollection(item) {
        if (props.convertInd) {
            props.convertPitchStatus(
                {
                    investorLeadsId: props.investorLeadsId,
                    userId: props.userId,
                    convertInd: props.convertInd ? false : true,
                },
                props.investorLeadsId,
                props.userId,
            );
        } else {
            props.convertPitchStatus(
                {
                    investorLeadsId: props.investorLeadsId,
                    userId: props.userId,
                    convertInd: props.convertInd ? false : true,
                },
                props.investorLeadsId,
                props.userId,
            );
        }
    }

    function handleCancel() {
        if (props.convertInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <>
            <div>
                <Popconfirm
                   title={
                    <FormattedMessage
                            id="app.confirmStatusChange"
                            defaultMessage="Confirm status change?"
                          />
                  }
                    // title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch className="toggle-clr"
                      checked={props.convertInd || toggle}
                         isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, provider }) => ({
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            convertPitchStatus,
            // getLeads
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(StatusPitchToggle);
