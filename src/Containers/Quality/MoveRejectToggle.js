import React from "react";
import { Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moveRejectToggle } from "../Main/Inventory/InventoryAction";
import dayjs from "dayjs";

function MoveRejectToggle(props) {

  function handleDispatchToggle() {
    props.moveRejectToggle(
        props.productionProductId,
        props.item.cellChamberLinkId
    );
  }

  return (
    <div>
      <Popconfirm
        title="Confirm status change?"
        onConfirm={handleDispatchToggle}
        onCancel={null}
        okText="Ok"
        cancelText="Cancel"
      >
        <Switch
          checked={props.item.usedInd}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>

    </div>
  );

}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      moveRejectToggle
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoveRejectToggle);
