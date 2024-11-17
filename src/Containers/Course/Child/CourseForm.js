import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";

import { Formik, Form, Field, FastField } from "formik";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { addCourse } from "../CourseAction";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";

function CourseForm(props) {
  useEffect(() => {}, []);
  function handleReset(resetForm) {
    resetForm();
  }
  const { addingCourse, addCourse } = props;
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          courseId: props.courseId,
          creationDate: "",
          courseName: "",
          duration: "",
          price: "",
          drtnType: "",
          description: "",
          currencyName: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          addCourse(
            {
              ...values,
            },
            () => handleReset(resetForm)
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
            <div class=" flex justify-between overflow-scroll ">
              <div class=" h-full w-1/2">
                <Field
                  isRequired
                  name="courseName"
                  type="text"
                  label="Name"
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
                <div class=" flex justify-between">
                  <div class=" w-6/12">
                    <Field
                      isRequired
                      name="duration"
                      type="text"
                      label="Duration"
                       
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
                  <div class=" w-2/5">
                    <FastField
                      name="drtnType"
                      type="text"
                      label="Duration(months)"
                       
                      options={["Hours", "Days", "Month", "Years"]}
                      component={SelectComponent}
                      inlineLabel
                      isColumn
                    />
                  </div>
                </div>
                <div class=" flex justify-between">
                  <div class=" w-6/12">
                    <Field
                      name="price"
                      //label="State"
                      label="Price" 
                      component={InputComponent}
                      isColumn
                      width="100%"
                    />
                  </div>
                  <div class="  w-2/5">
                    <Field
                      name="currencyName"
                      isColumnWithoutNoCreate
                      placeholder="Currency"
                      label="Currency"
                      
                      isColumn
                      selectType="currencyName"
                      isRequired
                      width={"100%"}
                      component={SearchSelect}
                    />
                  </div>
                </div>
              </div>
              <div class=" h-3/4 w-5/12 ">
                <Field
                  name="description"
                  label="Description"
                  isColumn
                  width={"100%"}
                  component={TextareaComponent}
                  inlineLabel
                />
              </div>
            </div>

            <div class=" mt-3" />
            <div class=" flex justify-end">
              <Button type="primary" htmlType="submit" loading={addingCourse}>
               Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ course }) => ({
  addingCourse: course.addingCourse,
  addingCourseError: course.addingCourseError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCourse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);
