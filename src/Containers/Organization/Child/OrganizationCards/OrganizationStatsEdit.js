import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { updateOrganizationDetails } from "../../../Auth/AuthAction";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";

class OrganizationStatsEdit extends Component {
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
      organizationList: {
        organizationUrl,

        facebook,
        twitter,
        linkedinUrl,
      },
      toggleViewType,
      updatingOrganizationDetails,
    } = this.props;
    return (
      <>
           <div class=" flex flex-col"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <EditableInput
            defaultValue={organizationUrl}
            handleChange={this.handleChange}
            name={"organizationUrl"}
            placeholder={"Website"}
            value={this.state.fields.organizationUrl}
            width="100%"
          />
          <div class=" flex justify-between w-full m-[0.125em] "
          
          >
          
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
          <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={linkedinUrl}
            handleChange={this.handleChange}
            name={"linkedinUrl"}
            placeholder={"Linkedin"}
            value={this.state.fields.linkedinUrl}
            width="100%"
          />
           </div>
           <div class=" m-[0.125em]">
          <EditableInput
            defaultValue={facebook}
            handleChange={this.handleChange}
            name={"facebook"}
            placeholder={"Facebook"}
            value={this.state.fields.facebook}
            width="100%"
          />
          </div>
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
)(OrganizationStatsEdit);
