import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {linkDispatchStatus} from "./InventoryAction"


function DispatchToggle(props) {
    const [toggle, setToggle] = React.useState(props.item.moveToHistoryInd)

    function handleToggleCollection(item) {
        
            props.linkDispatchStatus(
                {
                    orderPhoneId: props.item.orderPhoneId,
                    moveToHistoryInd: true,
                  
                },
                // props.partnerId,
                // props.userId,
                // handleCallbackFalse
            );
      
    }

    function handleCancel() {
        if (props.item.moveToHistoryInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

  

    

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
                    checked={ toggle}
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
    // userId: auth.userDetails.userId,
    // updatePartnerById: partner.updatePartnerById,
    // updatePartnerByIdError: partner.updatePartnerByIdError,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
         linkDispatchStatus,
            // getPartnerListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DispatchToggle);
