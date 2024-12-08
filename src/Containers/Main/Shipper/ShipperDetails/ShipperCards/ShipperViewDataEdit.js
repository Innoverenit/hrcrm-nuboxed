import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateShipperById } from "../../ShipperAction";
import { Button } from "antd";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";

class ShipperViewDataEdit extends Component {
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
        <FlexContainer
          flexDirection="column"
          style={{ padding: "10px 20px 10px 20px" }}
        >
          <EditableInput
            defaultValue={shipper.phoneNo}
            handleChange={this.handleChange}
            name={"Phone No"}
            value={this.state.fields.phoneNo}
            width="100%"
          />
          <div class=" mt-3" style={{ margin: "2px" }} />
          <EditableInput
            defaultValue={shipper.emailId}
            handleChange={this.handleChange}
            name={"Email"}
            value={this.state.fields.emailId}
            width="100%"
          />
          <div class=" mt-3" style={{ margin: "2px" }} />
          <EditableInput
            defaultValue={shipper.shipByName}
            handleChange={this.handleChange}
            name={"Ship By"}
            value={this.state.fields.shipByName}
            width="100%"
          />
        </FlexContainer>

        <FlexContainer justifyContent="flex-end" marginRight="20px">
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
        </FlexContainer>
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
)(ShipperViewDataEdit);

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
