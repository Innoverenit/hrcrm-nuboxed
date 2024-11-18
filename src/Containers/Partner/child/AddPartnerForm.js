import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { FormattedMessage } from 'react-intl';

import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import { addPartner } from "../PartnerAction";
import { setClearbitData } from "../../Customer/CustomerAction";
import { getOwnsalesList } from "../PartnerAction";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";


/**
 * yup validation scheme for creating a account
 */
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const PartnerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email").required("Input needed!"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
});

class PartnerForm extends Component {
  componentDidMount() {
    this.props.getOwnsalesList();
  }
  constructor(props) {
    super(props);
    this.state = {
      documentStatus: false,
    };
  }
  handleDocumentStatus = (checked) => {
    this.setState({ documentStatus: checked });
  };
  handleReset = (resetForm) => {
    resetForm();
  };

  render() {
    const {
      accounts,
      user,
      isEditing,
      prefillAccount,
      addingPartner,
      addPartner,
      clearbit,
      fullName,
      employeeId,
    } = this.props;
    const salesNameOption = this.props.ownSales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            sectorId: "",
            name: "",
            sectorDescription: "",
            url: "",
            countryDialCode: this.props.user.countryDialCode,
            email: "",
            phoneNo: "",
            userId: this.props.userId,
            notes: "",
            taxRegistrationNumber: "",
            country: this.props.user.country,
            businessRegistrationNumber: "",
            bankName: "",
            // country: "",
            accountNumber: "",
            status: this.state.documentStatus ? "true" : "false",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                // country: "",
                country: this.props.user.countryName,
              },
            ],
          }}
          validationSchema={PartnerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addPartner(
              {
                ...values,
                status: this.state.documentStatus ? "true" : "false",
              },
              this.props.userId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form className="form-background">
              <div class=" flex justify-between overflow-scroll ">
                <div class=" h-full w-1/2">
                  <div>
                    {clearbit && clearbit.hasOwnProperty("logo") && (
                      <ProgressiveImage
                        preview={
                          "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
                        }
                        image={clearbit.logo}
                        width={140}
                        height={150}
                        borderRadius={25}
                        padding={15}
                      />
                    )}
                    {clearbit && clearbit.hasOwnProperty("logo") ? (
                      <a
                        href="https://clearbit.com"
                        target="_blank"
                        style={{ fontSize: 13, marginLeft: 5 }}
                      >
                        Logos provided by Clearbit
                      </a>
                    ) : null}
                  </div>
                  <div class=" mt-3" />
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    setClearbitData={this.props.setClearbitData}
                    component={ClearbitImage}
                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    }
                    isColumn
                    width={"100%"}
                    accounts={accounts}
                    inlineLabel
                  />
                  <div class=" mt-3" />
                  <Field
                    name="url"
                    type="text"
                    label={
                      <FormattedMessage id="app.url" defaultMessage=" URL" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  <div class=" mt-3" />
                  <Field
                    name="email"
                    type="text"
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  <div class=" mt-3" />

                  <div class=" flex justify-between">
                    <div class=" w-3/12">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        label={
                          <FormattedMessage
                            id="app.phone"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-4/6">
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNo"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <FastField
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"
                        // label="Sectors"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        value={values.sectorId}
                      />
                    </div>
                    <div class=" w-2/5">
                      <div>
                        <div class=" text-xs font-bold font-poppins text-black">Status</div>
                      </div>
                      <div>
                        <Switch
                          checked={this.state.documentStatus}
                          onChange={this.handleDocumentStatus}
                          checkedChildren="Approved"
                          unCheckedChildren="Not Approved"
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        name="taxRegistrationNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.taxregistration"
                            defaultMessage=" Tax Registration#"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5">
                      <Field
                        name="businessRegistrationNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.businessregistration"
                            defaultMessage=" Business Registration#"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        name="bankName"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.bankname"
                            defaultMessage=" Bank Name"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5">
                      <Field
                        name="accountNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.account"
                            defaultMessage="Account #"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                </div>
                <div class=" h-full w-2/5">
                  <div class=" mt-3" />
                  <Field
                    name="assignedTo"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned"
                      />
                    }
                    component={SelectComponent}
                    options={
                      Array.isArray(salesNameOption) ? salesNameOption : []
                    }
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <FieldArray
                    name="address"
                    label="searxh"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  <div class=" w-2/4">
                    <Field
                      name="country"
                      isColumnWithoutNoCreate
                      // label="Country"

                      label={
                        <FormattedMessage
                          id="app.country"
                          defaultMessage="Country"
                        />
                      }
                      component={SearchSelect}
                      defaultValue={{
                        value: this.props.user.countryName,
                      }}
                      value={values.countryName}
                      selectType="country"
                      isColumn
                      width="100%"
                    />
                  </div>
                  <div class=" mt-3" />
                  <Field
                    name="notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
              <div class=" flex  justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingPartner}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, partner, customer }) => ({
  addingPartner: partner.addingPartner,
  addingPartnerError: partner.addingPartnerError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  clearbit: customer.clearbit,
  ownSales: partner.ownSales,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPartner,
      setClearbitData,
      getOwnsalesList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm);
