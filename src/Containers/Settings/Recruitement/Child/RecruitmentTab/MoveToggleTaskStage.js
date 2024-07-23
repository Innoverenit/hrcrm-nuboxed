import React from "react";
import { Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moveRejectToggleTask } from "../../../SettingsAction";
//import { moveRejectToggle } from "../Main/Inventory/InventoryAction";
import dayjs from "dayjs";

function MoveToggleTaskStage(props) {

  function handleDispatchToggle() {
    props.moveRejectToggleTask(
        props.item.stagesTaskId,
        !props.item.mandatoryInd
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
         checked={props.item.mandatoryInd}
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
        moveRejectToggleTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoveToggleTaskStage);
