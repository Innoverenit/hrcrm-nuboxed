import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, Switch } from "antd";

import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { addPartnerContact } from "../../../../PartnerAction";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().email("Enter a valid Email"),
  whatsappNumber: Yup.string()
    .matches(phoneRegExp, "Whatsapp number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
});

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      whatsapp: false,
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      addPartnerContact,
      addingPartnerContact,
      linkContact,
      defaultPartners,    
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            designation: undefined,
            description: "",
            partnerName: "",
            department: undefined,
            departmentDetails: "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: "",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            firstName: "",
            middleName: "",
            whatsappNumber: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            linkedinPublicUrl: "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addPartnerContact(
              {
                ...values,
                partnerId: this.props.partnerId,
                whatsapp: this.state.whatsapp ? "Different" : "Same",
              },
              this.props.userId,

              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form className="form-background">
         <div class=" flex justify-between">
                <div class=" h-full w-2/4"
                >
                  {" "}
                  <div class=" mt-3" />
                  <div class=" flex flex-nowrap">
                    <FastField name="imageId" component={Upload} />
                    <div>
                    <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutations"
                                defaultMessage="Salutations"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div>
                        <div class=" w-2/4">
                          <FastField
                            isRequired
                            name="firstName"
                            label={
                              <FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>      
                      <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="middleName"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-2/4">
                          <FastField
                            name="lastName"
                            label={
                              <FormattedMessage
                                id="app.lastName"
                                defaultMessage="Last Name"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/6">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobile"
                            defaultMessage="Mobile #"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    <div class=" w-1/4 font-bold"
                  >
                    <div class=" text-xs font-bold font-poppins text-black">WhatsApp</div>
                    <Switch
                      onChange={this.handleWhatsApp}
                      checked={this.state.whatsapp}
                      checkedChildren="Different"
                      unCheckedChildren="Same"
                    />
                  </div>
                  </div>
                 
                  <div  class=" flex justify-between">
                  <div class=" w-3/4">
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"

                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="WhatsApp #"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
                        <FastField
                          name="whatsappNumber"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                    </div>
                  </div>
                  </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        label={
                          <FormattedMessage
                            id="app.email"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                    <div class="w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="Linkedin"
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
                      <>
                        <Field
                          name="partnerId"
                          isColumnWithoutNoCreate
                          selectType="partnerList"
                          label={
                            <FormattedMessage
                              id="app.tagCompany"
                              defaultMessage="Tag Company"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          value={values.partnerId}
                          isDisabled={defaultPartners}
                          defaultValue={
                            defaultPartners ? defaultPartners : null
                          }
                          inlineLabel
                        />
                      </>
                    </div>
                    <div class=" w-2/5">
                      <FastField
                        name="designationTypeId"
                        isColumnWithoutNoCreate
                        selectType="designationType"
                        label={
                          <FormattedMessage
                            id="app.role"
                            defaultMessage="Role"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                </div>
                <div class=" h-4/6 w-2/5"
                >
                  <div class=" mt-3" />
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
                  <div class=" mt-3"  />
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
              <div class=" mt-3"/>
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingPartnerContact}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, partner }) => ({
  addingPartnerContact: partner.addingPartnerContact,
  addingPartnerContactError: partner.addingPartnerContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerId: partner.partner.partnerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPartnerContact,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
