import React,{useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";

import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addAssessment } from "../AccessmentAction";
import { getCourse } from "../../Course/CourseAction";

function AccessmentForm(props) {
  useEffect(()=>{
props.getCourse();
  },[]);

 const courseNameopt =props.courseById.map((option) => ({
    label: option.courseName || "",
    value: option.courseId,
  }));

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          assessmentName: "",
          courseId:"",
          durationType:"",
          duration:"",
          userId: props.userId,
          orgId: props.orgId,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.addAssessment({
            ...values,
          });
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
            <div class="flex justify-evenly h-full w-full items-center">
              <div class="w-[16%]">
                <Field
                  isRequired
                  name="assessmentName"
                  type="text"
                  component={InputComponent}
                  label="Name"
                  isColumn
                  width={"100%"}
                  inlineLabel
                />
              </div>
              <div class="w-[16%]">
                <Field
                  name="courseId"
                  label="course" 
                  isColumn
                  width={"100%"}
                  component={SelectComponent}
                  options={Array.isArray(courseNameopt) ? courseNameopt : []}
                  inlineLabel
                />
              </div>
             <div class="w-[16%]">
                <Field
                   name="duration"
                   label="Time per question"
                   isColumn
                   width={"100%"}
                   component={InputComponent}
                   inlineLabel
                />
              </div>
              <div class="w-[8%]">
                <Field
                  name="durationType"
                  label="Duration Type"
                  isColumn
                  width={"100%"}
                  options={["secs","mins"]}
                  component={SelectComponent}
                  inlineLabel
                />
              </div>
              <div>
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingAssessment}
              >
                Create              </Button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, assessment,course }) => ({
  addingAssessment: assessment.addingAssessment,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  courseById: course.courseById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAssessment,
      getCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccessmentForm);
