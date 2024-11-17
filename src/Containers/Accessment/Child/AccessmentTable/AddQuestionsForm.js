import React, { Component, useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import {addQuestion,FinalizeQuestion,getFinalQuestions} from "../../AccessmentAction";
/**
 * yup validation scheme for
 */
 const QsnSchema = Yup.object().shape({
  question: Yup.mixed().required("Input is Required!"),
    option1: Yup.mixed().required("Input is Required!"),
    option2: Yup.mixed().required("Input is Required!"),

});

function AddQuestionForm(props) {
    useEffect(()=>{
props.getFinalQuestions(props.rowData.assessmentId)
    },[]);
    const [count, setCount] = useState(1);

    const handleCount = () => setCount(count + 1);

    const goToFinalize = () => {
        props.FinalizeQuestion(props.rowData.assessmentId)
      }


  return (
    <>
      <Formik
        initialValues={{
          assessmentId:props.rowData.assessmentId,
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  question: "",
  questionType: "MCQ",
  

        }}
         validationSchema={QsnSchema}
        onSubmit={(values, { resetForm }) => {
          props.addQuestion(
            {
              ...values,
            },
          );
          resetForm();
          handleCount();
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleSubmit,
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
              onClick={handleSubmit}
              style={{ margin: "2% 0 0 40%" }}
            >
              Add
            </Button>
            {count >= 1 ?
            <Button
              type="primary"
              onClick={() => {
                handleSubmit()
                goToFinalize()
              }}
              style={{ margin: "2% 0 0 40%" }}
            >
              Finalize
            </Button>
             : ""}
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({assessment}) => ({
  addingQuestions:assessment.addingQuestions,
  finalQuestions:assessment.finalQuestions
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addQuestion,
  FinalizeQuestion,
  getFinalQuestions

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);
