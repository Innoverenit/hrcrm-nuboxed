import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {addOrganization} from "../../../Auth/AuthAction"
import { StyledLabel } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


function AddOrganizationForm (props) {
  
 const handleReset = (resetForm) => {
    resetForm();
  };
 
  useEffect(()=> {
  },[]);

    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingOrganization,
      addOrganization,
      clearbit,
      setClearbitData,
    } = props;

    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            email: "",
            phoneNumber: "",
            fiscalStartDate:"",
            industryType:"",
            vat:"",
            companySize:"",
            twitter:"",
            linkedinUrl:"",
            facebook:"",
            organizationUrl:"",
            fiscalStartMonth:"",
            organizationName:"",
            userId: props.userId,
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
              },
            ],
          }}
   
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addOrganization(
              {
                ...values,
                // companyName: "",
                // assignedTo: selectedOption ? selectedOption.employeeId:userId,
              },
              props.userId,
          () =>{ handleReset(resetForm);
              }
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
       
             <div class="flex justify-between  pr-2 max-sm:flex-col" >
                   
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                   
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-2/5 max-sm:w-full">
                          <Field
                            name="salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            isColumn
                          />
                        </div> */}
                        <div class=" w-wk max-sm:w-full ">
                          <FastField
                            isRequired
                            name="organizationName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.organizationName"
                                defaultMessage="Organization Name"
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
                               
                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.dialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      </StyledLabel>
                    </div>
                  </div>

                      <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                    <FastField
                            name="fiscalStartDate"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.fiscalstartdate"
                                defaultMessage="Fiscal start date"
                              />
                            }
                            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
                            component={SelectComponent}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                    <FastField
                            name="fiscalStartMonth"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.fiscalStartMonth"
                                defaultMessage="Fiscal start month"
                              />
                            }
                            component={SelectComponent}
                            options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                      </StyledLabel>
                    </div>
                  </div>

                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                    <FastField
                            // type="companySize"
                            name="companySize"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.companySize"
                                defaultMessage="Company Size"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                    <FastField
                            // type="companySize"
                            name="industryType"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.industryType"
                                defaultMessage="Industry Type"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                      </StyledLabel>
                    </div>
                  </div>

                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                    <FastField
                            // type="companySize"
                            name="vat"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.vat"
                                defaultMessage="VAT(In %)"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                    <FastField
                            // type="companySize"
                            name="organizationUrl"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.organizationUrl"
                                defaultMessage="Website"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                      </StyledLabel>
                    </div>
                  </div>
              
              
                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                    <FastField
                            // type="companySize"
                            name="twitter"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.twitter"
                                defaultMessage="Twitter"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                    <FastField
                            // type="companySize"
                            name="linkedinUrl"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.linkedinUrl"
                                defaultMessage="Linkedin"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                      </StyledLabel>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                    <FastField
                            // type="companySize"
                            name="facebook"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.facebook"
                                defaultMessage="Facebook"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                  
                    </div>
                 
                  </div>
               
               
                 
             

                
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk " 
                >
     
                  <StyledLabel>
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  </StyledLabel>
          
              
                </div>
              </div>
         
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingOrganization}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
}

const mapStateToProps = ({ auth, leads,employee }) => ({
    addingOrganization: auth.addingOrganization,
  crmAllData:leads.crmAllData,
  addingLeadsError: leads.addingLeadsError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addOrganization
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganizationForm);
