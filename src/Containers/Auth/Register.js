import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import { Button, Carousel} from "antd";
import * as Yup from "yup";
import { get } from "lodash";
import dayjs from "dayjs";
import { AuthContainer, FormWrapper, Datepicker } from "./styled";
import {
  ValidationError,
 
  HeaderText,
} from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import SearchSelect from "../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import { register, getTimeZone, getCurrency } from "./AuthAction";
import FlagWithoutDialCode from "../../Components/Forms/Formik/FlagWithoutDialCode";
import RandomImageScreen from "./RandomImageScreen";
import { DaysCompressorWithMonth } from "./DaysCompressorWithMonth";

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
  // handleAddressCheck = (defaultCountry, defaultCurrency) => {
  //   debugger;
  //   this.setState({
  //     address: !this.state.address,
  //     defaultCountry,
  //     defaultCurrency,
  //   });
  // };
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

  //   handleChangeInSubcomponent = value => {
  //  if(value !=== "Jan" || value !=== "April" || value !=== "July"|| value !=== "Oct" )
  //      };

  DatepickerComponent = ({
    value,
    field,
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    ...props
  }) => {
    return (
      <FlexContainer flexDirection="column">
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
          <ValidationError>{get(errors, field.name)}</ValidationError>
        )}
      </FlexContainer>
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
        <FlexContainer>
          <AuthContainer
            style={{ backgroundColor: "#F5F5F5", flexDirection: "column" }}
          >
            {/* <img
              className="big-logo"
              src={FWLogo}
              style={{ marginTop: 15, width: "12.5em" }}
            /> */}
            <br />
            <FormWrapper style={{ height: "auto" }}>
              {registeringSuccess ? (
                <FlexContainer
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: 300 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <HeaderText style={{ width: "auto", fontSize: 26 }}>
                      Registration successful !
                    </HeaderText>
                    <div class="mt-3" />
                    <div className="text-xs w-auto font-poppins"> 
  
                      {" "}
                      We have sent an activation link to your registered email
                      id.
                    </div>
                  </div>
                </FlexContainer>
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
                          <FlexContainer flexDirection="column">
                            <div style={{ width: 400 }}>
                              <div style={{ width: 400 }}>
                                <Carousel
                                  ref={(node) => (this.carousel = node)}
                                  {...props}
                                >
                                  <div style={{ width: 300 }}>
                                    <HeaderText
                                      color="#1890ff"
                                    // style={{ marginTop: -20 }}
                                    >
                                      Your Company
                                  </HeaderText>
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

                                    {/* <div className="register">
                                    <Field
                                      name="organization.industryType"
                                      type="text"
                                      noLabel
                                      isShadow
                                      placeholder="industryType"
                                      width={"99%"}
                                      component={InputComponent}
                                      style={{
                                        width: "99%",
                                        height: "2.0625em",
                                        boxShadow: "0em 0em 0em 0em",
                                      }}
                                    />
                                    <div class="mt-3" />
                                  </div> */}

                                    <div class="mt-3" />

                                    <FlexContainer
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      <FlexContainer
                                        style={{
                                          width: "100%",
                                        }}
                                      >
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
                                      </FlexContainer>
                                    </FlexContainer>
                                    <div class="mt-3" />

                                    <FlexContainer
                                      style={{
                                        width: "100%",
                                      }}
                                    >
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
                                    </FlexContainer>
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
                                    <HeaderText color="#1890ff">
                                      About You
                                  </HeaderText>
                                    <div className="register">
                                      <FlexContainer
                                        justifyContent="space-between"
                                        style={{
                                          width: "99%",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "49%",
                                            height: "2.0625em",
                                          }}
                                        >
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
                                        <div
                                          style={{
                                            width: "49%",
                                            height: "2.0625em",
                                          }}
                                        >
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
                                      </FlexContainer>
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

                                      {/* <StyledLabel>Gender</StyledLabel> */}

                                      {/* <Radio.Group gender="employee.radiogroup" defaultValue={1}>
                                        <Radio value={1}
                              
                                          onChange={() => this.handleClick(1)}>Male</Radio>


                                        <Radio value={2}
                                          onChange={() => this.handleClick(2)}>Female</Radio>

                                        <Radio value={3}
                                          onChange={() => this.handleClick(3)}>Others</Radio>

                                      </Radio.Group> */}

                                      {/* //   noLabel
                                      //   isRequired
                                      //   component={SearchSelect}
                                      //   option={["Male", "female"]}
                                      //   style={{ width: "99%", height: "2.0625em" }}
                                      // /> */}
                                      <div class="mt-3" />

                                      <div
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
                                        <FlexContainer
                                          justifyContent="space-between"
                                          style={{ marginTop: 20, width: "100%" }}
                                        >
                                          {/* <Field
                                            type="text"
                                            name="employee.address[0].address1"
                                            placeholder="address1"
                                            noLabel
                                            isRequired
                                            // width="100%"
                                            isShadow
                                            component={InputComponent}
                                            style={{
                                              width: "100%",
                                            }}
                                          /> */}
                                        &nbsp;
                                        {/* <Field
                                          type="text"
                                          name="employee.address[0].town"
                                          placeholder="town"
                                          noLabel
                                          isRequired
                                          // width="100%"
                                          isShadow
                                          component={InputComponent}
                                          style={{
                                            width: "50%",
                                          }}
                                        /> */}
                                        </FlexContainer>

                                        {/* <Field
                                        type="text"
                                        name="employee.address[0].postalCode"
                                        placeholder="postalCode"
                                        noLabel
                                        isRequired
                                        // width="100%"
                                        isShadow
                                        component={InputComponent}
                                        style={{
                                          width: "50%",
                                        }}
                                      /> */}
                                      </div>
                                    </div>

                                    <div className="register">
                                      <FlexContainer
                                        justifyContent="space-between"
                                        style={{ marginTop: 20 }}
                                      >
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
                                      </FlexContainer>
                                    </div>
                                  </div>
                                </Carousel>
                              </div>
                            </div>
                          </FlexContainer>
                        </Form>
                      );
                    }}
                  </Formik>
                )}
            </FormWrapper>
            <div
              className="text-xs text-center font-poppins mt-auto text-black "
          
            >
              <span style={{ marginTop: "0.625em" }}>
                {" "}
                © {new Date().getFullYear()}, {` `} tekorero.com, All rights
                reserved.
              </span>
            </div>
          </AuthContainer>
          <RandomImageScreen />
        </FlexContainer>
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
