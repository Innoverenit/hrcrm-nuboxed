import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { handleTimeZoneModal } from "../CallAction";

class TimeZoneForm extends Component {
  handleCallback = () => {
    const { handleTimeZoneModal } = this.props;
    handleTimeZoneModal(false);
  };
  render() {
    return (
      <>
        <Formik
          onSubmit={(values, { resetForm }) => { }}
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
              <div style={{ width: 500, margin: "auto" }}>
                <Field
                  name="timeZone"
                  // label="TimeZone "
                  label={<FormattedMessage
                    id="app.timezone"
                    defaultMessage="TimeZone"
                  />}
                  selectType="timeZone"
                  component={SearchSelect}
                  inlineLabel
                  style={{ flexBasis: "50%" }}
                />

                <Button type="primary" htmlType="submit">
                  {/* Submit */}
                  <FormattedMessage
                    id="app.submit"
                    defaultMessage="Submit"
                  />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, call }) => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleTimeZoneModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneForm);
