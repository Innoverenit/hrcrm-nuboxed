import React from "react";
import { Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moveProduction } from "../ProductionAction";
import dayjs from "dayjs";

function MoveToggleProduction(props) {

  function handleDispatchToggle() {
    props.moveProduction(
      {

        manufactureId: props.item.manufactureId,
        moveToInventoryDate: dayjs(),
        moveToInventoryInd: true,
        locationDetailsId: props.locationId,
      });
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
          checked={props.item.moveToInventoryInd}
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
      moveProduction
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoveToggleProduction);
