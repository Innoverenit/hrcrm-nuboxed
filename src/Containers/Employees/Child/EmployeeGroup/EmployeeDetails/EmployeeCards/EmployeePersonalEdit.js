import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateEmployeeById } from "../../../../EmployeeAction";
import EditableDatePicker from "../../../../../../Components/Forms/Edit/EditableDatePicker";
import EditableSelect from "../../../../../../Components/Forms/Edit/EditableSelect";
class EmployeePersonalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
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
      singleEmployee: { bloodGroup, dob },
      toggleViewType,
      updatingEmployeeById,
    } = this.props;
    return (
      <>
              <div className="flex flex-col p-4">
          <div class=" w-full" >
            <EditableSelect
              isRequired
              defaultValue={bloodGroup}
              handleChange={this.handleChange}
              name={"bloodGroup"}
              label={
                <FormattedMessage
                  id="app.bloodGroup"
                  defaultMessage="Blood Group"
                />
              }
              placeholder={"Blood Group"}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              value={this.state.fields.bloodGroup}
              style={{ width: "100%" }}
            />
          </div>
      
          <div class=" w-full mt-3 m-[0.125em]" >
            <EditableDatePicker
              defaultValue={dob}
              handleChange={this.handleChange}
              name={"dob"}
              label={
                <FormattedMessage id="app.dob" defaultMessage="Date Of Birth" />
              }
              placeholder={"Date Of Birth"}
              value={this.state.fields.dob}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
            <FormattedMessage id="app.save" defaultMessage="Save" />,
          </Button>
      <div class=" ml-2">
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
          </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  updatingEmployeeById: employee.updatingEmployeeById,
  updatingEmployeeByIdError: employee.updatingEmployeeByIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmployeeById,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeePersonalEdit);
