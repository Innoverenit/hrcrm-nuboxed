import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { editOrganizationDetails } from "../../../Auth/AuthAction";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
class OrganizationAddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }
  handleUpdate = () => {
    this.props.editOrganizationDetails(
       this.props.orgId,
      this.state.fields,
      this.props.toggleViewType
    );
  };
  handleChange = (name, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
  handleSelect = (name, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
  render() {
    const {
      organizationList: {
        address,
        sourceId,
        proposalAmount,
        currency,
        endDate,
        description,
        oppType,
        organizationDetails,
      },
      toggleViewType,
      // updateOpportunityById,
    } = this.props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;

    console.log("poles",this.props.organization)
    console.log("south",address)

    return (
      <>
   <div class=" flex flex-col"
          style={{ padding: "10px 20px 10px 20px" }}
        >
         
          <EditableInput
          defaultValue={addressdata}
            handleChange={this.handleChange}
            name={"address[0].address1"}
             value={this.state.fields.addressdata}
            // disabled={"disabled"}
            width="100%"
          />
    <div class=" m-[2px]">
          <EditableInput
          defaultValue={addressdata1}
            handleChange={this.handleChange}
            name={"address[0]street"}
             value={this.state.fields.addressdata1}
            // disabled={"disabled"}
            width="100%"
          />
          </div>
          <div class=" m-[2px]">
           <EditableInput
          defaultValue={addressdata2}
            handleChange={this.handleChange}
            name={"city"}
             value={this.state.fields.addressdata2}
            // disabled={"disabled"}
            width="100%"
          />
           </div>
           <div class=" m-[2px]">
            <EditableInput
          defaultValue={addressdata3}
            handleChange={this.handleChange}
            name={"state"}
             value={this.state.fields.addressdata3}
            // disabled={"disabled"}
            width="100%"
          />
            </div>
            <div class=" m-[2px]">
           <EditableInput
          defaultValue={addressdata4}
            handleChange={this.handleChange}
            name={"postalCode"}
             value={this.state.fields.addressdata4}
            // disabled={"disabled"}
            width="100%"
          />
            </div>
         
        </div>

        <div class=" flex justify-end mr-[20px]" >
          <Button
            type="primary"
             loading={this.props.editingOrganizationDetails}
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
  editOrganizationDetails: auth.editOrganizationDetails,
  editOrganizationDetailsError: auth.editOrganizationDetailsError,
  organizationDetails:auth.organizationDetails,
  orgId:auth.userDetails.organizationId,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editOrganizationDetails
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationAddressEdit);
