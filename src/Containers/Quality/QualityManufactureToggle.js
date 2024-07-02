import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    linkManufactureToggle,
    // getPartnerListByUserId
} from "../Main/Inventory/InventoryAction";

function QualityManufactureToggle(props) {
    const [toggle, setToggle] = React.useState(props.item.completeInd)

    function handleToggleCollection() {
        if (props.item.completeInd) {
           
            props.linkManufactureToggle(
                {
                    productId: props.item.productId,
                    manufactureId: props.currentManufacture.manufactureId,
                    qualityCheckBuilderId:props.item.qualityCheckBuilderId,
                    completeInd:props.item.completeInd ? false : true,
                },
                // props.partnerId,
                // props.userId,
               // handleCallbackFalse
            );
        } else {
            props.linkManufactureToggle(
                {
                    productId: props.item.productId,
                    manufactureId: props.currentManufacture.manufactureId,
                    qualityCheckBuilderId: props.item.qualityCheckBuilderId,
                    completeInd:props.item.completeInd ? false : true,
                    // partnerId: props.partnerId,
                    // userId: props.userId,
                    // status: props.status ? false : true,
                },
                // props.partnerId,
                // props.userId,
                // handleCallback
            );
        }
    }

    function handleCancel() {
        if (props.item.completeInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    // function handleCallback(a) {
    //     if (a === "success") {
    //         message.success(" Status changed to active");
    //         props.getPartnerListByUserId(props.userId);
    //     } else {
    //         message.error("something went wrong");
    //     }
    // }

    // function handleCallbackFalse(a) {
    //     if (a === "success") {
    //         message.success(" Status changed to Inactive");
    //         props.getPartnerListByUserId(props.userId);
    //     } else {
    //         message.error("something went wrong");
    //     }
    // }
    // console.log(props.partnerId);
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
            checked={props.item.completeInd || toggle}
                        // isLoading={true}
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
            linkManufactureToggle,
            // getPartnerListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(QualityManufactureToggle);
