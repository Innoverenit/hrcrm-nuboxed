import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';

import { Button } from "antd";
import EditableInput from "../../../../../Components/Forms/Edit/EditableInput";
import { updatePartnerBankDetails } from "../../../PartnerAction";

class PartnerBankDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  handleUpdate = () => {
    this.props.updatePartnerBankDetails(
        this.state.fields,
        this.props.partner.partnerId,
        this.props.toggleViewType,
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
    console.log( this.props.partner.partnerId);
    const { partner, toggleViewType, updatePartnerBankDetailsById } = this.props;
    return (
      <>
        <div class=" flex flex-col"
          style={{ padding: "0.62em 1.25em 0.62em 1.25em" }}
        >
          <div class=" mt-3" />

          <div class=" w-full justify-between"
          >
            <div class=" w-1/2">
           
              <EditableInput
                defaultValue={partner.businessRegistrationNumber}
                handleChange={this.handleChange}
                placeholder="Bussiness Reg No."
                name={"businessRegistrationNumber"}
                value={this.state.fields.businessRegistrationNumber}
                width="100%"
              />
            </div>
            <div class=" w-1/2">
            <EditableInput
                defaultValue={partner.taxRegistrationNumber}
                handleChange={this.handleChange}
                placeholder="Tax Reg No."
                name={"taxRegistrationNumber"}
                value={this.state.fields.taxRegistrationNumber}
                width="100%"
              />
            </div>

            <div class=" w-1/2">
            <EditableInput
                defaultValue={partner.bankName}
                handleChange={this.handleChange}
                placeholder="Bank"
                name={"bankName"}
                value={this.state.fields.bankName}
                width="100%"
              />
            </div>

            <div class=" w-1/2">
            <EditableInput
                defaultValue={partner.accountNumber}
                handleChange={this.handleChange}
                placeholder="Account No."
                name={"accountNumber"}
                value={this.state.fields.accountNumber}
                width="100%"
              />
            </div>
          </div>
          <div class=" mt-3"  />
        </div>
        <div class=" mt-3" />
        <div class=" flex justify-end" >
          <Button
            type="primary"
            loading={updatePartnerBankDetailsById}
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
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ partner }) => ({
  updatePartnerBankDetailsById: partner.updatePartnerBankDetailsById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      updatePartnerBankDetails
     }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerBankDetailsEdit);
