import React, { useEffect, useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addingProductToggle } from "./PrmotionAction";

function ProductionToggle(props) {
  const [data, setData] = useState(props.promotionsData);
  const [toggle, setToggle] = useState(props.productInd);

  useEffect(() => {
    setData(props.promotionsData);
  }, [props.promotionsData]);

  useEffect(() => {
    setToggle(props.productInd);
  }, [props.productInd]);

  function handleToggleCollection() {
    const newToggleState = !toggle;
    props.addingProductToggle({}, props.promoCodeId, newToggleState);
    setToggle(newToggleState);
  }

  function handleCancel() {
    setToggle(props.productInd);
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
          checked={toggle}
          isLoading={true}
          checkedChildren="Yes"
          unCheckedChildren="No"
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
      addingProductToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionToggle);
