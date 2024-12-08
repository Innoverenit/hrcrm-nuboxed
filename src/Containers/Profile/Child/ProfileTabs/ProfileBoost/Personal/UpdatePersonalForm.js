import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { updatePersonalDetails } from "../../../../ProfileAction";

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
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [

        "Salutation",
        "First Name",
        "Last Name",
         "Middle ",
         "Mobile",
         "Mobile No",
         "Phone",
         "Phone No",
         "Update",
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
                  <div class=" flex justify-between mt-6" >
                    <div class=" w-[25%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                      <FastField
                        name="contactSalutation"
                        type="text"
                      
                        options={["Mr.", "Ms.", "None"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                        style={{
                          flexBasis: "80%",

                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div class=" w-[67%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                      <FastField
                        isRequired
                        name="contactFirstName"
                        
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>

                  <div class=" flex justify-between mt-6" >
                  <div class=" w-[55%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                      <FastField
                        name="contactLastName"
                        
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div class=" w-[38%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                      <FastField
                        name="contactMiddleName"
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
                 
                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]} #</div>
                      <Field
                        name="countryDialCode"
                        isColumn
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[5]}</div>
                      <Field
                        type="text"
                        name="mobileNo"
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
                

                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[6]} #</div>
                      <Field
                        name="countryDialCode1"
                        isColumn
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[7]}</div>
                      <Field
                        type="text"
                        name="phoneNo"
                        placeholder="Phone #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
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
                 {this.state.translatedMenuItems[7]}
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
