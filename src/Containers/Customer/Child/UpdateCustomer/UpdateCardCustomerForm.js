import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button ,Switch,Checkbox} from "antd";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getCustomerDetailsById } from "../../CustomerAction";
import { updateCustomer,setEditCustomer } from "../../CustomerAction";
import { HeaderLabel, StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
//yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateCardCustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      whiteblue: false,
      checked:false,
    };
  }
componentDidMount () {
    this.props.getCustomerDetailsById(this.props.updateCustomerDrawerProps.customerId);
  this.setState({whiteblue:this.props.setEditingCustomer.category==="White"?true : false,
checked:this.props.setEditingCustomer.category==="White" || this.props.setEditingCustomer.category==="Blue"? false  : true,
})
};
  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };
  handleReset = (resetForm) => {
    resetForm();
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    console.log("wh",this.state.whiteblue)
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateCustomerById,
      updateCustomer,
    } = this.props;
    const employeesData = this.props.allCustomerEmployeeList.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: this.props.setEditingCustomer.name || "",
            url: this.props.setEditingCustomer.url || "",
            sectorId: this.props.setEditingCustomer.sectorId  ,
            vatNo:this.props.setEditingCustomer.vatNo  ,
            email: this.props.setEditingCustomer.email || "",
            country:this.props.setEditingCustomer.country || "",
            countryDialCode:
              this.props.setEditingCustomer.countryDialCode ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingCustomer.phoneNumber || "",
            userId: this.props.userId,
            // country:"",
            notes: this.props.setEditingCustomer.notes || "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            address: [
              {
                addressId: this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].addressId : "",
                address1: this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].address1 : "",
                address2:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].address2 : "",
                street:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].street : "",
                city:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].city : "",
                state:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].state : "",
                postalCode:  this.props.setEditingCustomer.address.length ? this.props.setEditingCustomer.address[0].postalCode : "",             
              },
            ],
            category: this.state.whiteblue ?"White" : "Blue"||"Both",
          }}
          validationSchema={UpdateCustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomer(
              {
                ...values,
                customerId: this.props.customerId,
                category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
              },
              this.props.updateCustomerDrawerProps.customerId,
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
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh", overflow:"scroll",paddingRight: "0.6em" }}>
                <div
                  style={{
                    width: "47%",
                  }}
                >
                    <Spacer/>
                   <StyledLabel><FormattedMessage id="app.name" defaultMessage="Name" /></StyledLabel>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                   
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={
                      <FormattedMessage id="app.url" defaultMessage="URL" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <Spacer />
                  <Spacer />
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
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "27%" }}>
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code #"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        // value={values.countryDialCode1}
                        inlineLabel
                       />
                    </div>
                    <div style={{ width: "70%" }}>
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}
                        label="Phone No"
                        inlineLabel
                        width={"100%"}
                        />                   
                         </div>
                  </FlexContainer>
                  <Spacer/>
                     <FlexContainer justifyContent="space-between">
                    <div style={{ width: "46.5%" }}>
                      <FastField                      
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                      />
                    </div>
                     
                    <div style={{ width: "32%" }}>
                     <div>             
                 <StyledLabel>Requirement Type</StyledLabel>
                 </div>
                 <Switch                   
                   checked={this.state.whiteblue}
                    onChange={this.handleWhiteBlue}
                   disabled={this.state.checked}
                   checkedChildren="White collar"
                   unCheckedChildren="Blue collar"
                 /> 
                 </div>
                 <div >
                 <Checkbox
                 checked={this.state.checked}
                 onChange={() => this.handleChange()}
               > 
               Both
               </Checkbox>
               </div>
                 </FlexContainer>
                
                 <Spacer/>
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    />   
                 </div>

                <div
                  style={{
                    width: "47%",
                    }}
                >
                   <Spacer/>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                    <Field
                    name="assignedTo"
                    selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned"
                      />
                    }
                    // component={SearchSelect}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${firstName || ""} ${middleName ||
                    //     ""} ${lastName || ""}`,
                    //   value: employeeId,
                    // }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    inlineLabel
                  />
                  </div>
                    </FlexContainer>
                    <Spacer/>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="vatNo"
                        type="text" 
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="businessRegistration"
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
                    </FlexContainer>
                   <Spacer/>
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} >Corporate Address</HeaderLabel>
                  </div>
                    </div>
                  <Spacer /><Spacer />
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
                  {/* <FlexContainer justifyContent="space-between">
                   
                   <div style={{ width: "47%" }}>
                     <Field
                       // name="address[0].country"
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
                       inlineLabel
                       // style={{ flexBasis: "80%" }}
                       isColumn
                       width="100%"
                     />
                   </div>
                 </FlexContainer> */}
               
                                     
                </div>
              </div>
              <Spacer/>
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateCustomerById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, customer,employee }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  updateCustomerById: customer.updateCustomerById,
  updateCustomerByIdError: customer.updateCustomerByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.
  userId,
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  organizationId: auth.userDetails.organizationId,
  employees: employee.employees,
  updateCustomerDrawerProps: customer.updateCustomerDrawerProps,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomer,
      setEditCustomer,
      getCustomerDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardCustomerForm);
