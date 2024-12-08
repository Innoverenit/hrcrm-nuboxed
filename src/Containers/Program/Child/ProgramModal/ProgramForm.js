import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect"
import { Formik, Form, Field, FastField } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent"; 
import {getCourse} from "../../../Course/CourseAction"
import { addPrograms } from "../../ProgramAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";

function ProgramForm(props) {
    useEffect(() => {
        props.getCourse();  
  }, [])
  function handleReset(resetForm) {
    resetForm();
  }
  const {
    addingPrograms,
    addPrograms,

  } = props;


  const courseOption = props.courseById.map((item) => {
    return {
      label: item.courseName || "",
      value: item.courseId,
    };
  });
    return (
      <>
        <Formik
          initialValues={{
            courseId: [],
            program:"",
            price:"",
            currency:"",
            duration:"",
            drtnType:"",
            description:"",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addPrograms(
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
              
              <div class=" flex justify-between">
                  <div class=" w-6/12">
                  <Field
                     isRequired
                    name="program"
                    type="text"
                    label="Program Name"
                    
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
</div>
<div class=" w-2/5">
<Field
                            name="courseId"
                            label="Course List"
                            
                            mode
                            component={SelectComponent}
                            options={
                              Array.isArray(courseOption) ? courseOption : []
                            }
                          />
                          </div>
                          </div>
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
                            label="Duration(Unit)"
                              
                            options={["Hours", "Days", "Month","Years"]}
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
                        label="Price"
                         
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div class=" w-2/5">
                    <Field
                              name="currency"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingPrograms}
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


const mapStateToProps = ({ program,course }) => ({
    addingPrograms: program.addingPrograms,
    addingProgramsError: program.addingProgramsError,
    courseById:course.courseById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addPrograms,
        getCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProgramForm);
