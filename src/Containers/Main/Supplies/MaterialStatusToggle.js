import React, { useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialToggle } from "../Supplies/SuppliesAction";

function MaterialStatusToggle(props) {
  const [toggle, setToggle] = useState(props.uniqueIdInd);

  function handleToggleClick(value) {
    setToggle(value);
    props.linkMaterialToggle(props.suppliesId, value);
  }

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to change the status?"
        onConfirm={() => handleToggleClick(!toggle)}
        okText="Yes"
        cancelText="No"
      >
        <Switch
          checked={toggle}
          onChange={() => {}}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkMaterialToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialStatusToggle);
