import React, { useEffect, useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addingSuppliesToggle } from "./PrmotionAction";

function PrmotionSupplierInventoryToggle(props) {
  const [data, setData] = useState(props.promotionsData);
  const [toggle, setToggle] = useState(props.supplierInventoryInd);

  useEffect(() => {
    setData(props.promotionsData);
  }, [props.promotionsData]);

  useEffect(() => {
    setToggle(props.supplierInventoryInd);
  }, [props.supplierInventoryInd]);

  function handleToggleCollection() {
    const newToggleState = !toggle;
    props.addingSuppliesToggle({}, props.promoCodeId, newToggleState);
    setToggle(newToggleState);
  }

  function handleCancel() {
    setToggle(props.supplierInventoryInd);
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
      addingSuppliesToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrmotionSupplierInventoryToggle);
