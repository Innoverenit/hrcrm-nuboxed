

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Popconfirm } from "antd";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { addingWeekendAccess, getWeekendAccess } from "../../../SettingsAction";
import dayjs from "dayjs";

function Weekend(props) {
  useEffect(() => {
    props.getWeekendAccess(props.country_name);
  }, [props.country_name]);

  const handleToggle = (day) => {
    // Toggle the value for the specific day
    const updatedValue = !props.weekendAccess[`${day}Ind`];
    
    // Update the Redux state with the new value for the specific day
    props.addingWeekendAccess(
      {
        ...props.weekendAccess,
        orgId: props.orgId,
        country: props.country_id,
        [`${day}Ind`]: updatedValue,
      },
      props.country_name
    );
  };

  const renderSwitch = (day) => (
    <div class=" w-[52%] flex justify-between mt-4" >
      <p>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
      <div>
        <Popconfirm
          title={`Do you wish to change ${day} status?`}
          onConfirm={() => handleToggle(day.toLowerCase())}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            style={{ width: "5em" }}
            checked={props.weekendAccess[`${day.toLowerCase()}Ind`]}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </div>
  );

  return (
    <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
      {/* Render switch components for each day */}
      {renderSwitch("sunday")}
      {renderSwitch("monday")}
      {renderSwitch("tuesday")}
      {renderSwitch("wednesday")}
      {renderSwitch("thursday")}
      {renderSwitch("friday")}
      {renderSwitch("saturday")}
      
      <div>
        Updated on{" "}
        {dayjs(props.weekendAccess.updationDate).format("ll")} by{" "}
        {props.weekendAccess.updatedBy}
      </div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  weekendAccess: settings.weekendAccess,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWeekendAccess,
      addingWeekendAccess,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Weekend);






// export default Weekend;




