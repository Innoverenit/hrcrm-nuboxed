import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addTwilioCredentials, getTwilioCredentials } from "../VoIPAction";

const VoIPSchema = Yup.object().shape({
  sid: Yup.string().required("Account SID is needed!"),
});
class VoIPForm extends Component {
  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });
  handleSubmit = () => this.props.addTwilioCredentials(this.state);
  componentDidMount() {
    this.props.getTwilioCredentials(this.props.organizationId);
  }
  render() {
    const { addTwilioCredentials, addingTwilioCredential } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            sid: "",
            authorizationToken: "",
            phoneNo: "",
            voipProvider: "",
          }}
          validationSchema={VoIPSchema}
          onSubmit={(values, { resetForm }) => {
            // addTwilioCredential (values)
            console.log(values);
            addTwilioCredentials(values);
            resetForm();
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Field
                    name="sid"
                    placeholder="Account SID"
                    //label="Account SID"
                    label={
                      <FormattedMessage
                        id="app.accountsid"
                        defaultMessage="Account SID"
                      />
                    }
                    inlineLabel
                    labelWidth="24%"
                    isRequired
                    width={"100%"}
                    component={InputComponent}
                    style={{ flexBasis: "80%" }}
                  />
                  <mt-3 />
                  <Field
                    isRequired
                    name="authorizationToken"
                    placeholder="Auth token"
                    //label="Auth Token"
                    label={
                      <FormattedMessage
                        id="app.authorizationToken"
                        defaultMessage="Auth token"
                      />
                    }
                    inlineLabel
                    labelWidth="24%"
                    width={"100%"}
                    component={InputComponent}
                    style={{ flexBasis: "80%" }}
                  />
                  <mt-3 />
                  <Field
                    isRequired
                    name="phoneNo"
                    placeholder="Twilio number"
                    //label="Twilio number"
                    label={
                      <FormattedMessage
                        id="app.phoneNo"
                        defaultMessage="Twilio number"
                      />
                    }
                    labelWidth="24%"
                    component={InputComponent}
                    inlineLabel
                    width={"100%"}
                    style={{ flexBasis: "80%" }}
                  />
                  <mt-3 />
                  <Field
                    isRequired
                    name="voipProvider"
                    placeholder="VoIP Provider"
                    //label="VoIP Provider"
                    label={
                      <FormattedMessage
                        id="app.voipProvider"
                        defaultMessage="VoIP Provider"
                      />
                    }
                    labelWidth="24%"
                    component={InputComponent}
                    inlineLabel
                    width={"100%"}
                    style={{ flexBasis: "80%" }}
                  />
                  <mt-3 />
                </div>
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={addingTwilioCredential}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/* Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, voip }) => ({
  organizationId: auth.userDetails.organizationId,
  twilioCredential: voip.twilioCredential,
  addingTwilioCredential: voip.addingTwilioCredential,
  getTwilioCredentials: voip.getTwilioCredentials,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTwilioCredentials,
      getTwilioCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(VoIPForm);
