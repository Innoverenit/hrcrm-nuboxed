import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateUserById } from "../../../Auth/AuthAction";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import EditableSearcSelect from "../../../../Components/Forms/Edit/EditSearchSelect";
import EditableDatePicker from "../../../../Components/Forms/Edit/EditableDatePicker";
class ProfileStatsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    const userId = this.props.user.userId;

    console.log(userId);
    this.props.updateUserById(
      { ...this.state.fields, employeeId: userId },
      this.props.user.userId,
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
      user: {
        emailId,
        empId,
        phoneNo,
        mobileNo,
        countryDialCode1,
        countryDialCode,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        timeZone,
        

      },
      toggleViewType,
      updatingUserById,
    } = this.props;
    return (
      <>
        <div class=" flex flex-col"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em"}}
        >
           <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={emailId}
            disabled
            handleChange={this.handleChange}
            name={"emailId"}
            placeholder={"Email"}
            value={this.state.fields.emailId}
            width="100%"
          />
          </div>
          <div class=" m-[0.125em]">

          <div class=" flex flex-col mr-[-1.2em]"
            style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
          >
            <EditableDatePicker
              defaultValue={dateOfJoining}
              handleChange={this.handleChange}
              name={"dateOfJoining"}
              placeholder={"Date of Joining"}
              value={this.state.fields.dateOfJoining}
              width="100%"
            />

          </div>
          </div>
          <div class=" flex justify-between w-full" >
            <div class=" w-[37%]">
              <EditableSearcSelect
                defaultValue={{
                  value: countryDialCode,
                  label: countryDialCode,
                  color: "#FF8B00",
                }}
                handleSelectChange={this.handleChange}
                name={"countryDialCode"}
                value={this.state.fields.countryDialCode}
                selectType="dialCode"
              />
            </div>

            <div class=" w-[60%]">
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
          <div class=" flex justify-between w-full m-[0.125em]" >
          <div class=" w-[37%]">
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
                value={this.state.fields.countryDialCode1}
              />
            </div>

            <div class=" w-[60%]">
              <EditableInput
                defaultValue={mobileNo}
                handleChange={this.handleChange}
                name={"mobileNo"}
                placeholder={"Mobile #"}
                value={this.state.fields.mobileNo}
                width="100%"
              />
            </div>
          </div>
          <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={linkedinPublicUrl}
            handleChange={this.handleChange}
            name={"linkedinPublicUrl"}
            placeholder={"Linkedin"}
            value={this.state.fields.linkedinPublicUrl}
            width="100%"
          />
          </div>
          <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={twitter}
            handleChange={this.handleChange}
            name={"twitter"}
            placeholder={"Twitter"}
            value={this.state.fields.twitter}
            width="100%"
          />
          </div>
          {/* <EditableInput
            defaultValue={level}
            handleChange={this.handleChange}
            name={"level"}
            placeholder={"Level"}
            value={this.state.fields.level}
            width="17.625em"
          />
          <div class=" mt-3" style={{ margin: "0.125em" }} /> */}
          <div class=" w-full m-[0.125em]">
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
            Loading={updatingUserById}
            onClick={this.handleUpdate}
          >
            Save
          
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            Cancel
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  updatingUserById: auth.updatingUserById,
  updatingUserByIdError: auth.updatingUserByIdError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatsEdit);
