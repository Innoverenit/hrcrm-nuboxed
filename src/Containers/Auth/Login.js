// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// // import { Link, withRouter } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import Button from "antd/lib/button";
// import "./autoplaycarousel.scss";
// import { cardDetails } from "./carousel-config";
// import CarouselItem from "./CarouselItem";
// import { login, generateOtpByEmail, validateOtp } from "./AuthAction";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import FWLogo from "../../Assets/Images/name.webp";//ct
// import FWLogo2 from "../../Assets/Images/nuboxnew.webp"; //nubox
// import DevelopTk from "../../Assets/Images/logo_22.webp";// testhr
// import KAPSSN from "../../Assets/Images/KAPSSNLogo.webp";// KPSSN
// import OneDi from "../../Assets/Images/1DiLogo.webp";//1Di 
// import Input from "./styled/Input";



// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       Loading: false,
//       render: false,
//       type: "password",
//       show: Boolean(),
//     };
//   }
//   handleClick = () =>
//     this.setState(({ type, prevState }) => ({
//       type: type === "text" ? "password" : "text",
//       show: !this.state.show,
//     }));
//   submit = (values) => {
//     // this.enterLoading();
//     this.props.login(values, this.props.history);
//   };
//   InputComponent = ({ field, form: { touched, errors }, ...props }) => (
//     <div>
//       <div>
//         <Input {...field} {...props} />
//       </div>
//       {touched[field.name] && errors[field.name] && (
//         <div className=" flex text-[tomato] font-bold !text-lm px-1">{errors[field.name]}</div>
//       )}
//     </div>
//   );
//   // componentDidMount() {
//   //   this.timeoutHandle = setTimeout(() => {
//   //     // Add your logic for the transition
//   //   }, 5000);

//   //   console.log("inside cDM login");
//   //   console.log(this.props);
//   //   const params = this.props.match.params;
//   //   if (params.username && params.password) {
//   //     this.setState({
//   //       username: params.username,
//   //       password: params.password,
//   //     });
//   //   }
//   // }
//   componentWillUnmount() {
//     clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <>
//         <div class="flex justify-between p-4">
          
//           <div class=" flex flex-col bg-[#fffafa] relative justify-center w-1/2 items-center md:min-h-screen max-sm:w-wk h-[80vh] ">
//              {/* <div className=" text-xxl font-bold font-poppins"> Welcome to Korero.</div> */}
             
//              <div className=" flex justify-start ">
//               <img
//               className="w-[9rem] h-12"
//               src={DevelopTk}
//               alt="Tekorero logo"
//             /></div>
            
//             <br />
//             <div className=" text-2xl font-bold font-poppins">Log in</div>
//             <div className=" text-sm font-poppins">Welcome back! Please enter your details.</div>

//             <div class="w-[25rem] p-4 max-sm:w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-box bg-white border-2">
//               <Formik
//                 enableReinitialize
//                 initialValues={{
//                   userName: this.state.username || "",
//                   password: this.state.password || "",
//                 }}
                
//                 onSubmit={(values) => {
                 
//                   this.submit(values);
//                 }}
//               >
//                 {({ errors, touched, isSubmitting, values }) => (
//                   <Form className="form-background">
//                     <Field
//                       className="gvbmIs"
//                       name="userName"
//                       type="email"
//                       placeholder="Email"
//                       component={this.InputComponent}
//                     />
//                     <div class="mt-3" />
//                     <div class=" flex flex-row flex-wrap items-center self-start justify-between grow shrink h-auto mr-auto ">
//                       <div className=" flex flex-row w-full">
//                         <div class=" w-full">
//                           <Field
//                             name="password"
//                             placeholder="Password"
//                             type={this.state.type}
//                             component={this.InputComponent}
//                           />
//                         </div>
//                         {this.state.show ? (
//                           <VisibilityIcon
//                             type="eye"
//                             onClick={this.handleClick}
//                             style={{ alignSelf: "center", marginLeft: "-1.25rem" }}
//                             size="24"
//                             className=" text-xs"
//                           />
//                         ) : (
//                           <VisibilityOffIcon
//                             type="eye-invisible"
//                             onClick={this.handleClick}
//                             // size="24"
//                             style={{ alignSelf: "center", marginLeft: "-1.25rem" }}
//                                   className=" text-xs"
//                           />
//                         )}
//                       </div>           
//                     </div>
//                     <div class="mt-3" />                
//                     <Button
//                       type="primary"
//                       htmlType="submit"
//                       Loading={isSubmitting}
//                       style={{ width: "100%", height: "2.5em" }}
//                     >
//                       Log In
//                     </Button>
//                   </Form>
//                 )}
//               </Formik>
//               <br />
//               &nbsp;
//               {/* <Link
//                 to="/forgotPassword"
//                 style={{ textAlign: "center", fontSize: 14, color: "black" }}
//               > */}
//                 Forgot password?
//               {/* </Link> */}
//             </div>
//             <div class="mt-3" />


