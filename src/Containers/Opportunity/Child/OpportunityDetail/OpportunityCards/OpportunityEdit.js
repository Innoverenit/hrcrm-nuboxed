import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
 import { updateOpportunity } from "../../../OpportunityAction";
import { Button } from "antd";
import {
  TextInput,
} from "../../../../../Components/UI/Elements";
class OpportunityOverviewEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }
  handleUpdate = () => {
    this.props.updateOpportunity(
      this.state.fields,
      this.props.opportunity.opportunityId,
     
       this.callback
    );
  };
  callback = () => {
    this.props.toggleViewType();
  };
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };
  render() {
    const { opportunity, toggleViewType, updateOpportunityById } = this.props;
    return (
      <>
      <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto py-2.5 px-5 ">
          <EditableInput
            defaultValue={opportunity.opportunityName}
            handleChange={this.handleChange}
            name={"opportunityName"}
            value={this.state.fields.opportunityName}
            width="100%"
          />
        </div>
        <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-[1.25em]">
          <Button
            type="primary"
            Loading={updateOpportunityById}
            onClick={this.handleUpdate}
            //  onClick={() => this.handleUpdate(this.props.opportunity.opportunityId)}
  >     
            <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
            {/* Save */}
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
            <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
            {/* Cancel */}
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  updateOpportunityById: opportunity.updateOpportunityById,
  updateOpportunityByIdFailure: opportunity.updateOpportunityByIdFailure
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
     updateOpportunity 
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityOverviewEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        width={width}
      />
    );
  }
}
