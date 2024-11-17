import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

import { Formik, Form, Field, FastField } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addCourse } from "../../CourseAction";


function TestForm(props) {
    return (
      <>
        <Formik
          initialValues={{
            courseId: props.courseId,
            duration:"",
            drtnType:"",
        
  
          }}
    
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addCourse(
              {
                ...values,
                
              },
        
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
            <div class="flex justify-between h-[26rem] overflow-scroll pr-2" >
           
                <div class="w-[45%]">
                  <Field
                     isRequired
                    name="testName"
                    type="text"
                    label="Name" 
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
   <div class="flex justify-between">
   <div class="w-[45%]">
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
<div class="w-[45%]">
<FastField
                            name="drtnType"
                            type="text"
                            label="Unit"
                            options={["Hours", "Days", "Month","Years"]}
                            component={SelectComponent}
                            inlineLabel
                            isColumn
                          />
                          </div>
                          </div>                      
</div>
  </div>
               
               
             
          
            
              <div class="flex justify-end mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingCourse}
                >
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

export default connect(mapStateToProps, mapDispatchToProps)(TestForm);
