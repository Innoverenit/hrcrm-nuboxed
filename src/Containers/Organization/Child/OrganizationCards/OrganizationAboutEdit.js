import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";

import { updateOrganizationDetails } from "../../../Auth/AuthAction";
import EditableInput from "../../../../Components/Forms/Edit/EditableInput";
import EditableSelect from "../../../../Components/Forms/Edit/EditableSelect";
import EditSearchSelect from "../../../../Components/Forms/Edit/EditSearchSelect";
class OrganizationAboutEdit extends Component {
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
  handleSelect = (name, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  render() {
    const {
      organizationList: { industryType,vat,fiscalStartDate,fiscalStartMonth, companySize, tradeCurrency },
      toggleViewType,
      // updatingOrganizationDetails,
    } = this.props;
    // const { organization } = this.props;

    return (
      <>
       <div class=" flex flex-col"
          style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
        >
          <div class=" flex flex-row justify-between">
          <EditableSelect
                        defaultValue={fiscalStartDate}
                        handleChange={this.handleChange}
                        name={'fiscalStartDate'}
                        placeholder={'Fiscal start date'}
                   
                       options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
                        value={this.state.fields.fiscalStartDate}
                        style={{ width: 282 }}
                    />
          {/* <EditableInput
            defaultValue={fiscalStartDate}
            handleChange={this.handleChange}
            name={"fiscalStartDate"}
            value={this.state.fields.fiscalStartDate}
            disabled={"disabled"}
            width="100%"
          /> */}
          <EditableSelect
                        defaultValue={fiscalStartMonth}
                        handleChange={this.handleChange}
                        name={'fiscalStartMonth'}
                        placeholder={'Fiscal start month'}
                        options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                        value={this.state.fields.fiscalStartMonth}
                        style={{ width: 282,marginLeft:"0.5rem" }}
                    />
                    </div>
          {/* <EditableInput
            defaultValue={fiscalStartMonth}
            handleChange={this.handleChange}
            name={"fiscalStartMonth"}
            value={this.state.fields.fiscalStartMonth}
            disabled={"disabled"}
            width="100%"
          /> */}
         <div class=" mt-3" style={{ margin: "0.125em" }} />
<EditSearchSelect
                        defaultValue={{ value: tradeCurrency, label: tradeCurrency, color: '#FF8B00' }}
                        selectType='currency'
                        placeholder='Trade currency'
                        name={'tradeCurrency'}
                        handleSelectChange={this.handleChange}
                        value={this.state.fields.tradeCurrency}
                        width="17.625em"
                    />
          <div class=" mt-3" style={{ margin: "0.125em" }} />
          <div style={{ width: "100%" }}></div>
          <div class=" mt-3" style={{ margin: "0.25em" }} />
          {/* <EditableInput
            defaultValue={tradeCurrency}
            handleChange={this.handleChange}
            name={"tradeCurrency"}
            placeholder={"Trade currency"}
            value={this.state.fields.tradeCurrency}
          /> */}

<EditableInput
            defaultValue={companySize}
            handleChange={this.handleChange}
            name={"companySize"}
            placeholder={"Company Size"}
            value={this.state.fields.companySize}
            // disabled={"disabled"}
            width="100%"
          />

          <EditableInput
            defaultValue={industryType}
            handleChange={this.handleChange}
            name={"industryType"}
            placeholder={"Industry Type"}
            value={this.state.fields.industryType}
            // disabled={"disabled"}
            width="100%"
          />

<EditableInput
            defaultValue={vat}
            handleChange={this.handleChange}
            name={"vat"}
            placeholder={"VAT(In %)"}
            value={this.state.fields.vat}
            // disabled={"disabled"}
            width="100%"
          />
      
          {/* <EditableInput
                        defaultValue={role}
                        handleChange={this.handleChange}
                        name={'role'}
                        placeholder={'Role'}
                        value={this.state.fields.role} /> */}
        </div>

        <div class=" flex justify-end mr-[1.25em]" >
          <Button
            type="primary"
            Loading={this.props.updatingOrganizationDetails}
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
const mapStateToProps = ({ auth }) => ({
  updatingOrganizationDetails: auth.updatingOrganizationDetails,
  updatingOrganizationDetailsError:
  auth.updatingOrganizationDetailsError,
  organizationDetails:auth.organizationDetails,
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
)(OrganizationAboutEdit);
