import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button,} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { updatePersonalDetails } from "../../../../../../Profile/ProfileAction";

function onChange(date, dateString) {}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  emailId: Yup.string().email("Enter a valid Email"),
  firstName: Yup.string().required("Please provide First Name"),
  phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  mobileNo: Yup.string().matches(phoneRegExp, "Enter a valid Mobile No"),

  documentId: Yup.string().required("Input needed !"),
});

class UpdatePersonalForm extends Component {
  render() {
 
    const { updatingPersonalDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingPersonal.id,
            bloodGroup: this.props.setEditingPersonal.bloodGroup || "",
            dob: this.props.setEditingPersonal.dob || "",
            contactSalutation:
              this.props.setEditingPersonal.contactSalutation || "",
            contactFirstName:
              this.props.setEditingPersonal.contactFirstName || "",
            contactMiddleName:
              this.props.setEditingPersonal.contactMiddleName || "",
            contactLastName:
              this.props.setEditingPersonal.contactLastName || "",
            mobileNo: this.props.setEditingPersonal.mobileNo || "",
            phoneNo: this.props.setEditingPersonal.phoneNo || "",

            address: [
              {
                address1: this.props.setEditingPersonal.address1 || "",
                town: this.props.setEditingPersonal.town || "",
                postalCode: this.props.setEditingPersonal.postalCode || "",
                country: this.props.setEditingPersonal.country || "",
              },
            ],
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updatePersonalDetails(
              values,
              this.props.employeeId,

              resetForm()
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
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-full"
                >                              
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[25%]" >
                      <FastField
                        name="contactSalutation"
                        type="text"
                        // label="Salutation"
                        label={
                          <FormattedMessage
                            id="app.contactSalutation"
                            defaultMessage="Salutation"
                          />
                        }
                        options={["Mr.", "Ms.", "None"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                       />
                    </div>
                    <div class=" w-[67%]" >
                      <FastField
                        isRequired
                        name="contactFirstName"
                        //label="First Name"
                        label={
                          <FormattedMessage
                            id="app.contactFirstName"
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

                 
                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[55%]" >
                      <FastField
                        name="contactLastName"
                        // label="Last Name"
                        label={
                          <FormattedMessage
                            id="app.contactLastName"
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
                    <div class=" w-[38%]" >
                      <FastField
                        name="contactMiddleName"
                        // label="Middle "
                        label={
                          <FormattedMessage
                            id="app.contactMiddleName"
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
                  </div>
             
                
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47%]">
                      <Field
                        name="countryDialCode"
                        // label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Mobile #"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        width={"100%"}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[47%]">
                      <Field
                        type="text"
                        name="mobileNo"
                        label={
                          <FormattedMessage
                            id="app.mobileNo"
                            defaultMessage="Mobile No"
                          />
                        }
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        />
                    </div>
                  </div>
        

                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47%]">
                      <Field
                        name="countryDialCode1"
                        //  label="Phone #"
                        label={
                          <FormattedMessage
                            id="app.countryDialCode1"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        width={"100%"}
                        />
                    </div>
                    <div class=" w-[47%]">
                      <Field
                        type="text"
                        name="phoneNo"
                        label={
                          <FormattedMessage
                            id="app.phoneNo"
                            defaultMessage="Phone No"
                          />
                        }
                        placeholder="Phone #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        />
                    </div>
                  </div>             
                </div>              
              </div>
             
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingPersonalDetails}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  // userId: auth.userDetails.userId,
  setEditingPersonal: profile.setEditingPersonal,
  employeeId: employee.singleEmployee.employeeId,
  updatingPersonalDetails: profile.updatingPersonalDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updatePersonalDetails,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalForm);
