import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import {
  addProcessForRecruiter,
  getProcessForRecruit,
} from "../SettingsAction";


class ProcessForm extends Component {
  handleCallback = (status) => {
    if (status === "success") {
      return getProcessForRecruit(this.props.organizationId);
    } else {
      return null;
    }
  };
  render() {
    const { addingProcessForRecruit, addProcessForRecruiter } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            recruitmentProcessName: "",
            organizationId:this.props.organizationId
          }}
          onSubmit={(values) => {
            addProcessForRecruiter(
              values,
              this.props.organizationId,
              () => this.handleCallback
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div style={{ width: "auto", margin: "auto" }}>
                <Field
                  name="recruitmentProcessName"
                  label="Name"
                  component={InputComponent}
                  isColumn
                  width={"100%"}
                  placeholder={"Enter Workflow name "}
                  style={{ flexBasis: "80%", marginTop: "0.25em" }}
                />
                <mt-3 />

                <mt-3 style={{ marginTop: 15 }} />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  {" "}
                  <Button
                    type="primary"
                    disabled={!values.recruitmentProcessName}
                    htmlType="submit"
                    Loading={addingProcessForRecruit}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  addingProcessForRecruit: settings.addingProcessForRecruit,
  addingProcessForRecruitError: settings.addingProcessForRecruitError,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProcessForRecruiter,
      getProcessForRecruit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcessForm);
