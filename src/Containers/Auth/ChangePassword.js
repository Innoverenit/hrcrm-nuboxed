import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { message, Input} from "antd";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeOutlined,
} from "@ant-design/icons";
import { ValidationError, Title, SubTitle } from "../../Components/UI/Elements";
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
        <ValidationError>{errors[field.name]}</ValidationError>
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
        <div class=" flex">
        <div class="  w-full min-h-[100vh] overflow-auto flex flex-col justify-center items-center bg-[#eaedf1] "> 
       
     <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">
              <Title>Change Password</Title>
              <SubTitle>Its a good idea to use a strong password.</SubTitle>
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
                  <Form style={{ width: "25vw" }}>
                    <div className="flex flex-row items-center">
                      <div class=" w-full" >
                        <Field
                          name="password"
                          type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined
                          type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em",  }}
                          size="24"
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em",  }}
                        />
                      )}
                    </div>
                  

                    <div  className="flex flex-row">
                      {/* <div class=" flex justify-between" > */}
                      <div class=" w-full" >
                          <Field
                            name="confirmPassword"
                            type={this.state.type1}
                            placeholder="Confirm new password"
                            component={this.InputComponent}
                            style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                          />
                        </div>
                        {this.state.show1 ? (
                          <EyeOutlined
                            type="eye"
                            onClick={this.handleClick1}
                            style={{ marginLeft: "-1.25em",  }}
                            size="24"
                          // style={{ size: 24 }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            type="eye-invisible"
                            onClick={this.handleClick1}
                            style={{ marginLeft: "-1.25em",  }}
                          size="24"
                        
                          />
                        )}
                      
                      </div>
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlined
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={80}
                          style={{
                            marginLeft: "1.25em",
                            marginTop: "0.875em",
                            fontSize: "1.5625em",
                          }}
                        />
                      ) : null}
                    
                             
                    <div class="mt-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.changingPassword}
                      style={{ width: "100%", height: "2.5em" }}
                   
                    >
                   
                      <FormattedMessage
                        id="app.savepassword"
                        defaultMessage="Save Password"
                      />
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
