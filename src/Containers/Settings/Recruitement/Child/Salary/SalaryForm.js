import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Select, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
// import { addCustomerContact } from "../../../../CustomerAction";
import PostImageUpld from "../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */

class SalaryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      whatsapp: false,
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
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
      addCustomerContact,
      addingCustomerContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
      customerId,
      tagWithCompany,
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            transportation: "",
            housing: "",      
            basic: "",
            others: "",
          }}
        //   validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            // addCustomerContact(
            //   {
            //     ...values,
            //     // customerId: this.props.customerId,
            //     // whatsapp: this.state.whatsapp ? "Different" : "Same",
            //   },
            //   this.props.userId,
            // );
            this.handleReset(resetForm)
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
              <div class=" flex justify-between mt-4">
                <div class=" h-full w-w47.5.5" >
                 
                  <div class=" flex flex-nowrap  justify-between ">
                 
  
                   
                      <div class=" flex justify-between ">
                        <div class=" w-2/5">
                        <FastField
                           
                           name="transportation"
                           // label="First Name"
                           label="Transportation"
                            
                           type="text"
                           width={"100%"}
                           isColumn
                           component={InputComponent}
                           inlineLabel
                         />
                        </div>
                        <div class=" w-2/4">
                        <FastField
                           
                           name="basic"
                           // label="First Name"
                           label="Basic"
                          
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
               <div class=" h-4/6 w-w47.5.5">
               <div class=" flex justify-between  ">
                        <div class=" w-2/5">
                        <FastField
                           
                           name="housing"
                           // label="First Name"
                           label="Housing"
                            
                           type="text"
                           width={"100%"}
                           isColumn
                           component={InputComponent}
                           inlineLabel
                         />
                        </div>
                        <div class=" w-2/4">
                        <FastField
                           
                           name="others"
                           // label="First Name"
                           label="Others"
                            
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
           
              <div class=" flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                //   loading={addingCustomerContact}
                >
                                 
                    Create 
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  contact,
  customer,
  opportunity,
  departments,
  designations,
}) => ({
  addingCustomerContact: customer.addingCustomerContact,
  addingCustomerContactError: customer.addingCustomerContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  // tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    //   addCustomerContact,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SalaryForm);
