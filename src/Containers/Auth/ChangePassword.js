import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { message, Input} from "antd";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from "antd/lib/button";
import { changePassword, generateOtpByEmail, validateOtp } from "./AuthAction";

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Password should contain minimum 8 character ")
    .max(50, "Password should have maximum 50 characters!"),
  confirmPassword: Yup.string()
    .required("Enter password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
class ChangePassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show2: Boolean(),
    show: Boolean(),
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
    message.success("You have successfully changed your password");
    this.props.history.push("/change-password");
  };
  render() {
    return (
      <>
        <div class=" flex justify-center items-center h-[100vh]">
        <div class="   overflow-auto flex flex-col justify-center items-center bg-[white] "> 
       
     <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">
              <div class="text-lg font-poppins font-bold text-black mt-2">Change Password</div>
              < div class=" text-sm font-poppins text-black mt-2">Its a good idea to use a strong password.</div>
           <div class=" mt-4"></div>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",

                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.props.changePassword(
                    {
                      password: values.password,
                      emailId: this.props.emailId,
                    },
                    this.callback
                  );
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form className=" w-[25vw]" >
                    <div className="flex flex-row items-center">
                      <div class=" w-full mt-2" >
                        <Field
                          name="password"
                          type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}
                        />
                      </div>
                      {this.state.show ? (
                        <VisibilityIcon className=" !text-icon  -ml-5"
                          type="eye"
                          onClick={this.handleClick}
                          
                        />
                      ) : (
                        <VisibilityOffIcon className=" !text-icon  -ml-5"
                          type="eye-invisible"
                          onClick={this.handleClick}
                                               
                        />
                      )}
                    </div>
                  

                    <div  className="flex flex-row">
                      {/* <div class=" flex justify-between" > */}
                      <div class=" w-full mt-2" >
                          <Field
                            name="confirmPassword"
                            type={this.state.type1}
                            placeholder="Confirm new password"
                            component={this.InputComponent}
                            style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                          />
                        </div>
                        {this.state.show1 ? (
                          <VisibilityIcon  className=" !text-icon  -ml-5"
                            type="eye"
                            onClick={this.handleClick1}
                      
                          />
                        ) : (
                          <VisibilityOffIcon  className=" !text-icon  -ml-5"
                            type="eye-invisible"
                            onClick={this.handleClick1}
                            />
                        )}
                      
                      </div>
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlineIcon className="!text-icon"
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          
                        />
                      ) : null}
                    
                             
                    <div class="mt-4">
                    <Button className=" w-full h-10"
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.changingPassword}
                   
                    >
                   
                     Save Password
                    </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <br />
        
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  changingPassword: auth.changingPassword,
  changingPasswordError: auth.changingPasswordError,
  emailId: auth.userDetails.emailId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword,
      generateOtpByEmail,
      validateOtp
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
