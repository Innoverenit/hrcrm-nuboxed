import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import {  HeaderText } from "../../Components/UI/Elements";
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

                  <div class=" mt-3" style={{ marginTop: 15 }} />
                  <p style={{ fontSize: "0.75em" }}>
                    Your Korero scheduler needs your time zone as an input.
                    Korero will automatically update daylight settings for your
                    time zone.
                  </p>
                  <p style={{ fontSize: "0.75em" }}>
                    You can reconfigure time zone preference in the Profile
                    section.
                  </p>
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      //   Loading={addingProcess}
                    >
                     Complete
                      {/* Complete */}
                    </Button>
                  </div>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneForm);
