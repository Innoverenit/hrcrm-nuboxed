import React, { useState } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moveProduction } from "../ProductionAction";
import dayjs from "dayjs";

function MoveToggleProduction(props) {

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(prevChecked => !prevChecked);

    if (!checked) {
      const currentDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

      props.moveProduction(
        {

          manufactureId: props.item.manufactureId,
          moveToInventoryDate: currentDate,
          moveToInventoryInd: true,
          locationDetailsId: props.locationId,


        },);
    }
  };

  return (
    <div>
      <Switch
        checkedChildren="Yes"
        unCheckedChildren="No"
        checked={checked} onChange={handleToggle} />
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
