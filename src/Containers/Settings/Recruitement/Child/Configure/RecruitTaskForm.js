import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
  addTaskForRecruiter,
  getTaskForWorkflow,
} from "../../../SettingsAction";

class RecruitTaskForm extends Component {
  handleCallback = (status) => {
    if (status === "success") {
      return getTaskForWorkflow(this.props.taskTypeId);
    } else {
      return null;
    }
  };
  render() {
    const { addingTaskForRecruit, addTaskForRecruiter } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            taskChecklistName: "",
            taskTypeId:this.props.taskTypeId,
            organizationId:this.props.organizationId
          }}
          onSubmit={(values) => {
            addTaskForRecruiter(
              values,
              this.props.taskTypeId,
              () => this.handleCallback
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div class=" w-auto m-auto">
                <Field
                  name="taskChecklistName"
                  label="Name"
              
                  component={InputComponent}
                  isColumn
                  width={"100%"}
                  placeholder={"Enter Workflow name "}
                  style={{ flexBasis: "80%", marginTop: "0.25em" }}
                />
               
                <div class=" flex justify-end mt-8" >
                  {" "}
                  <Button
                    type="primary"
                     disabled={!values.taskChecklistName}
                    htmlType="submit"
                     Loading={addingTaskForRecruit}
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
  addingTaskForRecruit: settings.addingTaskForRecruit,
  addingTaskForRecruitError: settings.addingTaskForRecruitError,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskForRecruiter,
      getTaskForWorkflow,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitTaskForm);
