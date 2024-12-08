import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { paidUnpaidInvoice } from "../AccountAction";

function PaidUnpaidAccountInvoiceToggle (props) {

  const [toggle, setToggle] = useState(props.paymentInd);

  function handleToggleClick(item) {
    if (props.paymentInd) {
      props.paidUnpaidInvoice({
        userId: props.userId,
        paymentInd: props.paymentInd ? false : true,
         
      },props.procureOrderInvoiceId);
      setToggle( props.paymentInd ? false : true);
 
    } else {
      props.paidUnpaidInvoice({
        userId: props.userId,
        paymentInd: props.paymentInd ? false : true,
      },props.procureOrderInvoiceId);
      setToggle( props.paymentInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.paymentInd) {
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
         checked={toggle || props.paymentInd}
         isLoading={true}
          checkedChildren="Paid"
          unCheckedChildren="Unpaid"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      paidUnpaidInvoice,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaidUnpaidAccountInvoiceToggle);
