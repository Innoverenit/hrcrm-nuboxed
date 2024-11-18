import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { FormattedMessage } from 'react-intl';

import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import {updatePartner,setEditPartner} from "../../PartnerAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";


/**
 * yup validation scheme for creating a account
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdatePartnerSchema = Yup.object().shape({
  partnerName: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdatePartnerForm extends Component {
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
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updatePartnerById,
      updatePartner,
      clearbit,
      fullName,
      employeeId,
      setClearbitData,
    } = this.props;
 
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            sectorId: this.props.setEditingPartner.sectorId  ,
            // sectorName:"",
            sectorDescription:"",
            partnerName: this.props.setEditingPartner.partnerName || "",
            url: this.props.setEditingPartner.url || "",
            countryDialCode: this.props.setEditingPartner.countryDialCode || this.props.user.countryDialCode,
            country:this.props.setEditingPartner.country ||"",
            email: this.props.setEditingPartner.email || "",
            // sector: this.props.setEditingPartner.sector || "",
            phoneNo: this.props.setEditingPartner.phoneNo || "",
            // userId: this.props.userId,
            notes: this.props.setEditingPartner.notes || "",
            taxRegistrationNumber: this.props.setEditingPartner.taxRegistrationNumber || "",
            businessRegistrationNumber: this.props.setEditingPartner.businessRegistrationNumber || "",
            bankName: this.props.setEditingPartner.bankName || "",
            accountNumber: this.props.setEditingPartner.accountNumber || "",
            status: this.props.setEditingPartner.status || this.state.documentStatus ? "true" : "false",
            address: [
              {
                addressId: this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].addressId : "",
                address1: this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].address1 : "",
                address2:  this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].address2 : "",
                street:  this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].street : "",
                city:  this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].city : "",
                state:  this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].state : "",
                postalCode:  this.props.setEditingPartner.address.length ? this.props.setEditingPartner.address[0].postalCode : "",
                // country: this.props.setEditingPartner.countryName || "",
              },
            ],
          }}
          validationSchema={UpdatePartnerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updatePartner(
              {
                ...values,
                status: this.state.documentStatus ? "true" : "false",
                partnerId:this.props.partnerId,
              },
              this.props.partnerId,
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
                <div class=" mt-3"/>
                  <Field
                    isRequired
                    name="partnerName"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                  <div class=" mt-3" />
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={<FormattedMessage id="app.url" defaultMessage="URL" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <div class=" mt-3" />
                  <Field
                    name="email"
                    type="text"
                    label="Email"
                  
                    //isRequired
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
                        label="Dial Code"
                       
                        isColumn
                        component={SearchSelect}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-4/6">
                      <FastField
                        type="text"    
                        name="phoneNo"
                        label={
                          <FormattedMessage
                            id="app.phoneNumber"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        />
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                    <FastField
                      name="sectorId"
                      isColumnWithoutNoCreate
                      selectType="sectorName"
                      // label="Department"
                      label={
                        <FormattedMessage
                          id="app.sector"
                          defaultMessage="Sector"
                        />
                      }
                    
                      component={SearchSelect}
                      isColumn
                      value={"values.sector"}
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
                  <div class=" mt-3"/>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        name="taxRegistrationNumber"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage id="app.taxregistration" defaultMessage=" Tax Registration#" />
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
                          <FormattedMessage id="app.bankname" defaultMessage=" Bank Name" />
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
                          <FormattedMessage id="app.account" defaultMessage="Account #" />
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
                  <div class=" mt-3"  />
                  
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
                
                  <div class=" mt-3"  />
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" 
                      defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    />          
                     <div class=" mt-3" />
                 </div> 
              </div>
              <div class=" flex  justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updatePartnerById}
                >
                  <FormattedMessage id="app.update"
                   defaultMessage="Update" />
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
  setEditingPartner: partner.setEditingPartner,
  updatePartnerById: partner.updatePartnerById,
  updatePartnerByIdError: partner.updatePartnerByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updatePartner,
      setEditPartner,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePartnerForm);
