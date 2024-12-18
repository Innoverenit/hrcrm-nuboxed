import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { updateTwilioCredentials } from "../VoIPAction";


const VoIPSchema = Yup.object().shape({
  sid: Yup.string().required("Account SID is needed!"),
});
class EditVoipForm extends Component {
  handleCallback = () => {
    this.props.handleVoipModalVisible();
  };
  render() {
    const {
      updatingTwilioCredential,
      updateTwilioCredentials,
      setEditingVoip,
    } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            twilioId: setEditingVoip.twilioId,
            sid: setEditingVoip.sid,
            authorizationToken: setEditingVoip.authorizationToken,
            phoneNo: setEditingVoip.phoneNo,
            voipProvider: "",
          }}
          validationSchema={VoIPSchema}
          onSubmit={(values, { resetForm }) => {
            // addTwilioCredential (values)
            console.log(values);
            updateTwilioCredentials(
              values.twilioId,
              values,
              this.handleCallback
            );
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
                   label="Account SID"
                    
                    inlineLabel
                    labelWidth="24%"
                    isRequired
                    width={"100%"}
                    component={InputComponent}
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    isRequired
                    name="authorizationToken"
                    placeholder="Auth token"
                    label="Auth Token"
                   
                    inlineLabel
                    labelWidth="24%"
                    width={"100%"}
                    component={InputComponent}
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    isRequired
                    name="phoneNo"
                    placeholder="Twilio number"
                  label="Twilio number"
                   
                    labelWidth="24%"
                    component={InputComponent}
                    inlineLabel
                    width={"100%"}
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    isRequired
                    name="voipProvider"
                    placeholder="VoIP Provider"
                   label="VoIP Provider"
                    
                    labelWidth="24%"
                    component={InputComponent}
                    inlineLabel
                    width={"100%"}
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                </div>
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updatingTwilioCredential}
                >
                   Update 
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
  updatingTwilioCredential: voip.updatingTwilioCredential,
  setEditingVoip: voip.setEditingVoip,
  twilioId: voip.setEditingVoip.twilioId,
  updateTwilioCredentials: voip.updateTwilioCredentials,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateTwilioCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditVoipForm);
