import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateEmployeeById } from "../../../../EmployeeAction";
import EditableInput from "../../../../../../Components/Forms/Edit/EditableInput";
import EditableSearcSelect from "../../../../../../Components/Forms/Edit/EditSearchSelect";
class EmployeeStatusEdit extends Component {
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
      singleEmployee: {
        emailId,

        countryDialCode,
        countryDialCode1,
        phoneNo,
        mobileNo,
        level,
        timeZone,
        designation,
        department,
        dateOfJoining,
      },
      toggleViewType,
      updatingEmployeeById,
    } = this.props;
    return (
      <>
         <div className="flex flex-col p-4">
          {/* <EditableInput
            isRequired
            defaultValue={emailId}
            handleChange={this.handleChange}
            name={"emailId"}
            label={<FormattedMessage
              id="app.emailId"
              defaultMessage="Email"
            />}
            placeholder={"Email"}
            value={this.state.fields.emailId}
            width="100%"
          />
          <div class=" mt-3" style={{ margin: "0.125em" }} />
         <div class=" flex flex-col flex-wrap items-start self-start p-[0.625em 1.25em 0.625em 1.25em] justify-start grow shrink h-auto mr-auto ">
       
            <EditableDatePicker
              defaultValue={dateOfJoining}
              handleChange={this.handleChange}
              name={"dateOfJoining"}
              placeholder={"Date of Joining"}
              value={this.state.fields.dateOfJoining}
              style={{ width: "100%" }}
            /> */}
            {/* <div class=" mt-3" style={{ margin: "0.125em" }} /> */}
          {/* </div> */}

          <div class=" flex justify-between w-full"
          >
            <div class=" w-[37%]" >
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode,
                  label: countryDialCode,
                  color: "#FF8B00",
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode"}
                // value={this.state.fields.countryDialCode}
                selectType="dialCode"
              />
            </div>

            <div class=" w-[60%]" >
              <EditableInput
                defaultValue={phoneNo}
                handleChange={this.handleChange}
                name={"phoneNo"}
                placeholder={"Phone #"}
                value={this.state.fields.phoneNo}
                width="100%"
              />
            </div>
          </div>
          <div  class=" flex justify-between w-full mt-3 m-[-.125em]"
          >
            <div class=" w-[37%]" >
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode1,
                  label: countryDialCode1,
                  color: "#FF8B00",
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode1"}
                // placeholder={"Country dial Code "}
                selectType="dialCode"
              // value={this.state.fields.countryDialCode1}
              />
            </div>

            <div class=" w-[60%]" >
              <EditableInput
                defaultValue={mobileNo}
                handleChange={this.handleChange}
                name={"mobileNo"}
                placeholder={"Mobile #"}
                value={this.state.fields.mobileNo}
                width="100%"
              />
            </div>
            <div class=" w-[60%]" >
              {/* <EditableSearcSelect
                                defaultValue={{
                                    value: reportingManager,
                                    label: countryDialCode1,
                                    color: "#FF8B00",
                                }}
                                handleSelectChange={this.handleChange}
                                name={"reportingManager"}
                                // placeholder={"Country dial Code "}
                                selectType="reportingManager"
                            // value={this.state.fields.countryDialCode1}
                            /> */}
            </div>
          </div>
          <div class=" mt-3 m-[0.125rem]">
          <EditableInput
            // defaultValue={linkedinPublicUrl}
            handleChange={this.handleChange}
            name={"linkedinPublicUrl"}
            placeholder={"Linkedin"}
            value={this.state.fields.linkedinPublicUrl}
            width="100%"
          />
          </div>
          <div class=" mt-3 m-[0.125rem]">
          <EditableInput
            // defaultValue={twitter}
            handleChange={this.handleChange}
            name={"twitter"}
            placeholder={"Twitter"}
            value={this.state.fields.twitter}
            width="100%"
          />
            </div>
           {/* <div class=" mt-3" style={{ margin: "0.125em" }} />
            <EditableInput
            // defaultValue={twitter}
            handleChange={this.handleChange}
            name={"designation"}
            placeholder={"Designation"}
            value={this.state.fields.designation}
            width="100%"
          /> */}
      
             {/* <EditableInput
            // defaultValue={twitter}
            handleChange={this.handleChange}
            name={"department"}
            placeholder={"Department"}
            value={this.state.fields.department}
            width="100%"
          /> */}
           <div class=" mt-3 m-[0.125rem]">
           <EditableInput
            defaultValue={level}
            handleChange={this.handleChange}
            name={"level"}
            placeholder={"Level"}
            value={this.state.fields.level}
            width="17.625em"
          />
          </div>

          <div class=" w-full mt-3 m-[0.125rem]" >
            <EditableSearcSelect
              defaultValue={{
                value: timeZone,
                label: timeZone,
                color: "#FF8B00",
              }}
              handleSelectChange={this.handleChange}
              name={"timeZone"}
              // placeholder={"Country dial Code "}
              selectType="timeZone"
              value={this.state.fields.timeZone}
            />
          </div>
        </div>

        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
            {/* Save */}
          </Button>
     <div class=" ml-2">
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
            {/* Cancel */}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeStatusEdit);
