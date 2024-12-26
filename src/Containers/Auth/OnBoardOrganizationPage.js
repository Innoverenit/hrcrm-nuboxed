import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, FastField } from "formik";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "antd/lib/button";
import { addOnboard, generateOtpByEmail, validateOtp } from "./AuthAction";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
   import FWLogo from "../../Assets/Images/logo_22.webp";
import Input from "./styled/Input";



class OnBoardOrganizationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationName: "",
      fiscalStartDate:"",
      preferedLanguage:"",
      fiscalStartMonth:"",
      firstName:"",
      middleName:"",
      lastName:"",
      industry: "",
      confirmPassword:"",
      Loading: false,
      render: false,
      type: "password",
      type1: "password",
      show: Boolean(),
      show1: Boolean(),
    };
  }

  handleClick = () =>
    this.setState(({ type, prevState }) => ({
      type: type === "text" ? "password" : "text",
      show: !this.state.show,
    }));
    handleClick1 = () =>
    this.setState(({ type1, prevState }) => ({
      type1: type1 === "text" ? "password" : "text",
      show1: !this.state.show1,
    }));
  submit = (values) => {
    // this.enterLoading();
    this.props.addOnboard(values, this.props.history);
  };
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <div>
        <Input {...field} {...props} />
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{errors[field.name]}</div>
      )}
    </div>
  );
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
    }, 5000);

    console.log("inside cDM login");
    console.log(this.props);
    const params = this.props.match.params;
    if (params.organizationName && params.industry) {
      this.setState({
        organizationName: params.organizationName,
        industry: params.industry,
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }
  render() {
    console.log(this.props);
    return (
      <>
       <div class="flex justify-between ">
          <div class=" flex justify-center w-1/2 items-center md:min-h-screen max-sm:w-wk h-[80vh] "
            style={{
              backgroundColor: "#F5F5F5",
              flexDirection: "column",
              position: "relative",
              margin: "auto",
            }}
          >
            <img
              className="w-18 h-18"
              src={FWLogo}
              alt="Tekorero logo"
            />
            <br />
     
            <div class=" w-[25rem] p-4  shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">
              <Formik
                enableReinitialize
                initialValues={{
                  organizationName: this.state.organizationName || "",
                  industry: this.state.industry || "",
                  
                }}
             
                onSubmit={(values) => {
                  // same shape as initial values
                  this.submit(values);
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form className="form-background">
                    <h2>Organization</h2>
                    <Field
                      className="gvbmIs"
                      name="organizationName"
                      type="text"
                    placeholder="Organization Name"                                       
                      component={this.InputComponent}
                    />
                    < div class="mt-3" />
                      <FastField
                      label="Industry"
    name="industry"
    placeholder="Select Industry"

    // placeholder="Select Industry" 
    isColumn
    options={["Real Estate", "Manufacturing", "Refurbish"]}
    component={SelectComponent}
    inlineLabel
/>
                
                    < div class="mt-3" />
                    <FastField
                            name="preferedLanguage"
                          
                            placeholder="Select Date"
                            isColumn
                            options={["English", "Dutch"]}
                            component={SelectComponent}
                            inlineLabel
                          />
                          < div class="mt-3" />
                    <h2>Fiscal</h2>
                    < div class="mt-3" />
                    <div class=" flex flex-row justify-between">
                    <FastField
                            name="fiscalStartDate"
                            
                            placeholder="Select Date"
                            isColumn
                            options={["1", "2","3","4","5", "6","7","8","9", "10","11","12","13", "14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]}
                            component={SelectComponent}
                            inlineLabel
                          />
                            < div class="mt-3" />
                            <FastField
    name="fiscalStartMonth"
    placeholder="Select Month"  
    isColumn
    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
    component={SelectComponent}
    inlineLabel
/>
</div>
                    < div class="mt-3" />
                    <h2>Admin Details</h2>
                    < div class="mt-3" />
                     <Field
                      className="gvbmIs"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      component={this.InputComponent}
                    />
                          < div class="mt-3" />
                       
                     <Field
                      className="gvbmIs"
                      name="middleName"
                      type="text"
                      placeholder="Middle Name"
                      component={this.InputComponent}
                    />
                      < div class="mt-3" />
                     <Field
                      className="gvbmIs"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      component={this.InputComponent}
                    />
                    < div class="mt-3" />
                    <Field
                      className="gvbmIs"
                      name="emailId"
                      type="email"
                      placeholder="Email Id"
                      component={this.InputComponent}
                    />
                     < div class="mt-3" />
                     <div className="flex flex-row">
                      <div style={{ width: "100%" }}>
                        <Field
                          name="password"
                          type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}
                        />
                      </div>
                      {this.state.show ? (
                        <VisibilityIcon
                          type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em",  }}
                          size="24"
                        />
                      ) : (
                        <VisibilityOffIcon
                          type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em",  }}
                        />
                      )}
                    </div>
                        < div class="mt-3" />
                        <div className="flex flex-row">
                        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                        <div style={{ width: "100%" }}>
                          <Field
                            name="confirmPassword"
                            type={this.state.type1}
                            placeholder="Confirm new password"
                            component={this.InputComponent}
                            style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                          />
                        </div>
                        {this.state.show1 ? (
                          <VisibilityIcon
                            type="eye"
                            onClick={this.handleClick1}
                            style={{
                              marginLeft: "-1.25em",
                              marginTop: "1.25em",
                            }}
                          // style={{ size: 24 }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            type="eye-invisible"
                            onClick={this.handleClick1}
                            style={{
                              marginLeft: "-7.25em",
                              marginTop: "1em",
                            }}
                          // style={{ size: 24 }}
                          />
                        )}                      
                      </div>
                     
                    </div>
                  < div class="mt-3" />
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={isSubmitting}
                      style={{ width: "100%", height: "2.5em" }}
                    >
                  Create
                    </Button>
                  </Form>
                )}
              </Formik>
           
            </div>
            < div class="mt-3" />

           
          </div>
      
         
          </div>
    
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  logging: auth.logging,
  loginError: auth.loginError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addOnboard,
    generateOtpByEmail,
    validateOtp
  }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnBoardOrganizationPage));
