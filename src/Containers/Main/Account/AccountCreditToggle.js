import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { distributorAccountCredit } from "./AccountAction";

function AccountCreditToggle(props) {

  const [toggle, setToggle] = useState(props.distributorCreditInd);

  function handleToggleClick(item) {
    if (props.distributorCreditInd) {
      props.distributorAccountCredit({
        distributorId: props.distributorId,
        distributorCreditInd: props.distributorCreditInd ? false : true,
         
      },props.distributorId);
      setToggle( props.distributorCreditInd ? false : true);
 
    } else {
      props.distributorAccountCredit({
        distributorId: props.distributorId,
        distributorCreditInd: props.distributorCreditInd ? false : true,
      },props.distributorId);
      setToggle( props.distributorCreditInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.distributorCreditInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to change the status?"
        onConfirm={() => handleToggleClick()}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={props.distributorCreditInd || toggle}
         isLoading={true}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      distributorAccountCredit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreditToggle);
