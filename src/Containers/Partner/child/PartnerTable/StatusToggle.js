import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    linkPartnerStatus,
    getPartnerListByUserId
} from "../../PartnerAction";

function StatusToggle(props) {
    const [toggle, setToggle] = React.useState(props.status)

    function handleToggleCollection(item) {
        if (props.status) {
            props.linkPartnerStatus(
                {
                    partnerId: props.partnerId,
                    userId: props.userId,
                    status: props.status ? false : true,
                },
                props.partnerId,
                props.userId,
                handleCallbackFalse
            );
        } else {
            props.linkPartnerStatus(
                {
                    partnerId: props.partnerId,
                    userId: props.userId,
                    status: props.status ? false : true,
                },
                props.partnerId,
                props.userId,
                handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.status) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    function handleCallback(a) {
        if (a === "success") {
            message.success(" Status changed to active");
            props.getPartnerListByUserId(props.userId);
        } else {
            message.error("something went wrong");
        }
    }

    function handleCallbackFalse(a) {
        if (a === "success") {
            message.success(" Status changed to Inactive");
            props.getPartnerListByUserId(props.userId);
        } else {
            message.error("something went wrong");
        }
    }
    console.log(props.partnerId);
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch className="toggle-clr"
                        checked={props.status || toggle}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, partner }) => ({
    userId: auth.userDetails.userId,
    updatePartnerById: partner.updatePartnerById,
    updatePartnerByIdError: partner.updatePartnerByIdError,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkPartnerStatus,
            getPartnerListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(StatusToggle);
