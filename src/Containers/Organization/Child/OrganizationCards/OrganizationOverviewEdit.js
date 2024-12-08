import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { updateOrganizationDetails } from "../../../Auth/AuthAction";
import { Button } from "antd";
import { TextInput, } from "../../../../Components/UI/Elements";
import EditUpload from "../../../../Components/Forms/Edit/EditUpload";
class OrganizationDetailEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    this.props.updateOrganizationDetails(
      this.props.organizationList.organizationId,
      this.state.fields,
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
    const {
      organizationList,
      toggleViewType,
      updatingOrganizationDetails,
    } = this.props;
    return (
      <>
        <div class=" flex flex-col"
      
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditUpload
            imageId={organizationList.imageId}
            imageURL={organizationList.imageURL}
            imgWidth={100}
            imgHeight={100}
            getImage={this.setImage}
          />

          <EditableInput
            defaultValue={organizationList.organizationName}
            handleChange={this.handleChange}
            name={"organizationName"}
            value={this.state.fields.organizationName}
            width="100%"
          />
        </div>
        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={updatingOrganizationDetails}
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
  updatingOrganizationDetails: auth.updatingOrganizationDetails,
  updatingOrganizationDetailsError: auth.updatingOrganizationDetailsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOrganizationDetails,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationDetailEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        placeholder={this.props.name || ""}
        width={width}
      />
    );
  }
}
