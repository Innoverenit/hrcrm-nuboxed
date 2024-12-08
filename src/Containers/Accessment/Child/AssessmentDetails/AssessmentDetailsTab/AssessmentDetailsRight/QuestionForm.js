import React, { Component, useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import {addQuestion} from "../../../../AccessmentAction";
/**
 * yup validation scheme for
 */
 const QsnSchema = Yup.object().shape({
  question: Yup.mixed().required("Input is Required!"),
    option1: Yup.mixed().required("Input is Required!"),
    option2: Yup.mixed().required("Input is Required!"),

});

function QuestionForm(props) {
  const {assessmentId}=props;
  console.log("ass",assessmentId)
  return (
    <>
      <Formik
        initialValues={{
          assessmentId:props.assessmentId,
        }}
         validationSchema={QsnSchema}
        onSubmit={(values, { resetForm }) => {
          props.addQuestion(
            {
              ...values,
            },
            props.assessmentId,
            resetForm()
          );
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
            <Field
              name="question"
              placeholder="Add Question here..."
             //label="Question"
              width={"100%"}
              isColumn
              component={TextareaComponent}
             style={{minHeight: "4rem"}}
            />
            <Field
              isRequired
              name="option1"
              type="text"
              placeholder="Correct Answer"
             //label="Option1"
              isColumn
              width={"100%"}
              component={InputComponent}
              inlineLabel              
            />

            <Field
              isRequired
              name="option2"
              placeholder="Option 2"
              type="text"
             //label="Option2"
              isColumn
              width={"100%"}
              component={InputComponent}
              inlineLabel
            />
            <Field
              
              placeholder="Option 3"
              name="option3"
             //label="Option3"
              isColumn
              width={"100%"}
              component={InputComponent}
              inlineLabel
            />
             <Field
              
              placeholder="Option 4"
              name="option4"
             //label="Option4"
              isColumn
              width={"100%"}
              component={InputComponent}
              inlineLabel
            />
            
            <Button
              type="primary"
              htmlType="submit"
                 Loading={props.addingQuestions}
              style={{ margin: "2% 0 0 40%" }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({assessment}) => ({
  addingQuestions:assessment.addingQuestions,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

  addQuestion
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
