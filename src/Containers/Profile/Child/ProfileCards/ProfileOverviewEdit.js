import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { updateUserById } from "../../../Auth/AuthAction";
import { Button } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Spacer } from "../../../../Components/UI/Elements";
import EditUpload from "../../../../Components/Forms/Edit/EditUpload";
class ProfileDetailEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    const userId = this.props.user.userId;

    console.log(userId)
    this.props.updateUserById(

      { ...this.state.fields, employeeId: userId, },
      this.props.user.userId,
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
    const userId = this.props.user.userId;
    this.setState({
      fields: {
        ...this.state.fields,
        imageId,
      },
    });
  };
  render() {
    const { user, toggleViewType, updatingUserById } = this.props;
    return (
      <>
        <FlexContainer
          flexDirection="column"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditUpload
            imageId={user.imageId}
            imageURL={user.imageURL}
            imgWidth={100}
            imgHeight={100}
            getImage={this.setImage}
          />
          <Spacer style={{ margin: "0.125em" }} />
          <EditableInput

            defaultValue={user.firstName}
            handleChange={this.handleChange}
            name={"firstName"}
            placeholder="First name"
            value={this.state.fields.firstName}
            width="100%"
          />
          <Spacer style={{ margin: "0.125em" }} />
          {/* <EditableInput
                        defaultValue={user.middleName}
                        handleChange={this.handleChange}
                        name={'middleName'}
                        value={this.state.fields.middleName} /> */}
          <EditableInput
            defaultValue={user.lastName}
            handleChange={this.handleChange}
            name={"lastName"}
            placeholder="Last name"
            value={this.state.fields.lastName}
            width="100%"
          />
        </FlexContainer>

        <FlexContainer justifyContent="flex-end" marginRight="1.25em">
          <Button
            type="primary"
            Loading={updatingUserById}
            onClick={this.handleUpdate}
          >
            {/* Save */}
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
            
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            {/* Cancel */}
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
          </Button>
        </FlexContainer>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailEdit);

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
