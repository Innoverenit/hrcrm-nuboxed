import React, { useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import {
    addTopicByUserId,
} from "../../../../../Employees/EmployeeAction";
import { getLibrarys } from "../../../../../Settings/Library/LibraryAction";
const { Option } = Select;
function EmployeeSelect(props) {
  const [selectType, setSelectType] = useState("");

  function handleChange(selectType) {
    props.addTopicByUserId(
      {
        keySkillsName: selectType,
        employeeId: props.employeeId,
      },
      props.employeeId
    );
  }

  return (
    <div>
      <Select style={{ width: "14rem", height:"1.1rem" }} onChange={(e) => handleChange(e)}>
        {/* <Option value={"item"}>"item" </Option>; */}
        {props.librarys.map((item, i) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
      </Select>
    </div>
  );
}
const mapStateToProps = ({ candidate, auth, librarys }) => ({
  user: auth.userDetails,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addTopicByUserId,
      getLibrarys,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSelect);
