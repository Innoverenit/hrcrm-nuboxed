import React, { useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialFifoToggle } from "../Supplies/SuppliesAction";

function MaterialFifoToggle(props) {
  const [toggle, setToggle] = useState(props.fifoInd);

  function handleToggleClick(value) {
    setToggle(value);
    props.linkMaterialFifoToggle(props.suppliesId, value);
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
          checkedChildren="LIFO"
          unCheckedChildren="FIFO"
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
        linkMaterialFifoToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialFifoToggle);
