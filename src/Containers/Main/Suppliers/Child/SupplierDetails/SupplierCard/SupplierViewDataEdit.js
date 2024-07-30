import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateShipperById } from "../../../../Shipper/ShipperAction";
import { Button } from "antd";
import { TextInput } from "../../../../../../Components/UI/Elements";

class SupplierViewDataEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    this.props.updateShipperById(
      this.props.shipperId,
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

  render() {
    const { shipper, toggleViewType } = this.props;
    return (
      <>
        <div class="flex-col pt-[10px] pr-[20px] pb-[10px] pl-[20px]">
          <EditableInput
            defaultValue={shipper.phoneNo}
            handleChange={this.handleChange}
            name={"Phone No"}
            value={this.state.fields.phoneNo}
            width="100%"
          />
          <div class="mt-1">
          <EditableInput
            defaultValue={shipper.emailId}
            handleChange={this.handleChange}
            name={"Email"}
            value={this.state.fields.emailId}
            width="100%"
          />
          </div>
          <div class="mt-1">
          <EditableInput
            defaultValue={shipper.shipByName}
            handleChange={this.handleChange}
            name={"Ship By"}
            value={this.state.fields.shipByName}
            width="100%"
          />
          </div>
        </div>

        <div class="flex justify-end mr-[20px]">
          <Button
            type="primary"
            loading={this.props.updatingShipperById}
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

const mapStateToProps = ({ shipper }) => ({
  updatingShipperById: shipper.updatingShipperById,
  shipperId: shipper.shipperDetailsByShipperId.shipperId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateShipperById,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierViewDataEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        placeholder={this.props.name}
        width={width}
      />
    );
  }
}
