import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";
import { Spacer, HeaderText } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import SearchSelect from "../../Components/Forms/Formik/SearchSelect";
import { updateUserById } from "../Auth/AuthAction";
const LevelSchema = Yup.object().shape({
  timeZone: Yup.string().required("Input needed !"),
});
class TimeZoneForm extends Component {
  render() {
    const { addingProcess, updateUserById, userId } = this.props;

    return (
      <>
        <Formik
          initialValues={{
            timeZone: "",
          }}
          validationSchema={LevelSchema}
          onSubmit={(values) => {
            console.log(values);
            updateUserById(
              { ...values, employeeId: userId },

              this.props.Callback
            );
            console.log(userId);
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div>
              <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white h-auto">
                  <HeaderText color="#1890ff" style={{ marginBottom: 20 }}>
                    Few more inputs before using Korero{" "}
                  </HeaderText>
                  <Field
                    name="timeZone"
                    noLabel
                    // isRequired
                    isShadow
                    selectType="timeZone"
                    placeholder="Specify your time zone"
                    component={SearchSelect}
                    style={{ flexBasis: "50%" }}
                  />

                  <Spacer style={{ marginTop: 15 }} />
                  <p style={{ fontSize: "0.75em" }}>
                    Your Korero scheduler needs your time zone as an input.
                    Korero will automatically update daylight settings for your
                    time zone.
                  </p>
                  <p style={{ fontSize: "0.75em" }}>
                    You can reconfigure time zone preference in the Profile
                    section.
                  </p>
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      //   Loading={addingProcess}
                    >
                      <FormattedMessage
                        id="app.complete"
                        defaultMessage="Complete"
                      />
                      {/* Complete */}
                    </Button>
                  </FlexContainer>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails && auth.userDetails.userId,
  //   addingProcess: settings.addingProcess,
  //   addingProcessError: settings.addingProcessError
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneForm);
