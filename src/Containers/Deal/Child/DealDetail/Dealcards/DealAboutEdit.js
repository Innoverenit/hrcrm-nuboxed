import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import dayjs from "dayjs";
import { Spacer } from "../../../../../Components/UI/Elements";
import EditSearchSelect from "../../../../../Components/Forms/Edit/EditSearchSelect";
import EditableInput from "../../../../../Components/Forms/Edit/EditableInput";
import EditableTextArea from "../../../../../Components/Forms/Edit/EditableTextArea";
import EditableDatePicker from "../../../../../Components/Forms/Edit/EditableDatePicker";
import EditableSelect from "../../../../../Components/Forms/Edit/EditableSelect";
import { FormattedMessage } from "react-intl";
class DealAboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    const {
      opportunity: { opportunityId },
      updateOpportunity,
      toggleViewType,
    } = this.props;
    // updateOpportunity(opportunityId, this.state.fields, this.callback);
  };
  callback = () => {
    this.props.toggleViewType();
    this.props.getHistoricalProposalAmount(
      this.props.opportunity.opportunityId
    );
  };
  handleChange = (name, value) => {
    console.log(name, value);
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  render() {
    const {
        dealDetailsbyID: {
        sourceName,
        sourceId,
        proposalAmount,
        currency,
        endDate,
        description,
        oppType,
      },
      toggleViewType,
      updateOpportunityById,
    } = this.props;
    return (
      <>
        <div class=" flex flex-col"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <div class=" flex justify-between w-full"
          >
            <div class=" w-[50%]" >
              <EditableInput
                isRequired
                defaultValue={proposalAmount}
                handleChange={this.handleChange}
                placeholder="Proposal Value"
                name={"proposalAmount"}
                label={<FormattedMessage
                  id="app.proposalvalue"
                  defaultMessage="Proposal Value"
                />}
                value={this.state.fields.proposalAmount}
                height={"2.375em"}
                width="100%"
              // width="17.625em"
              />
            </div>
            <div class=" w-[50%]" >
              <EditSearchSelect
                defaultValue={{
                  value: currency,
                  label: currency,
                  color: "#FF8B00",
                }}
                selectType="currency"
                placeholder="Currency"
                name={"currency"}
                handleSelectChange={this.handleChange}
                value={this.state.fields.currency || currency}
                style={{ height: "1.25em" }}
              />
            </div>
          </div>

          <Spacer style={{ margin: "0.125em" }} />
          <div class=" flex justify-between w-full"
          >
            <div class=" w-[50%]" >
              <EditableDatePicker
                // defaultValue={dayjs(endDate).format('ll')}
                defaultValue={dayjs(endDate)}
                handleChange={this.handleChange}
                placeholder="Closure date"
                name={"endDate"}
                value={this.state.fields.endDate}
              />
            </div>
            <div class=" w-[46%]" >
              <EditableSelect
                defaultValue={oppType}
                handleChange={this.handleChange}
                name={"oppType"}
                placeholder={"Probability"}
                options={[
                  "High",
                  "Medium",
                  "Small",
                ]}
                value={this.state.fields.oppType}
                style={{ width: "100%" }}

              />

            </div>
          </div>

          <Spacer style={{ margin: "0.125em" }} />
          <div class=" w-full" >
            <EditSearchSelect
              defaultValue={{
                value: sourceId,
                label: sourceName,
                color: "#FF8B00",
              }}
              selectType="source"
              placeholder={"Source.."}
              name={"sourceId"}
              handleSelectChange={this.handleChange}
              value={this.state.fields.sourceId}
            // width="100%"
            />
          </div>
          <EditableTextArea
            defaultValue={description}
            handleChange={this.handleChange}
            placeholder="Description"
            name={"description"}
            value={this.state.fields.description}
            width={"100%"}
            height={"2.375em"}
          />
          {/* <Spacer style={{ margin: "0.125em" }} />
         
          </div> */}
          {/* <EditableInput
                        defaultValue={sourceName}
                        handleChange={this.handleChange}
                        placeholder='Source'
                        name={'sourceName'}
                        value={this.state.fields.sourceName} /> */}
        </div>
        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={updateOpportunityById}
          // onClick={this.handleUpdate}
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
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  // updateOpportunityById: opportunity.updateOpportunityById,
  // updateOpportunityByIdFailure: opportunity.updateOpportunityByIdFailure,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // updateOpportunity,
      // getHistoricalProposalAmount,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealAboutEdit);
