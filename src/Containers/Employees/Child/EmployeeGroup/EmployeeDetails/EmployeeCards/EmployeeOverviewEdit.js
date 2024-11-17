import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateEmployeeById } from "../../../../EmployeeAction";
import { Button } from "antd";
import { TextInput } from "../../../../../../Components/UI/Elements";
import EditUpload from "../../../../../../Components/Forms/Edit/EditUpload";
class EmployeeOverviewEdit extends Component {
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
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  setImage = (imageId) => {
    this.setState({
      fields: {
        ...this.state.fields,
        imageId,
      },
    });
  };
  render() {
    const { singleEmployee, toggleViewType, updatingEmployeeById } = this.props;
    return (
      <>
      <div className="flex flex-col p-4">
      
          <EditUpload
            imageId={singleEmployee.imageId}
            imageURL={singleEmployee.imageURL}
            imgWidth={100}
            imgHeight={100}
            getImage={this.setImage}
          />
          <div class=" ml-2">
          <EditableInput
            defaultValue={singleEmployee.firstName}
            handleChange={this.handleChange}
            name={"firstName"}
            label={
              <FormattedMessage
                id="app.firstName"
                defaultMessage="First name"
              />
            }
            placeholder="First name"
            value={this.state.fields.firstName}
            width="100%"
          />
          </div>
   
          {/* <EditableInput
                        defaultValue={user.middleName}
                        handleChange={this.handleChange}
                        name={'middleName'}
                        value={this.state.fields.middleName} /> */}
                        <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={singleEmployee.lastName}
            handleChange={this.handleChange}
            name={"lastName"}
            label={
              <FormattedMessage id="app.lastName" defaultMessage="Last name" />
            }
            placeholder="Last name"
            value={this.state.fields.lastName}
            width="100%"
          />
          </div>
        </div>

        <div class=" flex justify-end mr-[1.25rem] " >
          <Button
            type="primary"
            Loading={updatingEmployeeById}
            onClick={this.handleUpdate}
          >
            <FormattedMessage id="app.save" defaultMessage="Save" />
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
)(EmployeeOverviewEdit);

class EditableInput extends Component {
  render() {
    const { width, placeholder } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        placeholder={placeholder}
        width={width}
      />
    );
  }
}
