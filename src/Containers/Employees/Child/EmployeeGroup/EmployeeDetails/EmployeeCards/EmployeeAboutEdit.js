import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateEmployeeById } from "../../../../EmployeeAction";
import EditableInput from "../../../../../../Components/Forms/Edit/EditableInput";
import EditableSelect from "../../../../../../Components/Forms/Edit/EditableSelect";
import { getAllUsersByOrganizationId } from "../../../../../Call/CallAction";
class EmployeeAboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  componentDidMount() {
    this.props.getAllUsersByOrganizationId();
  }
  handleUpdate = () => {
    this.props.updateEmployeeById(
      {
        ...this.state.fields,
        employeeId: this.props.singleEmployee.employeeId,
      },
      this.props.singleEmployee.employeeId,
      this.props.toggleViewType
    );
  };
  handleChange = (name, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  render() {
    const {
      singleEmployee: {
        designation,
        department,
        departmentDetails,
        firstName,
        userType,
        label,
        reportingManager,

        employee,
        email,
      },
      allUsersListByOrganizationId,
      toggleViewType,
      updatingEmployeeById,
    } = this.props;

    const ReportingData = allUsersListByOrganizationId
      .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
      .filter((a) => a.emailValidationInd)
      .map((item, i) => ({
        value: item.userId,
        label: `${item.firstName || ""} ${item.middleName ||
          ""} ${item.lastName || ""} ${item.emailId || ""}`,
      }));

    console.log(ReportingData);
    return (
      <>
        <div className="flex flex-col p-4">
          <div class=" w-full"></div>

          <div class=" w-full mt-3 m-[0.1875em]">
            <EditableSelect
              defaultValue={designation}
              handleChange={this.handleChange}
              name={"designation"}
              label="Designation"
               
              placeholder={"Designation"}
              options={[
                "Board",
                "CXO",
                "Director",
                "Unit Head",
                "Mid Level",
                "Junior",
              ]}
              value={this.state.fields.designation}
              style={{ width: "100%" }}
            />
          </div>

          <div class=" flex justify-between w-full mt-3 m-[0.125em]"
          >
            {/* {userType === "ADMIN" && ( */}
            <div class=" w-[40%]" >
              <EditableSelect
                defaultValue={department}
                handleChange={this.handleChange}
                name={"department"}
                label="Department"
                 
                disabled
                placeholder={"Department"}
                style={{ width: "100%" }}
                options={[
                  "Business",
                  "Operations",
                  "IT",
                  "Recruitment",
                  "HR",
                  "Sales",
                  "Marketing",
                  "Procurement",
                  "Legal",
                  "Facilities",
                  "Alliance",
                ]}
                value={this.state.fields.department}
              />
            </div>
            {/* )} */}
            <div class=" w-[58%]" >
              <EditableInput
                defaultValue={departmentDetails}
                handleChange={this.handleChange}
                name={"departmentDetails"}
                label="Department Details"
                 
                placeholder={"Department Details"}
                value={this.state.fields.departmentDetails}
                width="100%"
              />
            </div>
          </div>
          <div class=" w-[58%]" >
            {/* <EditableSelect
              defaultValue={ReportingData || undefined}
              handleChange={this.handleChange}
              name={"reportingManager"}
              placeholder={"Reports to"}
              options={ReportingData || []}
              value={this.state.fields.reportingManager}
              style={{ width: "100%" }}
            /> */}
            <EditableSelect
              defaultValue={`${firstName} `}
              handleChange={this.handleChange}
              name={"reportingManager"}
              label="Reporting Manager"
               
              placeholder={"Reports to"}
              options={Array.isArray(ReportingData) ? ReportingData : []}
              value={this.state.fields.reportingManager}
              style={{ width: "100%" }}
            />
          </div>

 
          {userType === "ADMIN" && (
            <div class=" w-[58%] mt-3 m-[0.125em]" >
              <EditableSelect
                defaultValue={label}
                handleChange={this.handleChange}
                name={"label"}
                label="Level"
                disabled
                placeholder={"Label"}
                options={[
                  "L1",
                  "L2",
                  "L3",
                  "L4",
                  "L5",
                  "L6",
                  "L7",
                  "L8",
                  "L9",
                  "L10",
                  "L11",
                  "L12",
                  "L13",
                  "L14",
                ]}
                value={this.state.fields.label}
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
          Save
          </Button>
        <div class=" ml-2">
          <Button type="ghost" onClick={() => toggleViewType()}>
       Cancel
          </Button>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ employee, call }) => ({
  updatingEmployeeById: employee.updatingEmployeeById,
  updatingEmployeeByIdError: employee.updatingEmployeeByIdError,
  allUsersListByOrganizationId: call.allUsersListByOrganizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmployeeById,
      getAllUsersByOrganizationId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAboutEdit);
