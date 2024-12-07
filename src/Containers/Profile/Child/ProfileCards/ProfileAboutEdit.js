import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { updateUserById } from "../../../Auth/AuthAction";
import EditableSelect from "../../../../Components/Forms/Edit/EditableSelect";
class ProfileAboutEdit extends Component {
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
        currency,
        designation,
        department,
        userType,
        label,
        role,
        departmentDetails,
      },
      toggleViewType,
      updatingUserById,
    } = this.props;
    return (
      <>
        <div class=" flex flex-col"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <div class=" w-full" ></div>
          <div class=" w-full m-[0.1875rem]" >
            <EditableSelect
              defaultValue={designation}
              handleChange={this.handleChange}
              name={"designation"}
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
          <div class=" flex justify-between w-full m-[0.125rem]"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            {/* {userType === "ADMIN" && ( */}
            <div class=" w-full" >
              <EditableSelect
                defaultValue={department}
                handleChange={this.handleChange}
                name={"department"}
                disabled
                placeholder={"Function"}
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
            {/* <div style={{ width: "58%" }}>
              <EditableInput
                defaultValue={departmentDetails}
                handleChange={this.handleChange}
                name={"departmentDetails"}
                placeholder={"Function Details"}
                value={this.state.fields.departmentDetails}
                width="100%"
              />
            </div> */}
          </div>
          {/* <div class=" mt-3" style={{ margin: "0.125em" }} /> */}
          {/* <EditableInput
            defaultValue={userType}
            handleChange={this.handleChange}
            name={"userType"}
            placeholder={"User type"}
            value={this.state.fields.userType}
            width="17.625em"
          /> */}

          <div class=" w-full m-[0.125rem] ">
            <EditableSelect
              defaultValue={label}
              handleChange={this.handleChange}
              name={"label"}
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
        </div>
        <div class=" flex justify-end mr-[1.25rem]" >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAboutEdit);