//           </div>
//           <div class="w-1/2 flex justify-center flex-col items-center max-sm:hidden  overflow-x-auto bg-blue-400">
//           <div className=" flex flex-col mt-8">
//             <div class=" text-2xl text-white"> Simplify Your Workflow: Let Automation Drive Your Success 🚀</div>
//             <div class="flex mt-2  text-white justify-center text-base">Transform Your Lead Management with CRM Automation</div>
//             <div class=" flex mt-2  text-white justify-center text-base">Say goodbye to missed opportunities and manual task tracking</div>
//         </div>

        
//             <div className="carousel-container">
//       <div className="carousel-track ">

//         {Object.keys(cardDetails).map((detailKey) => {
//           return (
//             <CarouselItem 
//               imgUrl={cardDetails[detailKey].imgUrl}
//               imgTitle={cardDetails[detailKey].title}
//             ></CarouselItem>
//           );
//         })}
//       </div>
//     </div>
//           </div>

//         </div>
//         <div
//           className="text-xs text-center font-poppins mt-auto text-white absolute bottom-0 w-wk items-center"
      
//         >
//           {/* © {new Date().getFullYear()}, {` `} tekorero.com, All rights
//               reserved. */}
//           © {new Date().getFullYear()}  {` `} Cell Technologies.
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => ({
//   logging: auth.logging,
//   loginError: auth.loginError,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({
//     login,
//     generateOtpByEmail,
//     validateOtp
//   }, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(Login);





import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import Button from "antd/lib/button";
// import "./autoplaycarousel.scss";
import { cardDetails } from "./carousel-config";
import CarouselItem from "./CarouselItem";
import { useNavigate,Link } from "react-router-dom";
import { login, generateOtpByEmail, validateOtp } from "./AuthAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DevelopTk from "../../Assets/Images/logo_22.webp"; // testhr

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setType(type === "text" ? "password" : "text");
    setShow(!show);
  };

  const submit = (values) => {
    props.login(values, navigate);
  };

  const InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <div>
        <input {...field} {...props} className="custom-input" />
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className="flex text-[tomato] font-bold !text-lm px-1">
          {errors[field.name]}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex flex-col bg-[#fffafa] relative justify-center w-1/2 items-center md:min-h-screen max-sm:w-wk h-[80vh]">
          <div className="flex justify-start">
            <img className="w-[9rem] h-12" src={DevelopTk} alt="Tekorero logo" />
          </div>

          <br />
          <div className="text-2xl font-bold font-poppins">Log in</div>
          <div className="text-sm font-poppins">Welcome back! Please enter your details.</div>

          <div className="w-[25rem] p-4 max-sm:w-wk shadow-[0em 0.25em 0.625em -0.125em #444] border-box bg-white border-2">
            <Formik
              enableReinitialize
              initialValues={{
                userName: username,
                password: password,
              }}
              onSubmit={(values) => {
                submit(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="form-background">
                  <Field
                    name="userName"
                    type="email"
                    placeholder="Email"
                    component={InputComponent}
                    style={{ width: "100%" }}
                  />
                  <div className="mt-3" />
                  <div className="flex flex-row flex-wrap items-center self-start justify-between grow shrink h-auto mr-auto">
                    <div className="flex flex-row w-full">
                      <div className="w-full">
                        <Field
                          name="password"
                          placeholder="Password"
                          type={type}
                          component={InputComponent}
                          style={{ width: "100%" }}
                        />
                      </div>
                      {show ? (
                        <VisibilityIcon
                          onClick={handleClick}
                          className="!text-xs items-center -ml-5"
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={handleClick}
                         className="!text-xs items-center -ml-5"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-3" />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    style={{ width: "100%", height: "2.5em" }}
                  >
                    Log In
                  </Button>
                </Form>
              )}
            </Formik>
            <br />
            &nbsp;
           <Link
                to="/forgotPassword"
                style={{ textAlign: "center", fontSize: 14, color: "black" }}
              > 
            Forgot password?
            </Link>
          </div>
          <div className="mt-3" />
        </div>
        <div className="w-1/2 flex justify-center flex-col items-center max-sm:hidden overflow-x-auto bg-blue-400">
          <div className="flex flex-col mt-8">
            <div className="text-2xl text-white">Simplify Your Workflow: Let Automation Drive Your Success 🚀</div>
            <div className="flex mt-2 text-white justify-center text-base">Transform Your Lead Management with CRM Automation</div>
            <div className="flex mt-2 text-white justify-center text-base">Say goodbye to missed opportunities and manual task tracking</div>
          </div>

          <div className="carousel-container">
            <div className="carousel-track">
              {Object.keys(cardDetails).map((detailKey) => (
                <CarouselItem
                  key={detailKey}
                  imgUrl={cardDetails[detailKey].imgUrl}
                  imgTitle={cardDetails[detailKey].title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-center font-poppins mt-auto text-white absolute bottom-0 w-wk items-center">
        © {new Date().getFullYear()} Cell Technologies.
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  logging: auth.logging,
  loginError: auth.loginError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    login,
    generateOtpByEmail,
    validateOtp,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
