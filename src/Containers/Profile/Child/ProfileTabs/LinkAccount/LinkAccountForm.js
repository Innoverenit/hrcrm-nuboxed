import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Formik, Form, Field } from "formik";
import Button from "antd/lib/button";

 import { verifyUserEmailurL ,
  validateEmailOtpurL,
  addEmailLinkSave
} from "../../../ProfileAction";
import { Input } from "../../../../../Components/UI/Layout";

class LinkAccountForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
      activeKey: "1",
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
        "Send OTP",
        "Validate",
        "Submit"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show2: Boolean(),
    show: Boolean(),
    sendOtpClicked: false,
    isGenerating: false
  };
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
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
       
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{errors[field.name]}</div>
      )}
    </div>
  );
  componentDidMount() {
    console.log("inside cDM login");
  }
  callback = () => {
    if (this.props.userType === "Admin") {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/home");
    }
  };
  handleClickChange = () => {
    this.setState(prevState => ({
      isGenerating: !prevState.isGenerating
    }));
  };

  render() {
    return (
      <>
        <div className="main" style={{ display: "flex", justifyContent: "space-evenly" }}>

          <div className="forgot_password">

          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            <div class="   min-h- [100vh] overflow-auto flex  flex-col justify-center w-full bg-white items-center ">
                    
            <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">
                  <Formik
                    initialValues={{
                      emailId: this.props.user.emailId,
                      otp: "",
                      email2:"",
                      otp2:"",
                    }}
                    // validationSchema={ChangePasswordSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      this.props.forgetPassword(
                        {
                          emailId: this.props.email,
                        },
                        this.callback
                      );
                    }}
                  >
                    {({ errors, touched, values, isSubmitting }) => (
                      <Form style={{ width: "25vw" }}>
                        <div >
                          <div className="flex w-full">
                            <div className="w-[75%]" >
                              <Field
                              readOnly
                               
                                placeholder="Enter your email1"
                                name="emailId"
                               
                                isColumn
                                defaultValue={this.props.user.emailId}
                                width={"100%"}
                                component={this.InputComponent}
                                inlineLabel
                              />
                            </div>
                            <div className="w-[25%] mt-2" >
                              <Button
                                type="primary"
                                disabled={!values.emailId.length}
                                onClick={() => {
                                  // this.setState({ sendOtpClicked: true });
                                  this.props.verifyUserEmailurL({
                                    emailId: values.emailId,
                                    // otp: 0,
                                  });
                                }}
                                class={{
                                  width: "100%",
                                  margin: "7%",
                                }}

                              >
                                {this.state.translatedMenuItems[0]} {/* Send OTP */}
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex" >
                            <div className="w-[75%]" >
                              <Field
                                // disabled={!this.state.otp}
                                name="otp"
                                // label="Validate OTP*"
                                placeholder="Validate OTP"
                                isColumn
                                component={this.InputComponent}
                              />
                            </div>
                            <div className="w-[25%]">
                              <Button
                                type="primary"
                                disabled={!values.otp.length}
                                onClick={() => {
                                  this.props.validateEmailOtpurL({
                                     emailId: values.emailId,
                                    otp: values.otp,
                                  });

                                }}
                                style={{
                                  width: "100%",
                                  margin: "7%",
                                }}
                              // disabled={!this.state.sendOtpClicked}
                              >
                                 {this.state.translatedMenuItems[1]}{/* Validate */}
                              </Button>
                            </div>
                          </div>

                       

                        </div>
                        <div >
                          <div className="flex w-full">
                            <div className="w-[75%]" >
                              <Field
                          
                               
                                placeholder="Enter your email2"
                                name="email2"
                               
                                isColumn
                                // defaultValue={this.props.user.emailId}
                                width={"100%"}
                                component={this.InputComponent}
                                inlineLabel
                              />
                            </div>
                            <div className="w-[25%] mt-2" >
                              <Button
                                type="primary"
                                disabled={!values.email2.length}
                                onClick={() => {
                                  // this.setState({ sendOtpClicked: true });
                                  this.props.verifyUserEmailurL({
                                    emailId: values.email2,
                                    // otp: 0,
                                  });
                                }}
                                class={{
                                  width: "100%",
                                  margin: "7%",
                                }}

                              >
                                {this.state.translatedMenuItems[0]} {/* Send OTP */}
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex" >
                            <div className="w-[75%]" >
                              <Field
                                // disabled={!this.state.otp}
                                name="otp2"
                                // label="Validate OTP*"
                                placeholder="Validate OTP"
                                isColumn
                                component={this.InputComponent}
                              />
                            </div>
                            <div className="w-[25%]">
                              <Button
                                type="primary"
                                disabled={!values.otp2.length}
                                onClick={() => {
                                  this.handleClickChange();
                                  this.props.validateEmailOtpurL({
                                    emailId: values.email2,
                                    otp: values.otp2,
                                  });

                                }}
                                style={{
                                  width: "100%",
                                  margin: "7%",
                                }}
                              // disabled={!this.state.sendOtpClicked}
                              >
                                 {this.state.translatedMenuItems[1]}{/* Validate */}
                              </Button>
                            </div>
                          </div>

                       

                        </div>

                        <div className="mt-4">
                          <span className="flex justify-between">


                            <Button
                              type="primary"
                              htmlType="submit"
                              // disabled={!values.otp2.length}
                              disabled={!this.state.isGenerating}
                              //loading={this.props.doResetpassword}
                              style={{ width: "15.875em", height: "2.5em" }}
                            onClick={() => 
                              this.props.addEmailLinkSave({
                                employeeId:this.props.employeeId,
                                primaryEmailId:values.emailId,
                                secondaryEmailId:values.email2,
                              })}
                            >
                            {this.state.translatedMenuItems[2]} {/* Submit */}
                            </Button>
                          </span>
                        </div>
                     

                      </Form>
                    )}
                  </Formik>
             
                </div>
             
              </div>

            </div>
          </div>
 
        </div>


      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  doResetpassword: auth.doResetpassword,
  doResetpasswordError: auth.doResetpasswordError,
  emailId: auth.userDetails.emailId,
  user: auth.userDetails,
  userType: auth.userDetails.userType,
  validOtp: auth.validOtp,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // forgotUserPassword, 
      // validateOtpurL, 
      verifyUserEmailurL,
      validateEmailOtpurL,
      addEmailLinkSave
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkAccountForm)
 