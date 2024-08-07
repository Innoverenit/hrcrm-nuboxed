import React, { useEffect, useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addingDiscountToggle } from "./PrmotionAction";

function PrmotionDiscountToggle(props) {
  const [data, setData] = useState(props.promotionsData);
  const [toggle, setToggle] = useState(props.discountType);

  useEffect(() => {
    setData(props.promotionsData);
  }, [props.promotionsData]);

  useEffect(() => {
    setToggle(props.discountType);
  }, [props.discountType]);

  function handleToggleCollection() {
    const newToggleState = toggle === "Percent" ? "Amount" : "Percent";
    props.addingDiscountToggle({}, props.promoCodeId, newToggleState);
    setToggle(newToggleState);
  }

  function handleCancel() {
    setToggle(props.discountType);
  }

  return (
    <>
      <Popconfirm
        title="Confirm status change?"
        onConfirm={handleToggleCollection}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
          className="toggle-clr"
          checked={toggle === "Percent"}
          checkedChildren="Percent"
          unCheckedChildren="Amount"
        />
      </Popconfirm>
    </>
  );
}

const mapStateToProps = ({ auth, promotion }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  promotionsData: promotion.promotionsData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingDiscountToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrmotionDiscountToggle);
