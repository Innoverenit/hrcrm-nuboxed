import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getDepartments } from "../../../Department/DepartmentAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addApprove, getApproveData } from "../../../SettingsAction";
import { getRoles } from "../../../../Settings/Category/Role/RoleAction";
import { Field } from "formik";
const { Option } = Select;

function LevelApproveForm(props) {
  useEffect(() => {
    props.getDepartments();
    props.getRoles(props.organizationId);
  }, []);

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.approvalData.level) {
      setRows(
        props.approvalData.level.map((level, index) => ({
          ...level,
          roleTypeId: props.approvalData.roleTypeId ? props.approvalData.roleTypeId[index] : "",
        }))
      );
      setIsLoading(false);
    }
  }, [props.approvalData.level, props.approvalData.roleTypeId]);

  function buttonOnClick() {
    const data = {
      levelCount: rows.length,
      level: rows.map((row) => ({
        level: row.level,
        threshold: row.threshold,
        roleTypeId: row.roleTypeId,
      })),
      approvalIndicator: props.approvalIndicator,
      approvalType: props.approvalType,
      subProcessName: "Leave",
    };

    console.log(data);
    props.addApprove(data);
  }

  function handleChangeValue(value, index, field) {
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  }

  function handleAddRowClick() {
    if (rows.length < 3) {
      const newRow = { level: "", threshold: "", roleTypeId: "" };
      setRows((prevRows) => [...prevRows, newRow]);
    }
  }

  function handleDelete(index) {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }

  function getRoleOptions(departmentId) {
    return props.roles
      .filter((role) => role.departmentId === departmentId)
      .map((option) => ({
        label: option.roleType,
        value: option.roleTypeId,
      }));
  }

  return (
    <div>
      <div className="MainBox">
        <div className="InputBox">
          {rows.map((row, index) => (
            <div key={index}>
              <div className="w-full flex font-bold mt-4 items-center">
                <div className="w-wk">
                  <p>{`Level ${index + 1}`}</p>
                </div>

                <div className="w-[83rem]">
                  <Select
                    name={`level_${index}`}
                    value={row.level}
                    onChange={(value) => handleChangeValue(value, index, "level")}
                  >
                    <Option value={"ReportingManager"}>{"Reporting Manager"}</Option>
                    <Option value={"ReportingManager+1"}>{"Reporting Manager +1"}</Option>

                    {props.departments.map((a) => (
                      <Option key={a.departmentId} value={a.departmentId}>
                        {a.departmentName}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="w-full flex font-bold">
                  <div style={{ width: "5rem" }}></div>
                  {props.departments.some((dept) => dept.departmentId === row.level) && (
                    <div style={{ width: "100%" }}>
                      <Select
                        name={`roleTypeId_${index}`}
                        placeholder="Role"
                        value={row.roleTypeId}
                        onChange={(value) => handleChangeValue(value, index, "roleTypeId")}
                        style={{ width: "100%" }}
                      >
                        {getRoleOptions(row.level).map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  {rows.length > 1 ? (
                    <CloseOutlined onClick={() => handleDelete(index)} />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <div className="button">
              <Button type="primary" onClick={handleAddRowClick}>
                Add Level
              </Button>
            </div>
            <div className="button">
              <Button type="primary" onClick={() => buttonOnClick()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ settings, role, auth, departments }) => ({
  departments: departments.departments,
  roles: role.roles,
  approvalData: settings.approvalData,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      addApprove,
      getApproveData,
      getRoles,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LevelApproveForm);
