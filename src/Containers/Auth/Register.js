import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import { Button, Carousel} from "antd";
import * as Yup from "yup";
import { get } from "lodash";
import dayjs from "dayjs";
import { cardDetails } from "./carousel-config";
import CarouselItem from "./CarouselItem";
import SearchSelect from "../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import { register, getTimeZone, getCurrency } from "./AuthAction";
import FlagWithoutDialCode from "../../Components/Forms/Formik/FlagWithoutDialCode";
import { DaysCompressorWithMonth } from "./DaysCompressorWithMonth";
import { Datepicker } from "../../Components/UI/Layout";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let q4EndMonth = "";
let q4EndDate = "";
let q2StartMonth = "";
let q2StartDate = "";
let q3StartMonth = "";
let q3StartDate = "";
let q4StartMonth = "";
let q4StartDate = "";
/**
 * yup validation scheme for register
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const RegisterSchema = Yup.object().shape({
  organization: Yup.object({
    organizationName: Yup.string().required("Input needed"),
    baseCountry: Yup.string().required(""),
  }),

  employee: Yup.object({
    firstName: Yup.string().required("Input needed !"),
    emailId: Yup.string()
      .email("Enter a valid Email")
      .required("Input needed !"),
    // phoneNo: Yup.string().required("Input needed !"),

    address: Yup.array().of(
      Yup.object().shape({
        country: Yup.string().required("Input needed  !"),
      })
    ),
  }),
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
    this.state = {
      checked: false,
      rememberMe: false,
      // fileShareInd: false,
      isVisibel: false,
      emptyQuartor: false,
      gender: "",
      // address: false,
      // defaultCountry: "",
      // defaultCurrency: "",
    };
  }

  handleClick = (value) => {
    this.setState({
      isClicked: value,
      // alert(this.state.isClicked);
    });
  };
  handleVisible(isvisible) {
    this.setState({ isVisible: !this.state.isVisible });
  }
  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
    console.log(this.state.checked);
  };
  handleChecked = () => {
    this.setState({
      rememberMe: !this.state.rememberMe,
      // fileShareInd: !this.state.fileShareInd,
    });
    console.log(this.state.rememberMe);
    // console.log(this.state.fileShareInd);
  };
 
  componentDidMount() {
    console.log(this.state.rememberMe);
    // console.log(this.state.fileShareInd);
  }
  next() {
    this.carousel.prev();
  }
  previous() {
    this.carousel.next();
  }

  DatepickerComponent = ({
    value,
    field,
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    ...props
  }) => {
    return (
      <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <Datepicker
          allowClear={false}
          {...field}
          {...props}
          onChange={(date, dateString) =>
            setFieldValue(field.name, dayjs(dateString))
          }
          value={value}
          onBlur={() => setFieldTouched(field.name, true)}
        />
        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
        )}
      </div>
    );
  };
  componentDidMount() {
    this.props.getTimeZone();
    this.props.getCurrency();
  }
  render() {
    const props = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const {
      registering,
      registeringSuccess,
      match,
      timeZone,
      currencies,
      countries,
    } = this.props;
    const subscriptionType = match.params.type;

    // .filter(data => data.stageName !== "Won" && data.stageName !== "Lost")
    const currentTimeZone = timeZone.map((item) => {
      return {
        label: item.zone_name || "",
        value: item.zone_name,
      };
    });
    console.log(currentTimeZone);
    console.log(currencies);
    const currency = currencies.map((item) => {
      return {
        label: item.currencyName || "",
        value: item.currencyName,
      };
    });

    const country = countries.map((item) => {
      return {
        value: item.countryAlpha3Code,
        label: (
          <FlagWithoutDialCode
            countryName={item.countryName}
            countryAlpha3Code={item.countryAlpha3Code}
          />
        ),
      };
    });
    console.log(currency);
    return (
      <>
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
      <div class="  w-1/2  min-h- [100vh] overflow-auto flex flex-col justify-center items-center bg-[#F5F5F5]">
         
            
            <br />
            <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid h-auto bg-white">
              {registeringSuccess ? (
               <div class=" flex flex-row flex-wrap  items-center self-start justify-center grow shrink h-auto mr-auto ">
                  <div class=" flex flex-col justify-center items-center" >
                    <div class=" text-2xl w-auto" >
                      Registration successful !
                    </div>
                    <div class="mt-3" />
                    <div className="text-xs w-auto font-poppins"> 
  
                      {" "}
                      We have sent an activation link to your registered email
                      id.
                    </div>
                  </div>
                </div>
              ) : (
                  <Formik
                    // enableReinitialize
                    initialValues={{
                      organization: {
                        organizationName: "",

                        tradeurrency: "",

                        baseCountry: "",
                      },

                      employee: {
                        firstName: "",
                        lastName: "",
                        country: "",
                        emailid: "",
                        currency: "",
                      },
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                      console.log({
                        ...values,
                      });

                      this.props.register(values);
                    }}
                  >
                    {({
                      errors,
                      touched,
                      isSubmitting,
                      values,
                      setFieldValue,
                    }) => {
                      return (
                        <Form className="form-background">
                       <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                            <div style={{ width: 400 }}>
                              <div style={{ width: 400 }}>
                                <Carousel
                                  ref={(node) => (this.carousel = node)}
                                  {...props}
                                >
                                  <div style={{ width: 300 }}>
                                    <div class="text-[#1890ff]">
                                      Your Company
                                  </div>
                                    <div className="register">
                                      <Field
                                        name="organization.organizationName"
                                        type="text"
                                        noLabel
                                        isShadow
                                        placeholder="Name"
                                        width={"99%"}
                                        component={InputComponent}
                                        style={{
                                          width: "99%",
                                          height: "2.0625em",
                                          boxShadow: "0em 0em 0em 0em",
                                        }}
                                      />
                                      <div class="mt-3" />
                                    </div>
                                    <div class="mt-3" />

                                    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[100%] ">
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[100%] ">
                                        <div style={{ width: "49%" }}>
                                          <Field
                                            name="organization.baseCountry"
                                            noLabel
                                            isShadow
                                            component={SelectComponent}
                                            placeholder="Country"
                                            options={
                                              Array.isArray(country)
                                                ? country
                                                : []
                                            }
                                            style={{
                                              borderRadius: 5,
                                              width: "100%",
                                              height: "2.0625em",
                                            }}
                                          />
                                        </div>
                                      &nbsp;
                                      <div style={{ width: "49%" }}>
                                          <Field
                                            name="organization.currency"
                                            placeholder="Currency"
                                            noLabel
                                            isShadow
                                            component={SelectComponent}
                                            options={
                                              Array.isArray(currency)
                                                ? currency
                                                : []
                                            }
                                            style={{
                                              borderRadius: 5,
                                              height: "2.0625em",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="mt-3" />
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  w-[100%]">
                                      <div style={{ width: "49%" }}>
                                        <Field
                                          name="organization.fiscalStartMonth"
                                          placeholder="Fiscal Month"
                                          Label
                                          isShadow
                                          component={SelectComponent} 
                                          options={MONTHS}
                                          style={{
                                            borderRadius: 5,
                                            height: "2.0625em",
                                          }}
                                        />
                                      </div>
                                    &nbsp;
                                    <div style={{ width: "49%" }}>
                                        <Field
                                          name="organization.fiscalStartDate"
                                          placeholder="Fiscal Start date"
                                          noLabel
                                          isShadow
                                          component={SelectComponent}
                                          options={DaysCompressorWithMonth(
                                            values.organization.fiscalStartMonth
                                          )}
                                          style={{
                                            borderRadius: 5,
                                            height: "2.0625em",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="mt-3" />
                                    <Button
                                      type="primary"
                                      style={{
                                        flexBasis: "48%",
                                        height: "2.375em",
                                      }}
                                      onClick={() => this.previous()}
                                    >
                                      1 more section to Go
                                  </Button>
                                  </div>

                                  <div style={{ width: 300 }}>
                                    <div class=" text-[#1890ff]">
                                      About You
                                  </div>
                                    <div className="register">
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  w-[100%] ">
                                        <div class=" w-1/2 h-[2.0625rem]"  >
                                          <Field
                                            type="text"
                                            name="employee.firstName"
                                            placeholder="First name"
                                            noLabel
                                            isRequired
                                            width="100%"
                                            isShadow
                                            component={InputComponent}
                                            style={{
                                              width: "100%",
                                            }}
                                          />
                                        </div>
                                        <div class=" w-1/2 h-[2.0625rem]"  >
                                          <Field
                                            type="text"
                                            name="employee.lastName"
                                            placeholder="Last name"
                                            width="100%"
                                            noLabel
                                            isShadow
                                            component={InputComponent}
                                            style={{
                                              width: "100%",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div class="mt-3" />
                                      <Field
                                        isShadow
                                        type="email"
                                        name="employee.emailId"
                                        width="99%"
                                        placeholder="Email"
                                        noLabel
                                        isRequired
                                        component={InputComponent}
                                        style={{ width: "99%", height: "2.0625em" }}
                                      />

                                      <div class="mt-3" />

                                      <div class=" w-[55%]"
                                        style={{
                                          width: "55%",
                                        }}
                                      >
                                        <Field
                                          name="employee.country"
                                          noLabel
                                          isRequired
                                          selectType="country"
                                          placeholder="Country"
                                          isShadow
                                          component={SearchSelect}
                                        />
                                      </div>
                                      <div class="mt-3" />
                                      <div>
                                        <Field
                                          name="employee.Currency"
                                          placeholder="Currency"
                                          noLabel
                                          isShadow
                                          component={SelectComponent}
                                          options={
                                            Array.isArray(currency)
                                              ? currency
                                              : []
                                          }
                                          style={{
                                            borderRadius: 5,
                                            height: "2.0625em",
                                          }}
                                        />
                                      </div>
                                      <div>
                                      <div class=" flex flex-row flex-wrap items-start mt-20 self-start justify-between grow shrink h-auto mr-auto w-[100%] ">                                           
                                        &nbsp;                                   
                                        </div>                                   
                                      </div>
                                    </div>

                                    <div className="register">
                                    <div class=" flex flex-row flex-wrap mt-20 items-start self-start justify-between grow shrink h-auto mr-auto ">
                                        <Button
                                          type="default"
                                          style={{
                                            flexBasis: "48%",
                                            height: "2.375em",
                                          }}
                                          onClick={() => this.next()}
                                        >
                                          Prev
                                      </Button>
                                        <Button
                                          type="primary"
                                          htmlType="submit"
                                          Loading={registering}
                                          style={{
                                            flexBasis: "48%",
                                            height: "2.375em",
                                          }}
                                        >
                                          Sign Up
                                      </Button>

                                        {/* <Checkbox >Agree Terms of Services</Checkbox> */}
                                      </div>
                                    </div>
                                  </div>
                                </Carousel>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                )}
            </div>
            <div
              className="text-xs text-center font-poppins mt-auto text-black "
          
            >
              <span style={{ marginTop: "0.625em" }}>
                {" "}
                © {new Date().getFullYear()}, {` `} tekorero.com, All rights
                reserved.
              </span>
            </div>
          </div>
          <div className=" flex flex-col mt-8">
            <div class=" text-2xl text-white"> Simplify Your Workflow: Let Automation Drive Your Success 🚀</div>
            <div class="flex mt-2  text-white justify-center text-base">Transform Your Lead Management with CRM Automation</div>
            <div class=" flex mt-2  text-white justify-center text-base">Say goodbye to missed opportunities and manual task tracking</div>
        </div>

        
            <div className="carousel-container">
      <div className="carousel-track ">

        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
            ></CarouselItem>
          );
        })}
      </div>
    </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  registering: auth.registering,
  registeringError: auth.registeringError,
  registeringSuccess: auth.registeringSuccess,
  timeZone: auth.timeZone,
  currencies: auth.currencies,
  countries: auth.countries,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ register, getTimeZone, getCurrency }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Register);

function finalMonth(month) {
  if (month === 0) {
    return "Jan";
  }
  if (month === 1) {
    return "Feb";
  }
  if (month === 2) {
    return "Mar";
  }
  if (month === 3) {
    return "Apr";
  }
  if (month === 4) {
    return "May";
  }
  if (month === 3) {
    return "Apr";
  }
  if (month === 4) {
    return "May";
  }
  if (month === 5) {
    return "Jun";
  }
  if (month === 6) {
    return "July";
  }
  if (month === 7) {
    return "Aug";
  }
  if (month === 8) {
    return "Sep";
  }
  if (month === 9) {
    return "Oct";
  }
  if (month === 10) {
    return "Nov";
  }
  if (month === 11) {
    return "Dec";
  } else {
    return "Choose month";
  }
}
