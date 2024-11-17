import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Select, Switch,Checkbox} from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateCandidate,setEditCandidate } from "../../CandidateAction";
import Upload from "../../../../Components/Forms/Formik/Upload";

import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import * as Yup from "yup";
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
const { Option } = Select;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCandidateSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Enter a valid Email")
    .required("Input needed!"),
  firstName: Yup.string().required("Input needed!"),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});
class UpdateCandidateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: true,
      billing:false,
      whiteblue:false,
      checked:false,
      whatsapp:false,
    };
  }
 

  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability:checked});
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handlebilling = (checked) => {
    this.setState({ billing: checked });
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };
  componentDidMount () {
    this.setState({whiteblue:this.props.setEditingCandidate.category==="White"?true : false,whatsapp:this.props.setEditingCandidate.whatsApp==="Same"?true : false,billing:this.props.setEditingCandidate.workType==="Permanent"?true : false,
  checked:this.props.setEditingCandidate.category==="White" || this.props.setEditingCandidate.category==="Blue"? false  : true||this.props.setEditingCandidate.whatsApp==="Different"? false  : true||this.props.setEditingCandidate.workType==="Contract"? false  : true
  })
};

// componentDidMount () {
//   this.setState({whatsapp:this.props.setEditingCandidate.whatsApp==="Different"?"Different":"Same",
// checked:this.props.setEditingCandidate.whatsApp==="Different"?"Different":"Same",
// })
// };

  // componentDidMount() {
  //   this.props.getCurrency();
  // }
 
  render() {
    const {
      user: { userId, firstName, lastName },
      updateCandidateById,
      updateCandidate,
      availableDate,
    } = this.props;   
    console.log("wp",this.props.setEditingCandidate.workpreference || "")
    return (
      <>
        <Formik
          initialValues={{
            sectorId: "",
            partnerId:this.props.setEditingCandidate.partnerId || "",
            currentCtc:this.props.setEditingCandidate.currentCtc || "",
            experience:this.props.setEditingCandidate.experience || "",
            sectorName: "",
            partnerName: "",
            sectorDescription: "",
            workPreference:this.props.setEditingCandidate.workPreference || "",
            channel:"Self",
            departmentId:"",
            noticePeriod:this.props.setEditingCandidate.noticePeriod || "",
            noticeDetail:this.props.setEditingCandidate.noticeDetail || "",
            benifit:this.props.setEditingCandidate.benifit || "",
            salutation: this.props.setEditingCandidate.salutation || "",
            firstName: this.props.setEditingCandidate.firstName || "",
             middleName: this.props.setEditingCandidate.middleName || "",
             lastName: this.props.setEditingCandidate.lastName || "",
             gender:  this.props.setEditingCandidate.gender || "", 
            countryDialCode: this.props.setEditingCandidate.countryDialCode || this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingCandidate.phoneNumber || "",
            mobileNumber: this.props.setEditingCandidate.mobileNumber || "",
            countryDialCode1: this.props.user.countryDialCode,
             emailId: this.props.setEditingCandidate.emailId || "",
             linkedin: this.props.setEditingCandidate.linkedin || "",
             designationTypeId: this.props.setEditingCandidate.designationTypeId || "",
             roleTypeId: this.props.setEditingCandidate.roleTypeId || "",
             department: this.props.setEditingCandidate.department || "",
            notes: this.props.setEditingCandidate.notes || "",
            availableDate:dayjs(this.props.setEditingCandidate.availableDate) || dayjs(),
            tag_with_company:
              this.props.setEditingCandidate.tag_with_company || "",
            billing: this.props.setEditingCandidate.billing || "",
            currency: this.props.setEditingCandidate.currency || "",
            dateOfBirth: dayjs(this.props.setEditingCandidate.dateOfBirth) || dayjs(),
            idProof: this.props.setEditingCandidate.idProof || "",
            idNumber: this.props.setEditingCandidate.idNumber ||"",
            costType:this.props.setEditingCandidate.costType ||"",
            userId: this.props.userId,
            workType: this.state.billing ? "Permanent" : "Contract",
            nationality: this.props.setEditingCandidate.nationality || "",
            country : this.props.setEditingCandidate.country || "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            whatsApp: this.state.whatsapp? "Same" : "Different",
            active: this.props.setEditingCandidate.active ? true : false,   
            // whiteblue: this.state.setEditingCandidate.whiteblue || "",         
            address: [
              {
                addressId: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].addressId : "",
                address1: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].address1 : "",
                address2: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].address2 : "",
                street: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].street : "",
                city: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].city : "",
                state: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].state : "",
                postalCode: this.props.setEditingCandidate.address.length ? this.props.setEditingCandidate.address[0].postalCode : "",
                country: this.props.setEditingCandidate.countryName || "",
              },
            ],
            // noteMapper: [{ description: "" }],
          }}
          // validationSchema={UpdateCandidateSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCandidate(
              {
                ...values,
               active: values.active === false ? false : true,
                 workType: this.state.billing ? "Permanent" : "Contract",
                 category: this.state.whiteblue ? "White" : "Blue"||"Both",
                 whatsApp: this.state.whatsapp? "Same" : "Different",
                 availableDate: dayjs(values.availableDate).toISOString(),
                 emailId:this.props.setEditingCandidate.emailId === values.emailId? null : values.emailId
                 
                
              },
              this.props.candidateId,
             
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
                          <div class=" flex justify-between h-[70vh] overflow-scroll"
                style={{
                  paddingRight: "0.6em",
                }}
              >
                <div class=" h-full w-[47.5%]"
                >
                   <div class=" flex flex-no-wrap">
                    <FastField name="imageId" component={Upload} />
                    <div class=" w-[75%]" > 
                    <div class=" flex justify-between" >
                        <div class=" w-[30%]" >
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
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
                        <div class=" w-[65%]" >
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstname"
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
                        <div class=" w-[30%]" >
                          <FastField
                            name="middleName"
                            // label="Middle "
                            label={
                              <FormattedMessage
                                id="app.middleName"
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
                        <div class=" w-[65%]" >
                          <FastField
                            name="lastName"
                            // label="Last Name"
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
                 
                  <div class=" w-full mt-3" style={{backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class=" text-[white] text-xs" >
                  Communication
                   
                    </div>
                    </div>
                    </div>
                    <div class=" flex justify-between">
                    <div class=" w-full" >
                      <FastField
                        // isRequired
                        type="email"
                        name="emailId"
                        // label="Email"
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
                  <div class=" flex justify-between">
                    <div class=" w-[30%]" >
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
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
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[40%]" >
                      <FastField
                        type="text"
                        // isRequired
                        name="mobileNumber"
                        placeholder="Mobile #"
                        label="Mobile No"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        />
                    </div>
                    <div class=" w-[22%] text-bold"
                    >
                      WhatsApp
                      <Switch
                      
                         onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div>
                  </div>
              
                  <div class=" w-full mt-3" style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class=" text-[white] text-xs" >
                  Identity
                    </div>
                    </div>
                    </div>           
                    <div class=" flex justify-between" >
                    <div class=" w-[47%]">
                      <FastField
                        name="nationality"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.nationality"
                            defaultMessage="Nationality"
                          />
                        }
                        isColumn
                        selectType="country"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName}
                        inlineLabel
                       />
                    </div>
                    {this.props.user.gdprApplicableInd ===true && (
                   <div class=" w-[47%]">
                      <div>
                      <div class=" text-xs font-bold font-poppins">Allow sharing info?</div> 
                      </div>                      
                      <div>
                      <Switch                                              
                         checked={this.state.share}
                         onChange={this.handleShare}
                        // disabled={this.state.availability}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                      </div>
                    </div>
                    )}
                  </div>
                  
                 
                  <div class=" flex justify-between" >
                  <div class=" w-[74%]">
                  <div class=" flex justify-between" >
                  <div class=" w-[42%]">
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Available from"

                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="WhatsApp #"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          // value={values.availableDate}
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class=" w-[53%]">
                      {this.state.whatsapp && (
                        <FastField
                          name="phoneNumber"
                          isColumn
                          width={"100%"}
                          // style={{ flexBasis: "30%" }}
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                    </div>
                    </div>
                    </div>
                  </div>
                     
                  <div class=" flex justify-between" >
                  <div class=" w-full">
                      <FastField
                        type="text"
                        name="linkedin"
                        // label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="LinkedIn"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    </div>
                     
                    <div class=" flex justify-between" >
                    <div class=" w-[47.5%]">
                    <div class=" flex justify-between" >
                    <div class=" w-[48%]">
                    <FastField
                        name="idProof"
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.idproof"
                            defaultMessage="ID Proof"
                          />
                        }
                        isColumn
                       options={[
                          "PassPort",
                          "ID Card",
                        ]}

                        component={SelectComponent}
                        // defaultValue={{
                        //   value: this.props.user.countryDialCode,
                        // }}
                        // value={values.countryDialCode}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[48%]">
                      <FastField
                        type="text"
                        name="idNumber"
                        //placeholder="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.idNumber"
                            defaultMessage="ID Number"
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
                  <div class=" w-[47.5%]">
                  <div class=" flex justify-between" >
                  <div class=" w-[57%]">
                      <Field
                        name="dateOfBirth"
                        label={
                          <FormattedMessage
                            id="app.dateOfBirth"
                            defaultMessage="Date of Birth"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.dateOfBirth}
                        // defaultValue={dayjs("2020-01-01")
                      />
                     </div>

                     <div class=" w-[40%]">
                      <FastField
                        name="gender"
                        type="text"
                        // label="Salutation"
                        label={
                          <FormattedMessage
                            id="app.gender"
                            defaultMessage="Gender"
                          />
                        }
                        options={["Male", "Female", "Others"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                       
                      />
                    </div>
                    </div>               
                  </div>
                  </div>  

                  <div class=" w-full mt-3" style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class=" text-[white] text-xs" >
                    Correspondence</div>
                  </div>
                    </div>
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
                  <div class=" flex justify-between" >
                   
                  <div class=" w-[47%]">
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
                  </div>
                </div>
                
                <div class=" h-[70%] w-[47.5%]"
                >                 
                  
                   <div class=" flex justify-between mt-3" >
                   <div class=" w-[47%]">
                    <FastField
                      // name="department"
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
                      isColumn
                      component={SearchSelect}
                      value={values.sectorId}
                      inlineLabel
                      />
                  </div>
                
                  <div class=" w-[47%]">
                      <FastField
                        name="departmentId"
                        selectType="departmentName"
                        label="Department"                      
                        isColumnWithoutNoCreate                        
                        isColumn
                        component={SearchSelect}
                        // value={values.designationTypeId}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between" >
                  <div class=" w-[47%]">
                      <FastField
                        name="roleTypeId"
                        selectType="roleType"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.role"
                            defaultMessage="Role"
                          />
                        }
                        isColumnWithoutNoCreate                       
                        isColumn                       
                        component={SearchSelect}
                        // value={values.designationTypeId}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[47%]">
                      <FastField
                        name="designationTypeId"
                        // label="Designation"
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="Designation"
                          />
                        }
                        selectType="designationType"
                        isColumnWithoutNoCreate                       
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        inlineLabel
                         />
                    </div>
                  </div>

                  <div class=" flex justify-between" >
                  <div class=" w-[47%]">
                      <>
                        <Field
                          name="tag_with_company"
                          // selectType="customerList"
                          // label="Tag Company"
                          label={
                            <FormattedMessage
                            id="currentemployer"
                            defaultMessage="Current Employer"
                          />
                          }
                          component={InputComponent}
                          isColumn
                          // value={values.customerId}
                          // defaultValue={{ label: firstName, value: documentId }}
                          inlineLabel
                          style={{ width:"100%" }}
                          />
                      </>
                    </div>
                    <div class=" w-[47%]">
                      <FastField
                        name="partnerId"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.vendor"
                            defaultMessage="Vendor"
                          />
                        }
                        isColumn                       
                        selectType="partnerListName"
                        component={SearchSelect}                       
                        inlineLabel
                      />
                    </div> 
                  </div>

               
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47.5%]">
                    <div class=" flex justify-between" >
                    <div class=" w-[48.5%]">
                        <div class=" text-xs font-bold font-poppins text-black">Category</div>

                        <Switch
                          checked={this.state.whiteblue}
                          onChange={this.handleWhiteBlue}
                          disabled={this.state.checked}
                          checkedChildren="White collar"
                          unCheckedChildren="Blue collar"
                        />
                      </div>
                      <div>
                        <Checkbox
                          checked={this.state.checked}
                          onChange={() => this.handleChange()}
                          style={{ marginLeft: "auto" }}
                        >
                          Both
                        </Checkbox>
                      </div>
                      </div>
                      </div>
                      <div class=" w-[47.5%]">
                      <div class=" w-[25%]">
                        <div class=" text-xs font-bold font-poppins text-black">Type</div>

                        <Switch
                          checked={this.state.billing}
                          onChange={this.handlebilling}
                          checkedChildren="Permanent"
                          unCheckedChildren="Contract"
                        />
                      </div>
                      </div>
                    </div>
                                  
                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47.5%]">
                  <div class=" flex justify-between" >
                  <div class=" w-[25%]">
                      <div class=" text-xs font-bold font-poppins">Active</div> 
                    <Switch                     
                      checked={this.state.availability}
                       onChange={this.handleAvailability}
                      // disabled={this.state.availability}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                    </div>
                    <div class=" w-[57%]">
                        {" "}
                        {this.state.availability && (
                        <Field
                          name="availableDate"
                          // label="Available from"
                          label={
                            <FormattedMessage
                              id="app.availablefrom"
                              defaultMessage="Available from"
                            />
                          }
                          // disabled={!this.state.availability}
                          component={DatePicker}
                          isColumn
                          width={"100%"}
                          value={values.availableDate}
                          inlineLabel                          
                        />
                        )}
                      </div>
                      </div>
                        </div>
                        <div class=" w-[47.5%]">
                      <FastField
                        // isRequired
                        // type="email"
                        name="workPreference"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.workpreference"
                            defaultMessage="Work Preference"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={SelectComponent}
                        options={[
                          "Home",
                          "Office-1 Day/Week",
                          "Office-2 Day/Week",
                          "Office-3 Day/Week",
                          "Office-4 Day/Week",
                          "Office"
                        ]}
                        inlineLabel
                      />
                    </div>
                      {/* <div style={{ width: "47%" }}>
                        <FastField
                          name="experience"
                          //label="Email"
                          label={
                            <FormattedMessage
                              id="app.experience"
                              defaultMessage="Experience (Years)"
                            />
                          }
                          // className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                        />
                      </div> */}
                      </div>
                    
                      <div class=" flex justify-between mt-3" >
                    <div class=" w-[47.5%]">
                    <div class=" flex justify-between" >
                    <div class=" w-[48%]">
                        <Field
                          name="billing"
                          label={this.state.billing?"Expectation":"Billing"}
                          // label={
                          //   <FormattedMessage
                          //     id="app.billinghour"
                          //     defaultMessage="Billing/hour (Sell)"
                          //   />
                          // }
                          width={"100%"}
                          isColumn
                          component={InputComponent}                         
                        />
                       </div>
                       <div class=" w-[48%]">
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        defaultValue={{
                          value: this.props.user.currency,
                        }}
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        // value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                        // flag={values.currency}
                        // options={Array.isArray(currency) ? currency : []}
                      />
                       </div>
                      </div>
                      </div>
                      <div class=" w-[47.5%]">
                      {/* <FastField
                        name="costType"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.costtype"
                            defaultMessage="Cost Type"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={SelectComponent}
                        options={["Hourly","Weekly","Monthly","Monthly Salary","Annual Salary"]}
                        inlineLabel
                        /> */}
                        
                     
                        <div class=" flex justify-between" >
                    <div class=" w-[48%]">
                  <FastField
                        // isRequired
                        // type="text"
                        name="currentCtc"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.currentsalary"
                            defaultMessage="Current Salary"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                     </div>
                     <div class=" w-[48%]">
                    <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        defaultValue={{
                          value: this.props.user.currency,
                        }}
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        // value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                        // flag={values.currency}
                        // options={Array.isArray(currency) ? currency : []}
                      />
                         </div>
                      </div>
                      </div>
                    </div>
                    <div class=" flex justify-between" >
                    <div class=" w-[47%]">
                      <Field
                        name="benifit"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="benifit"
                            defaultMessage="Benefits"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div class=" w-[47%]">
                    <FastField
                        name="noticePeriod"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.notice"
                            defaultMessage="Notice (months)"
                            
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    </div>
                    
                    <div class=" flex" >
                    <div class=" w-full">
                    <Field
                        name="noticeDetail"
                        //label="Description"
                        label={
                          <FormattedMessage
                              id="app.noticeperiodinfo"
                              defaultMessage="Notice Period Info"
                            />
                        }
                        isRequired
                        isColumn
                       
                        component={TextareaComponent}
                        />
                        </div>                       
                    </div>
                </div>
                </div> 
             
              
              
              <div class=" flex justify-end mt-3" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateCandidateById}
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

const mapStateToProps = ({ auth, candidate, team, opportunity,designations }) => ({
  setEditingCandidate: candidate.setEditingCandidate,
  updateCandidateById: candidate.updateCandidateById,
  updateCandidateByIdError: candidate.updateCandidateByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  designationTypeId:designations.designationTypeId,
  currencies:auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCandidate,
      setEditCandidate,
      getDesignations
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateForm);
